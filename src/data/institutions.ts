/**
 * Institutions and government registry.
 *
 * The organs of ancient government — assemblies, councils, magistracies,
 * courts and the administrative systems of empire — rendered by one
 * template at /institutions/[slug].
 *
 * ─── The relationship to the other layers ───────────────────────────
 *
 * The civilizations layer describes a political *order* as a whole: what
 * the Athenian democracy was, how the Republic held together, what the
 * Principate concealed. This layer describes single *organs*: what a
 * tribune could actually do, how many people voted in an ecclesia, what
 * a censor's mark meant.
 *
 * The distinction is one of granularity and it is enforced. The city and
 * civilization pages use headings like "Political structure" and
 * "Constitutional structure"; this template deliberately uses none of
 * them, and the validator fails the build on a collision.
 *
 * Military command is not here. The warfare encyclopedia already covers
 * command structure, recruitment and the officer corps, and
 * `INSTITUTIONS_DEFER_TO_WARFARE` records the boundary.
 *
 * ─── The recurring editorial problem ────────────────────────────────
 *
 * Ancient constitutions are described by ancient authors who were
 * arguing about them. Aristotle's account of the Athenian constitution
 * is a work of political theory; Polybius's account of the Roman one is
 * built to demonstrate a thesis about mixed government; Cicero writes as
 * a participant defending a settlement. Almost nothing survives that is
 * merely descriptive.
 *
 * So the `keyPoints` on every page separate what a source states, what
 * inscriptions and material evidence confirm, and what is a modern
 * reconstruction of how a body actually behaved — which is usually the
 * most interesting and least secure part.
 */

import type { EvidenceLevel, SourceReference } from "./evidence";

export type InstitutionTier =
  | "greek-assembly"
  | "greek-office"
  | "spartan"
  | "roman-magistracy"
  | "roman-body"
  | "roman-state"
  | "near-eastern"
  | "principle";

export const INST_TIER_LABEL: Record<InstitutionTier, string> = {
  "greek-assembly": "Greek assemblies and courts",
  "greek-office": "Greek offices",
  spartan: "Spartan institutions",
  "roman-magistracy": "Roman magistracies",
  "roman-body": "Roman deliberative bodies",
  "roman-state": "The Roman state",
  "near-eastern": "Near Eastern and Egyptian administration",
  principle: "Constitutional principles",
};

export const INST_TIER_ORDER: ReadonlyArray<InstitutionTier> = [
  "principle",
  "greek-assembly",
  "greek-office",
  "spartan",
  "roman-magistracy",
  "roman-body",
  "roman-state",
  "near-eastern",
];

/**
 * Subjects the warfare encyclopedia owns. Institutions links rather than
 * duplicating, on the precedent set by the architecture layer.
 */
export const INSTITUTIONS_DEFER_TO_WARFARE: ReadonlyArray<{
  subject: string;
  warfareSlug: string;
  reason: string;
}> = [
  {
    subject: "Military command and the officer corps",
    warfareSlug: "command-structure",
    reason:
      "Who commanded on campaign, on what authority, and what happened when a constitution put two men in charge of one army — covered there, including the alternating consular command at Cannae.",
  },
  {
    subject: "Recruitment and terms of military service",
    warfareSlug: "recruitment",
    reason:
      "The property qualification, professionalisation, and the citizenship granted on auxiliary discharge are covered as military institutions.",
  },
  {
    subject: "Military discipline and its penalties",
    warfareSlug: "military-discipline",
    reason: "Punishments, decorations and the military oath are covered there.",
  },
  {
    subject: "Phalanx and legionary command",
    warfareSlug: "battle-tactics",
    reason:
      "Tactical command is a military rather than a constitutional subject.",
  },
];

export interface InstitutionKeyPoint {
  claim: string;
  detail: string;
  level: EvidenceLevel;
}

export interface Institution {
  slug: string;
  title: string;
  standfirst: string;
  description: string;
  tier: InstitutionTier;
  civilizations: string[];
  period: string;
  /** What the body or office was. */
  whatItWas: string[];
  /** How it operated in practice. */
  howItWorked: string[];
  /** What it could and could not do. */
  powersAndLimits: string[];
  /** How it changed across its life. */
  change: string[];
  keyPoints: InstitutionKeyPoint[];
  terms?: Array<{ term: string; gloss: string }>;
  primarySources: SourceReference[];
  disputes?: Array<{ question: string; positions: string; level: EvidenceLevel }>;
  relatedInstitutions: string[];
  /** Slugs into src/data/cities.ts. */
  citySlugs: string[];
  /** Slugs into src/data/architecture.ts — where the body met. */
  architectureRefs: string[];
  /** Slugs into src/data/warfare.ts. */
  warfareRefs: string[];
  /** Slugs into content/philosophers. */
  figureRefs: string[];
  /** Slugs into content/themes. */
  themeRefs: string[];
  imageSlug?: string;
}

/**
 * Section headings the template renders. Held here so the validator can
 * check them against the civilization pages' headings and fail on a
 * collision — the same mechanism the cities layer uses.
 */
export const INSTITUTION_SECTION_HEADINGS: ReadonlyArray<string> = [
  "What it was",
  "How it worked",
  "Powers and limits",
  "How it changed",
  "What the evidence supports",
  "Terms",
  "Open questions",
  "Primary sources",
];

const S = (
  work: string,
  locus: string,
  summary: string,
  author?: string,
): SourceReference => ({ work, locus, summary, author });

