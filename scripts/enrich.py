"""
Insert teaching content into an existing lesson file without disturbing its
screenshots.

The MS Office lessons were authored as screenshot galleries: a heading, a
one-line caption, a picture. Those captions and images are worth keeping — the
gap is that nothing explains *why* a step exists or what decision it serves.
This script splices in the missing layer at stable anchor points:

  · objectives      -> after the lesson's `description`
  · opening section -> as the first entry of `sections`, before any screenshot
  · worked example  -> as a section inserted before the Knowledge Check
  · KC feedback     -> `explanation` / `optionRationales` after `correctIndex`

Idempotent: re-running skips any lesson that already carries the addition.
"""

import json
import re
import sys


def ts(value, indent):
    """Serialize a Python value as TypeScript source at a given indent."""
    pad = " " * indent
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    if isinstance(value, list):
        if not value:
            return "[]"
        inner = ",\n".join(pad + "  " + ts(v, indent + 2) for v in value)
        return "[\n" + inner + ",\n" + pad + "]"
    if isinstance(value, dict):
        inner = ",\n".join(
            f"{pad}  {k}: {ts(v, indent + 2)}" for k, v in value.items()
        )
        return "{\n" + inner + ",\n" + pad + "}"
    raise TypeError(f"unsupported: {type(value)}")


def find_lesson_span(src, slug):
    """Return (start, end) character offsets of the lesson object for `slug`."""
    m = re.search(r'slug:\s*"' + re.escape(slug) + r'"', src)
    if not m:
        return None
    # Walk backwards to the '{' that opens this lesson object.
    start = src.rfind("{", 0, m.start())
    # Walk forward matching braces to find its close.
    depth = 0
    i = start
    in_str = False
    quote = ""
    while i < len(src):
        ch = src[i]
        if in_str:
            if ch == "\\":
                i += 2
                continue
            if ch == quote:
                in_str = False
        # Comments must be skipped before quote handling: an apostrophe in a
        # comment ("// If it doesn't") would otherwise be read as a string
        # opener and swallow every brace up to the next apostrophe.
        elif ch == "/" and src[i + 1 : i + 2] == "/":
            nl = src.find("\n", i)
            i = len(src) if nl == -1 else nl
            continue
        elif ch == "/" and src[i + 1 : i + 2] == "*":
            end = src.find("*/", i + 2)
            i = len(src) if end == -1 else end + 2
            continue
        elif ch in "\"'`":
            in_str = True
            quote = ch
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return start, i + 1
        i += 1
    return None


def add_objectives(block, objectives):
    if re.search(r"\n\s*objectives:", block):
        return block
    # Anchor on the end of the `description` value.
    m = re.search(r'(\n(\s*)description:\s*\n?\s*"(?:[^"\\]|\\.)*",)', block)
    if not m:
        return block
    pad = m.group(2)
    rendered = ts(objectives, len(pad))
    return block.replace(
        m.group(1), m.group(1) + f"\n{pad}objectives: {rendered},", 1
    )


def add_opening_section(block, section):
    if '"scenario"' in block:
        return block
    m = re.search(r"\n(\s*)sections:\s*\[", block)
    if not m:
        return block
    pad = m.group(1) + "  "
    rendered = ts(section, len(pad))
    insert_at = m.end()
    return block[:insert_at] + f"\n{pad}{rendered}," + block[insert_at:]


def add_section_before_kc(block, section, marker):
    """Insert a section immediately before the section holding the KC."""
    if marker in block:
        return block
    # Locate the section object that contains the knowledge-check block.
    kc = block.find('type: "knowledge-check"')
    if kc == -1:
        return block
    # Find the start of that section's object: the last "{\n ... heading:"
    # before the knowledge check.
    heads = [m.start() for m in re.finditer(r"\n(\s*)\{\s*\n\s*heading:", block[:kc])]
    if not heads:
        return block
    at = heads[-1] + 1
    pad_m = re.match(r"(\s*)", block[at:])
    pad = pad_m.group(1) if pad_m else "    "
    rendered = ts(section, len(pad))
    return block[:at] + f"{pad}{rendered},\n" + block[at:]


def enrich_kc(block, checks):
    """Attach explanation + per-option rationales to each knowledge check."""
    out = []
    last = 0
    idx = 0
    for m in re.finditer(r"(\n(\s*)correctIndex:\s*\d+,)", block):
        out.append(block[last : m.end()])
        last = m.end()
        # Already enriched? skip.
        tail = block[m.end() : m.end() + 200]
        if "explanation:" in tail[: tail.find("}") + 1 if "}" in tail else len(tail)]:
            idx += 1
            continue
        if idx < len(checks):
            c = checks[idx]
            pad = m.group(2)
            out.append(f'\n{pad}explanation: {ts(c["explanation"], len(pad))},')
            if c.get("rationales"):
                out.append(
                    f'\n{pad}optionRationales: {ts(c["rationales"], len(pad))},'
                )
        idx += 1
    out.append(block[last:])
    return "".join(out)


def apply(path, lessons):
    src = open(path, encoding="utf-8").read()
    changed = 0
    for slug, data in lessons.items():
        span = find_lesson_span(src, slug)
        if not span:
            print(f"  !! lesson not found: {slug}")
            continue
        start, end = span
        block = src[start:end]
        before = block
        if data.get("objectives"):
            block = add_objectives(block, data["objectives"])
        if data.get("opening"):
            block = add_opening_section(block, data["opening"])
        if data.get("workedExample"):
            block = add_section_before_kc(
                block, data["workedExample"], '"worked-example"'
            )
        if data.get("checks"):
            block = enrich_kc(block, data["checks"])
        if block != before:
            changed += 1
        src = src[:start] + block + src[end:]
    open(path, "w", encoding="utf-8").write(src)
    print(f"  {path}: enriched {changed}/{len(lessons)} lessons")


if __name__ == "__main__":
    print("import this module from a per-course script", file=sys.stderr)
