import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from enrich import apply

M1 = {
"the-pct-role": {
  "workedExample": {
    "heading": "Turning an observation into a report",
    "blocks": [
      {"type": "worked-example",
       "title": "Reporting a change a nurse can act on",
       "task": "You notice a patient is breathing faster than this morning and is quieter than usual. Report it.",
       "steps": [
         {"move": "Measure before you report.",
          "why": "'Breathing faster' is an impression; 'respirations 26, up from 16 at 0800' is data. Taking thirty seconds to count gives the nurse something they can act on immediately rather than something they have to come and verify."},
         {"move": "Compare against this patient's own baseline, not the textbook range.",
          "why": "A respiratory rate of 22 is inside the normal range and may still be a significant rise for someone who has been at 14 for three days. The change is the finding; the absolute number alone can hide it."},
         {"move": "Note what else changed, including things that are not measurements.",
          "why": "Being quieter than usual is a real observation and often the earliest sign of deterioration. You are the person who knows how this patient has been all week — nobody else on the team has that comparison."},
         {"move": "Report immediately rather than saving it for handoff.",
          "why": "Handoff may be hours away. You are not deciding whether the change matters, which is the nurse's judgment; you are making sure they have the information while there is still time to act on it."},
         {"move": "State it in one sentence: what changed, from what, when, and what else you noticed.",
          "why": "'Mrs. Alvarez in 312 — respirations 26, up from 16 this morning, and she's much quieter than she's been all week' gives the nurse everything in four seconds. A narrative makes them extract it."},
       ],
       "result": "The nurse can decide whether to assess now, with numbers and a baseline in hand.",
       "takeaway": "Measure it, compare it to the patient's own baseline, report it now, and say it in one sentence."},
    ],
  },
},
}

M2 = {
"infection-control-for-pcts": {
  "workedExample": {
    "heading": "Working through a bed bath without cross-contaminating",
    "blocks": [
      {"type": "worked-example",
       "title": "Where the gloves change during personal care",
       "task": "Give a bed bath to a patient who also has a wound dressing that needs checking, without carrying organisms from one task to the next.",
       "steps": [
         {"move": "Hand hygiene, then gloves, before you touch the patient at all.",
          "why": "The first moment is before contact, not after. Gloves put on over unwashed hands carry whatever was on them into the task, and the glove gives you no protection from something you brought in yourself."},
         {"move": "Work clean to dirty, top to bottom, and change gloves when you cross that line.",
          "why": "Wash the face and upper body before the perineal area, never the reverse. This is the single ordering rule that prevents most cross-contamination during personal care, and it costs nothing to follow."},
         {"move": "After perineal care: remove gloves, perform hand hygiene, put on fresh gloves.",
          "why": "All three steps, in that order. Changing gloves without hand hygiene between is the common shortcut and it defeats the purpose — hands are contaminated during removal regardless of technique."},
         {"move": "Only now approach the wound dressing.",
          "why": "Moving from a dirty task to an open wound on the same patient is a direct route to infection. The fact that it is the same person is irrelevant — organisms from the perineum do not belong in a wound."},
         {"move": "Remove gloves and perform hand hygiene before touching the bed rails, the call light, or the chart.",
          "why": "Everything you touch after care becomes a surface the next person touches. This is how an organism leaves the room, and it is the step most often skipped because the task feels finished."},
       ],
       "result": "One patient, one bath, one wound check, and nothing carried between them.",
       "takeaway": "Clean to dirty, and remove-hygiene-reglove as a single unit every time you cross the line."},
    ],
  },
},
}

