import { Lesson } from "@/types/lesson";

export const module6Lessons: Lesson[] = [
  {
    slug: "recognizing-deterioration",
    title: "Recognizing a Deteriorating Patient",
    description:
      "Spot the early signs that a patient is declining, and escalate in time for it to matter.",
    duration: "24 min",
    objectives: [
      "Recognize early signs of clinical deterioration",
      "Escalate concerns effectively, including when dismissed",
      "Respond to a fall, a seizure, and choking within your scope",
      "Describe your role during a code",
    ],
    sections: [
      {
        heading: "Escalating when the first report does not land",
        blocks: [
          {
            type: "worked-example",
            title: "A patient who is 'just not right'",
            task: "A patient who has been chatty all week is quiet and says she feels strange. Her vital signs are within normal limits. You report it and the nurse says they will look later. You are still worried.",
            steps: [
              {
                move: "Take a full set of vitals and compare each to her baseline.",
                why: "'Within normal limits' is not the same as 'unchanged'. A pulse of 96 in someone who has run 62 all week is a 34-beat rise, and the normal range conceals it completely. Bring the comparison, not just the numbers.",
              },
              {
                move: "Report again, and say plainly that you are concerned.",
                why: "The nurse prioritized without seeing what you saw. Your continued concern is new information, and saying 'I'm worried about her' is a recognized escalation signal in most facilities — it is not being difficult.",
              },
              {
                move: "Name the change rather than the impression.",
                why: "'She's not herself' is easy to deprioritize. 'She's been talkative all week, she's barely spoken this afternoon, her pulse is up 34 from baseline, and she says she feels strange' is not.",
              },
              {
                move: "If it is still not acted on, go to the charge nurse.",
                why: "Going up the chain is what the chain is for. It is not going over anyone's head — it is the escalation path existing for exactly this situation, and nobody is disciplined for using it.",
              },
              {
                move: "Consider the rapid response team if your facility lets any staff member activate it.",
                why: "Many do, precisely because the person at the bedside notices first. Activating one and being wrong costs a team a few minutes; not activating and being right costs far more.",
              },
              {
                move: "Document what you observed, when you reported it, and to whom.",
                why: "It is a clinical record of a real change, and it is also a contemporaneous account of what you did. Both matter.",
              },
            ],
            result: "The patient is seen, with a documented trail of what was noticed and when.",
            takeaway: "New confusion and 'I feel strange' are early signs, not vague ones. Bring the baseline comparison, say you are concerned, and go up the chain if it does not land.",
          },
        ],
      },
      {
        heading: "You will notice it first",
        blocks: [
          {
            type: "scenario",
            role: "You are working a medical unit at Lakeside Regional.",
            text: "A patient who has been chatty all week is quiet this afternoon and says she just feels 'strange.' Her vital signs are within normal limits. Nothing is objectively wrong, and you are the only person who knows how she has been for the last four days.",
            task: "Learn to take early, non-specific change seriously and escalate it credibly.",
          },
          {
            type: "paragraph",
            text: "Serious deterioration is usually preceded by hours of subtle change. Because PCTs spend the most time with patients, they frequently detect it before it appears in the numbers — and a change in mental status or a patient's own sense that something is wrong are among the most reliable early signals.",
          },
          {
            type: "table",
            caption: "Early warning signs",
            columns: ["Sign", "Significance"],
            rows: [
              ["New confusion or reduced alertness", "Often the earliest sign of sepsis, hypoxia, or metabolic change"],
              ["Rising respiratory rate", "One of the earliest and most reliable indicators of deterioration"],
              ["A patient saying they feel something is wrong", "Take seriously — patients often sense decline before it is measurable"],
              ["Falling oxygen saturation", "Report promptly, particularly with rising respirations"],
              ["Rising heart rate", "Compensation for a developing problem"],
              ["Falling blood pressure", "Often a late sign — do not wait for it"],
              ["Reduced urine output", "Poor perfusion or dehydration"],
              ["Cool, clammy, mottled skin", "Poor perfusion"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "If you report a concern and it is not acted on, and the patient still worries you, escalate again. Say clearly that you are concerned and why, and ask for the patient to be reviewed. If you get nowhere, go to the charge nurse. Most facilities also have a rapid response team, and in many, any staff member may activate it. Being wrong about a deteriorating patient costs a few minutes of someone's time; being right and staying quiet costs far more.",
          },
          {
            type: "table",
            caption: "Immediate responses within your scope",
            columns: ["Event", "Do", "Do not"],
            rows: [
              [
                "Fall",
                "Stay with them, call for help, keep them still until assessed",
                "Do not lift them up before a nurse assesses them",
              ],
              [
                "Seizure",
                "Protect the head, clear the area, time it, turn them on their side afterwards",
                "Do not restrain them or put anything in their mouth",
              ],
              [
                "Choking, able to cough",
                "Encourage coughing; stay with them",
                "Do not slap the back or intervene while coughing is effective",
              ],
              [
                "Choking, cannot speak or cough",
                "Call for help and begin abdominal thrusts if trained",
                "Do not leave them",
              ],
              [
                "Unresponsive",
                "Call a code, check breathing and pulse, begin CPR if trained",
                "Do not leave to find someone",
              ],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "After a fall, never lift the patient until a nurse has assessed them. A hip fracture or head injury can be made significantly worse by moving someone. Keep them still and comfortable, call for help, and stay with them.",
          },
          {
            type: "knowledge-check",
            question:
              "You report a concern about a patient's new confusion. The nurse is busy and says they will look later. The patient still worries you. What should you do?",
            options: [
              "Wait, since the nurse has assessed the priority",
              "Escalate again, stating clearly that you are concerned and asking for the patient to be reviewed, and go to the charge nurse if needed",
              "Document your concern and move on",
              "Monitor and report at handoff",
            ],
            correctIndex: 1,
            explanation:
              "New confusion is among the earliest signs of serious deterioration, including sepsis. If your concern is not acted on and the patient still worries you, escalating again is appropriate and expected. Most facilities also allow any staff member to activate a rapid response team.",
            optionRationales: [
              "The nurse prioritized without seeing what you saw. Your persistent concern is new information.",
              "Correct. Escalate clearly, and go up the chain if the concern is not addressed.",
              "Documenting without escalating records the concern but does not get the patient seen.",
              "Handoff may be hours away, and new confusion can deteriorate quickly.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Emergency response requires certification and practice; recognition can be studied now.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Research sepsis. List the early signs a PCT could observe and explain why recognition speed matters so much.",
          "Research your local facility type's rapid response criteria. Note whether any staff member can activate it.",
          "Write an SBAR escalation for the patient in the opening scenario, in under fifty words.",
          "Find BLS certification requirements in your area — provider, cost, and renewal interval.",
        ],
      },
    ],
  },
  {
    slug: "end-of-life-and-professional-resilience",
    title: "End-of-Life Care and Professional Resilience",
    description:
      "Provide comfort-focused care with sensitivity, and sustain yourself in work that is emotionally demanding.",
    duration: "22 min",
    objectives: [
      "Provide comfort care at end of life",
      "Communicate sensitively with dying patients and families",
      "Describe cultural and religious considerations around death",
      "Recognize burnout and compassion fatigue in yourself",
    ],
    sections: [
      {
        heading: "Comfort becomes the goal",
        blocks: [
          {
            type: "scenario",
            role: "You care for a dying patient at Lakeside Regional.",
            text: "The care plan has shifted from cure to comfort. There are no more tests to run. What remains is mouth care, positioning, clean linens, a quiet room, and someone present — and every one of those is your work.",
            task: "Understand what comfort care requires, and why this work is among the most important a PCT does.",
          },
          {
            type: "paragraph",
            text: "When treatment goals shift to comfort, PCT work becomes central rather than supporting. Nothing else is being done, and the quality of a person's final days rests substantially on the care they receive at the bedside.",
          },
          {
            type: "table",
            caption: "Comfort care priorities",
            columns: ["Need", "Care"],
            rows: [
              ["Mouth care", "Frequent moistening; mouths dry quickly and it is a major source of discomfort"],
              ["Positioning", "Reposition gently for comfort rather than on a rigid schedule"],
              ["Skin and linens", "Clean and dry; change promptly"],
              ["Environment", "Quiet, dim, uncluttered; support family presence"],
              ["Pain", "Report signs promptly — grimacing, restlessness, guarding"],
              ["Presence", "Sit with them; hearing is thought to persist late"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Speak to a dying patient as though they can hear you, because they may. Introduce yourself, explain what you are doing, and avoid conversation across them that you would not want them to hear. Families notice this, and it matters to them long afterwards.",
          },
          {
            type: "paragraph",
            text: "Practices around death vary considerably between cultures and religions — who may be present, who may touch the body, whether it should be washed and by whom, which direction it should face, how quickly burial must occur. Do not assume based on someone's background. Ask the family what they need and what they would like you to do differently, and pass it to the nurse.",
          },
          {
            type: "table",
            caption: "Communicating with families",
            columns: ["Do", "Avoid"],
            rows: [
              ["Say 'I'm sorry' and mean it", "'They're in a better place' — assumes beliefs they may not hold"],
              ["Offer specific practical help", "'Let me know if you need anything' — nobody follows up on this"],
              ["Allow silence", "Filling it out of your own discomfort"],
              ["Say 'I don't know, but I'll ask the nurse'", "Guessing at prognosis or clinical questions"],
              ["Let them talk about the person", "Changing the subject to spare yourself"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Compassion fatigue and burnout are occupational hazards of this work, not personal weaknesses. The signs are emotional numbness, dreading shifts, irritability, sleep disturbance, and losing the empathy that brought you here. It is cumulative and it responds to being addressed early. Use whatever your employer offers — debriefs, employee assistance, peer support — and take the time you are owed. Staff who never acknowledge this are the ones who leave the profession.",
          },
          {
            type: "knowledge-check",
            question:
              "A family member of a dying patient says 'I don't know how to do this.' What is the most appropriate response?",
            options: [
              "'They're in a better place now.'",
              "Acknowledge how hard it is, allow silence, and offer something specific — a chair, a blanket, time alone with them",
              "'Everything happens for a reason.'",
              "Change the subject to something lighter to distract them",
            ],
            correctIndex: 1,
            explanation:
              "They are expressing distress rather than asking a question. Acknowledgment, silence, and a concrete offer of help are more useful than reassurance — and phrases that impose a belief or a meaning often land badly with someone who does not share them.",
            optionRationales: [
              "This assumes religious beliefs the family may not hold, and can feel dismissive.",
              "Correct. Acknowledge, allow silence, and offer something specific and practical.",
              "This imposes a framework on their grief and frequently causes offence.",
              "Distraction communicates that their distress is unwelcome.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "This is worth thinking through before you are in the room.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Research the physical signs that death is approaching, and what families are commonly told to expect.",
          "Research end-of-life practices in three religious or cultural traditions. Note what would need to be accommodated.",
          "Write three things you could say to a grieving family member, and three to avoid, with your reasoning.",
          "Identify what support your employer or program offers for staff after a patient death, and note how to access it before you need to.",
        ],
      },
    ],
  },
];
