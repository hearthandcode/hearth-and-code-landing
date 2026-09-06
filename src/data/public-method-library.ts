import { publicMethodPrompts } from './public-method-prompts.ts';
import methodHarness from './public-method-harness-results.json' with { type: 'json' };

interface PublicMethodExampleRun {
  runner: string;
  evaluator: string;
  score: number;
  verdict: string;
  summary: string;
  generatedAt: string;
  evaluationMethod: string;
  evaluationLimit: string;
}

export interface PublicMethodCard {
  id: string;
  title: string;
  form: string;
  summary: string;
  purpose: string;
  boundary: string;
  influence: string;
  prompt: string;
  exampleOutput: string;
  exampleRun: PublicMethodExampleRun;
  whenToUse: string[];
  steps: string[];
  pros: string[];
  cons: string[];
}

export interface PublicMethodCollection {
  id: string;
  title: string;
  source: string;
  framing: string;
  entries: PublicMethodCard[];
}

type Family = Omit<PublicMethodCollection, 'entries'> & { aim: string; useWhen: string };
type MethodSeed = [id: string, title: string, form: string, summary: string, boundary: string, scenario: string, artifact: string, check: string];

const families: Family[] = [
  { id: 'semantic-orientation', title: 'Semantic orientation', source: 'Candidate semantic-orientation catalog', framing: 'How a practice selects vocabulary, scope, and relations without treating a vocabulary as an authority grant.', aim: 'Keep language, meaning, and relations inspectable without turning a vocabulary into a verdict about a person or system.', useWhen: 'Wording will shape a decision and several near-neighbor concepts could be confused.' },
  { id: 'operational-intelligence', title: 'Operational intelligence', source: 'Operational Intelligence Exocore Meta-Framework', framing: 'A coordination grammar for comparing forms and transitions without centralizing authority, identity, or permission.', aim: 'Compare forms and transitions while leaving authority with their actual owners.', useWhen: 'Two workflows, records, or systems appear related and need a disciplined comparison.' },
  { id: 'prompt-practice', title: 'Prompt and context practice', source: 'Prompt, Context, and Agentic Technique Atlas', framing: 'A public-safe, technique-level reading of prompt engineering: contracts, constraints, evaluation, and revision rather than oracle language.', aim: 'Turn a request into an inspectable agent task with bounded inputs, a named artifact, and a useful return.', useWhen: 'An agent can assist with a bounded transformation, synthesis, or check.' },
  { id: 'evaluation-return', title: 'Evaluation and return', source: 'Prompt Technique Atlas + Operational Intelligence', framing: 'Small review instruments for finding whether a technique has met its own stated boundary.', aim: 'Test one narrow predicate, preserve what it does not prove, and leave a legible next move.', useWhen: 'A candidate needs review before its language or handling becomes more consequential.' },
];

