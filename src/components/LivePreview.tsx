/**
 * LivePreview - Interactive component preview for the Astro showcase
 *
 * Wraps any React port component in:
 *  - A live controls panel (text/number/boolean/select inputs)
 *  - The component itself rendered with current args
 *  - A code display showing the current JSX
 *
 * Uses a static registry of all components instead of dynamic imports.
 */
import * as React from 'react';
import { EMBER_CIRCUIT_COMPONENT_CSS } from './componentStyles';
import { CitationRef } from '../ports/react/knowledge/atoms/CitationRef';
import { ConceptTerm } from '../ports/react/knowledge/atoms/ConceptTerm';
import { SeverityDot } from '../ports/react/knowledge/atoms/SeverityDot';
import { ProvenanceMarker } from '../ports/react/knowledge/atoms/ProvenanceMarker';
import { TimestampAtom } from '../ports/react/knowledge/atoms/TimestampAtom';
import { StatusPill } from '../ports/react/knowledge/atoms/StatusPill';
import { LicenseIcon } from '../ports/react/knowledge/atoms/LicenseIcon';
import { DOILink } from '../ports/react/knowledge/atoms/DOILink';
import { HashDigest } from '../ports/react/knowledge/atoms/HashDigest';
import { PathBreadcrumb } from '../ports/react/knowledge/atoms/PathBreadcrumb';
import { ConfidenceBar } from '../ports/react/knowledge/atoms/ConfidenceBar';
import { LanguageTag } from '../ports/react/knowledge/atoms/LanguageTag';
import { ReviewerChip } from '../ports/react/knowledge/atoms/ReviewerChip';
import { EvidenceStrength } from '../ports/react/knowledge/atoms/EvidenceStrength';
import { ClaimMarker } from '../ports/react/knowledge/atoms/ClaimMarker';
import { RelationVerb } from '../ports/react/knowledge/atoms/RelationVerb';
import { Icon } from '../ports/react/knowledge/atoms/Icon';
import { Avatar } from '../ports/react/knowledge/atoms/Avatar';
import { Button } from '../ports/react/knowledge/composites/Button';
import { Alert } from '../ports/react/knowledge/composites/Alert';
import { EvidenceReceipt } from '../ports/react/knowledge/composites/EvidenceReceipt';
import { CitationChain } from '../ports/react/knowledge/composites/CitationChain';
import { ConceptCard } from '../ports/react/knowledge/composites/ConceptCard';
import { SynthesisSummary } from '../ports/react/knowledge/composites/SynthesisSummary';
import { ADRCard } from '../ports/react/knowledge/composites/ADRCard';
import { WorkflowState } from '../ports/react/knowledge/composites/WorkflowState';
import { HumanGate } from '../ports/react/knowledge/composites/HumanGate';
import { QuoteCard } from '../ports/react/knowledge/composites/QuoteCard';
import { ProfileCard } from '../ports/react/knowledge/composites/ProfileCard';
import { PricingCard } from '../ports/react/knowledge/composites/PricingCard';
import { ProductCard } from '../ports/react/knowledge/composites/ProductCard';
import { TestimonialCard } from '../ports/react/knowledge/composites/TestimonialCard';
import { Card } from '../ports/react/knowledge/composites/Card';
import { SearchBar } from '../ports/react/knowledge/composites/SearchBar';
import { DialogueTree } from '../ports/react/knowledge/composites/DialogueTree';
import { Pagination } from '../ports/react/knowledge/composites/Pagination';
import { RunLog } from '../ports/react/knowledge/composites/RunLog';
import { Breadcrumb } from '../ports/react/knowledge/composites/Breadcrumb';
import { Tabs } from '../ports/react/knowledge/composites/Tabs';
import { Stepper } from '../ports/react/knowledge/composites/Stepper';
import { LinkGroup } from '../ports/react/knowledge/composites/LinkGroup';
import { List } from '../ports/react/knowledge/composites/List';
import { ListGrid } from '../ports/react/knowledge/composites/ListGrid';
import { TaskHierarchy } from '../ports/react/knowledge/composites/TaskHierarchy';
import { EmptyState } from '../ports/react/knowledge/composites/EmptyState';
import { Toast } from '../ports/react/knowledge/composites/Toast';
import { FormField } from '../ports/react/knowledge/composites/FormField';
import { Select } from '../ports/react/knowledge/composites/Select';
import { Textarea } from '../ports/react/knowledge/composites/Textarea';
import { DeploymentStatus } from '../ports/react/knowledge/composites/DeploymentStatus';
import { TaxonomyTree } from '../ports/react/knowledge/composites/TaxonomyTree';
import { OntologyRelation } from '../ports/react/knowledge/composites/OntologyRelation';
import { GlossaryIndex } from '../ports/react/knowledge/composites/GlossaryIndex';
import { SourceChain } from '../ports/react/knowledge/composites/SourceChain';
import { AuditTrail } from '../ports/react/knowledge/composites/AuditTrail';
import { Progress } from '../ports/react/knowledge/composites/Progress';
import { PolicyCard as PolicyCardC } from '../ports/react/knowledge/composites/PolicyCard';
import { ProjectStatus as ProjectStatusC } from '../ports/react/knowledge/composites/ProjectStatus';
import { StatCard } from '../ports/react/knowledge/composites/StatCard';
import { FeatureCard } from '../ports/react/knowledge/composites/FeatureCard';
import { HeroCentered } from '../ports/react/knowledge/templates/HeroCentered';
import { HeroSplit } from '../ports/react/knowledge/templates/HeroSplit';
import { SectionContent } from '../ports/react/knowledge/templates/SectionContent';
import { SectionFeatures } from '../ports/react/knowledge/templates/SectionFeatures';
import { SectionCTA } from '../ports/react/knowledge/templates/SectionCTA';
import { SectionPricing } from '../ports/react/knowledge/templates/SectionPricing';
import { SectionTestimonials } from '../ports/react/knowledge/templates/SectionTestimonials';
import { PageHeader } from '../ports/react/knowledge/templates/PageHeader';
import { PageFooter } from '../ports/react/knowledge/templates/PageFooter';
import { LayoutGrid } from '../ports/react/knowledge/templates/LayoutGrid';
import { LayoutStack } from '../ports/react/knowledge/templates/LayoutStack';
import { LayoutSidebar } from '../ports/react/knowledge/templates/LayoutSidebar';
import { HeaderLayout } from '../ports/react/knowledge/templates/HeaderLayout';
import { TabsLayout } from '../ports/react/knowledge/templates/TabsLayout';
import { StepperLayout } from '../ports/react/knowledge/templates/StepperLayout';
import { Dashboard } from '../ports/react/knowledge/templates/Dashboard';
import { Modal } from '../ports/react/knowledge/templates/Modal';