M3 = {
"vital-signs-for-pcts": {
  "workedExample": {
    "heading": "Taking a blood pressure you would stake a decision on",
    "blocks": [
      {"type": "worked-example",
       "title": "Getting an accurate reading under time pressure",
       "task": "Measure a blood pressure on a busy round, accurately enough that a clinician can act on it without retaking it.",
       "steps": [
         {"move": "Let the patient sit quietly for five minutes, feet flat and back supported.",
          "why": "This is the step time pressure removes first, and it is the largest single source of falsely high readings. Crossed legs raise systolic pressure and an unsupported back raises diastolic. Five minutes costs less than a patient started on medication they do not need."},
         {"move": "Size the cuff to the arm rather than using the one already attached.",
          "why": "The bladder should encircle about 80% of the arm. A cuff that is too small reads high by 10 to 20 mmHg — enough on its own to move a patient into a different category. This is the most common equipment error in the building."},
         {"move": "Bare arm, supported at heart level.",
          "why": "A sleeve under the cuff distorts the reading and a pushed-up sleeve becomes a tourniquet. An arm below heart level reads high. And support it yourself — a patient holding their own arm up is using muscle, which also raises the number."},
         {"move": "Palpate first, then inflate 30 mmHg above where the pulse disappeared.",
          "why": "This avoids missing an auscultatory gap — a silent interval where the sounds vanish and return. Miss it and you record a systolic far below the real one, which is the error that reads as reassuring."},
         {"move": "Deflate slowly, 2 to 3 mmHg per second.",
          "why": "Faster deflation misses the true first and last sounds, underestimating systolic and overestimating diastolic. It is the error that feels like efficiency."},
         {"move": "Record the arm, the position, and the cuff size alongside the number.",
          "why": "It makes the reading comparable at the next check. A pressure recorded with no context cannot be meaningfully compared to one taken differently, and the trend is usually what matters."},
       ],
       "result": "A reading that reflects the patient's pressure rather than your technique.",
       "takeaway": "Rest, cuff size, bare arm at heart level, palpate first, deflate slowly. Every error pushes the number in a predictable direction, and they add up."},
    ],
  },
},
"ekg-and-point-of-care-testing": {
  "workedExample": {
    "heading": "Placing the precordial leads",
    "blocks": [
      {"type": "worked-example",
       "title": "Finding the fourth intercostal space",
       "task": "Place V1 through V6 accurately, since nothing downstream can correct a placement error.",
       "steps": [
         {"move": "Find the sternal angle — the ridge where the manubrium meets the body of the sternum.",
          "why": "This is the only reliable landmark, and everything else is counted from it. Estimating by eye is where the common one-space-too-high error starts, and that error is invisible on the finished tracing."},
         {"move": "Slide laterally from the sternal angle to find the second intercostal space, then count down to the fourth.",
          "why": "The second rib attaches at the sternal angle, so the space just below it is the second intercostal space. Count down two more and you are at the fourth. Counting from the clavicle instead is unreliable."},
         {"move": "Place V1 and V2 either side of the sternum in that fourth space, then V4 before V3.",
          "why": "V3 sits midway between V2 and V4, so V4 has to exist first. Placing V3 by eye before V4 is a common sequencing error that misplaces two leads instead of one."},
         {"move": "Place V4 at the fifth intercostal space, midclavicular line — then V5 and V6 level with V4, not along the rib.",
          "why": "V5 and V6 follow the horizontal plane of V4, not the curve of the rib. Following the rib carries them downward and changes the waveform."},
         {"move": "For a patient with breast tissue, place the electrode under it rather than over it.",
          "why": "Placing over breast tissue attenuates the signal and shifts the effective position. Explain what you are doing and why before you do it, and offer a chaperone."},
       ],
       "result": "A tracing that reflects the heart's electrical activity rather than where the electrodes happened to land.",
       "takeaway": "Count from the sternal angle, place V1, V2, then V4, then V3 between them. Nothing later can fix a misplaced lead."},
    ],
  },
},
}

M4 = {
"activities-of-daily-living": {
  "workedExample": {
    "heading": "A bath that leaves someone their dignity",
    "blocks": [
      {"type": "worked-example",
       "title": "Helping a man who has dressed himself for seventy years",
       "task": "Assist with morning care for a patient who can wash his own face and arms but cannot manage his back, legs, or buttons.",
       "steps": [
         {"move": "Knock, wait, introduce yourself, and say what you are there to do before touching anything.",
          "why": "It is his room and his body. Announcing the task gives him the chance to say 'not yet' or 'I can do that part', which is the difference between being helped and being handled."},
         {"move": "Ask what he can do himself, and then let him do it even though it is slower.",
          "why": "Independence lost is rarely regained, and doing it for him because it is faster is how it gets lost. The time you save is measured in minutes; what he loses is measured in months."},
         {"move": "Close the door and the curtain, and keep him covered except the part you are washing.",
          "why": "Exposure is the most common complaint in personal care and the easiest to prevent. Move the towel rather than the patient wherever you can."},
         {"move": "Offer real choices — water temperature, which arm first, shirt before trousers.",
          "why": "Small autonomy matters disproportionately to someone who has lost most of theirs. These choices cost nothing and change how the whole interaction feels to him."},
         {"move": "Use the time to look at his skin, and say what you are doing.",
          "why": "You are seeing areas nobody else sees, in good light, with your hands on him. Narrating it — 'I'm just checking your back while I'm here' — keeps it care rather than inspection."},
         {"move": "Leave him covered, warm, with the call light in reach before you go.",
          "why": "The last thirty seconds are what he will remember, and the call light within reach is what prevents him getting up alone later."},
       ],
       "result": "He is clean, his skin has been checked, and he did the parts he still can.",
       "takeaway": "Announce, ask what he can do, drape, offer choices, observe while you work, and leave him able to call you."},
    ],
  },
},
}