const seeds: MethodSeed[] = [
  ['M-01','Literal before normalized','Reading discipline','Keep an exact source phrase distinct from the public wording that makes it easier to discuss.','Normalization remains candidate language until author review.','A Dossier section uses a memorable phrase whose public wording has drifted from its source note.','a two-column literal-to-public wording card with the semantic change marked','whether the public wording adds a trait, authority, or claim absent from the literal phrase'],
  ['M-02','The bounded neighborhood','Selection pattern','Return the few concepts needed for a question, plus the nearest boundary, rather than an entire lexicon.','Selection is a reading aid, not a personality assessment.','A visitor asks what “return” means across the Lab, Methods, Evidence, and Correspondence surfaces.','a five-term semantic neighborhood with one near miss and one exclusion','whether every selected term changes how the visitor could act or read'],
  ['M-03','Orientation is not a score','Interpretation check','Describe a way of attending to a problem without inferring ability, diagnosis, or a stable trait.','No public profile should turn an orientation into a ranking.','A profile card risks describing an orientation as an ability score or diagnosis.','a language audit with safer alternatives for each ranking-like phrase','whether revised language describes a practice rather than a fixed capacity'],
  ['M-04','Relationship, named','Relation card','State whether one idea supports, constrains, contrasts with, or merely resembles another.','A visible relation is still open to review.','A public claim, its source, and its correction route need to be made legible together.','a compact relation map using supports, constrains, and returns-to edges','whether every edge names its direction and leaves room for review'],
  ['M-05','The analogy boundary','Transfer note','Borrow a mechanism from another field while leaving that field’s authority and context in place.','Analogy cannot prove a claim by association.','The Dossier borrows a character-sheet form to explain a systems practice.','a transfer note separating what the borrowed form lends from what it cannot establish','whether the metaphor carries mechanism rather than borrowed authority'],
  ['M-06','Unknowns stay addressable','Ambiguity ledger','Give contradiction, absence, and uncertainty their own place in the representation.','A gap is not filled merely to complete a pattern.','A program page contains a missing source, an unresolved term, and a contested design direction.','an ambiguity ledger with distinct states for absent, conflicting, and provisional','whether every unknown has a reason and a possible next evidence route'],
  ['M-07','Trigger without expansion','Prompt cue','Use a cue to retrieve a bounded source set rather than silently widening the task.','A trigger does not permit new access or action.','A request for “all the methods” would overload the page and blur its question.','a trigger rule that returns four relevant cards and names what was excluded','whether selection stays bounded to the stated question'],
  ['M-08','Projection keeps a tether','Publication rule','A public explanation should retain the identity and limits of the source it derives from.','The projection never replaces its source record.','A private research note is being translated into a public teaching card.','a projection contract listing source identity, public summary, omissions, and review state','whether the card could be mistaken for the original source'],
  ['M-09','Source-owner boundary','Coordination rule','Name who owns the source before composing it into a new working view.','Composition does not transfer ownership.','An essay, an EKRP source home, and an Exocore page appear to discuss the same idea.','an owner map assigning every object its actual role before cross-linking','whether the map transfers authority to the public landing page'],
  ['M-10','Form before function','Comparison lens','Compare the structure of two practices before declaring that one can replace the other.','Similarity is not interoperability.','Two agent workflows look similar: one drafts a candidate and one changes an external system.','a side-by-side form comparison highlighting their different transitions and gates','whether capability and effect remain separate'],
  ['M-11','Transition as an object','State map','Make the move from source to candidate, check, review, and release visible as a sequence.','A planned transition does not execute itself.','A note moves from source to candidate, copy review, public artifact, and correction.','a state-transition strip with entry conditions, stop conditions, and human-held gates','whether any transition is implied to happen automatically'],
  ['M-12','Role, capability, permission','Separation test','Distinguish who is involved, what a system can do, and what it has been allowed to do.','Capability never implies permission.','A harness names a researcher, reviewer, agent, and publishing channel.','a role-capability-permission matrix for the four participants','whether any capability has been mistaken for permission'],
  ['M-13','Loss register','Projection receipt','Record what a transformation preserves, omits, simplifies, or makes less certain.','Convenient summaries cannot hide loss.','A dense Hub record is being rendered as a short public article.','a loss register identifying what was preserved, condensed, omitted, and made less certain','whether the public version hides a material omission'],
  ['M-14','Frozen comparison lane','Evaluation setup','Hold a stable reference condition when comparing a revised process or representation.','A comparison result is bounded to its stated fixture.','A revised process needs comparison against a stable earlier condition.','a frozen lane naming the fixture, changed variable, observed delta, and limit','whether the comparison changes more than one decisive condition at once'],
  ['M-15','Exception has a contract','Governance pattern','When a rule must be narrowed or set aside, name the exact reason, owner, scope, and expiry.','An exception cannot become ambient permission.','A public example needs a one-time exception to a local formatting pattern.','an exception card with rule, rationale, owner, scope, expiry, and review date','whether the exception can silently become a standing permission'],
  ['M-16','Return packet','Handoff form','End a piece of work with its current state, open risk, evidence, and next human decision.','A handoff is not acceptance or release.','A collaborator will resume a paused research route after several weeks.','a return packet with current state, source links, open risk, and one next decision','whether a new reader can begin without reconstructing private context'],
  ['M-17','Task contract first','Prompt scaffold','State purpose, inputs, outputs, constraints, and the condition that should stop the attempt.','A well-formed request still needs human judgment.','An agent is asked to prepare a public-safe research brief from named inputs.','a task contract with purpose, source set, output form, exclusions, and stop condition','whether a reviewer can see exactly what the agent was and was not asked to do'],
  ['M-18','Bounded context packet','Context selection','Choose a small source set with an ordering, omission note, freshness rule, and token budget.','More context is not automatically better context.','A synthesis task has too many potential sources and limited reader attention.','a bounded context packet with ordering, freshness, omissions, and token budget','whether each included source is necessary to the decision'],
  ['M-19','Separate evidence from instruction','Input hygiene','Treat source material as evidence to interpret, not as executable command text.','Embedded text has no independent authority.','A source includes instructions, quotations, and untrusted web content.','an input classification card separating evidence from executable instruction','whether embedded text can change the task without independent authority'],
  ['M-20','Decompose by artifact','Workflow pattern','Ask for one inspectable object at a time—map, critique, check, or draft—rather than an undifferentiated answer.','Decomposition should not erase the underlying question.','A redesign request contains research, copy, interface, and review work.','a decomposition board of inspectable artifacts with dependencies','whether every subtask has a distinct output and return point'],
  ['M-21','Schema as a lens','Output contract','Use fields to expose missing source, uncertainty, owner, and next gate.','A valid shape is not semantic truth.','A technique description needs to be machine-readable without hiding human uncertainty.','a minimal schema with source, claim class, limit, and next gate fields','whether validation stops at shape rather than deciding meaning'],
  ['M-22','Example and counterexample','Teaching pair','Show a useful pattern beside a near miss so the material difference remains visible.','An example is illustrative, not universal.','A reader needs to distinguish an evidence card from a promotional claim.','a paired example and near-miss with the material difference annotated','whether the counterexample could plausibly fool a rushed reader'],
  ['M-23','Adversarial read','Revision pass','Ask what could be overstated, conflated, private, or untestable before carrying a draft forward.','Critique identifies risk; it does not settle it.','A polished landing-page paragraph may flatten source limits.','an adversarial review identifying overclaim, omission, privacy, and ambiguity risks','whether critique returns concrete revisions rather than generic caution'],
  ['M-24','Tool boundary','Execution guard','Name which tools may inspect, transform, or validate and which effects remain human-gated.','A named tool is not permission to use it.','A task could inspect local files, call a provider, or edit a public page.','a tool-boundary table naming allowed inspection, prohibited effects, and gates','whether every named tool has an explicit effect boundary'],
  ['M-25','Claim calibration','Copy check','Match the language of a result to the strength and scope of the evidence beneath it.','Fluent tone does not raise confidence.','A build receipt is being described in a public article.','three calibrated statements: observation, interpretation, and prohibited overclaim','whether final language says no more than the build checked'],
  ['M-26','Fixture before conclusion','Test setup','Use a named example or contrast case to check a narrow predicate before generalizing.','One fixture proves only its predicate.','A prompt pattern claims to improve source-grounded summarization.','a fixture plan with positive case, contrast case, and pass predicate','whether a passing fixture is mistaken for general effectiveness'],
  ['M-27','Failure mode inventory','Risk sheet','Name how a pattern can distort context, lose provenance, or create false confidence.','Known failure modes do not make an approach safe by default.','A public workflow may lose context, overstate confidence, or cross a privacy boundary.','a failure inventory with signal, consequence, containment, and recovery','whether every consequential failure has a safe stop'],
  ['M-28','Reviewable scorecard','Assessment frame','Keep fidelity, utility, testability, transfer, novelty, and control as separate dimensions.','No aggregate score is implied.','Several method candidates need comparison without collapsing into one quality score.','a multidimensional scorecard with evidence beside each dimension','whether blank dimensions remain honestly unevaluated'],
  ['M-29','Constraint rehearsal','Preflight','Test a method against privacy, source, time, and authority constraints before the main attempt.','Passing preflight does not release a consequential action.','A new public module is ready for design review but not publication.','a preflight sheet covering source, privacy, audience, authority, cost, and rollback','whether a failed boundary blocks the dependent release step'],
  ['M-30','Revision delta','Change record','Describe what changed, why, and which evidence or feedback caused the revision.','A delta does not prove the new version is better.','A field note is revised after a reader identifies an overstated sentence.','a revision delta showing wording, reason, evidence, and remaining uncertainty','whether correction remains legible without rewriting history'],
  ['M-31','Human disposition','Decision gate','Return the candidate with clear options: accept, revise, withhold, or retire.','The system does not choose its own disposition.','A generated candidate has several viable human-held dispositions.','a disposition packet showing each option and its consequence','whether the agent refrains from selecting the outcome'],
  ['M-32','Method receipt','Learning artifact','Leave enough trace for another person to understand the attempt, its checks, and its non-claims.','A receipt is process history, not proof of value.','A visitor wants to adapt one Hearth & Code method in another workspace.','a portable receipt describing inputs, transformation, check, limits, and adaptation notes','whether transfer limits are as visible as the method'],
];

