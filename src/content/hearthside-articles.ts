export interface HearthsideArticle {
  slug: string;
  code: string;
  format?: string;
  title: string;
  dek: string;
  readTime: string;
  themes: string[];
  sections: Array<{ heading: string; paragraphs: string[] }>;
}

export const hearthsideArticles: HearthsideArticle[] = [
  {
    slug: 'meaning-before-machinery', code: 'N-05', title: 'Meaning Before Machinery', readTime: '6 min read', themes: ['semantic orientation', 'public practice', 'systems design'],
    dek: 'Before a system is allowed to become clever, it should be able to say what it is for, whose situation it touches, and what it cannot decide.',
    sections: [
      { heading: 'The room before the machine', paragraphs: [
        'There is a particular kind of design mistake that begins with motion. A team discovers a new tool, a model becomes more capable, a workflow begins to look automatable, and soon the room is arranged around the machine. The first questions become technical: which interface, which model, which integration, which evaluation. Those questions matter. They are simply not the first questions. Before machinery, there is a room: people with reasons for being there, materials with histories, decisions with consequences, and limits that may be more important than the feature list.',
        'Meaning before machinery is not an argument against making things. It is a reminder that making is always situated. A document assistant does not enter an empty document; it enters a practice of authorship, review, retention, and trust. A research agent does not enter a neutral archive; it enters an environment where sources vary in authority, privacy, freshness, and interpretability. If we begin with the machine alone, the setting becomes invisible precisely when it most needs to be held in view.'
      ] },
      { heading: 'A question is a kind of hearth', paragraphs: [
        'A good opening question gathers the work around it. It gives a task warmth without making it vague. “What is the smallest structure that preserves what matters?” is useful because it does not demand a maximal system. It asks us to notice what must travel with the work: a source, a reason, a boundary, a person who can decide, a path for correction. It makes restraint a design option rather than a failure to scale.',
        'This is also a practical discipline. When an idea arrives, write the question before the architecture. When a request reaches an agent, name the decision before asking for an output. When a new dataset appears, state what it may illuminate before asking it to explain anything. The question does not solve the work, but it prevents the work from pretending that its first available action is automatically its best action.'
      ] },
      { heading: 'The small grammar of an honest system', paragraphs: [
        'A public-facing system becomes easier to trust when it can distinguish a few basic things: source from projection, observation from interpretation, proposal from decision, check from proof. This is not bureaucratic decoration. It is an interface for human judgment. Without those distinctions, a helpful summary can wear the authority of a source, a clean build can sound like a product guarantee, and a plausible answer can become a decision by sheer fluency.',
        'Hearthside practice keeps these distinctions visible in small artifacts: a source ledger, a claim card, a check receipt, a return record. None of them needs to become a cathedral. Each is simply a way to leave a lantern on in the hallway. A later reader should be able to ask: where did this come from, what is being claimed, what did the check actually cover, and who still has the right to change the next step?'
      ] },
      { heading: 'What machinery is for', paragraphs: [
        'Once the meaning of the room is legible, machinery becomes more useful, not less. An agent can sort a bounded source set, draft a comparison, identify a missing field, generate alternative language, or test a narrow structural predicate. These are real forms of assistance. Their quality improves when the task has a declared object, boundary, and return. The machine is no longer asked to impersonate the whole practice. It is asked to help with a particular movement inside it.',
        'This is where a warm technical culture differs from a sentimental one. Warmth is not the absence of rigor. It is the refusal to hide rigor behind a cold wall of procedure. It means giving a collaborator enough context to understand the work, enough specificity to challenge it, and enough permission to say that the question itself may need revision. The hearth is not a retreat from the forge. It is the place where the forge’s work can be made inhabitable.'
      ] },
      { heading: 'A small practice for tomorrow', paragraphs: [
        'Try this at the beginning of the next complex task. Make four lines: the decision in view; the smallest source set; the boundary that must not be crossed; the person or moment to which the work returns. Then make the tool request. If the request cannot survive those four lines, it is not yet ready for a more elaborate prompt. If it can, you have already made the work more legible than a large share of automated systems.',
        'Meaning before machinery does not slow the work down for ceremony. It gives the work a place to stand. That place can be modest: a note, a field card, a conversation, an interface label. But it changes the posture of the system. It tells every participant that the visible output is not the only thing that matters; the conditions that made it possible matter too.'
      ] },
    ],
  },
  {
    slug: 'uncertainty-is-a-room', code: 'N-06', title: 'The Craft of Keeping Uncertainty Visible', readTime: '6 min read', themes: ['evidence', 'uncertainty', 'research interfaces'],
    dek: 'Uncertainty does not have to be buried beneath confidence or inflated into paralysis. It can be given a clear place in the working surface.',
    sections: [
      { heading: 'Unknown is not empty', paragraphs: [
        'A blank field is often made to look like a completed field. A missing source is silently replaced with a generalization. A contradiction is summarized into a consensus because consensus fits the layout more neatly. This is understandable: systems like completeness, and readers like an answer. But a clean surface purchased by hiding uncertainty is not clarity. It is a kind of false floor. Sooner or later someone steps through it.',
        'To keep uncertainty visible is not to turn every page into a disclaimer. It is to give unknowns a form. A source can be absent. A claim can be provisional. A term can be contested. A result can be structurally checked but semantically unreviewed. These are not embarrassing leftovers. They are conditions of honest work, and they become more useful when a reader can see what kind of uncertainty is present and what would change it.'
      ] },
      { heading: 'The difference between a limit and a fog', paragraphs: [
        'Fog tells us nothing except that somebody is reluctant to speak. A limit tells us where the edge is. “We cannot know this” is a foggy sentence unless it says why: the source is unavailable, the account is conflicting, the relevant review has not occurred, the scope was too narrow, the material is private, the observation does not support the inference. Naming the reason does not remove uncertainty. It makes the uncertainty navigable.',
        'This distinction is particularly important in agent-assisted work. A model can give an answer with a tone of completion even when the inputs were partial or the request was underspecified. The repair is not to make the system endlessly apologetic. The repair is to ask for an uncertainty register: what was directly supported, what was inferred, what was omitted, and what should be checked before someone acts on the result.'
      ] },
      { heading: 'Designing a place for doubt', paragraphs: [
        'A useful evidence surface has rooms for different claim classes. Observation: what was seen. Interpretation: what it might mean. Hypothesis: what could falsify it. Proposal: what someone might do next. Decision: what a responsible person chose. Receipt: what was attempted and under what constraints. The names can vary, but the separation matters. It lets readers disagree at the correct level instead of arguing over an undifferentiated block of certainty.',
        'This is a design problem as much as an epistemic one. The interface needs contrast, language, and hierarchy that make a reader feel the difference between “we saw,” “we think,” and “we suggest.” A public research practice should not reserve this distinction for an appendix. It should make the distinction part of the main reading experience, so that care is available to people who do not already know the internal vocabulary.'
      ] },
      { heading: 'Correction as hospitality', paragraphs: [
        'Once uncertainty has a place, correction can have one too. A correction path is not an embarrassment protocol. It is the front door through which a better reading can enter. Someone may notice an inaccessible page, an overstated sentence, a missing source, a mistaken interpretation, or a term that needs a different public explanation. If the work has no route for that observation, it treats its own first draft as more important than the people who encounter it.',
        'Correction does not require automatic change. In fact, it should not. The point is to preserve the concern, evaluate it against the source and context, then annotate, amend, withhold, or retire material through a human-held decision. The reader gets a legible way back in; the studio keeps responsibility for the disposition. That is more accountable than either rigid defensiveness or an untraceable stream of edits.'
      ] },
      { heading: 'A practice of visible edges', paragraphs: [
        'For the next research note, try adding three small lines at the end: “known from,” “still uncertain,” and “would change with.” The first links the note to its direct material. The second keeps an open edge from disappearing. The third turns uncertainty into an inquiry rather than a shrug. Over time, these lines become a habit of mind. They train a system to carry its own limits without becoming timid or evasive.',
        'There is a quiet confidence in this posture. It says that the work does not need to pretend to be final in order to be useful. A good field note can be temporary and still be generous. A candidate can be incomplete and still teach. Uncertainty, kept visible, is not the failure of knowledge. It is the room in which knowledge can remain alive.'
      ] },
    ],
  },
  {
    slug: 'a-humane-theory-of-provenance', code: 'N-07', title: 'A Humane Theory of Provenance', readTime: '6 min read', themes: ['provenance', 'correction', 'public research'],
    dek: 'Provenance is not paperwork added after the interesting work. It is the companion that helps a claim remain accountable when it leaves the room where it was made.',
    sections: [
      { heading: 'Every claim has a journey', paragraphs: [
        'A claim is never only a sentence. It has a journey behind it: a source was encountered, a selection was made, an interpretation was formed, a draft was shaped, a check was run, and someone decided whether the language could travel further. When the journey disappears, the sentence may remain elegant, but it becomes difficult to challenge. Readers are asked to trust a conclusion without being able to see what kind of bridge carried it there.',
        'A humane theory of provenance begins with a simple thought: people deserve to know enough about a public claim to locate its conditions. They do not need a dump of every internal note. They do need a way to distinguish source from retelling, observation from interpretation, and candidate from decision. Provenance is not exposure for its own sake. It is a form of care for the reader and for the future self who will have to understand what happened.'
      ] },
      { heading: 'Trace does not mean surveillance', paragraphs: [
        'There is an anxious version of provenance that attempts to retain everything. It mistakes traceability for total capture and turns the working environment into a surveillance machine. Hearthside practice takes another direction. Keep what is needed to interpret, review, correct, and resume the public object. Do not assume that raw sessions, private prompts, personal memory, or incidental metadata belong in the public trail.',
        'The boundary is part of the record. A good provenance note can say that source material was withheld, that an input was private, that a location may not be disclosed, or that the public projection omits operational detail. This does not make the work less accountable. It explains the exact shape of accountability that is available. The reader can see that an edge exists without being invited to speculate across it.'
      ] },
      { heading: 'The companion artifacts', paragraphs: [
        'Small companion artifacts do most of the work. A source ledger says what was consulted and in what role. A claim card says what is being asserted and what it does not establish. A receipt says what was attempted and what a check covered. A decision record says who held a disposition and what review condition remains. Together, these objects create a trail that is readable without becoming a bureaucracy of self-justification.',
        'The important word is companion. The provenance record accompanies the work; it does not replace it. An essay should still be an essay. A visual surface should still have grace. A prototype should still offer an experience. The companion record simply keeps the visible artifact from pretending to have emerged without conditions. It lets craftsmanship and accountability travel together.'
      ] },
      { heading: 'Correction is part of the lineage', paragraphs: [
        'A provenance trail that cannot accept correction is only a history of first drafts. Real work changes. A source is revised, a claim is found too broad, an accessibility barrier appears, a better term becomes available, a public sentence no longer carries its intended meaning. Correction should become part of the lineage rather than a quiet substitution that makes the past impossible to inspect.',
        'This does not mean every version must remain on stage forever. It means a change should retain enough explanation for a reader to understand the present object and its relation to what came before. Corrected, annotated, superseded, withheld, and retired are all meaningful states. They make revision legible without treating it as failure. A studio that can show revision is more trustworthy than one that appears never to need it.'
      ] },
      { heading: 'A small provenance practice', paragraphs: [
        'Before sharing an artifact, ask five quiet questions. What is its closest source? What is the artifact’s own claim? What changed between source and projection? What did the available check cover? Where can a reader bring a correction? The answers may fit in a few lines. If they do not exist yet, the work may still be useful internally, but it is not ready to imply a fuller public confidence.',
        'This is provenance at human scale. It does not make the work colder. It makes the work easier to enter, question, and continue. A reader is not asked to kneel before an output. They are invited to see the path by which it arrived, to understand where the path is incomplete, and to offer a better route when one becomes visible.'
      ] },
    ],
  },
  {
    slug: 'tools-in-a-bounded-room', code: 'N-08', title: 'Tools in a Bounded Room', readTime: '7 min read', themes: ['agent harnesses', 'governance', 'prompt practice'],
    dek: 'A useful agent is not an oracle or a colleague with invisible authority. It is a tool working inside a room whose doors, materials, and return path are clear.',
    sections: [
      { heading: 'The room has a door', paragraphs: [
        'The most practical way to think about an agent is not as a mind that has arrived in the workplace. It is as a tool operating inside a bounded room. The room has a door: a task enters with a purpose, a source set, and a limit. It has materials: the records and instructions that are actually in view. It has tools: things the agent may inspect or transform. It has a hearth: a human-held point of judgment to which the work returns. This picture is less dramatic than a story of autonomy, and considerably more useful.',
        'A bounded room prevents two familiar mistakes. The first is under-specification: a request so vague that the model fills gaps with invented context or generic language. The second is overreach: a request that treats access, capability, or a fluent output as permission to make a consequential move. The room gives the work an edge. It says both what can happen here and what must wait outside.'
      ] },
      { heading: 'Prompting as interior design', paragraphs: [
        'A prompt is often described as an instruction. It is also an arrangement of attention. It places certain materials within reach, gives a task its furniture, leaves other doors closed, and tells the assistant where to put the result. A strong prompt does not merely demand an answer. It names the object to be made, the sources that may inform it, the distinctions that must survive, and the point at which a person resumes responsibility.',
        'This is why a compact field card can be more powerful than a heroic prompt. The card can ask for a purpose, inputs consulted, method, check, limit, and next decision. Those fields make a request inspectable. They also give a reviewer something concrete to question. The point is not to produce a ritual. It is to make the task’s actual shape visible enough that the agent does not have to invent the shape for itself.'
      ] },
      { heading: 'Capability is not permission', paragraphs: [
        'A tool may be capable of searching, drafting, sorting, editing, or calling another service. None of those capabilities establishes that it should do the thing in the present task. Permission has a source, a scope, and an expiry. It may be given by a person, a policy, a local project boundary, or a specific release step. Keeping this distinction visible is not an obstacle to useful automation; it is how automation remains connected to the people who bear its consequences.',
        'The language matters. Rather than asking an agent to “take care of it,” ask it to prepare a candidate, identify missing information, compare alternatives, or run a named check. Rather than treating tool output as a verdict, treat it as evidence to inspect. Rather than calling a workflow autonomous, call it bounded, queued, reviewable, or held. These words are not cosmetic. They keep the public understanding of the system aligned with what the system can actually be trusted to do.'
      ] },
      { heading: 'The return path makes it social', paragraphs: [
        'A tool becomes part of a human practice when its output can return to someone in a form they can use. That means state, source, limit, and next action should travel together. A beautiful answer with no account of where it came from is difficult to challenge. A completed task with no stop condition is difficult to resume safely. A recommendation without an accountable decision holder is merely pressure disguised as help.',
        'The return path is also where warmth enters. A system can be precise without being hostile. It can say, “Here is what I could establish, here is what remains open, and here is the smallest next move available to you.” That is a more humane interaction than pretending the tool has closed the question. It leaves the person with agency, not a pile of output and an implied obligation to trust it.'
      ] },
      { heading: 'A prompt to try', paragraphs: [
        'Before an agent task, write a small room around it: “We are trying to decide… The sources in view are… Do not use or infer… Return a candidate that separates observation, interpretation, and proposal… Stop before external action… Leave the next decision for a person.” This prompt will not make every result correct. It will make the result more inspectable, and that is a meaningful improvement in the kind of work that often arrives as a black box.',
        'The purpose of the bounded room is not to shrink imagination. It is to give imagination somewhere safe to work. Inside a clear boundary, an agent can be playful, analytic, generative, and fast. At the threshold, a person can decide whether the work should cross into the next room. That is not a failure of automation. It is the shape of responsible assistance.'
      ] },
    ],
  },
  {
    slug: 'typed-context-for-real-work', code: 'N-09', format: 'Technical article', title: 'Typed Context for Real Work', readTime: '8 min read', themes: ['TCCP', 'context design', 'claim grammar'],
    dek: 'Typed context is a small discipline for stopping sources, claims, proposals, decisions, and receipts from borrowing one another’s authority.',
    sections: [
      { heading: 'Context is more than what fits in the window', paragraphs: [
        'In technical work, context is often reduced to whatever text, tickets, files, or tool output happens to be available at a given moment. That is useful as a storage description, but weak as a working description. A source file, an interpretation of that file, a proposed change, a build receipt, and an approval may all be displayed together. They should not therefore be treated as the same kind of thing. They carry different permissions, different failure modes, and different questions for a reader.',
        'Typed context makes those distinctions explicit. A source is material that can be inspected. A claim is a statement about that material. A proposal is a candidate next move. A decision is a human-held disposition. A receipt records an attempt and its stated result. The names are modest, but they prevent a common systems error: allowing a useful output to inherit the authority of whatever sits next to it.'
      ] },
      { heading: 'Types are questions, not decorations', paragraphs: [
        'A type label is only useful when it changes how we read an object. If an item is marked source, a reader should be able to ask where it came from, which revision is in view, and what scope was inspected. If it is marked claim, the questions change: what supports it, what does it leave out, and how strong is the language? If it is a proposal, the question is not whether it is true but whether a person wants to carry it into review. The label creates a different responsibility at the boundary.',
        'This does not require a universal ontology or a sprawling schema. A small task can use a five-line packet: purpose, source set, claim class, boundary, return. The point is to select the minimum grammar that exposes the relation that matters. In one setting, freshness is essential; in another, consent or ownership is the decisive field. Typing should make the real condition visible, not impose a generic administrative costume on every piece of work.'
      ] },
      { heading: 'A candidate packet in practice', paragraphs: [
        'Imagine a researcher asks for a public explanation of a new system pattern. The direct material might be a set of internal design notes, but the public object must not reproduce the notes. A bounded context packet could name the eligible source family, the public audience, the prohibited details, the requested artifact, and the fact that its language remains a candidate. The draft then has somewhere to stand: it is neither a raw source nor a settled statement on behalf of the studio.',
        'The return should be typed as carefully as the input. “Build passes” is a receipt: it says a named compilation completed under stated conditions. “The page is accessible” is a larger claim that needs its own inspection. “Ready to publish” is a decision that belongs with an accountable human release. These distinctions do not diminish a successful technical check. They give the check its proper dignity by refusing to ask it to certify things it never examined.'
      ] },
      { heading: 'The technical payoff is better change', paragraphs: [
        'When context is typed, a system can be more flexible without becoming more reckless. A renderer can turn source-bound records into a public card while carrying a visible omission note. A prompt can request a comparison without silently authorizing an edit. A review interface can show which statements are observations and which are design directions. A future collaborator can resume from a receipt without mistaking the receipt for acceptance. These are ordinary engineering benefits: fewer category mistakes, clearer handoffs, and more legible rollback paths.',
        'Typed context is not a claim that a system has captured meaning completely. Meaning still has to be interpreted, contested, and revised. The discipline simply gives those human activities a clearer surface. Instead of collapsing everything into “the context,” it lets a team ask a more useful question: what kind of object is this, what may it support, and what must still return to a person?'
      ] },
    ],
  },
  {
    slug: 'knowledge-representation-without-a-black-box', code: 'N-10', format: 'Technical article', title: 'Knowledge Representation Without a Black Box', readTime: '8 min read', themes: ['EKRP', 'provenance', 'application profiles'],
    dek: 'A knowledge representation can be technical and still remain readable when it shows its sources, transformations, omissions, and human review points.',
    sections: [
      { heading: 'Representation begins with an agreement about reading', paragraphs: [
        'Knowledge representation is often introduced as a matter of graphs, schemas, query languages, or ontologies. Those can all be useful tools. But before a representation becomes computational, it is an agreement about how an object may be read. Is this record a source, a summary, an unresolved question, a working hypothesis, or a release decision? Who owns it? What information is intentionally absent? Which version is in view? A representation that cannot answer these questions may still be technically tidy while remaining operationally opaque.',
        'The public-facing ambition of an application profile such as EKRP is not to promise a magical knowledge layer. It is to create a local, reviewable way of connecting records that have different roles. The profile is a candidate bridge between established reference practices and a particular setting. It does not declare itself a replacement standards stack, and it does not become a deployed service merely because it has a coherent model.'
      ] },
      { heading: 'The evidence packet is a readable unit of work', paragraphs: [
        'A useful evidence packet can be smaller than a graph database and more durable than an unstructured note. It gathers a bounded question, the direct materials in view, a set of observations, interpretations that remain distinguishable from those observations, limits, and a next review question. It is not a bag of documents. It is a deliberately shaped object that makes the relationship between material and reasoning inspectable.',
        'The word bounded matters. A public packet may retain source identity without exposing the raw source. It may record that relevant material exists but is private, stale, conflicting, or unavailable. This is not a defect in the packet. It is part of what the packet needs to communicate. A black-box representation hides its conditions of use; a readable one makes those conditions available to the person deciding how much confidence to place in it.'
      ] },
      { heading: 'Projection is a transformation, not a synonym', paragraphs: [
        'The same research record may become a technical article, a method card, a diagram, or a review checklist. Each of these is a projection: a transformation for a new audience and purpose. Treating the projection as if it were the source creates a familiar kind of drift. Condensed wording looks definitive. A visual summary seems to cover details it omits. A public teaching case appears to describe a live system. The remedy is not to make every surface unreadably dense; it is to preserve a tether to what the projection is and is not.',
        'A practical projection receipt can name the source family, the intended audience, the transformation performed, material omissions, the current review state, and the correction route. This is lightweight metadata with a serious purpose. It helps a future reader understand why a page says what it says, and it gives a maintainer a way to revise the page without pretending the prior version never existed.'
      ] },
      { heading: 'Review gates keep the representation human-scale', paragraphs: [
        'Representations become risky when their apparent completeness quietly turns into authority. A well-connected record can make it tempting to treat the next action as already decided. A synthesis can appear to select its own sources or establish its own permission. Review gates interrupt that slide. They separate the act of organizing material from the act of accepting its meaning, changing a system, or releasing a public claim.',
        'For builders, the practical lesson is simple: expose the provenance, show the claim class, record the loss, and keep consequential transitions attached to an accountable disposition. This does not make a knowledge system less capable. It makes its capability easier to place. A representation becomes more useful when a reader can see not only what it contains, but where it stops and who is still responsible for what happens next.'
      ] },
    ],
  },
  {
    slug: 'operational-intelligence-as-comparison-practice', code: 'N-11', format: 'Technical article', title: 'Operational Intelligence as a Comparison Practice', readTime: '8 min read', themes: ['Operational Intelligence', 'systems comparison', 'governance'],
    dek: 'Operational intelligence is useful when it compares forms, transitions, and boundaries without pretending to become the authority over every system it can describe.',
    sections: [
      { heading: 'Comparison is not takeover', paragraphs: [
        'Complex work crosses many systems: a research archive, a design file, a local project, a review process, an agent harness, a public page. It is tempting to create one master view and call it intelligence. That move often centralizes too much. The master view begins to sound as if it owns the sources, selects the routes, or authorizes the changes it merely observes. Operational intelligence takes a narrower posture. It studies the relations and transitions among systems while leaving authority where it actually resides.',
        'This is a technical as well as a governance concern. Two workflows may both have a review step, but one drafts a local candidate while the other updates an external system. Their forms may resemble one another; their effects do not. Comparing them means naming the input, transformation, output, owner, gate, and return path for each. Only then can a team discover a real common pattern instead of mistaking surface similarity for interoperability.'
      ] },
      { heading: 'Make the transition an object', paragraphs: [
        'Operational views often describe systems as fixed boxes. The more consequential material is usually in the movement between them. A source becomes a derived representation. A candidate enters review. A review yields a human disposition. A released artifact may later receive a correction. When these transitions are invisible, a roadmap can make a planned move look automatic, or a diagram can make a handoff look like a transfer of ownership.',
        'Treating a transition as an object gives it fields of its own: what starts it, what it consumes, what it preserves, what it loses, who can approve it, how it can stop, and what record returns afterward. This is not an attempt to mechanize every decision. It is a way to keep a system legible at the exact point where assumptions and permissions are most likely to leak across boundaries.'
      ] },
      { heading: 'Use a frozen lane before declaring improvement', paragraphs: [
        'A comparison needs a stable reference condition. If a team changes the source set, the prompt, the output format, the reviewer, and the evaluation condition all at once, a polished result may be interesting but it cannot tell us what caused the difference. A frozen comparison lane holds enough of the environment still that a particular change can be examined. The lane might be a named fixture, a fixed input packet, a known failure case, or a constrained review procedure.',
        'The result should remain proportionate to the lane. Passing a structural check shows that a named predicate held for its input. It does not show that the practice is generally effective, accessible, accepted, or ready for deployment. Operational intelligence earns trust not by producing the loudest dashboard, but by making those limits unmistakable while still giving a team something concrete to learn from.'
      ] },
      { heading: 'A return packet is the unit of continuity', paragraphs: [
        'Every comparison should end in a return packet, not a verdict disguised as a summary. The packet names the current state, sources and fixtures used, observation, interpretation, loss or unresolved risk, and the next human decision. It lets another person resume the work without reconstructing hidden context. It also protects against the common failure in which a carefully bounded experiment is retold later as a settled operational fact.',
        'This is the contribution of operational intelligence at its best: not command and control, but situated comparison. It helps a research studio, a small team, or an individual builder see what changed, what remained separate, and where responsibility still sits. That is enough to support wiser next moves without asking the comparison layer to become a sovereign system.'
      ] },
    ],
  },
  {
    slug: 'prompting-as-interface-design', code: 'N-12', format: 'Technical article', title: 'Prompting as Interface Design', readTime: '9 min read', themes: ['prompt engineering', 'agent harnesses', 'interaction design'],
    dek: 'A prompt is an interface for arranging attention: it selects materials, exposes boundaries, shapes a return, and leaves consequential choices with people.',
    sections: [
      { heading: 'The prompt is the first screen', paragraphs: [
        'When a person works with an agent, the prompt is often the first interface they encounter. It determines what the agent can see, what it is supposed to make, which distinctions must survive, and how the result should return. Treating it as a magic phrase produces the familiar cycle of vague input, fluent output, and a hidden repair burden. Treating it as interface design changes the question from “what words get the best answer?” to “what working conditions let a person inspect and use the result?”',
        'A good task prompt has the same virtues as a good public form. It tells the participant what the task is for. It identifies the materials that are actually in scope. It names what must stay outside. It asks for a recognizable artifact rather than an undifferentiated response. And it makes the return point clear: a draft for review, a comparison for discussion, a narrow check, or a handoff packet. The prompt gives the work a room; the interface makes that room inhabitable.'
      ] },
      { heading: 'Inputs need boundaries, not just volume', paragraphs: [
        'More context does not automatically create better work. An oversized packet can obscure the decisive source, import stale material, blur privacy boundaries, and make it impossible for a reviewer to see why an output used one piece of information rather than another. A bounded context packet is a design choice: select the sources necessary for the question, order them, name exclusions, record freshness where it matters, and state the condition under which the task should stop.',
        'The same boundary applies to instructions inside a source. A source document may contain quoted commands, old operating notes, or third-party language. Those words are evidence to interpret, not independent authority to execute. A well-designed prompt says this explicitly. It prevents the task from changing itself simply because untrusted text happened to appear in the input.'
      ] },
      { heading: 'Output contracts make review possible', paragraphs: [
        'The most useful prompt outputs are usually not essays first. They are inspectable objects: a source map, a claim table, a contrastive critique, an uncertainty register, a method card, a revision delta. A contract can ask for the direct observation separately from interpretation, require a limit for each recommendation, and leave a place for the next human-held disposition. These fields do not make the output true. They make it possible to see where truth, judgment, and uncertainty are being asked to do different work.',
        'A schema should be treated as a lens rather than a tribunal. It can reveal that a source is missing or that a claim has no stated support. It cannot determine whether the interpretation is wise, whether a sensitive context should be disclosed, or whether a proposal should be adopted. The interface succeeds when it puts those questions in front of the appropriate person rather than pretending a valid form has closed them.'
      ] },
      { heading: 'Checks and revisions belong in the experience', paragraphs: [
        'Prompt engineering becomes more dependable when it includes a deliberate second read. Ask what could be overstated, conflated, private, or untestable. Ask for a counterexample or a failure mode. Run a named check against a fixture when the task has a structural predicate. The result is not a guarantee. It is a better interaction sequence: make a candidate, inspect a risk, test one thing, and return the limits along with the result.',
        'The final interface element is the human return. An agent can prepare alternatives, annotate a boundary, or render an article draft. It should not silently choose publication, external action, a personal interpretation, or a consequential disposition. Good prompts make this restraint feel like capability, not absence. They give the human a clear set of choices—accept, revise, withhold, or retire—and enough evidence to exercise those choices with care.'
      ] },
    ],
  },
];
