/**
 * Homer against the 2026 film: the structured comparison.
 *
 * One row per element the two can be compared on. The governing rule is
 * that a row may not assert a claim unless it can be checked on both
 * sides — the poem by book and line, the film from published accounts
 * of the completed release.
 *
 * Where the film side is not adequately established, the row says so and
 * carries evidence level "unknown" rather than being quietly dropped or
 * quietly guessed. An honest gap is more useful to a reader than a
 * confident sentence, and dropping the row would hide that we looked.
 */

import type { EvidenceLevel } from "./evidence";

export type ChangeType =
  | "necessary-compression"
  | "reasonable-interpretation"
  | "defensible-modernization"
  | "unsupported-invention"
  | "thematic-distortion"
  | "source-contradiction"
  | "preserved"
  | "not-established";

export const CHANGE_TYPE_LABEL: Record<ChangeType, string> = {
  "necessary-compression": "Necessary compression",
  "reasonable-interpretation": "Reasonable interpretation",
  "defensible-modernization": "Defensible modernisation",
  "unsupported-invention": "Unsupported invention",
  "thematic-distortion": "Thematic distortion",
  "source-contradiction": "Source contradiction",
  preserved: "Preserved",
  "not-established": "Not established",
};

export interface ComparisonRow {
  id: string;
  element: string;
  /** What the poem does, with citation where it is a specific passage. */
  homericSource: string;
  /** What the film does. */
  adaptation: string;
  changeType: ChangeType;
  probableReason: string;
  editorialAssessment: string;
  evidenceLevel: EvidenceLevel;
}

