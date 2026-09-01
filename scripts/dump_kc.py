import re, sys, glob, os
for f in sorted(glob.glob(sys.argv[1])):
    s = open(f, encoding="utf-8").read()
    print("="*72); print(os.path.basename(f))
    # Walk lessons so checks are attributed to the right slug
    slugs = [(m.start(), m.group(1)) for m in re.finditer(r'slug:\s*"([^"]+)"', s)]
    for m in re.finditer(r'type:\s*"knowledge-check",\s*\n\s*question:\s*\n?\s*"((?:[^"\\]|\\.)+)",\s*\n\s*options:\s*\[([\s\S]*?)\],\s*\n\s*correctIndex:\s*(\d+)', s):
        owner = [sl for pos, sl in slugs if pos < m.start()]
        opts = re.findall(r'"((?:[^"\\]|\\.)+)"', m.group(2))
        print(f"\n[{owner[-1] if owner else '?'}] {m.group(1)}")
        for i, o in enumerate(opts):
            print(f"   [{i}]{'*' if i == int(m.group(3)) else ' '} {o}")