M5 = {
"specimen-collection-for-pcts": {
  "workedExample": {
    "heading": "Labelling so a mix-up cannot happen",
    "blocks": [
      {"type": "worked-example",
       "title": "Two specimens in fifteen minutes",
       "task": "Collect urine specimens from two patients in adjacent rooms without any possibility of swapping them.",
       "steps": [
         {"move": "Take one labelled requisition into one room. Never carry two.",
          "why": "The mix-up becomes impossible rather than unlikely. If only one patient's paperwork is in your hand, there is nothing to confuse it with — this is a structural fix rather than a reminder to be careful."},
         {"move": "Check the armband against the requisition, out loud, with the patient.",
          "why": "Two identifiers, name and date of birth, read from the band rather than asked as a leading question. 'Are you Mrs. Alvarez?' gets a yes from someone who is confused or hard of hearing; 'Can you tell me your name and date of birth?' does not."},
         {"move": "Label the container in the room, immediately after collection, in front of the patient.",
          "why": "This is the whole procedure. Every mix-up happens in the gap between collection and labelling, and the only reliable fix is to close that gap to zero. Never pre-label and never carry an unlabelled specimen out."},
         {"move": "Have the patient confirm their name on the label if they are able.",
          "why": "A second pair of eyes at no cost, and it is the patient's own result at stake. Most people check carefully when asked."},
         {"move": "Complete and route that specimen before going to the second room.",
          "why": "Finishing one before starting the next keeps only one specimen in play at a time. Batching two collections and labelling afterwards is exactly how two patients receive each other's results."},
       ],
       "result": "Two specimens, each labelled at the bedside in the patient's presence, with no moment when both were unlabelled.",
       "takeaway": "One patient's paperwork at a time, label in the room, and finish one before starting the next."},
    ],
  },
},
}

M6 = {
"recognizing-deterioration": {
  "workedExample": {
    "heading": "Escalating when the first report does not land",
    "blocks": [
      {"type": "worked-example",
       "title": "A patient who is 'just not right'",
       "task": "A patient who has been chatty all week is quiet and says she feels strange. Her vital signs are within normal limits. You report it and the nurse says they will look later. You are still worried.",
       "steps": [
         {"move": "Take a full set of vitals and compare each to her baseline.",
          "why": "'Within normal limits' is not the same as 'unchanged'. A pulse of 96 in someone who has run 62 all week is a 34-beat rise, and the normal range conceals it completely. Bring the comparison, not just the numbers."},
         {"move": "Report again, and say plainly that you are concerned.",
          "why": "The nurse prioritized without seeing what you saw. Your continued concern is new information, and saying 'I'm worried about her' is a recognized escalation signal in most facilities — it is not being difficult."},
         {"move": "Name the change rather than the impression.",
          "why": "'She's not herself' is easy to deprioritize. 'She's been talkative all week, she's barely spoken this afternoon, her pulse is up 34 from baseline, and she says she feels strange' is not."},
         {"move": "If it is still not acted on, go to the charge nurse.",
          "why": "Going up the chain is what the chain is for. It is not going over anyone's head — it is the escalation path existing for exactly this situation, and nobody is disciplined for using it."},
         {"move": "Consider the rapid response team if your facility lets any staff member activate it.",
          "why": "Many do, precisely because the person at the bedside notices first. Activating one and being wrong costs a team a few minutes; not activating and being right costs far more."},
         {"move": "Document what you observed, when you reported it, and to whom.",
          "why": "It is a clinical record of a real change, and it is also a contemporaneous account of what you did. Both matter."},
       ],
       "result": "The patient is seen, with a documented trail of what was noticed and when.",
       "takeaway": "New confusion and 'I feel strange' are early signs, not vague ones. Bring the baseline comparison, say you are concerned, and go up the chain if it does not land."},
    ],
  },
},
}

apply("lib/content/programs/patient-care-technician/module1Lessons.ts", M1)
apply("lib/content/programs/patient-care-technician/module2Lessons.ts", M2)
apply("lib/content/programs/patient-care-technician/module3Lessons.ts", M3)
apply("lib/content/programs/patient-care-technician/module4Lessons.ts", M4)
apply("lib/content/programs/patient-care-technician/module5Lessons.ts", M5)
apply("lib/content/programs/patient-care-technician/module6Lessons.ts", M6)
