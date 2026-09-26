/**
 * LivePreview - Interactive component preview for the Astro showcase
 *
 * Wraps any React port component in:
 *  - A live controls panel (text/number/boolean/select inputs)
 *  - The component itself rendered with current args
 *  - A code display showing the current JSX
 *
 * This is the Astro showcase equivalent of Storybook's Controls panel.
 */
import * as React from 'react';

type PropType = 'text' | 'number' | 'boolean' | 'select';

interface PropMeta {
  name: string;
  type: PropType;
  options?: string[];
  defaultValue?: any;
}

interface LivePreviewProps {
  componentName: string;
  initialProps: Record<string, any>;
  propMeta?: PropMeta[];
}

export function LivePreview({
  componentName,
  initialProps,
  propMeta = [],
}: LivePreviewProps) {
  const [values, setValues] = React.useState<Record<string, any>>(initialProps);

  const updateValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(initialProps);

  // Build the code snippet
  const codeLines = Object.entries(values)
    .map(([k, v]) => {
      const valStr =
        typeof v === 'string' ? `"${v}"` : JSON.stringify(v);
      return `  ${k}={${valStr}}`;
    })
    .join('\n');
  const codeStr = `<${componentName}\n${codeLines}\n/>`;

  return (
    <div className="ec-live-preview">
      <div className="ec-live-preview__panel">
        <h4 className="ec-live-preview__name">{componentName}</h4>
        {propMeta.length > 0 ? (
          <div className="ec-live-preview__controls">
            {propMeta.map((meta) => (
              <label key={meta.name} className="ec-live-preview__control">
                <span className="ec-live-preview__control-label">{meta.name}</span>
                {meta.type === 'select' && (
                  <select
                    value={values[meta.name] ?? ''}
                    onChange={(e) => updateValue(meta.name, e.target.value)}
                  >
                    {meta.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
                {meta.type === 'boolean' && (
                  <label className="ec-toggle">
                    <input
                      type="checkbox"
                      checked={!!values[meta.name]}
                      onChange={(e) => updateValue(meta.name, e.target.checked)}
                    />
                    <span>{values[meta.name] ? 'true' : 'false'}</span>
                  </label>
                )}
                {meta.type === 'number' && (
                  <input
                    type="number"
                    value={values[meta.name] ?? 0}
                    onChange={(e) => updateValue(meta.name, Number(e.target.value))}
                  />
                )}
                {meta.type === 'text' && (
                  <input
                    type="text"
                    value={values[meta.name] ?? ''}
                    onChange={(e) => updateValue(meta.name, e.target.value)}
                  />
                )}
              </label>
            ))}
          </div>
        ) : (
          <p className="ec-live-preview__no-props">No controls (stateless component)</p>
        )}
        <button className="ec-live-preview__reset" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="ec-live-preview__render">
        <div className="ec-live-preview__component">
          <DynamicRenderer componentName={componentName} values={values} />
        </div>
        <pre className="ec-live-preview__code">
          <code>{codeStr}</code>
        </pre>
      </div>
    </div>
  );
}

/**
 * DynamicRenderer — loads and renders a component from the React ports
 */
function DynamicRenderer({
  componentName,
  values,
}: {
  componentName: string;
  values: Record<string, any>;
}) {
  const [Component, setComponent] = React.useState<React.ComponentType<any> | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    import(`../../ports/react/knowledge/${getLayerForComponent(componentName)}/${componentName}.tsx`)
      .then((mod) => {
        if (!cancelled) {
          // The component is named export
          setComponent(() => mod[componentName] || mod.default);
        }
      })
      .catch((err) => {
        console.error(`Failed to load ${componentName}:`, err);
      });
    return () => {
      cancelled = true;
    };
  }, [componentName]);

  if (!Component) {
    return (
      <div className="ec-live-preview__loading">Loading {componentName}…</div>
    );
  }
  return <Component {...values} />;
}

/**
 * Map component names to their layer directory
 */
function getLayerForComponent(name: string): string {
  const atoms = [
    'CitationRef', 'ConceptTerm', 'SeverityDot', 'ProvenanceMarker', 'TimestampAtom',
    'StatusPill', 'LicenseIcon', 'DOILink', 'HashDigest', 'PathBreadcrumb',
    'ConfidenceBar', 'LanguageTag', 'ReviewerChip', 'EvidenceStrength', 'ClaimMarker',
    'RelationVerb', 'Avatar', 'Badge', 'Button', 'Checkbox', 'Divider', 'Icon',
    'Input', 'Label', 'Radio', 'Skeleton', 'Spinner', 'Tag', 'Tooltip'
  ];
  if (atoms.includes(name)) return 'atoms';

  const composites = [
    'CitationChain', 'ConceptCard', 'SynthesisSummary', 'ADRCard', 'WorkflowState',
    'HumanGate', 'Alert', 'EvidenceReceipt', 'FeatureCard', 'QuoteCard', 'ProfileCard',
    'PricingCard', 'ProductCard', 'TestimonialCard', 'Card', 'SearchBar', 'DialogueTree',
    'Pagination', 'RunLog', 'Breadcrumb', 'Tabs', 'Stepper', 'LinkGroup', 'List',
    'ListGrid', 'TaskHierarchy', 'EmptyState', 'Toast', 'FormField', 'Select', 'Textarea',
    'DeploymentStatus', 'TaxonomyTree', 'OntologyRelation', 'GlossaryIndex',
    'SourceChain', 'AuditTrail', 'Progress', 'PolicyCard', 'ProjectStatus', 'StatCard'
  ];
  if (composites.includes(name)) return 'composites';

  return 'templates';
}
