export interface FieldJournalExpansionSection {
  heading: string;
  paragraphs: string[];
}

export const fieldJournalExpansions: Record<string, FieldJournalExpansionSection[]> = {
  'a-public-journal-begins-with-a-boundary': [
    {
      heading: 'What the boundary protects in my own practice',
      paragraphs: [
        'The private workshop is not a hidden, more authoritative edition of the public one. It is where language can still be clumsy, where several interpretations can coexist, and where a new association can be recorded without becoming a promise. I need that room because my work often develops by connecting research, software, design, operations, and creative practice before I know which relation will survive contact with a real artifact.',
        'If I exposed that whole field, the volume itself would create a false claim. Readers could reasonably assume that every named direction was active, every draft expressed a settled position, or every technical possibility had become a commitment. The publication boundary protects the reader from that confusion and protects the work from being forced into premature coherence.',
        'The Hearthside Meta-Architect persona gives me a useful public voice for this boundary. I can speak personally about the discipline of making work returnable without presenting an exhaustive biography. I can describe the tension between large maps and small build lanes without turning private circumstances into evidence. The archetype is a lens I author, not a profile a system has discovered about me.',
        'This is why review remains more than proofreading. I am deciding whether the projection carries the right amount of heat from the private forge. Too little, and the public writing becomes generic. Too much, and it exposes context that belongs to another room. The boundary is a compositional decision as much as a privacy rule.'
      ]
    },
    {
      heading: 'A publication trail instead of a content stream',
      paragraphs: [
        'I want the Journal to accumulate as a trail rather than a stream. A stream rewards constant novelty and quickly buries the context of an earlier claim. A trail can show that one entry led to another, that a term changed, that an experiment narrowed the question, or that a correction altered what I was willing to say. The sequence becomes part of the research object.',
        'That changes how I think about cadence. I do not need to publish every time the private work changes. I need to publish when a movement has become intelligible enough to offer: a distinction another builder can test, a failure that changes the method, a design pattern with visible limits, or a question sharpened by actual work. Silence can be incubation rather than inactivity.',
        'The trail also lets the studio remain personal without becoming confessional. I can say, “This is where my thinking changed,” and point to the artifact or decision that changed it. I do not need to narrate every condition around the moment. The public value comes from the relation between idea, evidence, and revision.',
        'Over time, I hope this makes Hearth & Code feel less like a catalog of finished concepts and more like a research practice with memory. The reader can see not only what I am interested in, but how I decide that an idea is ready to travel and how I respond when later evidence asks it to change.'
      ]
    },
    {
      heading: 'The editorial questions I now carry',
      paragraphs: [
        'Before I move a draft outward, I ask whether the subject is truly the one named by the title. Large systems work attracts neighboring ideas, and an essay can become a disguised portfolio of everything connected to it. I want each entry to keep one center even when it acknowledges the wider constellation.',
        'I ask where the personal voice is doing useful work. First person should locate the observation and responsibility. It should not be used to make a weak claim feel unanswerable. If I am proposing a general design principle, I need to distinguish it from the fact that the practice feels helpful to me.',
        'I ask which details are vivid and which are merely revealing. A concrete seam—a source becoming a public card, a check being mistaken for proof, a project losing its return point—can make the method real. A credential, private identifier, internal path, or operational secret adds exposure without adding understanding. Specificity needs an audience and a purpose.',
        'Finally, I ask what route I am leaving for disagreement. A reader should be able to identify the claim, understand its basis, and offer a correction without needing access to my whole private archive. That is the standard by which the public boundary becomes hospitable rather than defensive.'
      ]
    }
  ],
  'what-i-mean-by-a-cognitive-workbench': [
    {
      heading: 'The workbench as an answer to fragmentation',
      paragraphs: [
        'The fragmentation I am trying to address is not simply that information lives in many tools. Different parts of the work carry different meanings. A source archive, a conversation, a code repository, a design surface, and an operational dashboard may all describe the same project while answering different questions. Putting them in one interface would not automatically make them coherent.',
        'The workbench needs to preserve those local authorities while making their relations easier to follow. I want to know where the current implementation lives, which record explains its purpose, what public page projects from it, and where the next decision belongs. The answer may be a set of links and return notes before it is a database or an agent.',
        'This is where the meta-architectural stance becomes practical. I am designing the conditions under which several architectures can cooperate. The task is not to make one grand system own everything. It is to establish narrow seams, readable transitions, and a stable place from which I can choose what to enter next.',
        'A cognitive workbench succeeds when it reduces the cost of returning without increasing the cost of living. If every thought needs classification, every tool needs a ceremony, and every project needs a full ontology, the workbench has become another job. Its structure has to remain proportional to the uncertainty and consequence it helps me carry.'
      ]
    },
    {
      heading: 'Memory without pretending to know me',
      paragraphs: [
        'I want the workbench to remember decisions, not infer a hidden self. It can retain that I chose one route, that a source was excluded, or that a project stopped at a particular boundary. It should not convert those records into permanent traits or claim that a pattern of activity reveals what I truly want. The difference is crucial for a person-owned system.',
        'A useful memory object has a source and a review path. It can say when it was recorded, what task it supported, how long it should remain active, and what newer observation might supersede it. That makes memory revisable. It becomes context offered to the person rather than a profile silently applied to them.',
        'This matters to my own nonlinear practice because yesterday’s structure may not fit today’s work. I need continuity without captivity. A return note should help me re-enter a project, but I should be free to decide that the project no longer deserves attention. Preservation is not promotion.',
        'The Hearthside image helps here. A hearth holds warmth and continuity, but it does not demand that every tool remain on the bench forever. The workbench can keep enough of the previous arrangement for me to recognize the room while still allowing the room to change.'
      ]
    },
    {
      heading: 'A practical test for Exocore',
      paragraphs: [
        'The most convincing test for Exocore will not be the number of services or agents it can connect. It will be whether I can leave a complex body of work, return later, and recover the current question, decisive sources, last verified change, unresolved risk, and next bounded action without rereading the entire history.',
        'A second test is whether the workbench can show why it is suggesting something. A recommendation should point to the record or condition that produced it. A retrieved memory should show its source and age. A blocked transition should name the missing predicate. Intelligence without answerability would only make the system faster at becoming opaque.',
        'A third test is whether the system preserves human release at consequential edges. It may prepare a publication, deployment, message, or deletion candidate. It should not make those effects feel automatic because all the prerequisites happen to be present. The pause should be clear, proportionate, and easy to understand.',
        'I do not yet know whether the full workbench will earn its complexity. A smaller collection of durable records and narrow tools may do more of the useful work. That possibility is not a threat to the project; it is one of the results the project must remain capable of discovering.'
      ]
    }
  ],
  'specification-driven-prompting': [
    {
      heading: 'The charter is a conversation with my future self',
      paragraphs: [
        'A goal prompt is often addressed to an agent, but I have found that its most important reader may be me several days later. The charter preserves what I was trying to protect when the task began: which source was current, what could not change, why one check mattered, and where the work was meant to stop. It turns intention into something returnable.',
        'This is particularly useful when the task crosses disciplines. A writing request can contain an information-architecture decision. A design correction can expose a semantic problem. A platform plan can carry a privacy boundary. The charter gives those concerns names without requiring the agent to infer which one should dominate.',
        'I do not expect the first contract to be perfect. In fact, its failures are part of the evidence. If the agent repeatedly asks the same question, the input may be underspecified. If the result is structurally correct but unusable, the output contract may be optimized for the validator rather than the reader. The charter can be revised because its assumptions are visible.',
        'The private projection behind this method is that I need a bridge between associative thinking and sequential execution. The charter lets me preserve the constellation while choosing one path through it. It does not ask me to stop seeing the whole; it asks the current task to declare which part it can responsibly carry.'
      ]
    },
    {
      heading: 'Where specification helps and where it harms',
      paragraphs: [
        'Specification helps when misunderstanding would be expensive or difficult to reverse. Public claims, durable records, external effects, privacy boundaries, and multi-stage handoffs benefit from explicit inputs and return conditions. The structure gives the agent and reviewer a shared object around which to disagree.',
        'It harms when every ambiguity is treated as a defect to eliminate. Creative work often needs language that remains suggestive. Early research may need several live interpretations. A personal reflection can lose its grain when converted too quickly into fields. The contract should protect these qualities rather than flatten them into machine convenience.',
        'It also harms when form becomes a substitute for judgment. A complete packet can still contain a weak source, a self-serving interpretation, or a needless project. Structural validity should make review easier, not make the work look reviewed. I try to keep the human question visible beside the machine-readable form.',
        'My rule is to specify the edges more strongly than the center. Be exact about sources, permissions, prohibited effects, and what the return must expose. Inside those boundaries, allow the method and language enough flexibility to respond to the actual material.'
      ]
    },
    {
      heading: 'The experiment I want to run',
      paragraphs: [
        'I want to compare three conditions rather than only a short prompt and a large contract. The first is a concise natural-language request. The second adds a bounded context and explicit output. The third adds formal stages, checks, and receipts. The question is where each layer begins to repay its coordination cost.',
        'The tasks should vary in consequence and ambiguity: a factual lookup, a source synthesis, a code change, a public essay, and a plan that could lead to an external effect. The model and source set should remain fixed within each comparison. Human repair should be counted, including the time spent restoring voice and privacy boundaries.',
        'I would measure more than completion. Did the result preserve source identity? Did it distinguish observation from proposal? Could another reader resume the work? Did the contract surface a failure earlier? Did the additional structure create false confidence? These questions treat inspectability as part of performance.',
        'Until that comparison exists, contract-driven prompting remains a personal operational hypothesis. It has helped me shape complex work and reduce some forms of re-entry cost. That is enough to keep investigating, not enough to ask other people to inherit the full apparatus.'
      ]
    }
  ],
  'prompting-became-procedure-design': [
    {
      heading: 'The procedure beneath the prompt',
      paragraphs: [
        'The shift from prompt to procedure happened when I began asking what should remain true between turns. A single instruction can produce a strong answer, but a durable workflow needs to preserve source identity, current state, stop conditions, and the difference between preparation and effect. Those invariants are the procedure’s spine.',
        'I started seeing each agent interaction as a transition between inspectable objects. A question becomes a source packet. The packet becomes a candidate. The candidate receives critique or a test. The result returns for disposition. The value is not the number of stages; it is that no stage has to pretend to be the one before or after it.',
        'This also changed how I think about delegation. The useful unit is not a personality but a transformation. One role compares supplied sources. Another checks a schema. Another examines a design for contrast and responsive behavior. Their boundaries make the handoff legible and allow the human to keep the synthesis.',
        'The Hearthside Meta-Architect persona helps me speak about that system without making it sterile. The procedure is the joinery of the workshop. It supports the work quietly, keeps sharp effects behind visible gates, and leaves the crafted object—not the apparatus—as the reader’s main encounter.'
      ]
    },
    {
      heading: 'What the growing library taught me',
      paragraphs: [
        'As prompts became reusable methods, I began to see a library forming: source comparison, semantic orientation, failure rehearsal, revision mapping, bounded implementation, evidence review, and return preparation. The library was useful because it let me recognize a recurring cognitive movement instead of reinventing it in every task.',
        'The danger was immediate. A library can become a museum of distinctions that are elegant but inactive. I now ask each method what present consumer needs it, what artifact it produces, what failure it prevents, and what cheaper technique might replace it. If those answers are missing, the method belongs in research rather than an operational shelf.',
        'I also want methods to remain adaptable. A public field card should offer enough form for another person to try the practice without importing the private governance and vocabulary of my own workbench. This requires deliberate loss. The projection is smaller, more legible, and honest about what it does not carry.',
        'The library has therefore become a test of curation as much as invention. My instinct is to preserve every promising pattern. The harder craft is deciding which patterns deserve a clear public explanation, which should remain internal, and which are simply variations that do not earn another name.'
      ]
    },
    {
      heading: 'Procedure design as humane control',
      paragraphs: [
        'Control can sound like domination, but the control I want is closer to consent and recoverability. A person should know what the agent is being asked to do, what it can touch, what evidence it will return, and which transitions remain unavailable without review. The procedure makes those conditions visible.',
        'Good control is selective. It should not force an approval ceremony around every reversible draft. It should become stronger near publication, spending, external communication, deletion, identity, and durable source changes. This lets ordinary assistance stay fluid while consequential movement remains answerable.',
        'Recovery belongs inside the procedure, not after failure. A task can preserve the previous state, record the attempted change, and name how to return. When an error occurs, the agent can stop the dependent action while leaving other safe work intact. This is more humane than either blind persistence or total collapse.',
        'The method remains provisional. Procedure can add cognitive load, and the language of contracts can make collaboration feel more rigid than it is. My task is to keep the structure quiet enough that it supports attention rather than becoming the center of attention.'
      ]
    }
  ],
  'an-extended-mind-needs-a-grammar': [
    {
      heading: 'The grammar is for relationships, not for the mind',
      paragraphs: [
        'I use the word grammar carefully. I am not claiming that thought can be reduced to a formal language or that a system should parse a person into stable categories. The grammar belongs to the shared work: the relations among source, claim, proposal, decision, tool, effect, and return. It constrains the artifact, not the person.',
        'This boundary matters because an extended-mind system can easily become presumptuous. If it stores enough behavior and preferences, it may begin presenting inference as identity. I want the opposite posture. The workbench can offer remembered context with a source and expiry while leaving me free to accept, revise, or ignore it.',
        'The grammar should therefore include unknown and refusal. A relation may not be established. A term may remain contested. A private source may be acknowledged without being disclosed. These are first-class states, not errors the system must fill for the representation to feel complete.',
        'In my own practice, this makes the extended mind less like a substitute brain and more like a set of carefully labeled shelves and instruments. It can help me recover the conditions of work without claiming authority over the meaning I make from them.'
      ]
    },
    {
      heading: 'What I need the system to remember after interruption',
      paragraphs: [
        'After interruption, I rarely need the entire transcript. I need the live question, the current source, the decision that shaped the present route, the last verified change, the unresolved risk, and one next action small enough to begin. These elements reconstruct orientation more effectively than a large summary of everything that happened.',
        'I also need the system to remember what not to resume. A branch may be incubating rather than active. A candidate may have been withheld. A tool may have been available but not authorized. Without those distinctions, retrieval can reactivate old possibilities as if they were obligations.',
        'The return record becomes a kind of cognitive checksum. It does not preserve every nuance, but it lets me notice when the current story has drifted from the recorded state. If the summary says a service is active while the receipt says only that a manifest rendered, the mismatch tells me where to look.',
        'This is deeply personal in use and intentionally modest in claim. The pattern has helped me return to complex work. I do not know whether the same fields will support another person’s attention, and I do not want an individual adaptation to become a universal prescription.'
      ]
    },
    {
      heading: 'The smallest grammar that can carry the day',
      paragraphs: [
        'A useful daily grammar may be no more than five distinctions: source, current state, open question, boundary, next action. If those are clear, I can often resume without loading a larger system. Richer typing should appear only when the task contains a real ambiguity the smaller form cannot hold.',
        'For research, I may add claim class and evidence need. For agentic work, I may add tool permission, stop condition, and return contract. For public writing, I add audience, disclosure posture, and authorship review. The grammar grows from consequence rather than from a desire for completeness.',
        'This modularity is important to the wider Exocore direction. I want a workbench capable of supporting different practices without forcing every record into the maximum schema. The system should be able to recognize a small note as complete for its purpose while still connecting it to a more formal process when needed.',
        'The ultimate test is whether the grammar reduces reconstruction and category mistakes. If it merely generates more metadata, it has failed. The extended mind should return attention to the work, not make the maintenance of its own representations the dominant task.'
      ]
    }
  ],
  'every-claim-needs-a-return-route': [
    {
      heading: 'The return route is where architecture becomes ethics',
      paragraphs: [
        'A return route sounds technical until a claim affects someone. Then the ability to trace, question, correct, and withdraw it becomes an ethical property of the system. A person should not have to fight an opaque process to discover why a statement exists or where to bring evidence that changes it.',
        'In the private workbench, return means I can find the source and decision after attention moves. In the public studio, it means a reader can distinguish my observation from a broader claim and can locate a correction path. In agentic workflows, it means the agent reports the basis and limit of its output instead of leaving fluency as the only visible warrant.',
        'These are related but not identical responsibilities. A public correction route should not expose the private source archive. An internal provenance record should not become a public biography. Architecture has to carry the relation while preserving the boundary.',
        'This is the heart of the Hearthside metaphor for me. The return is not a rollback to an untouched past. It is a way back into responsible relationship with the work after change. The trail lets the artifact remain revisable without making it disposable.'
      ]
    },
    {
      heading: 'What a humane correction actually looks like',
      paragraphs: [
        'A humane correction begins by preserving the concern in the terms the reader supplied. It does not immediately normalize the report into the system’s preferred vocabulary. The literal observation may contain context that would disappear if it were converted too quickly into a category.',
        'The next step is bounded examination. Which claim or interface is affected? What source and revision are in view? Is the issue factual, interpretive, accessible, private, or operational? The question determines the owner and the kind of evidence needed. Not every correction is resolved by editing the sentence.',
        'The disposition should remain visible: amended, clarified, withheld, superseded, or not changed with a reason. This does not require a dramatic public log for every typo. It requires proportionate lineage where the change affects meaning, confidence, or a reader’s ability to use the work.',
        'Finally, the correction should improve the system’s future behavior. A repeated contrast failure may indicate a broken token boundary. A repeated overclaim may indicate that receipts and decisions are being conflated. The individual repair matters; the recurring pattern is an invitation to redesign the seam.'
      ]
    },
    {
      heading: 'The claims I am most careful not to make',
      paragraphs: [
        'I do not want a coherent framework to sound like a validated one. TCCP, EKRP, Operational Intelligence, Exocore, and the Hearthside methods are research and design directions in different states. Their internal richness does not establish adoption, efficacy, or universality. Public language has to keep those horizons distinct from current evidence.',
        'I do not want personal resonance to become diagnosis. The Hearthside Meta-Architect helps me describe a working posture, including the strengths and costs of nonlinear attention. It does not authorize a system to infer traits about another person or to claim that the same method will help everyone who recognizes the pattern.',
        'I do not want local technical success to become a production claim. A build, test, render, or browser pass is valuable evidence with a bounded scope. It does not prove usability, security, resilience, live deployment, or acceptance unless those were separately examined.',
        'Naming these non-claims does not weaken the studio. It gives each artifact a more credible place. Readers can engage the actual contribution—a method, question, prototype, or reflection—without being asked to accept a story larger than the evidence.'
      ]
    }
  ],
  'designing-a-genre-as-a-system': [
    {
      heading: 'Why this belongs in the same studio as protocols and agents',
      paragraphs: [
        'The music work may look like a departure from knowledge architecture, but it tests many of the same questions under different pressure. A genre has sources, invariants, transformations, constraints, and room for variation. A prompt becomes a composition interface. A track becomes evidence about whether the system preserved a movement or merely reproduced surface vocabulary.',
        'Creative work is unforgiving of governance theatre. A schema can be perfectly valid while the song feels dead. A metatag grammar can survive every structural check while the emotional arc collapses. This keeps the wider Hearth & Code practice honest: formalism must serve lived interpretation, not replace it.',
        'The genre also gives the Hearthside Meta-Architect somewhere to work with atmosphere and myth. Forge, circuit, choir, threshold, and return can become sonic relations rather than administrative labels. The same symbolic language that guides an interface can be tested for rhythm, tension, release, and human resonance.',
        'I want the creative surface to remain connected without becoming instrumentalized. A song is not merely a dataset for the system. It has its own integrity and authorship. The architecture should support the conditions of making, preserve the decisions that matter, and then get out of the way of the music.'
      ]
    },
    {
      heading: 'The tension between system and surprise',
      paragraphs: [
        'A genre system needs enough invariance to be recognizable and enough openness to surprise me. If every track follows the same arc, palette, vocal relation, and lyrical movement, the system has become a factory. If nothing recurs, the genre is only a retrospective label applied to unrelated experiments.',
        'I use constraint budgets to negotiate that tension. A small core carries identity; a larger tweak field allows each work to discover its own body. The exact proportions are working tools, not laws. What matters is that variation becomes deliberate rather than an accidental loss of the concept.',
        'Agent assistance complicates this. Models can quickly produce plausible genre signals, which makes superficial consistency cheap. The harder task is preserving the relation among sonic structure, lyric argument, symbolic world, and emotional movement. I need critique that can say not only that the output matches the prompt, but where it has become generic.',
        'Surprise remains humanly judged. A deviation can be a failure of the system or the beginning of a better rule. The contract should make the deviation visible without deciding its meaning. I want the method to help me notice what happened and preserve the option to let the genre change.'
      ]
    },
    {
      heading: 'What the music teaches the architecture',
      paragraphs: [
        'The first lesson is that sequence creates meaning. The same elements arranged differently can produce a different emotional and conceptual arc. This informs how I think about context windows, public pages, and agent workflows. Selection is not enough; order is part of the interface.',
        'The second lesson is that a bridge must actually bridge. In music, a transition earns its name by changing the relation between sections. In system design, a crosswalk or adapter should make a real movement possible while declaring what is lost. A label that merely says two things are connected is not yet connective tissue.',
        'The third lesson is that texture carries knowledge. A sterile summary can preserve facts while losing the experience that made them important. The Hearthside voice, Ember Circuit visual language, and symbolic vocabulary are attempts to carry some texture into technical work without confusing atmosphere with evidence.',
        'The final lesson is that completion has to be felt as well as recorded. A track can satisfy every checklist and still lack an ending. A project can be marked complete and still have no usable return. Creative practice reminds the architecture that human recognition is part of the state transition, even when it cannot be reduced to a validator.'
      ]
    }
  ],
  'the-hearthside-meta-architect': [
    {
      heading: 'How the archetype appears at the bench',
      paragraphs: [
        'The archetype becomes useful when it changes a concrete choice. At the bench, I ask what room I am in, which artifact belongs there, and what the next responsible transition is. A research room may need a question and source map. A forge room may need a small implementation. A public room may need a disclosure and language review. The names help me select a posture.',
        'I also use the archetype to notice when I am building upward instead of forward. A new framework, taxonomy, or platform layer can feel like progress because it resolves many relationships at once. The Hearthside obligation is to bring that insight back to one seam a person can inspect. Architecture must eventually touch an artifact.',
        'Warmth enters through the return. I want the future version of me—or another careful collaborator—to encounter enough context to resume without feeling punished for not being present at the beginning. The record should lead with what matters, keep the uncertainty visible, and offer one clear next move.',
        'This is not a fixed personality description. On some days I need less architecture and more direct making. On others, the map prevents wasted effort. The archetype is a deliberately revisable instrument for choosing how to work, not an identity that every action must perform.'
      ]
    },
    {
      heading: 'The private projection I am willing to test publicly',
      paragraphs: [
        'The private projection is that much of my systems work is also an attempt to make complexity emotionally inhabitable. Provenance, typed context, return records, and bounded agents are technical devices, but they answer a felt problem: the loss of orientation when many meaningful threads are alive at once.',
        'I am willing to say that this has shaped my practice. I am not willing to claim that the same architecture will fit every nonlinear thinker or that software can resolve the human conditions around attention. The public question is narrower: can these design patterns make some complex work easier to inspect, resume, and govern?',
        'The work across Hearth & Code gives that question several test surfaces. Research asks whether the distinctions remain defensible. Software asks whether they can become usable interaction. Operations asks whether they survive failure and change. Creative work asks whether the structure leaves room for surprise and meaning.',
        'Publishing the projection is itself an experiment. The language may feel too personal, too abstract, or too elaborate. My review and the response of readers are part of the evidence. The archetype should remain capable of revision if it stops helping the work become clearer.'
      ]
    },
    {
      heading: 'A compact practice for other meta-architects',
      paragraphs: [
        'Begin by naming the live seam, not the whole system. What relationship is currently failing: source to claim, idea to commitment, tool to permission, project to return, private work to public explanation? Give that seam one small artifact that makes the failure inspectable.',
        'Keep the wider map nearby but do not require the current artifact to complete it. Record neighboring ideas in an incubation space with enough context to return. Protect one build lane from being consumed by every newly visible connection. This is how breadth can support completion rather than compete with it.',
        'Use agents for bounded transformations and ask them to return evidence, limits, and next choices. Let them be excellent instruments without making them invisible owners. When the action would publish, spend, disclose, delete, or define another person, keep the threshold explicitly human.',
        'Finally, design a kind ending. State what became clearer, what remains open, and what can be safely left for later. The Hearthside Meta-Architect does not prove seriousness by carrying every structure at once. The craft is preserving enough of the constellation that one honest piece can be finished.'
      ]
    }
  ],
  'a-hub-that-can-explain-itself': [
    {
      heading: 'What my Hub is trying to preserve',
      paragraphs: [
        'The Hub is not valuable to me because it contains many files. It is valuable when it preserves the reason a body of work has its present shape. A project can point to its sources, a candidate can show its review state, a receipt can bound a technical observation, and a future session can recover the next action without inventing a new center.',
        'This preservation is selective. I do not want every conversation or private note turned into durable governance. The Hub should retain the records needed for continuity, accountability, and source identity while allowing exploratory material to remain transient or private. A system that records everything makes retrieval and consent harder, not easier.',
        'The sixteen-room topology and sequential naming conventions are capacity disciplines in my current practice, not claims about the natural shape of knowledge. They help me keep routes inspectable and prevent endless top-level expansion. The material still has to earn a place; the empty shelf is not a goal.',
        'The Hearthside Meta-Architect appears here as a steward of relations. I am trying to keep a large constellation legible without letting the map claim ownership of every star. The Hub should help me locate and govern the work while remaining subordinate to the sources and people that give the work meaning.'
      ]
    },
    {
      heading: 'From a private operating system to a public proof',
      paragraphs: [
        'A public proof should be much smaller than the private Hub. I would rather show one question moving through source, claim, disagreement, candidate, check, and decision than expose a vast archive whose scale becomes the main argument. The small path is easier to inspect and safer to disclose.',
        'This is why the public Studio uses method cards, articles, artifacts, and bounded product candidates. Each is a projection for a reader, not a mirror of the internal system. It can teach the relation while omitting operational detail, private context, and unresolved program history.',
        'The separation also protects the public claim. A live internal tool may be incomplete or changing rapidly while the public method remains stable enough to discuss. Conversely, elegant public language does not prove that the internal system implements it. The projection and runtime need independent evidence.',
        'If I build a public service layer around this work, the same principle should hold. The public surface exposes only the narrow contract required for the application. Identity, billing, operational control, and private knowledge remain separated. Architecture becomes a disclosure boundary as much as a delivery mechanism.'
      ]
    },
    {
      heading: 'The Hub must also explain when it is wrong',
      paragraphs: [
        'A self-explaining Hub cannot limit itself to successful lineage. It needs to show stale projections, conflicting sources, failed checks, abandoned routes, and assumptions that no longer hold. Otherwise explanation becomes institutional self-praise rather than a tool for correction.',
        'I want the system to preserve malformed or surprising evidence long enough for diagnosis. Silent repair can make the archive look cleaner while destroying the clue that would explain the drift. A correction should be additive where possible: present state, prior state, reason, and affected claims.',
        'The Hub must also be able to say that its own governance is too expensive. A rule may produce more maintenance than protection. A schema may make authorship harder. A context package may overwhelm the consumer it was meant to help. These are design failures worth recording, not exceptions to hide.',
        'The most credible intelligence layer is therefore one that can return a bounded account of its own uncertainty. It can say what it observed, which source it used, what it could not establish, and what kind of human review remains. Explanation is not omniscience; it is accountable orientation.'
      ]
    }
  ]
};

export const fieldJournalReadingMinutes = (slug: string, baseMinutes?: number) => {
  const expansion = fieldJournalExpansions[slug] ?? [];
  const words = expansion.flatMap((section) => [section.heading, ...section.paragraphs]).join(' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, baseMinutes ?? 0) + Math.ceil(words / 210);
};
