// Matrix 6: future-extensions
import type { HcanMatrix } from './matrix-types';

export const canonicalFutureExtensions: HcanMatrix = {
  id: 'future-extensions',
  title: 'Recorded Future Extensions',
  columns: ['name', 'category', 'what', 'necessity'],
  rows: [
    ['HCAN-Effect', 'module', 'typed effect declarations: !effect:fs-read @path \u2014 scoped permission with rollback', 'base ! guard cannot express scoped permission'],
    ['HCAN-Stream', 'module', 'time-series operations: trace @stream/metrics ?drift', 'compare handles snapshots not continuous streams'],
    ['HCAN-Collab', 'module', 'multi-agent coordination: & joins contexts, | forks to agents, @agent/<name> bindings', 'HCAN is 1-to-1 today; teams need typed coordination'],
    ['HCAN-Notebook', 'module', 'Jupyter-style cells; each cell is one HCAN line; outputs feed forward', 'bridges one-shot lines and full programs'],
    ['HCAN-CI', 'module', 'validate HCAN programs in build pipelines', 'if programs become workflow, they need CI'],
    ['Prose\u2192HCAN transpiler', 'tool', 'natural-language-to-HCAN conversion', 'removes learning curve; AI completion already semi-does this'],
    ['HCAN-Codegen', 'tool', 'HCAN \u2192 read-only code scaffolding (never effects)', 'bridge from communication to implementation'],
    ['HCAN-Dev', 'vocabulary', 'shapes: Module, TestSuite, Coverage; probes: breaking-change, circular-dep; guards: no-install, no-deploy', 'developer workflows are the primary use case'],
    ['HCAN-Med', 'vocabulary', 'shapes: Symptom, Diagnosis, Treatment; probes: contraindication, allergy-check; guards: no-prescribe, clinical-trial-only', 'medical decision support needs typed boundaries'],
    ['HCAN-Legal', 'vocabulary', 'shapes: Clause, Contract, Obligation; probes: precedent-check, enforceability; guards: no-legal-advice, no-file', 'contract review needs citation-grounded analysis'],
    ['HCAN-Finance', 'vocabulary', 'shapes: Budget, Variance, Forecast; probes: budget-overrun, cash-flow-gap; guards: no-trade, audit-trail', 'financial analysis needs calibrated confidence'],
    ['HCAN-Edu', 'vocabulary', 'shapes: Curriculum, LearningObjective, Assessment; probes: prerequisite-met, assessment-alignment; guards: no-grade, privacy-safe', 'instructional design needs structured evaluation'],
    ['HCAN-Ops', 'vocabulary', 'shapes: Incident, Alert, Runbook, SLA; probes: severity-check, root-cause; guards: no-execute, no-restart', 'operational work needs incident-safe boundaries'],
  ],
};