type PropType = 'text' | 'number' | 'boolean' | 'select';

export interface PropMeta {
  name: string;
  type: PropType;
  options?: string[];
  defaultValue?: any;
}

export interface LivePreviewProps {
  componentName: string;
  initialProps: Record<string, any>;
  propMeta?: PropMeta[];
}

const REGISTRY: Record<string, React.ComponentType<any>> = {
  CitationRef, ConceptTerm, SeverityDot, ProvenanceMarker, TimestampAtom,
  StatusPill, LicenseIcon, DOILink, HashDigest, PathBreadcrumb, ConfidenceBar,
  LanguageTag, ReviewerChip, EvidenceStrength, ClaimMarker, RelationVerb,
  Icon, Avatar,
  Button, Alert, EvidenceReceipt, CitationChain, ConceptCard, SynthesisSummary,
  ADRCard, WorkflowState, HumanGate, QuoteCard, ProfileCard, PricingCard,
  ProductCard, TestimonialCard, Card, SearchBar, DialogueTree, Pagination,
  RunLog, Breadcrumb, Tabs, Stepper, LinkGroup, List, ListGrid, TaskHierarchy,
  EmptyState, Toast, FormField, Select, Textarea, DeploymentStatus,
  TaxonomyTree, OntologyRelation, GlossaryIndex, SourceChain, AuditTrail,
  Progress, PolicyCardC, ProjectStatusC, StatCard, FeatureCard,
  HeroCentered, HeroSplit, SectionContent, SectionFeatures, SectionCTA,
  SectionPricing, SectionTestimonials, PageHeader, PageFooter, LayoutGrid,
  LayoutStack, LayoutSidebar, HeaderLayout, TabsLayout, StepperLayout,
  Dashboard, Modal,
};

ensureCssInjected();  // module-load time injection

/**
 * Inject the component CSS into document.head on first import.
 * This runs at module load time and adds the style to <head>, not inside
 * any astro-island shadow DOM. The Astro island pattern means component
 * renders go into a shadow tree — styles defined inside the island
 * don't apply, so we must inject at top-level.
 */
let cssInjected = false;
function ensureCssInjected() {
  if (typeof document === 'undefined') return;
  if (cssInjected) return;
  cssInjected = true;
  if (document.getElementById('ec-component-styles')) return;
  const style = document.createElement('style');
  style.id = 'ec-component-styles';
  style.appendChild(document.createTextNode(EMBER_CIRCUIT_COMPONENT_CSS));
  document.head.appendChild(style);
}

/**
 * ComponentCssTag - rendered as a React element so it appears in SSR'd HTML.
 * Astro will render this as an actual <style> tag in the head.
 *
 * NOTE: Astro islands render into shadow DOM, so this style tag only
 * applies to content WITHIN the island. For the components to be styled
 * when rendered via astro-island, we must use ensureCssInjected() which
 * appends to document.head (top-level, not shadow-scoped).
 */
function ComponentCssTag() {
  return null;  // No-op; CSS injected at module load via ensureCssInjected()
}

export function LivePreview({
  componentName,
  initialProps,
  propMeta = [],
}: LivePreviewProps) {
  const [values, setValues] = React.useState<Record<string, any>>(initialProps);
  const Component = REGISTRY[componentName];

  if (!Component) {
    return (
      <>
        <ComponentCssTag />
        <div className="ec-live-preview__loading">
          Component "{componentName}" not found in registry.
        </div>
      </>
    );
  }

  const updateValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(initialProps);

  const codeLines = Object.entries(values)
    .map(([k, v]) => {
      const valStr = typeof v === 'string' ? `"${v}"` : JSON.stringify(v);
      return `  ${k}={${valStr}}`;
    })
    .join('\n');
  const codeStr = `<${componentName}\n${codeLines}\n/>`;

  return (
    <>
      <ComponentCssTag />
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
            <Component {...values} />
          </div>
          <pre className="ec-live-preview__code">
            <code>{codeStr}</code>
          </pre>
        </div>
      </div>
    </>
  );
}