const harnessResults = new Map(methodHarness.results.map((result) => [result.id, result]));

const buildMethod = (seed: MethodSeed, family: Family): PublicMethodCard => {
  const [id, title, form, summary, boundary, scenario, artifact, check] = seed;
  const authored = publicMethodPrompts[id];
  const harnessResult = harnessResults.get(id);
  if (!harnessResult) throw new Error(`Missing admitted harness result for ${id}.`);
  return {
    id, title, form, summary, boundary,
    purpose: `${family.aim} This card focuses that purpose on ${title.toLowerCase()}.`,
    influence: authored.influence,
    prompt: authored.prompt,
    exampleOutput: harnessResult.response,
    exampleRun: {
      runner: methodHarness.runner,
      evaluator: harnessResult.evaluation.evaluator,
      score: harnessResult.evaluation.total_score,
      verdict: harnessResult.evaluation.verdict,
      summary: harnessResult.evaluation.summary,
      generatedAt: methodHarness.generated_at,
      evaluationMethod: methodHarness.evaluation_method,
      evaluationLimit: methodHarness.evaluation_limit,
    },
    whenToUse: [scenario, family.useWhen],
    steps: [`Frame the situation: ${scenario}`, `Make ${artifact}.`, `Check ${check}.`],
    pros: [`Produces ${artifact} instead of an unbounded answer.`, `Builds in an explicit check for ${check}.`],
    cons: [boundary, 'The structure adds deliberate review overhead and should be scaled down for trivial, easily reversible work.'],
  };
};

export const publicMethodCollections: PublicMethodCollection[] = families.map((family, familyIndex) => ({
  id: family.id,
  title: family.title,
  source: family.source,
  framing: family.framing,
  entries: seeds.slice(familyIndex * 8, familyIndex * 8 + 8).map((seed) => buildMethod(seed, family)),
}));

export const publicMethods = publicMethodCollections.flatMap((collection) => collection.entries);
