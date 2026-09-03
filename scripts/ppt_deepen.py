"""
Deepen PowerPoint's body prose.

The enrichment pass added an opening section to every lesson, but the body
paragraphs were still screenshot captions — they restated the click path the
image already showed. These replacements keep the click path and add what the
caption left out: the decision behind the step, the way it goes wrong, or the
consequence at work.

Matches on the exact quoted string, so a caption that has since been edited is
reported rather than silently skipped.
"""
import pathlib
import sys

REWRITES = {
"module1Lessons.ts": [
 ("Saving protects your work and allows you to reopen your presentation later. You can save files to your computer or to OneDrive.",
  "Where you save decides what you can do later. A file on the computer's own drive is reachable only from that machine, and is gone if the drive fails. A file in OneDrive follows you to any device you sign in on, keeps a version history you can roll back, and is the only kind of file AutoSave and co-authoring work on. For a presentation you will build over several sessions, or deliver from a room's machine rather than your own, save to OneDrive from the start."),
 ("The Save command stores the current presentation using the same file name and location.",
  "Save writes over the file you opened. That is what you want when you are updating your own work — and it is exactly the wrong thing when you opened an existing deck to build a new one from it. Whenever a file is your starting point rather than your subject, use Save As first, before you change anything."),
 ("If the presentation has never been saved before, PowerPoint will automatically open the Save As screen.",
  "The first Save always opens Save As, because PowerPoint has nowhere to write to yet. After that it saves silently, which is why the Save-As-first habit matters: once the file has a name, a reflexive Ctrl+S goes straight into it with no prompt."),
 ("Save As allows you to create a new version of a presentation or save it to a different location.",
  "Save As creates a new file and leaves the original untouched. Do it before you edit, not after. Renaming a file you have already changed does not restore the original, and the deck you overwrote may have been the one someone else needed."),
 ("When saving a presentation you must provide a file name. Use descriptive names so you can easily identify presentations later.",
  "Name the file so a stranger could identify it in a folder list: subject, audience, and date in year-month order — \\\"2026-10-14 Staff Orientation - New Hires.pptx\\\". Year-first dates sort chronologically automatically. \\\"Presentation1 final v2 FINAL.pptx\\\" is the file nobody can find in March."),
 ("PowerPoint allows you to save presentations in multiple file formats including PowerPoint Presentation (.pptx), PowerPoint Show, or PDF.",
  "Match the format to what the recipient needs to do. A .pptx is editable — right for a colleague who will revise it, and wrong for a deck you do not want altered. A PowerPoint Show (.ppsx) opens straight into the slide show, which suits handing a deck to someone who will present but not edit. A PDF opens anywhere, locks the layout, and drops animation and video."),
 ("The Export section allows you to convert presentations into different formats such as PDF or video.",
  "Export produces a copy in another format and leaves your .pptx alone. Video is the one worth knowing: it preserves animation, timing, and narration, so a deck people watch without you keeps working. It also takes minutes to render on a long deck, so do it before the day you need it."),
 ("If a presentation is stored on OneDrive, you can share it directly with others from within PowerPoint.",
  "Sharing requires the file to be in OneDrive or SharePoint — that is what a share link points at. If the Share button offers to upload first, it is telling you the file is currently local and cannot be shared as a link."),
 ("You can invite people to view or edit the presentation by entering their email address.",
  "Choose the permission deliberately. \\\"Can view\\\" is right for most recipients; \\\"can edit\\\" is for genuine co-authors. And permissions outlive the task — a link shared for one afternoon still works next year unless someone revokes it. Set an expiry on anything sensitive."),
 ("If PowerPoint closes unexpectedly, you may be able to recover work that was not saved.",
  "AutoRecover is a safety net, not a save. It keeps periodic snapshots so a crash costs you minutes rather than hours, and it is not a substitute for saving. Check the interval under File > Options > Save and set it to match how much work you could bear to redo."),
 ("When PowerPoint restarts after a crash, the Document Recovery pane may appear showing versions of your presentation that can be restored.",
  "Open the recovered version and check it before you close the pane — once you dismiss it, the recovery files are cleared. Compare it against the last version you saved, since the recovered copy may be newer or older depending on when the snapshot was taken."),
 ("PowerPoint includes settings that control how presentations are saved. You can adjust AutoRecover settings and default save locations.",
  "Two settings are worth changing once. Set the AutoRecover interval to five minutes rather than the default ten. And set the default save location to OneDrive, so the safe choice is the one that happens when you are not thinking about it."),
],
"module2Lessons.ts": [
 ("To select text, click next to the text you want to select, then click and drag your mouse across the words.",
  "Dragging works, and there are faster ways worth knowing: double-click selects a word, triple-click selects a paragraph, and Ctrl+A selects everything in the placeholder. Precise selection matters because PowerPoint applies formatting to exactly what is highlighted — a stray trailing space picked up in the selection is how one word ends up a different size."),
 ("Copying text allows you to duplicate information without removing the original content from the slide.",
  "Copy leaves the original in place; cut removes it. The keyboard versions are worth using — Ctrl+C, Ctrl+X, Ctrl+V — because they work identically in Word, Excel, and your browser."),
 ("Next place the insertion point where you want the copied text to appear and click the Paste command.",
  "Pasting normally brings the source formatting with it, which is why text copied from a web page arrives in the wrong font on a coloured background. Ctrl+Shift+V, or Paste Options > Keep Text Only, brings the words and leaves the formatting behind. On a slide, where consistency is most of what looks professional, that is almost always what you want."),
 ("Formatting text helps emphasize important information and makes slides easier to read.",
  "Emphasis works by contrast, which makes it a budget. Bold one phrase on a slide and the eye goes there; bold six and you have emphasized nothing. Before formatting anything, decide which single thing the audience should see first."),
 ("The Home tab contains several tools for formatting text, including options for font style, font size, color, and alignment.",
  "Prefer the placeholder's own styling to manual formatting wherever you can. Text typed into a layout placeholder inherits size, font, and position from the Slide Master, so it matches every other slide automatically. Formatting applied by hand has to be repeated, and it drifts."),
 ("You can also apply styles such as bold, italic, or underline to highlight important information for your audience.",
  "Bold for emphasis, and use it sparingly. Avoid underline entirely on a slide: readers read underlined text as a hyperlink and some will wait for it to do something. Italic is harder to read when projected, so keep italic runs short."),
],
"module4Lessons.ts": [
 ("The Print screen shows a live preview of your slides on the right and printing options on the left.",
  "Check the preview before every print job, not just the settings. The page count is the fastest check available: a deck that shows 12 slides and previews 13 pages has a stray blank, and finding it now costs thirty seconds instead of a stack of wasted paper."),
 ("You can choose the number of copies, select a printer, and decide whether to print all slides or a specific range.",
  "Printing a range matters more than it sounds. When one slide changes after you have printed forty packets, printing just that page and swapping it is a few minutes; reprinting everything is an afternoon and a full toner cartridge."),
 ("Additional settings allow you to control slide layout, orientation, and whether the presentation prints in color or grayscale.",
  "For a dark-themed deck, choose Pure Black and White rather than Color. It prints readable dark text on white instead of reproducing the dark background, which saves most of the toner and produces something people can actually annotate."),
 ("Full Page Slides print one slide per page and are ideal for reviewing or sharing individual slides.",
  "Full Page is rarely the right choice for an audience. It uses one sheet per slide and leaves no room to write. Handouts at 3 per page add ruled lines beside each slide, which is what people actually want to take notes on."),
 ("Outline view prints only the text from your slides, making it useful for reviewing the structure of your presentation.",
  "Printing the outline is a good way to check your own argument before you worry about design. Stripped of images and layout, a deck that does not make sense as a list of headings will not make sense to an audience either."),
],
"module6Lessons.ts": [
 ("PowerPoint organizes animations into four categories based on what they do to an object.",
  "Entrance brings something onto the slide, Emphasis draws attention to something already there, Exit removes it, and Motion Path moves it along a route you draw. Entrance is the one with a legitimate everyday use — revealing points as you discuss them — and the other three are usually decoration."),
 ("A number badge appears next to the object, indicating its animation order on the slide.",
  "Those badges are the running order, and they do not renumber when you rearrange objects on the slide. If your reveals fire in an order that surprises you during a rehearsal, the badges will show you why."),
 ("Every animation has three timing settings that control when and how fast it plays.",
  "Start decides what triggers it: On Click waits for you, With Previous fires alongside the animation before it, and After Previous fires automatically once that one finishes. Duration sets the speed — under half a second for most things, because anything slower makes the audience wait. Delay staggers a sequence without needing extra clicks."),
 ("Audio can enhance a presentation by adding background music, narration, or short sound clips that reinforce your message.",
  "Audio is worth adding for narration on a self-running deck and rarely worth it in a live presentation, where you are the narration. Two constraints apply whatever the use: any information carried by audio must also appear on screen, because deaf and hard-of-hearing viewers and anyone with the sound off receive none of it; and music must be licensed for the setting, since commercial recordings are not free to play in a waiting room or a classroom."),
 ("The Start setting controls when audio begins playing. You can set it to In Click Sequence, Automatically, or When Clicked On.",
  "Audio stops when the slide changes unless you also turn on Play Across Slides on the Playback tab. That is the setting people miss when background music cuts out one slide in — the file is fine, it simply belongs to the slide it was inserted on."),
 ("If an audio clip is longer than you need, you can trim it without leaving PowerPoint.",
  "Trimming in PowerPoint is non-destructive: it changes the start and end points used during playback and leaves the original file whole, so you can always widen the trim again. It does not shrink the file, though — the untrimmed audio is still embedded, which matters when you are emailing the deck."),
],
"module8Lessons.ts": [
 ("When you're ready to present, PowerPoint offers several ways to start your slide show.",
  "F5 starts from the beginning and Shift+F5 starts from the slide you are on. Shift+F5 is the one to learn: restarting from slide one every time you want to check slide 30 wastes most of a rehearsal."),
 ("Enable it by checking Use Presenter View on the Slide Show tab before starting.",
  "Presenter View needs two displays — your screen and the projector — and PowerPoint decides which is which. If your notes appear on the projector and the slides on your laptop, use Display Settings during the show to swap them. Check this in the actual room before the audience arrives; it is the most common thing that goes wrong in the first thirty seconds."),
 ("To add notes, click in the Notes pane at the bottom of Normal View and type your content.",
  "The notes pane is where the sentences you plan to say belong. Moving them off the slide is what lets you cut a slide down to the few words that benefit from being seen — the audience cannot read and listen at once, and given the choice they read."),
 ("During a slide show, you can simulate a laser pointer to draw your audience's attention to specific areas of a slide.",
  "The laser pointer is useful on a dense chart and unnecessary on a slide with four words. If you are reaching for it constantly, the slide is probably carrying too much."),
 ("Right-click a slide in the slide panel and select Hide Slide, or use the Hide Slide button on the Slide Show tab.",
  "A hidden slide stays in the file and is skipped during the show, which makes it the right way to hold backup detail for a question you might be asked. Press its number then Enter during the presentation to jump to it, and it appears as if you had planned for the question."),
 ("Press Escape at any time to exit the slide show and return to the Normal editing view.",
  "Two more keys are worth knowing. B blanks the screen to black and W to white — press either when discussion starts, so the slide stops competing with the conversation. Typing a slide number then Enter jumps straight there, which is how you answer a question about slide 22 without clicking through fourteen slides while everyone watches."),
 ("PowerPoint provides several options for getting your file out of your computer and into the hands of your audience.",
  "Decide what the recipient needs to do before choosing the format. Watch it without you means video. Edit it means a .pptx via a link, not an attachment. Read it means PDF. Present it themselves means a PowerPoint Show or a packaged folder."),
 ("Before sharing, PowerPoint may ask you to save the file to OneDrive if it hasn't been saved there already.",
  "That prompt is telling you something useful: a share link points at a file in the cloud, so a local file has nothing to link to. Emailing a copy instead creates a second version that immediately starts diverging from yours."),
 ("Go to File → Export → Create PDF/XPS. Choose a location, confirm the file name, and click Publish.",
  "PDF locks the layout and fonts so the deck renders identically anywhere, which also solves the font-substitution problem — if a recipient lacks a font you used, PowerPoint silently swaps it and your text reflows. PDF drops animation, transitions, and embedded video, so it suits a deck to be read rather than watched."),
 ("Go to File → Export → Create a Video. Choose the display quality, set how long each slide appears, and click Create Video.",
  "Video keeps animation, timing, and any recorded narration, which makes it the right format for training people watch on their own. Rendering a long deck takes several minutes and the file is large, so produce it the day before rather than the hour of."),
 ("Go to File → Info → Protect Presentation → Mark as Final.",
  "Mark as Final is advisory, not protection. It sets the file read-only and shows a notice, and any recipient can dismiss it with one click. If a deck genuinely must not be altered, send a PDF; if it must be confidential, use Encrypt with Password on the same menu and consider where the file is stored."),
],
}

changed = total = missing = 0
for fname, pairs in REWRITES.items():
    p = pathlib.Path("lib/content/ms-office/powerpoint") / fname
    s = p.read_text()
    for old, new in pairs:
        total += 1
        if old in s:
            s = s.replace(old, new, 1); changed += 1
        else:
            missing += 1
            print(f"  !! not found in {fname}: {old[:70]}…")
    p.write_text(s)
print(f"\n  rewrote {changed}/{total} captions ({missing} not found)")
if missing:
    sys.exit(1)