export const COMPARISON_ROWS: ReadonlyArray<ComparisonRow> = [
  {
    id: "opening-structure",
    element: "Opening structure",
    homericSource:
      "Opens with the proem and a divine council on Olympus, then four books in Ithaca and abroad with Telemachus. Odysseus does not appear until Book 5 (Od. 1.1-4.847).",
    adaptation:
      "Opens with an intertitle and the crisis in Ithaca twenty years after the departure, with the suitors pressing Penelope and Telemachus. The divine council is not staged.",
    changeType: "reasonable-interpretation",
    probableReason:
      "Establishing stakes in the human world rather than in a council of gods the film has chosen not to depict.",
    editorialAssessment:
      "Close to the poem's own instinct. Homer also withholds his hero and opens on the household in crisis; the film keeps the withholding and drops the frame that motivates it.",
    evidenceLevel: "documented",
  },
  {
    id: "chronology",
    element: "Chronology",
    homericSource:
      "Begins in medias res in the twentieth year. The wanderings are told retrospectively in the first person by Odysseus at the Phaeacian court (Od. 9-12).",
    adaptation:
      "Partially non-linear. The retrospective narration is retained but relocated: Odysseus recounts the wanderings to Calypso rather than to the Phaeacians.",
    changeType: "reasonable-interpretation",
    probableReason:
      "Preserves the framed structure while removing a whole location and set of characters.",
    editorialAssessment:
      "The single best structural decision in the adaptation. The retrospective frame is the poem's most distinctive formal feature and the one adaptations usually discard; keeping it, and keeping the narrator inside a situation where he has reason to shape his account, retains what matters most.",
    evidenceLevel: "documented",
  },
  {
    id: "odysseus",
    element: "Odysseus",
    homericSource:
      "Polytropos and polymetis: a liar of extraordinary fluency who tells four elaborate false life stories in the second half, is praised by Athena for lying to her face (13.287-299), and weeps repeatedly.",
    adaptation:
      "A more honourable and more merciful figure, carrying guilt for the war. Reported to be given an invented gesture of plucking the bowstring before loading, to give an opponent warning.",
    changeType: "thematic-distortion",
    probableReason:
      "A protagonist an audience can sympathise with across three hours, and a moral arc built on guilt rather than on cunning.",
    editorialAssessment:
      "The most significant character change, and the one Emily Wilson objected to publicly. The poem's interest in Odysseus is precisely that his defining faculty has no fixed moral sign. Making him honourable resolves the ambiguity the poem is built on. The guilt is a coherent substitute; it is not the same subject.",
    evidenceLevel: "documented",
  },
  {
    id: "penelope",
    element: "Penelope",
    homericSource:
      "Holds the position twenty years by the trick of the shroud; interviews the disguised beggar; sets the contest of the bow; and refuses to accept her husband until the test of the bed, the one occasion anyone outmanoeuvres him (23.173-206).",
    adaptation:
      "Strengthened as a ruler — reported as having grown accustomed to governing Ithaca and reluctant to surrender that. The bed test is not used; she embraces the wounded Odysseus after the killing.",
    changeType: "source-contradiction",
    probableReason:
      "The killing is made the emotional climax, and a further test after it would deflate the sequence.",
    editorialAssessment:
      "The film gives her more political weight and takes away her best scene. Those do not cancel out. Ruling competently is a state; outwitting the cleverest man alive is an action, and it is the action the poem uses to establish that her intelligence matches his.",
    evidenceLevel: "documented",
  },
  {
    id: "telemachus",
    element: "Telemachus",
    homericSource:
      "Travels to Pylos and Sparta (Books 3-4). Is told his father's identity outright in the hut and initially refuses to believe it (16.186-218). Hangs the twelve maids in Book 22.",
    adaptation:
      "The journey is compressed to Sparta; Nestor and Pylos are cut. The father-son relationship is expanded. He is crowned at the end.",
    changeType: "necessary-compression",
    probableReason:
      "Two hospitality visits with the same structure are one more than a film can carry.",
    editorialAssessment:
      "The compression is reasonable. The expansion of the relationship is the film's own: Homer gives them remarkably little time together, and what he gives is strange rather than warm. Crowning him is a substantial addition tied to the film's ending.",
    evidenceLevel: "documented",
  },
  {
    id: "helen",
    element: "Helen",
    homericSource:
      "At Sparta with Menelaus; drugs the wine with a remedy from Egypt and tells a version of Troy that her husband's next story contradicts (4.219-289). The poem does not adjudicate.",
    adaptation:
      "Present at Sparta; the reunion with Menelaus is complicated. Played by the same performer as Clytemnestra, presented as twin sisters.",
    changeType: "reasonable-interpretation",
    probableReason:
      "Dramatising the tension Book 4 leaves unresolved, and making the pairing of the two homecomings legible in one face.",
    editorialAssessment:
      "Complicating the marriage is a fair extrapolation from a scene that is already uncomfortable. The doubling is good theatre. The twinship is a tidying of genealogies that the ancient sources do not consistently support.",
    evidenceLevel: "documented",
  },
  {
    id: "circe",
    element: "Circe",
    homericSource:
      "Turns the crew to swine with a drug and a wand; the men keep their human minds. Odysseus, protected by moly, threatens her and exacts an oath. They remain a year (10.210-574).",
    adaptation:
      "An isolated woman transforming men from fear for her own safety, her magic framed as revealing what men already are. The sequence is reported as the film's most frightening.",
    changeType: "defensible-modernization",
    probableReason:
      "The poem gives no motive for the transformations, and the reinterpretation has a substantial modern literary lineage.",
    editorialAssessment:
      "Filling a silence rather than contradicting a statement, and well made. Worth stating plainly that it is a change: Homer's magic imposes a shape, it does not expose one — the swine keep human minds and are restored by an ointment.",
    evidenceLevel: "documented",
  },
  {
    id: "calypso",
    element: "Calypso",
    homericSource:
      "Detains him seven years on Ogygia; he weeps on the shore daily. She offers immortality and he refuses it for his homecoming (5.135-224). There is no drug.",
    adaptation:
      "Gives him the lotus flower, inducing forgetfulness; the detention is framed as easing the trauma of war.",
    changeType: "thematic-distortion",
    probableReason:
      "Folding in the Lotus-Eaters removes a redundant episode and gives Calypso a psychological rather than a merely magical hold.",
    editorialAssessment:
      "Economical and expensive. The refusal of deathlessness is how the poem prices a homecoming; a drugged man is not refusing anything. The film gains a reason he stays seven years and loses the poem's central assertion about the worth of being mortal.",
    evidenceLevel: "documented",
  },
  {
    id: "athena",
    element: "Athena",
    homericSource:
      "The poem's engine. Advocates for him among the gods, appears disguised as Mentes, Mentor, a shepherd and a girl, disguises and restores him, and imposes the final peace (24.529-548).",
    adaptation:
      "Present but not shown acting as a god in the Homeric manner, and connected with a young Trojan priestess killed during the sack.",
    changeType: "defensible-modernization",
    probableReason:
      "A stated commitment to a realistic treatment of the mythological material, avoiding direct depiction of gods.",
    editorialAssessment:
      "The intelligent compromise available. It is also a reduction: the poem's goddess of practical intelligence is an independent power with her own interests, and tying her to the hero's guilt makes her an emanation of him. Homeric double motivation — the god acting through a human faculty — is arguably closer to this than to gods on clouds, which is the strongest defence of the choice.",
    evidenceLevel: "documented",
  },
  {
    id: "poseidon",
    element: "Poseidon",
    homericSource:
      "The antagonist, mostly offstage. Wrecks the raft (5.282-296) and turns the Phaeacian ship to stone (13.159-164). His anger is unresolved when the poem ends.",
    adaptation:
      "Not depicted directly; divine hostility is conveyed through weather and through characters' fear rather than through a god acting.",
    changeType: "defensible-modernization",
    probableReason: "Consistent with the treatment of the gods generally.",
    editorialAssessment:
      "Consistent, and it leaves the film's delay without a stated cause in the way the poem has one. The Phaeacian sequence, which is where Poseidon's grievance costs someone else, is also gone.",
    evidenceLevel: "documented",
  },
  {
    id: "cyclops",
    element: "The Cyclops",
    homericSource:
      "Inverted hospitality, the Outis trick, the olive stake, the escape under the rams, and the taunt that gives Polyphemus the name for his curse (9.105-566).",
    adaptation:
      "The episode is present. Reported as not turning on the Nobody trick, with an additional arrow shot intensifying the giant's rage.",
    changeType: "source-contradiction",
    probableReason:
      "The pun is untranslatable, and physical problem-solving reads more directly in an action sequence.",
    editorialAssessment:
      "The untranslatability argument covers the pun and not the trick, which works in English perfectly well. Without it the escape becomes nerve and luck, and the poem's clearest demonstration of what metis is has no equivalent on screen.",
    evidenceLevel: "documented",
  },
  {
    id: "underworld",
    element: "The Underworld",
    homericSource:
      "Odysseus does not enter Hades. He sails to the stream of Ocean, digs a trench, pours offerings, and the dead come up to the blood (11.13-50).",
    adaptation:
      "Reported as close to the original, with the dead rising to him rather than the hero descending.",
    changeType: "preserved",
    probableReason:
      "The poem's staging is both more accurate and more striking than the descent most adaptations substitute.",
    editorialAssessment:
      "A genuine point in the film's favour, and a detail almost every previous adaptation gets wrong. Homer's nekyia is a summoning, not a descent.",
    evidenceLevel: "documented",
  },
  {
    id: "sirens",
    element: "The Sirens",
    homericSource:
      "Two in number, never described physically. What they offer is knowledge — they claim to know everything that happened at Troy and everything on earth (12.184-191). Odysseus is bound to the mast.",
    adaptation:
      "The song is given content: they tell Odysseus that he does not truly want to go home.",
    changeType: "reasonable-interpretation",
    probableReason:
      "Film requires the temptation to be audible, and an unheard song is not a scene.",
    editorialAssessment:
      "A real addition, and a thoughtful one. Homer withholds what the Sirens sing to Odysseus specifically, and any adaptation must supply something. Making it a truth about his own reluctance is closer to the Homeric conception — the Sirens offer knowledge, not sex — than the seduction most versions stage.",
    evidenceLevel: "documented",
  },
  {
    id: "suitors",
    element: "The suitors",
    homericSource:
      "One hundred and eight men from four islands (16.245-253). Graded: Antinous worst, Eurymachus most plausible, Amphinomus decent, warned, and killed anyway. Antinous dies first (22.8-21).",
    adaptation:
      "Antinous is the principal antagonist and is given an invented back-story in which he avoided military service by sending a servant's son in his place. The confrontation is the film's climax.",
    changeType: "unsupported-invention",
    probableReason:
      "A single named antagonist gives the final act a face, and the substituted-service story ties the Ithacan crisis to the war's guilt.",
    editorialAssessment:
      "Coherent film-making and an addition. Homer's suitors have no back-stories, and the poem's own method of complicating them — Amphinomus, warned and doomed — is subtler than a villain with a motive.",
    evidenceLevel: "documented",
  },
  {
    id: "return",
    element: "The return to Ithaca",
    homericSource:
      "Conveyed home asleep by the Phaeacians and left on the beach with his treasure; he wakes and does not recognise the island (13.70-125, 187-221).",
    adaptation:
      "Reaches Ithaca by raft from Ogygia, the Phaeacian conveyance having been cut.",
    changeType: "necessary-compression",
    probableReason: "Removal of the Phaeacian sequence.",
    editorialAssessment:
      "Follows from the larger cut. It loses the poem's strange and excellent detail that the hero arrives home unconscious and cannot recognise the place he has spent twenty years trying to reach.",
    evidenceLevel: "documented",
  },
  {
    id: "recognition",
    element: "Recognition scenes",
    homericSource:
      "Six or seven, each on a different mechanism: declaration to Telemachus, the dog Argos, the scar found by Eurycleia, the scar shown to the herdsmen, the bed, and the trees to Laertes.",
    adaptation:
      "Telemachus is told directly by his father. Argos is reported to be given more prominence than in the poem. The bed test is not used. Laertes is absent.",
    changeType: "source-contradiction",
    probableReason:
      "Compression, and the concentration of the emotional climax on the killing.",
    editorialAssessment:
      "The sequence of graded recognitions is one of the poem's finest pieces of construction — proof by body, proof by shared history, proof ranked by quality. Reducing it to declaration and reunion removes the argument the sequence was making about what identity consists of.",
    evidenceLevel: "documented",
  },
  {
    id: "gods-religion",
    element: "Gods and religion",
    homericSource:
      "Gods are characters with interests, bound by themis and by each other, acting through human faculties. Zeus opens the poem by saying mortals blame gods for troubles they bring on themselves (1.32-43).",
    adaptation:
      "Divine action is not depicted; the gods' effects are rendered as natural phenomena and as human fear. Xenia is reported to be presented as the law of Zeus.",
    changeType: "defensible-modernization",
    probableReason: "The production's stated realistic approach.",
    editorialAssessment:
      "Keeping xenia as Zeus's law is the right call and preserves the poem's actual moral architecture. Removing the gods as agents costs the plot its motor and the poem its account of causation, in which the human and the divine explanation are the same event described twice.",
    evidenceLevel: "documented",
  },
  {
    id: "household-hierarchy",
    element: "Household hierarchy",
    homericSource:
      "The oikos runs on slave labour and says so. Eumaeus and Eurycleia were bought; Eumaeus states that Zeus takes away half a man's worth on the day he is enslaved (17.322-323).",
    adaptation:
      "Eumaeus is presented as blind and as Odysseus's former tutor rather than as a working swineherd and slave.",
    changeType: "unsupported-invention",
    probableReason:
      "Consolidating the loyal retainer and the traditional bard-figure into one role.",
    editorialAssessment:
      "Changing a slave into a tutor is a change of social fact, not of characterisation. The poem uses Eumaeus's position to say something specific about what the household it depicts is made of, and a tutor cannot carry it.",
    evidenceLevel: "documented",
  },
  {
    id: "sexuality",
    element: "Sexuality",
    homericSource:
      "Odysseus sleeps with Calypso for seven years and with Circe for one, in formulae that record no reluctance, while weeping for home. The poem does not reconcile the two.",
    adaptation:
      "Reported to remove the sexual relationships with both Circe and Calypso, leaving Odysseus faithful throughout.",
    changeType: "thematic-distortion",
    probableReason:
      "A hero whose fidelity matches his wife's is easier for a modern audience to hold as sympathetic across three hours.",
    editorialAssessment:
      "Emily Wilson's public criticism was directed here, and we think it lands. The poem's willingness to hold captivity and intimacy together without resolving them is one of its harder features, and the double standard between Odysseus and the executed maids is part of what makes Book 22 disturbing. Removing it makes the poem kinder than it is.",
    evidenceLevel: "documented",
  },
  {
    id: "violence",
    element: "Violence",
    homericSource:
      "A hundred and eight men killed in a barred hall; terms and full restitution refused; a suppliant killed; Melanthius mutilated; twelve enslaved women hanged (22.1-477).",
    adaptation:
      "The killing of the suitors is the climax. The mass hanging of the women is not staged; reported accounts indicate a single enslaved woman dies, off screen. The Laestrygonian cannibalism is reported as omitted.",
    changeType: "source-contradiction",
    probableReason:
      "Tonal control at the close, and reluctance to end the hero's restoration with the execution of enslaved women.",
    editorialAssessment:
      "We record this as a departure and decline to call it a fault. Retaining it risks a sequence no framing could contain; removing it makes the victory cleaner than Homer's. What would deserve criticism is removing it and then presenting the result as Homer's, which this film does not do.",
    evidenceLevel: "documented",
  },
  {
    id: "ending",
    element: "Ending",
    homericSource:
      "Reunion, the bed, Laertes in the orchard, the suitors' families arming, and Athena imposing an oath of peace. Odysseus remains king (24.412-548).",
    adaptation:
      "Odysseus cedes the throne to Telemachus and leaves Ithaca with Penelope, sailing west into exile.",
    changeType: "unsupported-invention",
    probableReason:
      "The film treats the killing as a violation of the same law of hospitality the suitors broke, and makes exile its price.",
    editorialAssessment:
      "The largest departure and the most interesting. It answers a real problem in the poem — that the massacre creates a feud Homer can only end by divine fiat — and answers it by removing the killer instead of by sending a goddess. Serious interpretation, and a different subject: Homer's hero endures twenty years to get his household back and gets it; this one earns his return and gives it away.",
    evidenceLevel: "documented",
  },
  {
    id: "moral-complexity",
    element: "Moral complexity",
    homericSource:
      "A hero the poem never resolves: liar and sufferer, praised by his goddess for deceit, weeping at his own fame, killing a suppliant, testing his grieving father for no reason.",
    adaptation:
      "A guilt-driven protagonist with a clearer moral arc. Emily Wilson, whose 2018 translation is the most widely read current English version, described the film in the Guardian as a simple action-hero film about an action hero who feels bad about being one.",
    changeType: "thematic-distortion",
    probableReason:
      "Sustained audience sympathy, and a legible arc across a long running time.",
    editorialAssessment:
      "This is the central critical question about the film and it is genuinely arguable. Wilson's charge is that the ambiguity is flattened. The defence is that guilt is a real form of moral complexity and that the exile ending is not a comfortable resolution. Our position: the film substitutes one kind of difficulty for another, and the kind it substitutes is more familiar.",
    evidenceLevel: "documented",
  },
];

export function comparisonRow(id: string) {
  return COMPARISON_ROWS.find((r) => r.id === id);
}
