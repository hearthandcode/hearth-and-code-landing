#!/usr/bin/env node
/**
 * generate-molecules.mjs - Auto-generates molecule preview cards for design system page
 * Reads from src/components/composites/ and inserts cards into the molecules section
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const COMPOSITES_DIR = 'src/components/composites';
const PAGE = 'src/pages/design-system/index.astro';

const MOLECULES = [
  { name: 'Accordion', id: 'mol-accordion', import: 'Accordion', props: () => ({
    items: [
      { id: 'a1', title: 'Section 1', content: 'First section content.', defaultOpen: true },
      { id: 'a2', title: 'Section 2', content: 'Second section content.' },
      { id: 'a3', title: 'Section 3', content: 'Third section content.' },
    ],
  }) },
  { name: 'Breadcrumb', id: 'mol-breadcrumb', import: 'Breadcrumb', props: () => ({
    items: [
      { label: 'Home', href: '#' },
      { label: 'Studio', href: '#' },
      { label: 'Page', href: '#' },
    ],
  }) },
  { name: 'ChartLine', id: 'mol-chart-line', import: 'ChartLine', props: () => ({
    series: [
      { name: 'Atoms', color: 'var(--color-accent-ember)', data: [{ x: 1, y: 5 }, { x: 2, y: 12 }, { x: 3, y: 18 }, { x: 4, y: 32 }] },
      { name: 'Molecules', color: 'var(--color-accent-signal)', data: [{ x: 1, y: 0 }, { x: 2, y: 8 }, { x: 3, y: 15 }, { x: 4, y: 28 }] },
    ],
    height: '10rem',
  }) },
  { name: 'ChartPie', id: 'mol-chart-pie', import: 'ChartPie', props: () => ({
    data: [
      { label: 'Atoms', value: 12 },
      { label: 'Molecules', value: 32 },
      { label: 'Organisms', value: 20 },
    ],
    donut: true,
  }) },
  { name: 'EmptyState', id: 'mol-empty-state', import: 'EmptyState', props: () => ({
    icon: 'search',
    title: 'No results found',
    description: 'Try adjusting your search terms or browse all components.',
    actionLabel: 'Browse all',
    actionHref: '#',
  }) },
  { name: 'LinkGroup', id: 'mol-link-group', import: 'LinkGroup', props: () => ({
    title: 'Related links',
    links: [
      { label: 'Documentation', href: '#', description: 'Read the docs' },
      { label: 'GitHub', href: '#', description: 'View source' },
      { label: 'Examples', href: '#', description: 'See in action' },
    ],
  }) },
  { name: 'List', id: 'mol-list', import: 'List', props: () => ({
    items: [
      { content: 'Token-driven styling', href: '#' },
      { content: 'Semantic HTML' },
      { content: 'ARIA support' },
    ],
  }) },
  { name: 'ListGrid', id: 'mol-list-grid', import: 'ListGrid', props: () => ({
    items: [
      { content: 'Item 1' },
      { content: 'Item 2' },
      { content: 'Item 3' },
      { content: 'Item 4' },
    ],
    columns: 2,
  }) },
  { name: 'Pagination', id: 'mol-pagination', import: 'Pagination', props: () => ({
    currentPage: 3,
    totalPages: 12,
  }) },
  { name: 'ProductCard', id: 'mol-product-card', import: 'ProductCard', props: () => ({
    title: 'Component Library',
    description: '64 production-ready components built with tokens',
    price: 'Free',
    href: '#',
  }) },
  { name: 'SearchBar', id: 'mol-search-bar', import: 'SearchBar', props: () => ({
    placeholder: 'Search components...',
  }) },
  { name: 'Select', id: 'mol-select', import: 'Select', props: () => ({
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Select option',
  }) },
  { name: 'Stepper', id: 'mol-stepper', import: 'Stepper', props: () => ({
    steps: [
      { label: 'Setup' },
      { label: 'Configure' },
      { label: 'Deploy' },
    ],
    currentStep: 1,
  }) },
  { name: 'TableFilterable', id: 'mol-table-filter', import: 'TableFilterable', props: () => ({
    columns: [
      { key: 'name', label: 'Name', filterable: true },
      { key: 'count', label: 'Count', filterable: true },
    ],
    data: [
      { name: 'Atoms', count: 12 },
      { name: 'Molecules', count: 32 },
      { name: 'Organisms', count: 20 },
    ],
    searchable: true,
  }) },
  { name: 'TableSortable', id: 'mol-table-sort', import: 'TableSortable', props: () => ({
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'year', label: 'Year' },
    ],
    data: [
      { name: 'Primitives', role: 'Foundation', year: 2024 },
      { name: 'Composites', role: 'Composed', year: 2024 },
      { name: 'Templates', role: 'Pages', year: 2024 },
    ],
    initialSort: { key: 'name', direction: 'asc' },
  }) },
  { name: 'Tabs', id: 'mol-tabs', import: 'Tabs', props: () => ({
    tabs: [
      { id: 't1', label: 'Overview', content: 'Overview content' },
      { id: 't2', label: 'Details', content: 'Details content' },
      { id: 't3', label: 'Settings', content: 'Settings content' },
    ],
  }) },
  { name: 'TestimonialCard', id: 'mol-testimonial', import: 'TestimonialCard', props: () => ({
    quote: 'This design system has transformed our workflow.',
    author: 'Scott Rallya',
    role: 'Hearthside Meta-Architect',
    rating: 5,
  }) },
  { name: 'Textarea', id: 'mol-textarea', import: 'Textarea', props: () => ({
    placeholder: 'Enter your thoughts...',
    rows: 3,
  }) },
  { name: 'Timeline', id: 'mol-timeline', import: 'Timeline', props: () => ({
    events: [
      { date: '2026-09-01', title: 'Convergence doc', description: '64 components defined' },
      { date: '2026-09-15', title: 'Wave 1 complete', description: 'All primitives built' },
      { date: '2026-09-20', title: 'Wave 2 complete', description: 'All composites built' },
    ],
  }) },
  { name: 'Toast', id: 'mol-toast', import: 'Toast', props: () => ({
    visible: true,
    variant: 'success',
    title: 'Saved!',
    position: 'bottom-right',
  }) },
  { name: 'Toc', id: 'mol-toc', import: 'Toc', props: () => ({
    headings: [
      { id: 'intro', text: 'Introduction', level: 1 },
      { id: 'setup', text: 'Setup', level: 2 },
      { id: 'config', text: 'Configuration', level: 2 },
    ],
  }) },
];

const componentCard = (comp) => {
  const propsString = JSON.stringify(comp.props(), null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'");
  return `    <div class="ec-preview-card" id="${comp.id}">
      <div class="ec-preview-card__header">
        <div class="ec-preview-card__title-group">
          <span class="ec-preview-card__type">Molecule · ${comp.import}</span>
          <span class="ec-preview-card__name">${comp.name}</span>
        </div>
      </div>
      <div class="ec-preview-card__preview">
        <${comp.import} ${propsString} />
      </div>
    </div>`;
};

const moleculeImports = `import Accordion from '../../components/composites/Accordion.astro';
import Alert from '../../components/composites/Alert.astro';
import Breadcrumb from '../../components/composites/Breadcrumb.astro';
import ChartBar from '../../components/composites/ChartBar.astro';
import ChartLine from '../../components/composites/ChartLine.astro';
import ChartPie from '../../components/composites/ChartPie.astro';
import EmptyState from '../../components/composites/EmptyState.astro';
import FeatureCard from '../../components/composites/FeatureCard.astro';
import FormField from '../../components/composites/FormField.astro';
import LinkGroup from '../../components/composites/LinkGroup.astro';
import List from '../../components/composites/List.astro';
import ListGrid from '../../components/composites/ListGrid.astro';
import Pagination from '../../components/composites/Pagination.astro';
import PricingCard from '../../components/composites/PricingCard.astro';
import ProductCard from '../../components/composites/ProductCard.astro';
import ProfileCard from '../../components/composites/ProfileCard.astro';
import Progress from '../../components/composites/Progress.astro';
import QuoteCard from '../../components/composites/QuoteCard.astro';
import SearchBar from '../../components/composites/SearchBar.astro';
import Select from '../../components/composites/Select.astro';
import StatCard from '../../components/composites/StatCard.astro';
import Stepper from '../../components/composites/Stepper.astro';
import Table from '../../components/composites/Table.astro';
import TableFilterable from '../../components/composites/TableFilterable.astro';
import TableSortable from '../../components/composites/TableSortable.astro';
import Tabs from '../../components/composites/Tabs.astro';
import TestimonialCard from '../../components/composites/TestimonialCard.astro';
import Textarea from '../../components/composites/Textarea.astro';
import Timeline from '../../components/composites/Timeline.astro';
import Toast from '../../components/composites/Toast.astro';
import Toc from '../../components/composites/Toc.astro';
`;

const moleculesCards = MOLECULES.map(componentCard).join('\n');

console.log(moleculeImports);
console.log();
console.log(moleculesCards);