export const INSTITUTIONS: ReadonlyArray<Institution> = [
  // ─── Constitutional principles ───────────────────────────────────────
  {
    slug: "collegiality-and-annuality",
    title: "Collegiality and annuality",
    standfirst:
      "Two men in every office, for one year only — the Roman Republic's answer to the problem of trusting anyone with power.",
    description:
      "The structural principles of Republican office-holding: collegiality, annual tenure, the veto between colleagues, and the ways both were eventually circumvented.",
    tier: "principle",
    civilizations: ["roman-republic", "rome"],
    period: "509 – 27 BCE, in principle",
    whatItWas: [
      "Roman magistracies were held by more than one person at a time and for a fixed short term, normally a year. The consulship had two holders; there were multiple praetors, quaestors and aediles; and each colleague could block the other.",
      "The arrangement is a deliberate answer to a specific fear. The Republic's founding story is the expulsion of a king, and the institutions are built so that no individual holds sole authority for long enough to become one.",
    ],
    howItWorked: [
      "Colleagues held equal power and each could veto the other's act — intercessio. In the consulship, the two alternated the fasces monthly in the city, and on campaign, by one tradition, alternated command by the day.",
      "Annual tenure meant that a magistrate returned to private life and could be prosecuted for what he had done in office. That prospect was a real constraint, and the immunity of a serving magistrate is why extending a command mattered so much politically.",
    ],
    powersAndLimits: [
      "The system prevented individual dominance well for roughly three centuries and cost efficiency continuously. A divided command is slower, and Roman military disasters were repeatedly blamed on it.",
      "Its weaknesses were structural. Prorogation — extending a command beyond the year — was the standard workaround for long wars, and it produced commanders with armies loyal to them rather than to the state. Sulla and Caesar both used offices the constitution provided.",
    ],
    change: [
      "The dictatorship was the constitutional exception: one man, extraordinary powers, six months. It was used sparingly and lawfully for centuries, and then, under Sulla and Caesar, used to do the opposite of what it was for.",
      "Augustus dismantled the principle without abolishing the offices. He accumulated the powers of several magistracies simultaneously and permanently while leaving the magistracies themselves in place and filled — which is why the Principate is so hard to date.",
    ],
    keyPoints: [
      {
        claim: "Collegiality and annual tenure are attested throughout the Republican sources.",
        detail:
          "Consular lists, the fasti, record pairs of consuls year by year, and the sequence is one of the firmest chronological structures in Roman history.",
        level: "documented",
      },
      {
        claim: "The Republic's early constitutional history is not securely recoverable.",
        detail:
          "Livy's account of the fifth century BCE was written four centuries later from annalistic material of uncertain reliability, and much of the early constitutional development is retrojection.",
        level: "disputed",
      },
      {
        claim: "Daily alternation of consular command on campaign may not have been general.",
        detail:
          "Polybius reports it for Cannae. Whether it was standard practice or an arrangement for that campaign is less clear than textbooks imply.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "intercessio", gloss: "The veto one magistrate could exercise against an equal or lesser colleague." },
      { term: "prorogatio", gloss: "Extension of a command beyond the year of office — the standard workaround, and the constitutional weak point." },
      { term: "fasti", gloss: "The lists of annual magistrates, which give the Republic its year-by-year chronology." },
    ],
    primarySources: [
      S("Histories", "6.11-18", "The Roman constitution analysed as a mixture of monarchy, aristocracy and democracy, with the checks between them.", "Polybius"),
      S("History of Rome", "2.1-8", "The founding of the Republic and the establishment of annual paired magistrates, written four centuries later.", "Livy"),
    ],
    disputes: [
      {
        question: "How much of the early Republican constitution is retrojection?",
        positions:
          "Livy and Dionysius describe fifth-century institutions in detail, but they wrote in the first century BCE from sources of uncertain quality. One position takes the broad outline as sound; another holds that the early Republic has been reconstructed backwards from later practice, and that specific early dates and offices are unreliable.",
        level: "disputed",
      },
    ],
    relatedInstitutions: ["consul", "dictator", "roman-senate", "cursus-honorum", "imperium"],
    citySlugs: ["rome"],
    architectureRefs: ["forum"],
    warfareRefs: ["command-structure"],
    figureRefs: ["polybius", "livy", "cicero"],
    themeRefs: ["mixed-constitution", "republic", "constitution"],
  },
  {
    slug: "imperium",
    title: "Imperium",
    standfirst:
      "The power to command — a formal grant of authority with religious sanction, and the concept from which the word empire descends.",
    description:
      "Imperium in the Roman constitution: what it authorised, the lictors and fasces that displayed it, the distinction between civil and military spheres, and how it was extended.",
    tier: "principle",
    civilizations: ["roman-republic", "rome", "principate"],
    period: "Republican and imperial",
    whatItWas: [
      "Imperium is the formal power of command: the authority to lead an army, to compel obedience, and to impose punishment. It was held by consuls, praetors and dictators, not by every magistrate, and it was conferred rather than inherent in the person.",
      "It was displayed. A magistrate with imperium was preceded by lictors carrying the fasces — bundled rods, with an axe outside the city where capital punishment was possible and without one inside, where citizens had a right of appeal.",
    ],
    howItWorked: [
      "The number of lictors indicated rank: twelve for a consul, six for a praetor, twenty-four for a dictator. This was not ceremony for its own sake but a legible signal of what a man in the street was facing.",
      "The distinction between the sphere inside the sacred boundary of the city and the sphere outside it was fundamental. Military imperium lapsed on crossing into Rome, which is why a general awaiting a triumph waited outside the boundary, and why Caesar crossing the Rubicon under arms was a constitutional act before it was a military one.",
    ],
    powersAndLimits: [
      "Inside the city, imperium was checked by the citizen's right of appeal to the people and by tribunician intervention. Outside it, on campaign, it was close to absolute over citizens and non-citizens alike.",
      "Its limit was time and place: an annual magistracy, a defined province. Both limits were eroded by prorogation and by extraordinary commands granted for particular wars.",
    ],
    change: [
      "Extraordinary commands — Pompey against the pirates, then in the east — concentrated imperium over vast areas for years, with popular assemblies granting what the Senate resisted.",
      "Augustus held a form of imperium that outranked that of provincial governors and did not lapse, which is the constitutional core of the Principate. The offices remained; the imperium behind them had changed hands permanently.",
    ],
    keyPoints: [
      {
        claim: "Lictor numbers by rank are well attested.",
        detail:
          "Reported consistently across the sources and depicted in art; the fasces themselves appear on coins and reliefs.",
        level: "documented",
      },
      {
        claim: "The pomerium boundary governed where military imperium operated.",
        detail:
          "Attested in the rules for triumphs and in the treatment of returning commanders. Its exact line was extended over time and is partly reconstructed.",
        level: "probable",
      },
      {
        claim: "The Augustan settlement is a redistribution of imperium rather than an abolition of offices.",
        detail:
          "Augustus's own Res Gestae claims he exceeded others in auctoritas while holding no more potestas than his colleagues — a formulation that describes the arrangement and conceals it at the same time.",
        level: "probable",
      },
    ],
    terms: [
      { term: "imperium", gloss: "The power of command, conferred by law and displayed by lictors." },
      { term: "fasces", gloss: "Bundled rods carried by lictors, with an axe outside the city." },
      { term: "pomerium", gloss: "The sacred boundary of Rome, across which military imperium did not extend." },
      { term: "auctoritas", gloss: "Informal standing and influence, as distinct from formal power. Augustus's word for what he had." },
    ],
    primarySources: [
      S("Res Gestae Divi Augusti", "34", "Augustus's own account of his position: excelling all in influence, holding no more formal power than his colleagues.", "Augustus"),
      S("Histories", "6.11-18", "The distribution of authority between consuls, Senate and people.", "Polybius"),
    ],
    relatedInstitutions: ["consul", "praetor", "dictator", "collegiality-and-annuality", "imperial-administration"],
    citySlugs: ["rome"],
    architectureRefs: ["forum", "triumphal-arch"],
    warfareRefs: ["command-structure", "roman-army"],
    figureRefs: ["augustus", "julius-caesar", "polybius"],
    themeRefs: ["power", "constitution", "statecraft"],
  },

  // ─── Greek assemblies and courts ─────────────────────────────────────
  {
    slug: "ecclesia",
    title: "The Ecclesia",
    standfirst:
      "The Athenian assembly of all citizens — a body that met some forty times a year and decided war, peace, taxation and the fate of individuals by show of hands.",
    description:
      "The Athenian assembly: who could attend, how often it met, what it decided, the introduction of pay for attendance, and the limits on what a direct democracy could do.",
    tier: "greek-assembly",
    civilizations: ["athens", "greece"],
    period: "6th – 4th century BCE",
    whatItWas: [
      "The Ecclesia was the sovereign body of the Athenian democracy: an open-air meeting of adult male citizens, held on the Pnyx hill, which decided policy directly rather than through representatives.",
      "It was not a parliament. There were no parties, no standing government answerable to it, and no representatives. Any citizen could speak, and the men who habitually did — the rhetores — held no office by virtue of doing so.",
    ],
    howItWorked: [
      "It met roughly forty times a year in the classical period, with the agenda prepared in advance by the Boule, the council of five hundred. That agenda-setting power is the structural point most often missed: the assembly voted on what the council put before it.",
      "Decisions were by show of hands, counted by estimate rather than exactly except in specific cases. A quorum of six thousand was required for some business, notably grants of citizenship and ostracism.",
      "From the early fourth century BCE attendance was paid, which is an admission that without payment the poor could not afford to attend — and the fee had to be raised more than once.",
    ],
    powersAndLimits: [
      "It declared war, made peace, ratified treaties, voted taxes and public works, and could try certain offences itself. It elected the generals and could depose and prosecute them.",
      "Its limits were structural rather than legal. Attendance capacity on the Pnyx has been estimated at six to thirteen thousand against a citizen body of perhaps thirty thousand, so the assembly was never the whole citizenry. Women, resident foreigners and the enslaved — the majority of the population of Attica — were excluded entirely.",
    ],
    change: [
      "The powers of the Areopagus were transferred to the Ecclesia, Boule and courts in the reforms associated with Ephialtes in 462 BCE, which is the point at which the democracy becomes radical.",
      "After the restoration of 403 BCE the Athenians introduced a distinction between decrees of the assembly and laws, with laws revised by a separate panel — an attempt to constrain a sovereign assembly by a higher legal order, prompted by what the assembly had done in the war.",
    ],
    keyPoints: [
      {
        claim: "The Boule set the agenda the assembly voted on.",
        detail:
          "The probouleutic function is attested in the constitutional sources and in the decrees themselves, which record that the council brought the matter forward.",
        level: "documented",
      },
      {
        claim: "Assembly pay was introduced and repeatedly increased.",
        detail:
          "Attested in the constitutional sources and satirised in comedy. It is direct evidence that participation had an economic barrier.",
        level: "documented",
      },
      {
        claim: "The capacity of the Pnyx is estimated, not recorded.",
        detail:
          "Figures from six to thirteen thousand derive from the excavated area and assumed standing density. The quorum of six thousand is attested and is often used to argue capacity was at least that.",
        level: "probable",
      },
    ],
    terms: [
      { term: "ekklesia", gloss: "The assembly; the word later taken over for the Christian church." },
      { term: "probouleuma", gloss: "The council's prepared motion, without which the assembly could not normally act." },
      { term: "rhetor", gloss: "A habitual speaker in the assembly — influential without holding office." },
    ],
    primarySources: [
      S("Constitution of the Athenians", "41-45", "The assembly's business, its pay and its relationship to the council.", "Aristotle"),
      S("History of the Peloponnesian War", "3.36-49, 6.8-26", "Assembly debates reported at length, including the Mytilene debate and the decision to sail to Sicily.", "Thucydides"),
      S("Athenian decrees", "IG I³ and II²", "Hundreds of inscribed decrees recording the assembly's decisions in its own formulae.", "The Athenian people"),
    ],
    disputes: [
      {
        question: "How representative was the assembly of the citizen body?",
        positions:
          "Capacity estimates put attendance well below the total citizen population, and rural Attic citizens faced a day's walk. Some scholars read the assembly as effectively an urban body; others argue that turnout varied by the importance of the business and that the poor attended once pay was introduced. The evidence does not settle it.",
        level: "disputed",
      },
    ],
    relatedInstitutions: ["boule", "dikasteria", "areopagus", "archon", "strategos", "ostracism"],
    citySlugs: ["athens"],
    architectureRefs: ["agora"],
    warfareRefs: ["greek-warfare"],
    figureRefs: ["pericles", "demosthenes", "aristotle", "solon"],
    themeRefs: ["democracy", "citizenship", "democracy-at-war"],
  },
  {
    slug: "boule",
    title: "The Boule",
    standfirst:
      "A council of five hundred chosen by lot, which prepared everything the assembly voted on — the least glamorous and most consequential Athenian institution.",
    description:
      "The Athenian Council of Five Hundred: selection by lot, the tribal rotation of the prytany, its probouleutic function, and why a lottery-selected body ran the state.",
    tier: "greek-assembly",
    civilizations: ["athens", "greece"],
    period: "508 – 4th century BCE",
    whatItWas: [
      "The Boule was a council of five hundred citizens over thirty, fifty from each of the ten tribes, selected by lot for one year and not eligible more than twice in a lifetime.",
      "Its central function was probouleutic: it prepared the business the Ecclesia would consider. An assembly cannot debate from a blank sheet, and the body that decides what reaches the floor holds real power.",
    ],
    howItWorked: [
      "The year was divided into ten periods, and in each the fifty councillors of one tribe served as the prytany — a standing executive committee. They ate at public expense in the Tholos, and a third of them slept there, so that some part of the government was always awake and in one place.",
      "The chairman of the prytany was chosen by lot each day and could not hold the position twice. For that one day he held the keys to the treasuries and the state seal. It is the most radical application of the lot in any ancient constitution.",
      "The council also received foreign envoys, oversaw magistrates' accounts, supervised the fleet and the cavalry, and audited outgoing officials.",
    ],
    powersAndLimits: [
      "Its power lay in agenda-setting, in administration and in scrutiny. It did not legislate on its own and could not override the assembly.",
      "The safeguards against capture were the lot, the annual rotation, the twice-in-a-lifetime limit and the daily chairmanship. Together they made it very hard for any faction to control the machinery for long — at the cost of a body with no institutional memory.",
    ],
    change: [
      "Established with four hundred members by Solon on the traditional account and reorganised at five hundred by Cleisthenes on the ten new tribes in 508/7 BCE.",
      "It survived the oligarchic interruptions of 411 and 404 BCE and continued into the Hellenistic period with reduced powers.",
    ],
    keyPoints: [
      {
        claim: "Selection was by lot, and the machinery survives.",
        detail:
          "Bronze allotment machines, the kleroteria, and jurors' identity tokens have been excavated in the Athenian Agora — physical evidence for the procedure, not only descriptions of it.",
        level: "documented",
      },
      {
        claim: "The prytany system kept part of the government permanently in session.",
        detail:
          "Attested in the constitutional sources, and the Tholos where they dined and slept has been excavated in the agora.",
        level: "documented",
      },
      {
        claim: "Roughly a third of citizens are estimated to have served at some point.",
        detail:
          "The estimate follows from five hundred places a year, the age threshold and the two-term limit against the size of the citizen body. It is arithmetic on estimated populations, not a record.",
        level: "probable",
      },
    ],
    terms: [
      { term: "prytany", gloss: "The tribal contingent serving as standing committee for a tenth of the year." },
      { term: "kleroterion", gloss: "The bronze allotment machine used to select by lot." },
      { term: "probouleuma", gloss: "The council's prepared motion for the assembly." },
    ],
    primarySources: [
      S("Constitution of the Athenians", "43-49", "The council's composition, the prytany, and its administrative duties in detail.", "Aristotle"),
      S("Allotment machines and tokens from the Agora", "excavated material", "Bronze kleroteria and juror tokens recovered in the Athenian Agora excavations.", "Athenian state"),
    ],
    relatedInstitutions: ["ecclesia", "dikasteria", "archon", "ostracism"],
    citySlugs: ["athens"],
    architectureRefs: ["agora", "stoa"],
    warfareRefs: [],
    figureRefs: ["solon", "aristotle", "pericles"],
    themeRefs: ["democracy", "citizenship", "administrative-state"],
  },
  {
    slug: "dikasteria",
    title: "The popular courts",
    standfirst:
      "Juries of several hundred citizens, chosen by lot on the morning of the trial, deciding by secret ballot with no judge and no appeal.",
    description:
      "The Athenian dikasteria: jury size and selection, the water clock, pay for jurors, the absence of professional judges, and what the excavated equipment shows.",
    tier: "greek-assembly",
    civilizations: ["athens", "greece"],
    period: "5th – 4th century BCE",
    whatItWas: [
      "Athenian courts were juries without judges. A panel of citizens — commonly 201, 401 or 501, and far larger for major public cases — heard the parties, voted, and that was the end of the matter. There was no appeal and no professional bench directing them on law.",
      "Litigants spoke for themselves, which is why a profession of speechwriters existed: a man who could not compose an effective speech bought one and delivered it as his own.",
    ],
    howItWorked: [
      "Jurors were empanelled by lot on the day, using the allotment machines, to make bribery impractical. Each was issued a token identifying his court.",
      "Speeches were timed by a water clock, the klepsydra, and the allocation depended on the type of case. Voting was by bronze ballots with a hollow or solid axle, dropped so that the choice was concealed — an ancient secret ballot whose physical apparatus has been excavated.",
      "Jury pay, introduced in the fifth century and raised later, made service possible for the poor and became a standing target for comic and oligarchic complaint.",
    ],
    powersAndLimits: [
      "The courts tried private suits, public prosecutions, scrutiny of magistrates before and after office, and cases of political consequence. They condemned Socrates.",
      "The absence of a judge meant no direction on law, no rules of evidence in the modern sense, and wide scope for argument about character and public service rather than the facts at issue. Whether that is a defect depends on what one thinks a court is for, and the Athenians were arguing about it themselves.",
    ],
    change: [
      "The transfer of jurisdiction from the Areopagus in 462 BCE moved political trials into the popular courts, which is the institutional core of the radical democracy.",
      "After 403 BCE the distinction between decree and law placed some legislative revision with nomothetai — panels drawn from the same juror pool — an attempt to bind the sovereign assembly.",
    ],
    keyPoints: [
      {
        claim: "The physical apparatus of the courts has been excavated.",
        detail:
          "Allotment machines, juror tokens, bronze ballots and water-clock vessels are among the finds from the Athenian Agora. Few ancient institutions can be reconstructed so directly from their own equipment.",
        level: "documented",
      },
      {
        claim: "There was no professional judge and no appeal.",
        detail:
          "Attested across the constitutional sources and the surviving forensic speeches, which are addressed to jurors as decision-makers on law and fact together.",
        level: "documented",
      },
      {
        claim: "How far verdicts turned on law rather than on character is argued.",
        detail:
          "The surviving speeches spend heavily on the speaker's public services and the opponent's private life. Whether that reflects what juries decided on, or only what advocates thought worth trying, is not recoverable.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "dikastes", gloss: "A juror — the word covers functions a modern system splits between juror and judge." },
      { term: "klepsydra", gloss: "The water clock timing speeches." },
      { term: "graphe / dike", gloss: "Public prosecution, which any citizen could bring, and private suit." },
    ],
    primarySources: [
      S("Constitution of the Athenians", "63-69", "The empanelling procedure, the machines, the ballots and the pay, described step by step.", "Aristotle"),
      S("Apology", "throughout", "A trial before a popular jury, as reconstructed by a defendant's follower.", "Plato"),
      S("Wasps", "throughout", "A comedy about jury service and jury pay, hostile and informative.", "Aristophanes"),
    ],
    relatedInstitutions: ["ecclesia", "boule", "areopagus", "archon"],
    citySlugs: ["athens"],
    architectureRefs: ["agora", "stoa"],
    warfareRefs: [],
    figureRefs: ["socrates", "plato", "demosthenes", "aristotle"],
    themeRefs: ["law", "justice", "democracy", "rule-of-law"],
  },
  {
    slug: "areopagus",
    title: "The Areopagus",
    standfirst:
      "A council of former archons that once supervised the constitution, was stripped of its powers in 462 BCE, and kept homicide jurisdiction for centuries afterwards.",
    description:
      "The Athenian Areopagus: its composition of ex-archons, its guardianship of the laws, the reforms of Ephialtes, and its surviving jurisdiction over homicide.",
    tier: "greek-assembly",
    civilizations: ["athens", "greece"],
    period: "Archaic period – Roman era",
    whatItWas: [
      "The Areopagus was a council composed of men who had held the archonship, sitting for life. It met on a rocky hill west of the Acropolis from which it took its name, and it was the oldest political body in Athens.",
      "Before the reforms of the fifth century it exercised a general guardianship of the laws and of public conduct, with powers of scrutiny over magistrates that are described in the sources but not precisely defined.",
    ],
    howItWorked: [
      "Membership was automatic and permanent for ex-archons, which made it an aristocratic body by composition once the archonship was restricted by property class — and a body of experienced former officials once it was not.",
      "Its homicide jurisdiction was procedurally distinct: cases were heard in the open air, with oaths of a particularly solemn kind, and the accused could withdraw into exile before the final vote.",
    ],
    powersAndLimits: [
      "Its broad supervisory powers were transferred to the Ecclesia, the Boule and the popular courts in 462 BCE, in reforms associated with Ephialtes, who was assassinated shortly afterwards.",
      "What remained was jurisdiction over deliberate homicide, wounding, poisoning and arson, and over certain religious matters. That survived the democracy and continued under Rome.",
    ],
    change: [
      "The reforms of 462 BCE are the hinge, and Aeschylus's Eumenides, staged four years later, dramatises the court's foundation by Athena — a play about the institution's legitimacy staged in the middle of the argument about it.",
      "Under Rome the Areopagus regained standing as the senior council of the city, and appears in that role in the Acts of the Apostles.",
    ],
    keyPoints: [
      {
        claim: "The Areopagus retained homicide jurisdiction after losing its political powers.",
        detail:
          "Attested in the constitutional sources, in the forensic speeches and in the procedural rules preserved for homicide cases.",
        level: "documented",
      },
      {
        claim: "Its powers before 462 BCE are described in general terms and are not precisely recoverable.",
        detail:
          "Aristotle speaks of guardianship of the laws, which is broad. Modern reconstructions of what that meant in practice vary considerably.",
        level: "disputed",
      },
      {
        claim: "Aeschylus's Eumenides is a contemporary intervention, not a record.",
        detail:
          "Staged in 458 BCE, four years after the reform, it presents the court as founded by Athena for homicide specifically — which is the settlement the reform had just produced.",
        level: "probable",
      },
    ],
    primarySources: [
      S("Constitution of the Athenians", "3, 8, 25", "The council's early powers and the reform that removed them.", "Aristotle"),
      S("Eumenides", "throughout", "The mythical foundation of the homicide court, staged four years after the reform of 462 BCE.", "Aeschylus"),
    ],
    relatedInstitutions: ["ecclesia", "dikasteria", "archon", "boule"],
    citySlugs: ["athens"],
    architectureRefs: [],
    warfareRefs: [],
    figureRefs: ["aristotle", "solon"],
    themeRefs: ["law", "justice", "constitution"],
  },
  {
    slug: "ostracism",
    title: "Ostracism",
    standfirst:
      "A vote to exile a citizen for ten years without charge, trial or accusation — and the potsherds bearing the names have been dug up by the thousand.",
    description:
      "Athenian ostracism: the annual question, the quorum, the ten-year exile without loss of property, the excavated ostraka, and what the institution was for.",
    tier: "greek-assembly",
    civilizations: ["athens", "greece"],
    period: "c. 487 – 417 BCE in practice",
    whatItWas: [
      "Once a year the assembly asked whether an ostracism should be held. If it voted yes, a vote was taken some weeks later in which each citizen scratched a name on a potsherd. The man with the most votes left Attica for ten years.",
      "It was not a punishment. No charge was brought, no defence was offered, no property was confiscated, and the man returned with his citizenship intact. That is what distinguishes it from exile as a penalty.",
    ],
    howItWorked: [
      "A quorum of six thousand is reported, though whether that was six thousand votes in total or six thousand against one man is disputed in the ancient evidence itself.",
      "Voting was by ostrakon, a broken potsherd used as scrap. Thousands have been excavated in the Agora and the Kerameikos, many bearing the names of men we know — Themistocles, Aristides, Cimon — and some carrying insults or accusations scratched alongside.",
      "One deposit found in a well contained a large number of sherds inscribed with a single name in only a few hands, which indicates that they were prepared in advance for distribution.",
    ],
    powersAndLimits: [
      "The stated purpose in the ancient sources is the prevention of tyranny: a way of removing a man who had become too powerful without the machinery of prosecution.",
      "In practice it functioned as a way of resolving a deadlock between two leading politicians, and it was used against the losing side of a policy argument rather than against would-be tyrants. It fell out of use after 417 BCE, when a coordinated manoeuvre turned it against an unintended target.",
    ],
    change: [
      "Attributed to Cleisthenes by the tradition and first attested in use in 487 BCE, which leaves a gap the sources do not explain.",
      "The last ostracism, of Hyperbolus, was reportedly engineered by an alliance between the two men it was aimed at. The institution was not abolished; it simply stopped being used.",
    ],
    keyPoints: [
      {
        claim: "Thousands of inscribed ostraka survive.",
        detail:
          "Excavated in the Agora and the Kerameikos. They are among the most direct pieces of evidence for any ancient political procedure, including the handwriting of ordinary voters.",
        level: "documented",
      },
      {
        claim: "Pre-inscribed sherds were prepared for distribution.",
        detail:
          "A deposit of sherds naming one man in a small number of hands indicates organised preparation — evidence of political management of the vote.",
        level: "documented",
      },
      {
        claim: "The quorum rule is not clear.",
        detail:
          "Ancient sources differ on whether six thousand was the total needed for a valid vote or the number required against an individual. Both readings have support.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Constitution of the Athenians", "22", "The institution, its attribution to Cleisthenes, and its early use.", "Aristotle"),
      S("Excavated ostraka", "Agora and Kerameikos deposits", "Thousands of inscribed potsherds, including pre-prepared batches.", "Athenian voters"),
      S("Life of Aristides", "7", "The story of the illiterate voter asking Aristides to write his own name — a moral anecdote, not a report.", "Plutarch"),
    ],
    relatedInstitutions: ["ecclesia", "boule", "dikasteria"],
    citySlugs: ["athens"],
    architectureRefs: ["agora"],
    warfareRefs: [],
    figureRefs: ["themistocles", "pericles", "aristotle"],
    themeRefs: ["democracy", "tyranny", "citizenship"],
  },

  // ─── Greek offices ───────────────────────────────────────────────────
  {
    slug: "archon",
    title: "The archon",
    standfirst:
      "Athens's senior magistracy, which gave its name to the year and then, once it was filled by lot, mattered far less than the name suggests.",
    description:
      "The Athenian archonship: the nine archons and their distinct roles, selection by lot, the eponymous year, and the office's decline into administration.",
    tier: "greek-office",
    civilizations: ["athens", "greece"],
    period: "Archaic period – Hellenistic era",
    whatItWas: [
      "Nine archons held office for a year: the eponymous archon, after whom the year was named; the basileus, who handled religious business inherited from the kings; the polemarch, originally the war leader; and six thesmothetai who managed the courts.",
      "In the archaic period this was the effective government of Athens. Membership of the Areopagus for life followed from having held it, which made the office the route into the aristocratic council.",
    ],
    howItWorked: [
      "Selection was originally by election from the highest property classes. From 487 BCE the archons were chosen by lot from a pre-selected group, which changed the character of the office decisively: an office filled by lottery cannot be a prize worth competing for.",
      "The eponymous archon's year is the basis of Athenian dating, and the archon lists are one of the useful chronological frameworks for Greek history.",
    ],
    powersAndLimits: [
      "After the lot was introduced the archons administered rather than led. Real political direction passed to the generals, who continued to be elected, and to the speakers in the assembly.",
      "The polemarch's military role passed to the strategoi. At Marathon in 490 BCE the polemarch Callimachus still cast a deciding vote on whether to fight, which is close to the last moment the office mattered militarily.",
    ],
    change: [
      "Property qualifications for the office were lowered progressively, and by the later fifth century the lowest census class was in practice admitted.",
      "The office survived into the Roman period as a civic dignity with the eponymous function intact and the power gone.",
    ],
    keyPoints: [
      {
        claim: "Selection by lot from 487 BCE is attested and is the decisive change.",
        detail:
          "Recorded in Aristotle's Constitution of the Athenians, which dates the change and names the year. The move from election to lot transferred political leadership to the elected generalship.",
        level: "documented",
      },
      {
        claim: "Archon lists provide a dating framework.",
        detail:
          "Preserved partly in inscriptions and partly in later authors; gaps and disputes remain for the earlier period.",
        level: "probable",
      },
      {
        claim: "The archaic archonship's powers are described only in retrospect.",
        detail:
          "Aristotle writes centuries later and reconstructs the early constitution from tradition and inference.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Constitution of the Athenians", "3, 8, 22, 55-59", "The nine archons, their duties, and the change to selection by lot.", "Aristotle"),
      S("Histories", "6.109-110", "The polemarch casting the deciding vote before Marathon: the archonship seen in operation rather than described.", "Herodotus"),
    ],
    relatedInstitutions: ["areopagus", "strategos", "ecclesia", "dikasteria"],
    citySlugs: ["athens"],
    architectureRefs: ["agora", "stoa"],
    warfareRefs: [],
    figureRefs: ["solon", "aristotle"],
    themeRefs: ["democracy", "constitution"],
  },
  {
    slug: "strategos",
    title: "The strategos",
    standfirst:
      "Ten generals elected annually and re-electable without limit — the one Athenian office the democracy would not fill by lot, and therefore the one that mattered.",
    description:
      "The Athenian generalship: election rather than lot, indefinite re-election, accountability and prosecution, and how Pericles governed through an office with no civil powers.",
    tier: "greek-office",
    civilizations: ["athens", "greece"],
    period: "5th – 4th century BCE",
    whatItWas: [
      "Ten strategoi were elected each year, one originally from each tribe. Unlike almost every other Athenian office, the generalship was filled by election and carried no limit on re-election.",
      "The exception is deliberate and revealing. Athenians were willing to let a lottery choose the man who held the state seal for a day, and not the man who would command the fleet.",
    ],
    howItWorked: [
      "Generals commanded on campaign, but the office had no civil authority. Its political weight came from being the only continuously re-electable position, which allowed a man with the confidence of the assembly to hold real influence year after year.",
      "Pericles is the case. He governed Athens for roughly three decades holding an office whose formal powers were military, because he was re-elected annually and the assembly followed his advice.",
      "Generals were rigorously accountable. They were subject to a vote of confidence at each prytany, could be deposed, and were regularly prosecuted after unsuccessful campaigns.",
    ],
    powersAndLimits: [
      "The limits were severe and are the point. A general could not make policy: he executed what the assembly decided and answered for the result.",
      "The trial of the generals after Arginusae in 406 BCE — condemned collectively for failing to recover the dead after a naval victory, in a procedure the sources themselves call irregular — is the standard illustration of what accountability could become.",
    ],
    change: [
      "The tribal basis of election was relaxed in the fifth century so that more than one general could come from a tribe.",
      "In the fourth century the generalship specialised, with particular commands allocated to particular generals, and professional commanders and mercenary armies eroded the citizen-general model.",
    ],
    keyPoints: [
      {
        claim: "The generalship was elected while most offices were allotted.",
        detail:
          "Attested in the constitutional sources, which state the reason: some functions require expertise.",
        level: "documented",
      },
      {
        claim: "Generals were prosecuted routinely.",
        detail:
          "Attested across the historians and the forensic speeches. The Arginusae trial is the most notorious but not the only case.",
        level: "documented",
      },
      {
        claim: "How Pericles exercised power is a matter of interpretation.",
        detail:
          "Thucydides describes Athens as in name a democracy and in fact rule by the first man. That is a judgement by a partisan of Pericles, not a constitutional description.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Constitution of the Athenians", "61", "The election of the generals and their accountability.", "Aristotle"),
      S("History of the Peloponnesian War", "2.65", "The assessment of Pericles' position: a democracy in name, government by the first man in fact.", "Thucydides"),
      S("Hellenica", "1.7", "The trial of the generals after Arginusae.", "Xenophon"),
    ],
    relatedInstitutions: ["ecclesia", "archon", "dikasteria"],
    citySlugs: ["athens"],
    architectureRefs: ["agora"],
    warfareRefs: ["command-structure", "greek-warfare", "trireme"],
    figureRefs: ["pericles", "themistocles", "thucydides", "xenophon"],
    themeRefs: ["democracy-at-war", "military-command", "democracy"],
  },

  // ─── Spartan institutions ────────────────────────────────────────────
  {
    slug: "gerousia",
    title: "The Gerousia",
    standfirst:
      "Twenty-eight elders over sixty, elected for life by a shouting contest, sitting with the two kings — the Spartan council that decided what the assembly could vote on.",
    description:
      "The Spartan council of elders: composition, life tenure, the election by acclamation that Aristotle called childish, and its control of the assembly's agenda.",
    tier: "spartan",
    civilizations: ["sparta", "greece"],
    period: "Archaic period – Hellenistic era",
    whatItWas: [
      "The Gerousia consisted of twenty-eight men over the age of sixty, elected for life, together with the two kings — thirty members in all. It was the deliberative core of the Spartan constitution.",
      "Its members were drawn in practice from a narrow group of leading families, which is one of the reasons Aristotle treats the Spartan constitution as oligarchic in substance whatever its form.",
    ],
    howItWorked: [
      "Election was by acclamation: candidates passed before the assembly and judges shut in a nearby building, unable to see, recorded which candidate drew the loudest shout. Aristotle calls the method childish.",
      "The council prepared business for the assembly and, on the evidence of the Great Rhetra, could set aside a decision it judged crooked. Whichever way that provision is read, the assembly did not have the last word in the way the Athenian one did.",
      "It also served as a court for capital cases.",
    ],
    powersAndLimits: [
      "Life tenure without accountability is the structural feature. Members could not be removed and answered to no one, which Aristotle identifies as a defect, noting that minds age as bodies do.",
      "Its powers were checked in practice by the ephors, who were annual and elected, and by the kings, whose position was hereditary. The Spartan constitution's balance is between bodies of quite different character.",
    ],
    change: [
      "The Gerousia is presented in the tradition as part of the Lycurgan settlement, which is to say its origin is not historically recoverable.",
      "Its powers relative to the ephors appear to have declined over the classical period, though the evidence is thin.",
    ],
    keyPoints: [
      {
        claim: "Members served for life from the age of sixty.",
        detail:
          "Attested consistently, and Aristotle treats the absence of accountability as a structural criticism.",
        level: "documented",
      },
      {
        claim: "Election was by measured acclamation.",
        detail:
          "Described by Plutarch and criticised by Aristotle. The procedure is unusual enough that both found it worth reporting.",
        level: "probable",
      },
      {
        claim: "The Great Rhetra's rider is disputed.",
        detail:
          "The clause allowing the elders and kings to set aside a crooked decision of the people is transmitted through Plutarch quoting earlier material. Whether it is an original provision or a later addition, and what it authorised, are argued.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Politics", "1270b-1271a", "A critical analysis of the Gerousia, including the objection to life tenure and to the election method.", "Aristotle"),
      S("Life of Lycurgus", "5-6, 26", "The Great Rhetra, the composition of the council and the election by shouting.", "Plutarch"),
    ],
    relatedInstitutions: ["ephors", "collegiality-and-annuality", "ecclesia"],
    citySlugs: ["sparta"],
    architectureRefs: [],
    warfareRefs: ["spartan-army"],
    figureRefs: ["lycurgus", "aristotle"],
    themeRefs: ["oligarchy", "mixed-constitution", "constitution"],
  },
  {
    slug: "ephors",
    title: "The ephors",
    standfirst:
      "Five annually elected officials who could arrest a king — the most powerful magistracy in Sparta and the least aristocratic.",
    description:
      "The Spartan ephorate: annual election, the monthly oath exchanged with the kings, powers over the kings and the helots, and Aristotle's objection to how they were chosen.",
    tier: "spartan",
    civilizations: ["sparta", "greece"],
    period: "Archaic period – Hellenistic era",
    whatItWas: [
      "Five ephors were elected annually from the whole citizen body. They presided over the Gerousia and the assembly, controlled the agenda, supervised the kings and directed much of the day-to-day running of the state.",
      "Unlike the Gerousia, the office was open to any Spartiate and held for a single year without re-election. It is the democratic element in a constitution that is otherwise not one.",
    ],
    howItWorked: [
      "Each month the ephors and the kings exchanged oaths: the kings to rule according to the laws, the ephors to uphold the kingship while the kings kept theirs. That formula states the relationship exactly.",
      "Two ephors accompanied a king on campaign. Ephors could arrest a king, bring him to trial before the Gerousia, and did so more than once.",
      "They also declared war on the helots each year on entering office — a formality with a real function, since it meant a helot could be killed without ritual pollution.",
    ],
    powersAndLimits: [
      "The office's power came from the combination of annual tenure with very wide competence, and from its collegiality: five men acting together, none able to entrench.",
      "Aristotle's criticism is specific. The ephors were chosen from the whole body including the poor, which he says made them open to bribery, and their power was very great — a combination he regarded as dangerous.",
    ],
    change: [
      "The tradition attributes the ephorate variously to Lycurgus and to a later king, which means its origin is not established.",
      "The office was abolished by the reforming king Cleomenes III in the third century BCE and later restored, which indicates how central it had become.",
    ],
    keyPoints: [
      {
        claim: "The ephors could prosecute a king.",
        detail:
          "Attested in narrative accounts of specific cases, which makes it a reported practice rather than only a constitutional theory.",
        level: "documented",
      },
      {
        claim: "The annual declaration of war on the helots is reported by Aristotle through Plutarch.",
        detail:
          "The provision is transmitted at one remove. Its function — removing ritual pollution from killing helots — is the standard reading.",
        level: "probable",
      },
      {
        claim: "Aristotle's account is a critique, not a description.",
        detail:
          "The relevant passages of the Politics survive intact, and in them he is arguing that Sparta's constitution is defectively mixed. The facts he reports are marshalled for that case and should be read accordingly.",
        level: "documented",
      },
    ],
    primarySources: [
      S("Politics", "1270b-1271b", "The ephorate analysed and criticised, including the objection to its method of selection.", "Aristotle"),
      S("Constitution of the Lacedaemonians", "8, 15", "The oath exchanged monthly between kings and ephors, by a contemporary admirer.", "Xenophon"),
      S("Life of Lycurgus", "7", "The institution of the ephorate in the tradition.", "Plutarch"),
    ],
    relatedInstitutions: ["gerousia", "collegiality-and-annuality"],
    citySlugs: ["sparta"],
    architectureRefs: [],
    warfareRefs: ["spartan-army", "military-discipline"],
    figureRefs: ["lycurgus", "aristotle", "xenophon"],
    themeRefs: ["oligarchy", "mixed-constitution", "spartan-order"],
  },

  // ─── Roman magistracies ──────────────────────────────────────────────
  {
    slug: "consul",
    title: "The consul",
    standfirst:
      "Two men, one year, equal power and a mutual veto — the senior magistracy of the Republic and the office that gave the year its name.",
    description:
      "The Roman consulship: the two holders, imperium, the veto between colleagues, the alternation of the fasces, and what became of the office under the emperors.",
    tier: "roman-magistracy",
    civilizations: ["roman-republic", "rome", "principate"],
    period: "509 BCE – late empire",
    whatItWas: [
      "Two consuls were elected annually and held the senior imperium of the Republic. They convened the Senate and the assemblies, proposed legislation, and commanded armies.",
      "The year was named after them, and the consular lists are the backbone of Roman chronology.",
    ],
    howItWorked: [
      "The two held equal power, and each could veto the other. In the city they alternated the fasces monthly, so that only one at a time was attended by lictors.",
      "Election was by the comitia centuriata, an assembly weighted heavily toward the wealthier property classes, which is why the consulship remained in practice the preserve of a small number of families.",
      "A man who reached the consulship without consular ancestors was a novus homo, a new man. Cicero was one, and made a great deal of it.",
    ],
    powersAndLimits: [
      "Inside the city the consul's imperium was constrained by the citizen's right of appeal and by the tribunes' veto. On campaign it was close to absolute.",
      "The office was limited by its annual term and by the requirement of an interval before holding it again — a rule repeatedly suspended in the late Republic.",
    ],
    change: [
      "The plebeians gained access to the consulship by the Licinio-Sextian laws of the mid-fourth century BCE, on the traditional account, after which one consul was normally plebeian.",
      "Under the Principate the consulship became an honour rather than a power. Terms were shortened so that several pairs held it in a year, which distributed the prestige and diluted the office.",
    ],
    keyPoints: [
      {
        claim: "Consular lists survive and structure Roman chronology.",
        detail:
          "The fasti consulares, preserved in inscriptions and in the literary tradition, name the pairs year by year.",
        level: "documented",
      },
      {
        claim: "Access to the consulship was in practice restricted to a few families.",
        detail:
          "Demonstrable from the fasti themselves: the same names recur across centuries, and new men are rare enough to be remarked on.",
        level: "documented",
      },
      {
        claim: "The office's early history is reconstructed.",
        detail:
          "The traditional date of 509 BCE and the earliest consular pairs come from a tradition written down centuries later.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Histories", "6.12", "The consuls' powers within the mixed constitution.", "Polybius"),
      S("Fasti Consulares", "inscribed lists", "The annual record of consular pairs, preserved in part on stone.", "Roman state"),
      S("Letters and speeches", "throughout", "The perspective of a new man who reached the consulship in 63 BCE.", "Cicero"),
    ],
    relatedInstitutions: ["praetor", "dictator", "imperium", "cursus-honorum", "roman-senate", "collegiality-and-annuality"],
    citySlugs: ["rome"],
    architectureRefs: ["forum"],
    warfareRefs: ["command-structure", "roman-army"],
    figureRefs: ["cicero", "julius-caesar", "polybius", "cato-the-younger"],
    themeRefs: ["republic", "constitution", "mixed-constitution"],
  },
  {
    slug: "praetor",
    title: "The praetor",
    standfirst:
      "A magistrate with imperium whose annual edict, restating and adjusting the law he would enforce, became one of the principal engines of Roman legal development.",
    description:
      "The Roman praetorship: the urban and peregrine praetors, the annual edict, the growth in numbers with the provinces, and the praetor's role in shaping private law.",
    tier: "roman-magistracy",
    civilizations: ["roman-republic", "rome", "principate"],
    period: "367 BCE onward",
    whatItWas: [
      "The praetorship was the second magistracy with imperium. The urban praetor administered justice between citizens; a second, the peregrine praetor, handled cases involving foreigners from the mid-third century BCE.",
      "Praetors also commanded armies and governed provinces, and their number rose as the empire grew.",
    ],
    howItWorked: [
      "On entering office each praetor published an edict setting out the actions he would grant and the defences he would allow. In principle it was his own; in practice each largely repeated his predecessor's, with additions.",
      "That accumulation is the mechanism. Roman private law developed less by legislation than by praetors adding remedies where the existing law produced results they judged unjust, and the accumulated edict was eventually consolidated into a fixed form under Hadrian.",
    ],
    powersAndLimits: [
      "The praetor did not decide cases. He framed the issue, granted or refused an action, and appointed a private judge to hear it — a division between the magistrate and the trial that has no modern equivalent.",
      "He could not repeal statute. His power was to supplement and to obstruct: to grant a remedy the law did not provide, or to refuse an action the law technically allowed.",
    ],
    change: [
      "The office was created in 367 BCE on the traditional account. Numbers rose from one to two to four and beyond as provinces multiplied.",
      "Hadrian had the edict codified in a permanent form, which ended its development as a living instrument and turned it into a text for jurists to comment on.",
    ],
    keyPoints: [
      {
        claim: "The praetor's edict was a principal source of legal development.",
        detail:
          "Attested by the jurists themselves, who describe the honorary law as that introduced by the praetors to aid, supplement or correct the civil law.",
        level: "documented",
      },
      {
        claim: "Magistrate and judge were separate functions.",
        detail:
          "The two-stage procedure is set out in Gaius's Institutes, the one classical legal textbook preserved substantially outside the Digest.",
        level: "documented",
      },
      {
        claim: "The edict's text is reconstructed, not preserved.",
        detail:
          "The consolidated edict does not survive as such; it is reconstructed from quotations in the jurists and in the Digest.",
        level: "probable",
      },
    ],
    terms: [
      { term: "ius honorarium", gloss: "The law introduced by magistrates through the edict, as opposed to the ius civile." },
      { term: "formula", gloss: "The written statement of the issue the praetor sent to the appointed judge." },
    ],
    primarySources: [
      S("Institutes", "4", "The formulary procedure and the praetor's role in it.", "Gaius"),
      S("Digest", "1.1.7", "The definition of praetorian law as aiding, supplementing and correcting the civil law.", "Papinian, in the Digest"),
    ],
    relatedInstitutions: ["consul", "roman-law", "cursus-honorum", "imperium", "roman-provinces"],
    citySlugs: ["rome"],
    architectureRefs: ["forum", "basilica"],
    warfareRefs: [],
    figureRefs: ["cicero", "hadrian"],
    themeRefs: ["law", "rule-of-law", "justice"],
  },
  {
    slug: "tribune-of-the-plebs",
    title: "The tribune of the plebs",
    standfirst:
      "An officer of the plebeians, personally sacrosanct, who could stop any act of any magistrate with a single word — and whose office became the instrument of the Republic's collapse.",
    description:
      "The tribunate: sacrosanctity, the veto, the right of rescue, legislation through the plebeian assembly, and the political violence that ended two centuries of restraint.",
    tier: "roman-magistracy",
    civilizations: ["roman-republic", "rome", "principate"],
    period: "494 BCE – imperial period",
    whatItWas: [
      "Tribunes were officers of the plebeians rather than magistrates of the whole people, created on the traditional account after a plebeian secession in 494 BCE. There were ten, elected annually.",
      "Their persons were sacrosanct: an oath sworn by the plebeians made anyone who harmed a tribune accursed. That sanction, religious rather than legal, is the foundation of everything else the office could do.",
    ],
    howItWorked: [
      "A tribune could veto any act of any magistrate, any decree of the Senate and any bill before an assembly, by physical presence and a word of prohibition. He could also rescue a citizen from a magistrate's hands.",
      "He was required to keep his door open and to remain in the city, because the protection he offered was only useful if he could be reached.",
      "Tribunes convened the plebeian assembly and legislated through it. From 287 BCE its resolutions bound the whole people, which turned the office from a defensive shield into a legislative instrument.",
    ],
    powersAndLimits: [
      "The veto could be blocked by another tribune, and it usually was. Ten colleagues with equal power meant the office normally checked itself.",
      "The limit was ultimately the sacrosanctity, and when that failed the Republic's mechanism for peaceful conflict failed with it. Tiberius Gracchus was killed in 133 BCE and his brother Gaius in 121, both while holding or having held the office.",
    ],
    change: [
      "Sulla stripped the tribunate of most of its powers in his dictatorship; they were restored within a decade.",
      "Augustus took tribunician power without holding the office — he was a patrician and could not — and it became one of the two constitutional pillars of the Principate, renewed annually and used to date imperial reigns.",
    ],
    keyPoints: [
      {
        claim: "The tribune's sacrosanctity rested on a collective oath, not on statute.",
        detail:
          "Attested in the tradition of the office's origin. Its religious basis is what made it effective and what made its violation so grave.",
        level: "probable",
      },
      {
        claim: "Tribunician power became a pillar of imperial rule.",
        detail:
          "Emperors dated their reigns by successive grants of tribunicia potestas, recorded on coins and inscriptions across the empire.",
        level: "documented",
      },
      {
        claim: "The origin story of 494 BCE is a tradition.",
        detail:
          "The secession narrative comes from authors writing four centuries later and is not independently corroborated.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "intercessio", gloss: "The veto." },
      { term: "sacrosanctitas", gloss: "Inviolability guaranteed by collective oath and religious sanction." },
      { term: "tribunicia potestas", gloss: "Tribunician power, held by emperors without the office and used to number their years." },
    ],
    primarySources: [
      S("Histories", "6.16", "The tribunes' power to obstruct the Senate and the consuls.", "Polybius"),
      S("Life of Tiberius Gracchus", "throughout", "The tribunate used for a land law, and the killing that followed.", "Plutarch"),
      S("Res Gestae Divi Augusti", "10", "Augustus on receiving tribunician power.", "Augustus"),
    ],
    relatedInstitutions: ["roman-assemblies", "roman-senate", "consul", "imperium", "roman-law"],
    citySlugs: ["rome"],
    architectureRefs: ["forum"],
    warfareRefs: [],
    figureRefs: ["polybius", "cicero", "augustus"],
    themeRefs: ["republic", "constitution", "power"],
  },
  {
    slug: "censor",
    title: "The censor",
    standfirst:
      "Two men elected every five years to count the citizens, revise the Senate roll, and record a formal judgement on a man's conduct beside his name.",
    description:
      "The Roman censorship: the census and its property classes, the lectio senatus, the censorial mark, public contracts, and why the office carried such prestige.",
    tier: "roman-magistracy",
    civilizations: ["roman-republic", "rome"],
    period: "443 BCE – early Principate",
    whatItWas: [
      "Two censors were elected roughly every five years, normally from among former consuls, and held office for eighteen months. The censorship carried no imperium and was nonetheless the most prestigious office in the Republic.",
      "Its core function was the census: registering citizens, their property and their families, which determined their voting class, their tax liability and their military obligation.",
    ],
    howItWorked: [
      "The censors revised the roll of the Senate, adding those qualified and removing those they judged unfit. They could also demote a citizen from his voting class or strike him from the tribes.",
      "A censorial mark — the nota — was entered beside a man's name with the reason stated. Recorded grounds included cowardice, cruelty to dependants, extravagance, neglect of land and, in a case Cicero mentions, an unsuitable joke.",
      "The censors also let the great public contracts: tax farming, public works, the upkeep of temples and roads. That is how the office funded much of Rome's building.",
    ],
    powersAndLimits: [
      "The power to judge conduct was moral rather than criminal, and the penalty was standing rather than punishment. That is precisely why it mattered in a society where standing was the currency.",
      "Its limit was collegiality: both censors had to agree for a nota to be entered. And it was intermittent, which is why it never became a continuous instrument of control.",
    ],
    change: [
      "The office declined in the late Republic and was effectively absorbed by the emperors, who assumed censorial functions without regularly holding the office.",
      "The census itself continued as an administrative instrument across the empire, detached from the moral supervision that had been bundled with it.",
    ],
    keyPoints: [
      {
        claim: "Census figures survive in the literary tradition.",
        detail:
          "Livy and others record totals for many census years. What the figures counted — adult male citizens, or citizens with families — is disputed, which makes Roman population estimates contentious.",
        level: "disputed",
      },
      {
        claim: "The censorial nota recorded a stated reason.",
        detail:
          "Examples are quoted by later authors, which is how we know the range of conduct the censors thought their business.",
        level: "documented",
      },
      {
        claim: "The censorship shaped Rome's built environment through the contract system.",
        detail:
          "The letting of public contracts by censors is attested, and major works including the Via Appia and the first aqueduct are associated with a censorship.",
        level: "documented",
      },
    ],
    primarySources: [
      S("Histories", "6.17", "The censors' contracts and the Senate's oversight of them.", "Polybius"),
      S("History of Rome", "throughout", "Census figures and censorial actions reported year by year.", "Livy"),
    ],
    relatedInstitutions: ["roman-senate", "cursus-honorum", "roman-citizenship", "roman-taxation", "roman-assemblies"],
    citySlugs: ["rome"],
    architectureRefs: ["forum"],
    warfareRefs: ["recruitment"],
    figureRefs: ["cato-the-younger", "livy", "polybius"],
    themeRefs: ["citizenship", "character-and-power", "republic"],
  },
  {
    slug: "aedile",
    title: "The aedile",
    standfirst:
      "The office responsible for streets, markets, the grain supply and the games — and therefore the point in a career at which a politician bought his reputation.",
    description:
      "The Roman aedileship: care of the city, market regulation, the grain supply, and the games that made the office a political investment.",
    tier: "roman-magistracy",
    civilizations: ["roman-republic", "rome"],
    period: "494 BCE – imperial period",
    whatItWas: [
      "Four aediles — two plebeian, two curule — had charge of the city itself: streets, buildings, water, markets, weights and measures, public order, and the corn supply.",
      "They also presided over several of the major public festivals, which is the fact that shaped the office's political meaning.",
    ],
    howItWorked: [
      "Aediles regulated trade, fined those who encroached on public land, and prosecuted breaches of the market rules. Their jurisdiction over sales produced a body of rules on defects in goods and slaves that entered the legal tradition.",
      "The games were funded partly by the state and largely by the holder. Spending far beyond the allowance was normal, expected, and effectively an investment: a memorable aedileship bought the name recognition needed for the praetorship.",
    ],
    powersAndLimits: [
      "The aedileship had no imperium and commanded no army. Its power was administrative and its value was reputational.",
      "That reputational logic made it a mechanism for the wealthy to convert money into office, and it is one of the clearest ways in which Republican politics favoured those who could afford to spend.",
    ],
    change: [
      "The office was not formally required in the career ladder but was in practice near-essential for a man without a famous name.",
      "Under the emperors its functions were transferred to imperial officials — the prefect of the corn supply, the curators of works and water — and the aedileship dwindled.",
    ],
    keyPoints: [
      {
        claim: "Aediles' expenditure on games was a recognised political investment.",
        detail:
          "Attested in the sources and in the careers themselves, where a spectacular aedileship is followed by electoral success.",
        level: "probable",
      },
      {
        claim: "The aedilician edict shaped the law of sale.",
        detail:
          "Rules on latent defects in goods and slaves, issued by aediles for the markets, are preserved in the legal sources.",
        level: "documented",
      },
      {
        claim: "The office's exact competences shifted over time.",
        detail:
          "The division between plebeian and curule aediles, and between their duties, is not consistently described.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Digest", "21.1", "The aedilician edict on defects in goods sold, preserved in the legal compilation.", "The aediles, in the Digest"),
      S("On Duties", "2.55-60", "On expenditure on games as a form of political generosity, and its limits.", "Cicero"),
    ],
    relatedInstitutions: ["cursus-honorum", "quaestor", "praetor", "roman-law"],
    citySlugs: ["rome", "ostia", "pompeii"],
    architectureRefs: ["forum", "amphitheatre", "theatre"],
    warfareRefs: [],
    figureRefs: ["cicero", "julius-caesar"],
    themeRefs: ["republic", "statecraft"],
  },
  {
    slug: "quaestor",
    title: "The quaestor",
    standfirst:
      "The entry-level magistracy, responsible for public money — and the office whose holding brought automatic membership of the Senate.",
    description:
      "The Roman quaestorship: the treasury, service with provincial governors and generals, the age qualification, and its role as the gateway to the Senate.",
    tier: "roman-magistracy",
    civilizations: ["roman-republic", "rome", "principate"],
    period: "Early Republic – imperial period",
    whatItWas: [
      "Quaestors handled public funds: the treasury in Rome, and the accounts of armies and provinces in the field. The number rose over time from two to twenty and beyond as the empire expanded.",
      "From the early first century BCE, holding the quaestorship brought automatic entry to the Senate. That made it the gateway office of a public career.",
    ],
    howItWorked: [
      "A quaestor attached to a governor or a general managed pay, supply and accounts. The relationship was close enough that the tie between a quaestor and his commander was treated as quasi-familial, and betraying it was a serious reproach.",
      "In Rome the quaestors of the treasury kept the state accounts and the archive of public documents.",
    ],
    powersAndLimits: [
      "No imperium, no command, no jurisdiction. The quaestorship is an apprenticeship with financial responsibility attached.",
      "Its importance is structural rather than powerful: it set the minimum age of a public career and it determined who entered the Senate.",
    ],
    change: [
      "Sulla raised the number to twenty and made the office the automatic route into the Senate, which fixed the shape of senatorial recruitment for the rest of the Republic.",
      "Under the Principate the office survived with reduced functions, some quaestors being attached to the emperor.",
    ],
    keyPoints: [
      {
        claim: "The quaestorship carried automatic entry to the Senate from the Sullan period.",
        detail:
          "Attested in the sources and consistent with the size of the Senate thereafter.",
        level: "probable",
      },
      {
        claim: "Quaestors managed army and provincial accounts.",
        detail:
          "Attested in the correspondence and speeches, including Cicero's account of his own quaestorship in Sicily.",
        level: "documented",
      },
      {
        claim: "The office's early history and original functions are unclear.",
        detail:
          "Its origin, and whether it began as a criminal investigatory office, is argued from etymology and thin evidence.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Against Verres", "throughout", "A prosecution built from provincial accounts, by a former quaestor of Sicily.", "Cicero"),
      S("Histories", "6.12-13", "The handling of public money and the Senate's control of the treasury.", "Polybius"),
    ],
    relatedInstitutions: ["cursus-honorum", "roman-senate", "roman-taxation", "roman-provinces"],
    citySlugs: ["rome"],
    architectureRefs: ["forum"],
    warfareRefs: ["military-supply"],
    figureRefs: ["cicero", "julius-caesar"],
    themeRefs: ["republic", "administrative-state"],
  },
  {
    slug: "dictator",
    title: "The dictator",
    standfirst:
      "A single magistrate with supreme power for six months, appointed lawfully in emergencies — and an office used twice, at the end, to do the opposite of what it was for.",
    description:
      "The Roman dictatorship: appointment, the master of horse, the six-month limit, its lawful use for centuries, and its transformation under Sulla and Caesar.",
    tier: "roman-magistracy",
    civilizations: ["roman-republic", "rome"],
    period: "501 BCE – 44 BCE",
    whatItWas: [
      "The dictatorship was a constitutional emergency office: one man, appointed rather than elected, holding imperium not subject to a colleague's veto, for a maximum of six months or until the task was done.",
      "He appointed a deputy, the magister equitum, the master of horse. The two together replaced the ordinary collegiality with a hierarchy — the exception that proves what the rest of the system was designed against.",
    ],
    howItWorked: [
      "A consul named the dictator, normally on the Senate's advice, for a stated purpose: to conduct a war, to hold elections, to drive a ritual nail. The purpose limited the tenure.",
      "The office was used repeatedly and unremarkably for two and a half centuries. The tradition's model case is Cincinnatus, called from his plough, victorious, and resigning within days — a story that is a moral exemplum rather than a documented episode.",
    ],
    powersAndLimits: [
      "The limits were the six months, the stated purpose and the expectation of resignation. None of them was enforceable except by custom.",
      "Custom held until it did not. Sulla took the dictatorship in 82 BCE with no time limit and a mandate to reconstitute the Republic; Caesar was made dictator for a year, then ten years, then in perpetuity. The office was not abused by being seized illegally but by being granted differently.",
    ],
    change: [
      "The office fell out of ordinary use after the Second Punic War, replaced in emergencies by the senatus consultum ultimum, a decree instructing the consuls to see that the state took no harm.",
      "After Caesar's assassination the dictatorship was formally abolished. Augustus is reported to have refused it when it was offered, and to have recorded the refusal.",
    ],
    keyPoints: [
      {
        claim: "The dictatorship was a lawful, time-limited office for centuries.",
        detail:
          "Attested by repeated appointments in the annalistic record for defined purposes, with resignation on completion.",
        level: "probable",
      },
      {
        claim: "Sulla's and Caesar's dictatorships broke the time limit.",
        detail:
          "Both are well attested, and both were constitutionally granted rather than seized — which is the significant point.",
        level: "documented",
      },
      {
        claim: "The Cincinnatus story is an exemplum.",
        detail:
          "It reaches us through Livy writing four centuries later, in a narrative built to display Republican virtue.",
        level: "literary",
      },
    ],
    primarySources: [
      S("History of Rome", "3.26-29", "Cincinnatus called to the dictatorship and resigning — the founding story of the office's restraint.", "Livy"),
      S("Res Gestae Divi Augusti", "5", "Augustus recording that the dictatorship was offered and refused.", "Augustus"),
      S("Life of Sulla", "throughout", "The dictatorship taken without a term limit.", "Plutarch"),
    ],
    relatedInstitutions: ["consul", "imperium", "collegiality-and-annuality", "roman-senate"],
    citySlugs: ["rome"],
    architectureRefs: ["forum"],
    warfareRefs: ["command-structure"],
    figureRefs: ["julius-caesar", "augustus", "livy", "cicero"],
    themeRefs: ["tyranny", "republic", "power", "constitution"],
  },

  // ─── Roman deliberative bodies ───────────────────────────────────────
  {
    slug: "roman-senate",
    title: "The Senate",
    standfirst:
      "A body with no legislative power that governed Rome for four centuries — because its advice was followed, its members held every office, and it controlled the money.",
    description:
      "The Roman Senate: composition and recruitment, the senatus consultum as advice rather than law, control of finance and foreign policy, and its transformation under the emperors.",
    tier: "roman-body",
    civilizations: ["roman-republic", "rome", "principate", "late-empire"],
    period: "Regal period – late empire",
    whatItWas: [
      "The Senate was a standing council of former magistrates, some three hundred strong in the middle Republic and roughly doubled by Sulla. Membership was for life, subject to the censors' revision.",
      "It was formally an advisory body. Its resolutions were senatus consulta — advice to a magistrate — and did not have the force of law. That formal weakness is the most important thing to understand about it, because in practice it governed.",
    ],
    howItWorked: [
      "It was convened by a magistrate with the right to do so, who set the business. Members were asked their opinion in order of rank, which meant senior ex-consuls spoke first and shaped the debate before junior members were reached.",
      "Its practical authority came from three things: its members held all the magistracies in turn, so ignoring the Senate meant ignoring one's own future colleagues; it controlled the treasury and the allocation of provinces; and it directed foreign policy and received embassies.",
    ],
    powersAndLimits: [
      "It could not legislate, could not command an army and could not try most cases. It could allocate money, assign commands, extend imperium, and declare a state of emergency through the senatus consultum ultimum.",
      "Its limit was the tribunes' veto and the sovereignty of the assemblies, which could and did legislate against senatorial advice — the mechanism the Gracchi and their successors used.",
    ],
    change: [
      "Sulla enlarged it and made the quaestorship the automatic route in. Caesar enlarged it further and admitted provincials, which caused offence recorded in surviving jokes and graffiti.",
      "Under the Principate it gained judicial functions and lost political initiative. Tacitus's account of senatorial business under Tiberius is a study of a body performing deliberation in the presence of someone who has already decided.",
    ],
    keyPoints: [
      {
        claim: "Senatus consulta were formally advice.",
        detail:
          "Attested in the constitutional sources and in the formulae of the decrees themselves. Their binding force was practical rather than legal.",
        level: "documented",
      },
      {
        claim: "The Senate's authority rested on controlling finance and provincial assignments.",
        detail:
          "Polybius identifies precisely this in analysing where power actually lay, and he was writing in Rome while the system was still working — a contemporary observer rather than a later reconstruction.",
        level: "documented",
      },
      {
        claim: "How far the Senate was ever genuinely deliberative is argued.",
        detail:
          "Speaking order by rank, the weight of a few consular families and the density of family alliance all suggest outcomes were often settled before debate. How often is not recoverable.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "senatus consultum", gloss: "A resolution of the Senate: formally advice to a magistrate." },
      { term: "senatus consultum ultimum", gloss: "The emergency decree instructing magistrates to see that the state took no harm." },
      { term: "princeps senatus", gloss: "The senior member, asked his view first — the title behind princeps and so behind the Principate." },
    ],
    primarySources: [
      S("Histories", "6.13", "Where power actually lay: the Senate's control of the treasury, of provinces and of foreign embassies.", "Polybius"),
      S("Annals", "1.7-15, 3.65", "The Senate under Tiberius, described by a senator with contempt for what it had become.", "Tacitus"),
      S("Letters to Atticus", "throughout", "Senatorial business as reported privately by a participant.", "Cicero"),
    ],
    relatedInstitutions: ["consul", "roman-assemblies", "censor", "quaestor", "tribune-of-the-plebs", "imperial-administration"],
    citySlugs: ["rome"],
    architectureRefs: ["forum", "basilica"],
    warfareRefs: ["command-structure"],
    figureRefs: ["cicero", "polybius", "tacitus", "augustus", "cato-the-younger"],
    themeRefs: ["republic", "mixed-constitution", "oligarchy", "constitution"],
  },
  {
    slug: "roman-assemblies",
    title: "The Roman assemblies",
    standfirst:
      "Several separate voting bodies, each organised so that the vote of a group counted rather than the vote of a man — and one weighted so heavily that the poorest were often never reached.",
    description:
      "The comitia centuriata, comitia tributa and concilium plebis: block voting, property-weighted centuries, what each assembly elected and enacted, and their fate under the emperors.",
    tier: "roman-body",
    civilizations: ["roman-republic", "rome", "principate"],
    period: "Early Republic – early Principate",
    whatItWas: [
      "Romans voted in several distinct assemblies with different compositions and competences. The comitia centuriata elected consuls and praetors and declared war; the comitia tributa elected lesser magistrates; the concilium plebis, open only to plebeians, elected tribunes and passed plebiscites.",
      "In every one of them the unit of voting was the group, not the individual. A citizen voted within his century or tribe, the group's majority determined the group's single vote, and the groups were counted.",
    ],
    howItWorked: [
      "The comitia centuriata was organised by property into 193 centuries, distributed so that the wealthiest classes together held a majority. Voting proceeded from the top down and stopped once a majority of centuries was reached, which meant the lowest class was frequently never called.",
      "There was no debate in the assembly itself. A preliminary meeting, the contio, was where speeches were made; the voting assembly then voted yes or no on the magistrate's proposal without amendment.",
    ],
    powersAndLimits: [
      "The assemblies were formally sovereign: they elected magistrates, passed laws and, in the centuriate assembly, declared war. From 287 BCE plebiscites bound the whole people.",
      "Their limits were structural. Only a magistrate could convene them and put a proposal; no amendment was possible; and the weighting of the centuriate assembly meant formal sovereignty and effective influence were very different things.",
    ],
    change: [
      "The centuriate assembly was reformed at some point in the third century BCE to link centuries to tribes, which reduced but did not remove the property weighting.",
      "Under Tiberius the election of magistrates was transferred from the assemblies to the Senate. The assemblies continued to meet formally for a time and then ceased to matter.",
    ],
    keyPoints: [
      {
        claim: "Voting was by group, and the centuriate assembly was weighted by property.",
        detail:
          "Attested in the constitutional sources, including the distribution of centuries across the property classes.",
        level: "documented",
      },
      {
        claim: "Voting could stop before the lowest classes were reached.",
        detail:
          "It follows from counting downward until a majority was reached, and Cicero states the effect approvingly in a surviving passage of the Republic: the arrangement left the greatest number without a decisive voice.",
        level: "documented",
      },
      {
        claim: "The details of the third-century reform are not recoverable.",
        detail:
          "That a reform linking centuries to tribes occurred is agreed; its exact mechanism is reconstructed differently by different scholars.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "contio", gloss: "The preliminary meeting for speeches; the voting assembly itself did not debate." },
      { term: "comitia centuriata", gloss: "The property-weighted assembly that elected the senior magistrates." },
      { term: "plebiscitum", gloss: "A resolution of the plebeian assembly, binding on all citizens from 287 BCE." },
    ],
    primarySources: [
      S("Histories", "6.14", "The people's share of power: elections, legislation and capital jurisdiction.", "Polybius"),
      S("History of Rome", "1.43", "The centuriate organisation attributed to Servius Tullius, in a late reconstruction.", "Livy"),
    ],
    relatedInstitutions: ["roman-senate", "tribune-of-the-plebs", "consul", "censor", "roman-citizenship"],
    citySlugs: ["rome"],
    architectureRefs: ["forum"],
    warfareRefs: ["recruitment"],
    figureRefs: ["polybius", "cicero", "livy"],
    themeRefs: ["republic", "democracy", "citizenship", "mixed-constitution"],
  },
  {
    slug: "cursus-honorum",
    title: "The cursus honorum",
    standfirst:
      "A fixed sequence of offices with minimum ages and compulsory intervals — a career ladder written into law to slow ambition down.",
    description:
      "The Roman career ladder: the order of offices, the minimum ages set by the lex Villia annalis, the intervals between posts, and how the rules were bent and finally broken.",
    tier: "roman-body",
    civilizations: ["roman-republic", "rome"],
    period: "180 BCE onward, in codified form",
    whatItWas: [
      "The cursus honorum is the prescribed order in which a Roman held public office: quaestor, then aedile or tribune, then praetor, then consul, with the censorship available afterwards to former consuls.",
      "Minimum ages and compulsory intervals were fixed by law in the early second century BCE, which turned a customary sequence into a legal requirement.",
    ],
    howItWorked: [
      "The point of the rules was delay. A man could not reach the consulship young, could not hold offices in quick succession, and had to accumulate the experience — and the obligations — of each stage.",
      "It also shaped expenditure. The aedileship required spending on games, so a career had a financial as well as a chronological structure, and men borrowed heavily against future provincial commands.",
    ],
    powersAndLimits: [
      "The sequence worked as intended for roughly a century, and the exceptions are the story of the Republic's end. Extraordinary commands, repeated consulships and dispensations from the age rules were granted with increasing frequency in the first century BCE.",
      "Pompey held a triumph and then a consulship without having held any prior magistracy, which is a straightforward description of a constitution that had stopped constraining its most powerful members.",
    ],
    change: [
      "Sulla reinforced the rules; within a generation they were being suspended for individuals.",
      "Under the Principate the ladder survived as a career structure for the senatorial class, with the emperor controlling advancement — a system of imperial patronage rather than of competitive election.",
    ],
    keyPoints: [
      {
        claim: "Minimum ages and intervals were set by statute.",
        detail:
          "The lex Villia annalis of 180 BCE is attested as fixing the ages, and later legislation adjusted them.",
        level: "documented",
      },
      {
        claim: "Careers are reconstructable from inscriptions.",
        detail:
          "Senatorial careers are recorded on honorific inscriptions listing offices in order, which makes the cursus one of the best-evidenced institutions of the Roman elite.",
        level: "documented",
      },
      {
        claim: "The exact ages required at each stage are argued.",
        detail:
          "The statute's precise terms are not preserved, and the ages are inferred from attested careers.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Honorific inscriptions", "CIL, passim", "Senatorial careers listed office by office on statue bases and tombs.", "Roman elite"),
      S("On Duties", "2", "On the pursuit of office and the obligations it carries.", "Cicero"),
    ],
    relatedInstitutions: ["quaestor", "aedile", "praetor", "consul", "censor", "roman-senate"],
    citySlugs: ["rome"],
    architectureRefs: ["forum"],
    warfareRefs: [],
    figureRefs: ["cicero", "julius-caesar", "augustus"],
    themeRefs: ["republic", "statecraft", "character-and-power"],
  },

  // ─── The Roman state: law, status, territory, money ──────────────────
  {
    slug: "roman-law",
    title: "Roman law",
    standfirst:
      "A body of rules built by jurists answering questions rather than by legislators writing codes — and the one Roman institution still in daily use.",
    description:
      "Roman law: the Twelve Tables, the praetor's edict, the jurists, ius civile and ius gentium, codification under Justinian, and what survives into modern civil-law systems.",
    tier: "roman-state",
    civilizations: ["roman-republic", "rome", "principate", "late-empire"],
    period: "451 BCE – 534 CE",
    whatItWas: [
      "Roman law is less a code than an accumulation: the Twelve Tables of the mid-fifth century BCE, statutes passed by the assemblies, the praetor's annual edict, senatorial resolutions, imperial rulings, and above all the written opinions of professional jurists.",
      "Its characteristic method was casuistic. A jurist was asked what the law was in a particular set of facts and answered on those facts, which is why the surviving texts read as a very long series of problems rather than as principles.",
    ],
    howItWorked: [
      "A private case ran in two stages. Before the praetor, the parties agreed a formula — a written statement of the issue and of what the judge was to do if it was proved. The trial itself then went before a lay judge who decided the facts against that formula.",
      "The praetor could not repeal a statute, but by granting or withholding a formula he decided which claims could be heard at all. That is how the rigid old civil law was progressively supplemented without ever being repealed.",
    ],
    powersAndLimits: [
      "The law was real and constraining in matters of property, contract, inheritance and status, and Romans litigated constantly. It was also unequal: penalties differed by status, and from the second century CE the distinction between honestiores and humiliores was explicit in sentencing.",
      "It applied in the first instance only to citizens. The ius gentium — the rules held to be common to all peoples — developed to handle dealings with non-citizens, and became a major source of the doctrine later generalised.",
    ],
    change: [
      "The jurists' golden age is the late Republic and the first two centuries CE. Their independence declined as imperial rulings became the dominant source.",
      "In 528-534 CE Justinian's commission compiled the Digest from the jurists, together with the Code of imperial constitutions and the Institutes for teaching. That compilation is how nearly all classical Roman law survives, and its rediscovery in eleventh-century Italy is the root of the European civil-law tradition.",
    ],
    keyPoints: [
      {
        claim: "Almost all classical juristic writing survives only through Justinian's Digest.",
        detail:
          "The compilers excerpted and edited; the originals are lost apart from Gaius's Institutes and papyrus fragments. Reconstructing what a jurist actually wrote is a recognised discipline in itself.",
        level: "documented",
      },
      {
        claim: "Penalties were differentiated by social status.",
        detail:
          "The honestiores/humiliores distinction is attested in juristic texts and imperial rescripts from the second century CE onward.",
        level: "documented",
      },
      {
        claim: "The original content of the Twelve Tables is partly reconstructed.",
        detail:
          "The text does not survive. What we have is quotations by later authors, arranged into tables by modern editors, and some provisions are disputed.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "ius civile", gloss: "The law applying to Roman citizens as such." },
      { term: "ius gentium", gloss: "Rules held common to all peoples, used in dealings involving non-citizens." },
      { term: "formula", gloss: "The written statement of the issue that framed a private trial." },
      { term: "responsum", gloss: "A jurist's written opinion on a question put to him." },
    ],
    disputes: [
      {
        question: "How much of the Digest is classical and how much is Justinian's editing?",
        positions:
          "The compilers state that they altered texts to remove contradictions and obsolete matter, so some interpolation is certain. Early twentieth-century scholarship found interpolations almost everywhere; the reaction since has been to restore confidence in the transmitted text except where there is positive reason to doubt. That editing occurred is documented; its extent in any given passage is argued, and confident claims in either direction should be treated with care.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Institutes", "1-4", "The only classical legal textbook to survive substantially outside the Digest.", "Gaius"),
      S("Digest", "1.1-1.2", "The compilers' own account of the sources of law and of the jurists' role.", "Justinian's commission"),
      S("On the Laws", "1-3", "A late-Republican philosophical treatment of law by a working advocate.", "Cicero"),
    ],
    relatedInstitutions: ["praetor", "roman-citizenship", "roman-assemblies", "roman-provinces", "imperial-administration"],
    citySlugs: ["rome"],
    architectureRefs: ["basilica", "forum"],
    warfareRefs: ["military-discipline"],
    figureRefs: ["cicero", "augustus", "hadrian", "constantine"],
    themeRefs: ["justice", "law", "constitution", "republic"],
  },
  {
    slug: "roman-citizenship",
    title: "Roman citizenship",
    standfirst:
      "A legal status, not an ethnicity — extended deliberately, sold, granted for service, and finally given to almost everyone in the empire at once.",
    description:
      "Roman citizenship: what it conferred, the intermediate Latin right, enfranchisement after the Social War, grants for military service, and the Antonine Constitution of 212 CE.",
    tier: "roman-state",
    civilizations: ["roman-republic", "rome", "principate", "late-empire"],
    period: "Early Republic – 212 CE and after",
    whatItWas: [
      "Roman citizenship was a bundle of legal capacities: the right to vote, to hold office, to marry a citizen with full legal effect, to own and transfer property under the civil law, and to appeal against a magistrate's summary punishment.",
      "It was not a claim of descent. Freed slaves became citizens, whole communities were enfranchised by statute, and by the second century CE emperors themselves came from the provinces.",
    ],
    howItWorked: [
      "Citizenship was acquired by birth to citizen parents in a lawful marriage, by manumission, by individual grant, or by a community grant. Auxiliary soldiers received it on discharge, recorded on bronze diplomas of which many survive.",
      "There was also an intermediate status, the Latin right, carrying commercial and some legal privileges without the vote — a deliberate half-step that made full enfranchisement a reward.",
    ],
    powersAndLimits: [
      "The practical value of the appeal right is visible in Acts, where Paul's claim to citizenship stops a flogging and moves his case to Rome.",
      "But citizenship did not equalise. Wealth qualifications governed office, the assemblies were weighted, and from the second century CE legal penalties differed by rank regardless of citizenship.",
    ],
    change: [
      "The Social War of 91-88 BCE ended with the enfranchisement of Rome's Italian allies, which multiplied the citizen body and permanently changed Italian politics.",
      "In 212 CE the Antonine Constitution granted citizenship to virtually all free inhabitants of the empire. Cassius Dio attributes the motive to tax revenue; the surviving papyrus text is damaged at the crucial point.",
    ],
    keyPoints: [
      {
        claim: "Auxiliary veterans received citizenship on discharge.",
        detail:
          "Attested by hundreds of surviving bronze military diplomas naming the recipient and the grant.",
        level: "documented",
      },
      {
        claim: "The Antonine Constitution of 212 CE extended citizenship almost universally.",
        detail:
          "Attested by Cassius Dio and by the Giessen papyrus, and confirmed by the sudden appearance of the name Aurelius across the provinces.",
        level: "documented",
      },
      {
        claim: "The motive for the 212 grant is disputed.",
        detail:
          "Dio says taxation. Others read it as regularising a status most provincials had in practice. The papyrus is broken where the reason is given.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "civitas", gloss: "Citizenship: the legal status and the community holding it." },
      { term: "ius Latii", gloss: "The Latin right: an intermediate status short of full citizenship." },
      { term: "provocatio", gloss: "The right of appeal against a magistrate's summary punishment." },
    ],
    primarySources: [
      S("Military diplomas", "CIL XVI", "Bronze certificates recording grants of citizenship to discharged auxiliaries.", "Roman state"),
      S("Roman History", "78.9", "The Antonine Constitution and the motive attributed to it.", "Cassius Dio"),
      S("Annals", "11.23-25", "The debate on admitting Gauls to the Senate, with the emperor's speech also surviving on bronze.", "Tacitus"),
    ],
    relatedInstitutions: ["roman-assemblies", "roman-law", "roman-provinces", "census-and-assessment", "roman-taxation"],
    citySlugs: ["rome"],
    architectureRefs: ["forum"],
    warfareRefs: ["recruitment"],
    figureRefs: ["cicero", "tacitus", "augustus", "trajan"],
    themeRefs: ["citizenship", "empire", "law", "justice"],
  },
  {
    slug: "roman-provinces",
    title: "Provincial government",
    standfirst:
      "An empire of some fifty million people administered by a few hundred Roman officials — which tells you at once where the actual work was done.",
    description:
      "How Rome governed its provinces: the governor's imperium, the tiny official staff, reliance on civic elites, the extortion court, and the division into imperial and senatorial provinces.",
    tier: "roman-state",
    civilizations: ["roman-republic", "rome", "principate", "late-empire"],
    period: "241 BCE – late empire",
    whatItWas: [
      "A provincia originally meant a magistrate's sphere of duty, and only later a territory. Sicily in 241 BCE is conventionally the first in the territorial sense.",
      "A province was governed by a single Roman official holding imperium, responsible for justice, defence and the collection of revenue, and normally serving for one year.",
    ],
    howItWorked: [
      "The governor travelled a circuit of assize centres hearing cases, issued an edict at the start of his term stating how he would administer the law, and commanded any troops stationed there.",
      "His personal staff was tiny — a quaestor, some legates, friends and freedmen. Everything else ran through the existing cities, whose councils collected taxes, maintained order and paid for local building. The empire was governed by co-opting local elites, not by replacing them.",
    ],
    powersAndLimits: [
      "The governor's power over non-citizens was close to unlimited in practice, and the standing extortion court at Rome was the main check. Cicero's prosecution of Verres is the fullest surviving account of what a bad governor could do and how hard he was to convict.",
      "Distance was the real constraint. A letter to Rome and back could take weeks, so most decisions were made locally — as Pliny's correspondence with Trajan shows, even a conscientious governor writing constantly for instructions was mostly acting alone.",
    ],
    change: [
      "In 27 BCE the provinces were divided: those needing armies went to the emperor and were governed by his legates, the rest remained with the Senate under proconsuls. The distinction preserved republican form while placing the armed provinces under one man.",
      "Diocletian multiplied the provinces, reduced their size, and separated civil from military command — a deliberate answer to governors who had used a province as a base for usurpation.",
    ],
    keyPoints: [
      {
        claim: "Provincial administration relied on civic elites rather than a Roman bureaucracy.",
        detail:
          "The size of a governor's staff is documented and is trivially small relative to the population governed.",
        level: "documented",
      },
      {
        claim: "The extortion court was the principal formal check on governors.",
        detail:
          "The quaestio de repetundis is attested from 149 BCE, and the Verrines document one prosecution in extraordinary detail.",
        level: "documented",
      },
      {
        claim: "How far ordinary provincials benefited is argued.",
        detail:
          "Peace, roads and law against tribute, conscription and expropriation — the balance differed by region and period, and the evidence is written overwhelmingly by beneficiaries.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "provincia", gloss: "Originally a sphere of duty; later a governed territory." },
      { term: "conventus", gloss: "An assize centre where the governor heard cases on circuit." },
      { term: "repetundae", gloss: "Extortion: the charge on which a governor could be prosecuted at Rome." },
    ],
    primarySources: [
      S("Against Verres", "2.1-5", "A prosecution of a governor of Sicily: the fullest surviving picture of provincial administration and its abuse.", "Cicero"),
      S("Letters", "10", "A governor of Bithynia writing to Trajan about roads, finances, fires and Christians, with the emperor's replies.", "Pliny the Younger"),
      S("Agricola", "19-21", "A governor of Britain as described by his son-in-law, including a hostile account of what Romanisation meant.", "Tacitus"),
    ],
    relatedInstitutions: ["praetor", "consul", "quaestor", "roman-taxation", "imperial-administration", "roman-citizenship"],
    citySlugs: ["rome", "alexandria"],
    architectureRefs: ["forum", "basilica"],
    warfareRefs: ["command-structure", "roman-roads"],
    figureRefs: ["cicero", "pliny-the-younger", "tacitus", "trajan", "diocletian"],
    themeRefs: ["provincial-government", "empire", "statecraft", "law"],
  },
  {
    slug: "roman-taxation",
    title: "Taxation and the treasury",
    standfirst:
      "Rome taxed land, heads and trade — and for two centuries collected some of it by auctioning the right to collect to private companies.",
    description:
      "Roman public finance: tributum, the publicani and tax farming, the aerarium and fiscus, indirect taxes, and the reforms that replaced contractors with officials.",
    tier: "roman-state",
    civilizations: ["roman-republic", "rome", "principate", "late-empire"],
    period: "Republic – late empire",
    whatItWas: [
      "The main direct taxes were on land and on persons, levied in the provinces. Roman citizens in Italy were relieved of the direct war levy from 167 BCE, which is one of the clearest statements of what conquest was for.",
      "Indirect taxes — customs dues at provincial boundaries, a tax on the sale of slaves, a five per cent duty on inheritances — fell more widely.",
    ],
    howItWorked: [
      "Under the Republic the right to collect certain taxes was auctioned to companies of publicani, who paid the state and kept what they gathered. The system delivered revenue without a bureaucracy and produced the abuses one would expect.",
      "The treasury proper, the aerarium, was in the temple of Saturn under the quaestors and the Senate's control. Under the emperors the fiscus — the imperial account — grew alongside it, and the boundary between imperial and public money was never made clean.",
    ],
    powersAndLimits: [
      "Collection depended on knowing what there was to tax, which is why the census and the provincial assessment matter more to Roman finance than any rate.",
      "The Principate progressively replaced contractors with salaried procurators for the direct taxes, though contracting persisted for customs. The change is usually read as a gain in control rather than in fairness.",
    ],
    change: [
      "Augustus reorganised provincial assessment and introduced the inheritance tax to fund veterans' discharge payments, which had been the fiscal problem behind a century of political crisis.",
      "Diocletian's reform recast assessment on units of land and labour, with periodic revisions — a system that made the tax bill predictable to the state and heavy in a way the surviving complaints make plain.",
    ],
    keyPoints: [
      {
        claim: "Citizens in Italy paid no direct war levy after 167 BCE.",
        detail:
          "Attested in the historical tradition and connected explicitly to the wealth taken from Macedon.",
        level: "documented",
      },
      {
        claim: "Tax collection was contracted to private companies under the Republic.",
        detail:
          "The publicani are documented in inscriptions, in Cicero's correspondence and in the legislation regulating them.",
        level: "documented",
      },
      {
        claim: "Total imperial revenue cannot be calculated.",
        detail:
          "No budget survives. Modern totals are constructed from army pay, coin output and assumed population, and vary by large factors depending on the assumptions.",
        level: "unknown",
      },
    ],
    terms: [
      { term: "tributum", gloss: "Direct tax on land or persons, levied in the provinces." },
      { term: "publicani", gloss: "Private companies that bought the right to collect certain taxes." },
      { term: "aerarium", gloss: "The public treasury in the temple of Saturn, under the quaestors." },
      { term: "fiscus", gloss: "The imperial account, whose boundary with public funds was never fully defined." },
    ],
    primarySources: [
      S("Letters to Atticus", "5-6", "A governor dealing with tax companies and provincial debt in Cilicia.", "Cicero"),
      S("Achievements of the Divine Augustus", "15-18", "Payments made from the emperor's own account, as the emperor wished them recorded.", "Augustus"),
      S("Annals", "1.11, 2.42", "Provincial complaints about tribute, and the accounts left by Augustus.", "Tacitus"),
    ],
    relatedInstitutions: ["quaestor", "census-and-assessment", "roman-provinces", "imperial-administration", "censor"],
    citySlugs: ["rome", "alexandria"],
    architectureRefs: ["forum"],
    warfareRefs: ["recruitment", "logistics", "roman-roads"],
    figureRefs: ["cicero", "augustus", "tacitus", "diocletian"],
    themeRefs: ["administrative-state", "empire", "statecraft"],
  },
  {
    slug: "census-and-assessment",
    title: "The census and assessment",
    standfirst:
      "The count that decided which century a man voted in, what tax he paid, and whether he could be conscripted — administration as the foundation of politics.",
    description:
      "The Roman census and provincial assessment: how registration worked, what it determined, the surviving figures and why they are so hard to interpret.",
    tier: "roman-state",
    civilizations: ["roman-republic", "rome", "principate", "late-empire"],
    period: "Republic – late empire",
    whatItWas: [
      "The census was a periodic registration of citizens with their property, conducted by the censors and concluded with a purification ceremony. It fixed each man's class, his voting century, his tax liability and his liability to service.",
      "In the provinces, assessment served the same purpose without the political dimension: a register of land, people and livestock on which the tribute was calculated.",
    ],
    howItWorked: [
      "Citizens declared themselves and their property on oath. False declaration was punishable, and the censors could move a man between classes or remove him from the Senate on the basis of what the register showed.",
      "Provincial assessment was carried out by officials sent for the purpose, and could be resisted violently — census-taking is among the commonest triggers of provincial revolt in the sources.",
    ],
    powersAndLimits: [
      "The census made the Roman state legible to itself in a way most ancient states were not, and is the reason Roman figures for citizen numbers exist at all.",
      "But what the surviving totals count is genuinely uncertain. The figures for the late Republic and the Augustan period differ so sharply that they cannot all be counting the same category of person.",
    ],
    change: [
      "Under the Principate the censorial function was absorbed by the emperor; Augustus records conducting the count three times.",
      "Diocletian's system tied assessment to notional units of land and labour with regular revision, replacing an intermittent count with a standing fiscal register.",
    ],
    keyPoints: [
      {
        claim: "Census figures survive for many years of the Republic.",
        detail:
          "Preserved in the historical tradition, giving a rare run of quantitative data for an ancient state.",
        level: "documented",
      },
      {
        claim: "What the Augustan figures count is disputed.",
        detail:
          "They are several times the earlier totals. Whether adult males, or all citizens including women and children, is the central question in Roman demography and is unresolved.",
        level: "disputed",
      },
      {
        claim: "The census figures are not a population count of Italy.",
        detail:
          "What the tradition preserves is a series of registration totals, not counts of inhabitants. They record citizens only, exclude the whole non-citizen and slave population, and depend on the state's capacity to enforce registration.",
        level: "documented",
      },
    ],
    terms: [
      { term: "census", gloss: "The periodic registration of citizens and their property." },
      { term: "lustrum", gloss: "The purification ceremony closing a census, and so the five-year interval." },
      { term: "professio", gloss: "The sworn declaration a citizen made to the censors." },
    ],
    primarySources: [
      S("Achievements of the Divine Augustus", "8", "Three censuses and their totals, as recorded by the emperor.", "Augustus"),
      S("History of Rome", "1.42-44, and the census notices throughout", "The institution's traditional origin and the recurring figures.", "Livy"),
    ],
    relatedInstitutions: ["censor", "roman-taxation", "roman-assemblies", "roman-citizenship", "roman-provinces"],
    citySlugs: ["rome"],
    architectureRefs: ["forum"],
    warfareRefs: ["recruitment"],
    figureRefs: ["augustus", "livy", "diocletian"],
    themeRefs: ["administrative-state", "statecraft", "citizenship"],
  },
  {
    slug: "imperial-administration",
    title: "Imperial administration",
    standfirst:
      "A monarchy that ran for a century on the emperor's household staff, and only slowly admitted that it was a government.",
    description:
      "How the emperors governed: household freedmen and the growth of the bureaux, equestrian procurators and prefects, the consilium, imperial rescripts, and the Diocletianic reorganisation.",
    tier: "roman-state",
    civilizations: ["principate", "rome", "late-empire"],
    period: "27 BCE – late empire",
    whatItWas: [
      "The emperor governed through his own household before he governed through offices. The great bureaux of the first century — correspondence, petitions, accounts — were staffed by imperial freedmen, and their heads were among the most powerful men in the empire while remaining, formally, servants.",
      "Alongside them stood equestrian appointments: procurators managing imperial finances and estates, and prefects commanding Egypt, the grain supply, the fleets and the praetorian guard.",
    ],
    howItWorked: [
      "Much of the emperor's work was answering. Cities, officials and individuals petitioned; the reply, a rescript, was authoritative and was collected, which is how imperial rulings became a major source of law.",
      "The emperor decided with a consilium of advisers, including jurists. There was no cabinet in any formal sense, and the composition of the circle around a given emperor is often the most useful thing to know about his reign.",
    ],
    powersAndLimits: [
      "The republican magistracies continued, and senators still governed provinces and commanded armies — but by imperial appointment. The old constitution was not abolished; it was staffed.",
      "The system's limits were information and loyalty. Pliny's letters show a governor unable to settle routine questions without writing to Rome, and the third century shows what happened when provincial armies stopped waiting for permission.",
    ],
    change: [
      "Hadrian is associated with the shift from freedmen to equestrians at the head of the bureaux, which converted household service into a career structure.",
      "Diocletian and Constantine completed the change: provinces subdivided and grouped into dioceses and prefectures, civil separated from military command, and a titled hierarchy of offices with a formal court.",
    ],
    keyPoints: [
      {
        claim: "The early imperial bureaux were staffed by imperial freedmen.",
        detail:
          "Attested in inscriptions recording their posts and in the hostility of senatorial authors to their influence.",
        level: "documented",
      },
      {
        claim: "Imperial rescripts became a principal source of law.",
        detail:
          "Preserved in large numbers in the Codes, where they are cited by date and addressee.",
        level: "documented",
      },
      {
        claim: "How far the emperors pursued policy rather than responded to petitions is argued.",
        detail:
          "The surviving material is overwhelmingly reactive. Whether that reflects how emperors governed or only what was worth preserving cannot be settled from the evidence.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "rescriptum", gloss: "An emperor's written answer to a petition or query, carrying legal force." },
      { term: "procurator", gloss: "An equestrian official managing imperial finances or estates." },
      { term: "consilium principis", gloss: "The advisers with whom an emperor deliberated; not a formal body." },
    ],
    primarySources: [
      S("Letters", "10", "A provincial governor and an emperor in continuous correspondence about the business of government.", "Pliny the Younger"),
      S("Annals", "throughout", "The imperial court seen by a hostile senator.", "Tacitus"),
      S("Codex Justinianus", "throughout", "Imperial rescripts preserved by date and addressee.", "Justinian's commission"),
    ],
    relatedInstitutions: ["roman-senate", "roman-provinces", "roman-taxation", "roman-law", "consul"],
    citySlugs: ["rome", "alexandria"],
    architectureRefs: ["forum", "basilica", "palace"],
    warfareRefs: ["command-structure", "roman-roads"],
    figureRefs: ["augustus", "tacitus", "pliny-the-younger", "hadrian", "trajan", "diocletian", "constantine"],
    themeRefs: ["imperial-administration", "governance-at-scale", "empire", "statecraft"],
  },

  // ─── Near Eastern and Egyptian administration ────────────────────────
  {
    slug: "satrap",
    title: "The satrap",
    standfirst:
      "A Persian provincial governor with a court, an army and a treasury of his own — the office that made an empire of that size governable, and that made it possible to rebel.",
    description:
      "The Achaemenid satrapy: the satrap's powers, tribute assessment, the royal road and the king's inspectors, and the recurring problem of governors strong enough to revolt.",
    tier: "near-eastern",
    civilizations: ["persia"],
    period: "c. 550 – 330 BCE",
    whatItWas: [
      "A satrap was the king's governor of a province of the Achaemenid empire, responsible for tribute, order, and the provision of troops on demand. The Greek word satrapes renders an Old Persian title meaning protector of the realm.",
      "Satraps held court in their provincial capitals, kept substantial households, and in the western satrapies conducted their own dealings with Greek cities — sometimes with, sometimes without, the king's direction.",
    ],
    howItWorked: [
      "The empire was assessed for tribute by province. Herodotus gives a list of districts with their annual payments, which is the fullest account we have and is not straightforwardly a fiscal document.",
      "The king maintained his own communications and inspection: the royal road with staged relays, and travelling officers whose reports bypassed the satrap. Administrative tablets from Persepolis show the ration and travel system that supported this in unusual detail.",
    ],
    powersAndLimits: [
      "Persian rule left local law, religion and often local rulers in place. Cyrus's treatment of Babylon and the repatriation recorded in the Hebrew Bible were remembered as policy rather than exception.",
      "The structural weakness was that a satrap who controlled revenue and troops could revolt, and several did. The satraps' revolts of the mid-fourth century BCE are attested, though their scale and coordination are argued.",
    ],
    change: [
      "The system was inherited by Alexander and retained by the Seleucids, which is one of the clearest cases of an administrative institution outliving the empire that created it.",
      "Under the successors the title persisted with changed content, and the Parthians used a comparable structure of provincial governors.",
    ],
    keyPoints: [
      {
        claim: "The Achaemenid empire was administered through provincial governors under a king.",
        detail:
          "Attested in Persian royal inscriptions, in the Persepolis administrative archives, and in Greek accounts.",
        level: "documented",
      },
      {
        claim: "Local law and religion were generally left in place.",
        detail:
          "Supported by the Cyrus Cylinder, by Egyptian and Babylonian documents, and by the biblical record of return from exile.",
        level: "documented",
      },
      {
        claim: "Herodotus's tribute list cannot be taken as an imperial budget.",
        detail:
          "It is a Greek reconstruction, its districts do not match the Persian lists exactly, and its figures are converted into Greek weights. It is evidence about the system, not an account of it.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "satrapy", gloss: "A province of the Achaemenid empire under a royal governor." },
      { term: "royal road", gloss: "The staged relay road linking the western satrapies to the Persian centre." },
    ],
    primarySources: [
      S("Histories", "3.89-97, 5.52-54", "The tribute districts and the royal road, described by a Greek at a distance.", "Herodotus"),
      S("Anabasis", "1", "A satrap of Asia Minor raising an army against the king, seen from inside his forces.", "Xenophon"),
      S("Behistun Inscription", "1-4", "The king's own account of provinces, rebellion and restoration.", "Darius I"),
    ],
    relatedInstitutions: ["imperial-administration", "pharaonic-administration", "roman-provinces"],
    citySlugs: ["babylon", "persepolis"],
    architectureRefs: ["palace"],
    warfareRefs: ["persian-army", "command-structure"],
    figureRefs: ["cyrus-the-great", "darius-i", "xerxes-i", "xenophon"],
    themeRefs: ["satrapies", "royal-road", "empire", "statecraft"],
  },
  {
    slug: "pharaonic-administration",
    title: "Pharaonic administration",
    standfirst:
      "Three thousand years of government by scribe: a vizier, a granary, a treasury, and the most durable written bureaucracy of the ancient world.",
    description:
      "Egyptian state administration: the vizier, nomes and nomarchs, the scribal class, granary and treasury, and how the Ptolemaic and Roman regimes took the machinery over.",
    tier: "near-eastern",
    civilizations: ["egypt"],
    period: "c. 3000 BCE – Roman period",
    whatItWas: [
      "Egypt was governed for the king by a vizier — at times two, one for Upper and one for Lower Egypt — with departments for the treasury, the granaries, public works and the army.",
      "The country was divided into nomes under nomarchs. Whether those officials were royal appointees or local dynasts varies by period, and the shift between the two is one of the standard indicators of central authority.",
    ],
    howItWorked: [
      "Administration was scribal to an unusual degree. Literacy was the qualification for office, scribal schools trained for it, and the resulting documents — census lists, ration accounts, work rosters, court records — are the reason Egyptian administration is knowable at all.",
      "Revenue was assessed on land and collected largely in grain, stored in state granaries and paid out as rations. The Nile flood was measured and the measurement used in assessment.",
    ],
    powersAndLimits: [
      "The system survived changes of dynasty, foreign rule and the collapse of central authority, and was reassembled each time. Its persistence is the strongest evidence for how well it worked.",
      "It also broke. The intermediate periods show central authority failing and nomarchs governing on their own account; a New Kingdom papyrus records a strike by the workmen of the royal tombs when rations failed.",
    ],
    change: [
      "The Ptolemies added a Greek-speaking administrative layer above the existing one and greatly increased documentation, producing the papyrus record on which much of ancient economic history rests.",
      "Rome governed Egypt as an imperial possession under an equestrian prefect, with senators barred from entering without permission — an acknowledgement of what control of the grain supply meant.",
    ],
    keyPoints: [
      {
        claim: "Egyptian administration was documented in writing at every level.",
        detail:
          "Attested by surviving administrative papyri and ostraca, including ration lists, work rosters and legal records.",
        level: "documented",
      },
      {
        claim: "A strike over unpaid rations is recorded at Deir el-Medina.",
        detail:
          "The Turin Strike Papyrus records work stoppages by the royal tomb workmen in the reign of Ramesses III.",
        level: "documented",
      },
      {
        claim: "How centralised the state actually was at any given moment is argued.",
        detail:
          "The official record presents unified royal control by convention. Reading actual central capacity from monumental and administrative sources is a standing methodological problem.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "vizier", gloss: "The chief minister; at times two, for Upper and Lower Egypt." },
      { term: "nome", gloss: "An administrative district of Egypt, under a nomarch." },
      { term: "ostracon", gloss: "A potsherd or limestone flake used for everyday administrative writing." },
    ],
    primarySources: [
      S("Turin Strike Papyrus", "recto", "Work stoppages by the royal tomb workmen when rations failed.", "Egyptian scribes"),
      S("Duties of the Vizier", "tomb of Rekhmire", "An official statement of the vizier's responsibilities, inscribed in his tomb.", "Egyptian state"),
      S("Histories", "2.108-109, 2.164-168", "Egyptian administration and land assessment described by a Greek visitor.", "Herodotus"),
    ],
    relatedInstitutions: ["satrap", "imperial-administration", "roman-provinces"],
    citySlugs: ["alexandria", "memphis"],
    architectureRefs: ["temple", "pyramid"],
    warfareRefs: ["egyptian-warfare"],
    figureRefs: ["imhotep", "akhenaten"],
    themeRefs: ["administrative-state", "statecraft", "nile-and-civilization"],
  },
];

const INST_BY_SLUG = new Map(INSTITUTIONS.map((i) => [i.slug, i]));

export function getInstitution(slug: string): Institution | undefined {
  return INST_BY_SLUG.get(slug);
}

export function institutionsByTier(tier: InstitutionTier): Institution[] {
  return INSTITUTIONS.filter((i) => i.tier === tier);
}

export function institutionsForCity(citySlug: string): Institution[] {
  return INSTITUTIONS.filter((i) => i.citySlugs.includes(citySlug));
}
