#!/usr/bin/env node
/**
 * generate-organisms.mjs - Generates organism cards for design system
 * Uses Astro attribute syntax (attr="value") not JSX object syntax.
 */

const ORGANISMS = [
  {
    name: 'Hero (Centered)', id: 'org-hero-centered', import: 'HeroCentered',
    props: () => ({
      eyebrow: 'Welcome', title: 'Hero Centered',
      lede: 'Centered hero for page introductions.',
      accent: 'balanced', size: 'sm',
    }),
    children: '<Button>Get started</Button>',
  },
  {
    name: 'Hero (Split)', id: 'org-hero-split', import: 'HeroSplit',
    props: () => ({
      eyebrow: 'Feature', title: 'Hero Split',
      lede: 'Two-column layout with text and visual.',
      accent: 'hearth',
    }),
    children: '',
  },
  {
    name: 'Hero (Video)', id: 'org-hero-video', import: 'HeroVideo',
    props: () => ({
      videoSrc: '', eyebrow: 'Story',
      title: 'Hero Video',
      lede: 'Background video hero.',
      accent: 'code',
    }),
    children: '',
  },
  {
    name: 'Section (Content)', id: 'org-section-content', import: 'SectionContent',
    props: () => ({
      eyebrow: 'Content', title: 'Section Content',
      lede: 'Standard content section.',
      accent: 'balanced',
    }),
    children: '<p>Body content goes here.</p>',
  },
  {
    name: 'Section (Features)', id: 'org-section-features', import: 'SectionFeatures',
    props: () => ({
      eyebrow: 'Features', title: 'Features',
      lede: 'Grid of features.',
      accent: 'hearth',
      columns: 3,
      features: [
        { icon: 'check', title: 'Fast', description: 'Built for speed.' },
        { icon: 'check', title: 'Reliable', description: 'Always available.' },
        { icon: 'check', title: 'Open', description: 'Token-driven.' },
      ],
    }),
    children: '',
  },
  {
    name: 'Section (Testimonials)', id: 'org-section-testimonials', import: 'SectionTestimonials',
    props: () => ({
      eyebrow: 'Testimonials', title: 'What users say',
      accent: 'balanced',
      testimonials: [
        { quote: 'Great design system.', author: 'User A', role: 'Developer' },
        { quote: 'Easy to use.', author: 'User B', role: 'Designer' },
      ],
    }),
    children: '',
  },
  {
    name: 'Section (Pricing)', id: 'org-section-pricing', import: 'SectionPricing',
    props: () => ({
      eyebrow: 'Pricing', title: 'Plans',
      accent: 'balanced',
      tiers: [
        { tier: 'Free', price: '$0', features: ['Basic features'] },
        { tier: 'Pro', price: '$29', features: ['All features'], highlighted: true },
      ],
    }),
    children: '',
  },
  {
    name: 'Section (CTA)', id: 'org-section-cta', import: 'SectionCTA',
    props: () => ({
      title: 'Ready to start?',
      description: 'Get started today.',
      primaryCtaLabel: 'Start', primaryCtaHref: '#',
      accent: 'balanced',
    }),
    children: '',
  },
  {
    name: 'Page Header', id: 'org-page-header', import: 'PageHeader',
    props: () => ({
      title: 'Page Title',
      subtitle: 'Subtitle description',
      size: 'sm', accent: 'balanced',
    }),
    children: '',
  },
  {
    name: 'Page Footer', id: 'org-page-footer', import: 'PageFooter',
    props: () => ({
      copyright: '2026 Hearth and Code',
      columns: [
        { title: 'Links', links: [{ label: 'Home', href: '/' }] },
      ],
    }),
    children: '',
  },
  {
    name: 'Nav Header', id: 'org-nav-header', import: 'NavHeader',
    props: () => ({
      logo: 'Hearth and Code',
      logoHref: '/',
      links: [
        { label: 'Studio', href: '/', active: true },
        { label: 'Gallery', href: '/gallery' },
      ],
      cta: { label: 'GitHub', href: '#' },
    }),
    children: '',
  },
  {
    name: 'Nav Sidebar', id: 'org-nav-sidebar', import: 'NavSidebar',
    props: () => ({
      title: 'Navigation',
      sections: [
        { items: [
          { label: 'Studio', href: '/', active: true },
          { label: 'Philosophy', href: '/philosophy' },
        ] },
      ],
    }),
    children: '',
  },
  {
    name: 'Layout (Grid)', id: 'org-layout-grid', import: 'LayoutGrid',
    props: () => ({ columns: 3 }),
    children: '<Card><h3>1</h3></Card>\n<Card><h3>2</h3></Card>\n<Card><h3>3</h3></Card>',
  },
  {
    name: 'Layout (Stack)', id: 'org-layout-stack', import: 'LayoutStack',
    props: () => ({}),
    children: '<Card><h3>First</h3></Card>\n<Card><h3>Second</h3></Card>',
  },
  {
    name: 'Layout (Sidebar)', id: 'org-layout-sidebar', import: 'LayoutSidebar',
    props: () => ({
      sidebarPosition: 'left',
      sidebarWidth: '12rem',
    }),
    children: '',
  },
  {
    name: 'Layout (Header)', id: 'org-layout-header', import: 'HeaderLayout',
    props: () => ({
      title: 'Sticky Header',
      stickyHeader: true,
    }),
    children: '<p>Content area below the sticky header.</p>',
  },
  {
    name: 'Layout (Tabs)', id: 'org-layout-tabs', import: 'TabsLayout',
    props: () => ({
      tabs: [
        { id: 'overview', label: 'Overview', content: 'Overview content' },
        { id: 'specs', label: 'Specs', content: 'Specs content' },
      ],
    }),
    children: '',
  },
  {
    name: 'Layout (Stepper)', id: 'org-layout-stepper', import: 'StepperLayout',
    props: () => ({
      steps: [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }],
      currentStep: 1,
    }),
    children: '',
  },
  {
    name: 'Dashboard', id: 'org-dashboard', import: 'Dashboard',
    props: () => ({
      navItems: [
        { label: 'Overview', href: '#', active: true },
        { label: 'Analytics', href: '#' },
      ],
      title: 'Dashboard',
    }),
    children: '',
  },
  {
    name: 'Modal', id: 'org-modal', import: 'Modal',
    props: () => ({
      id: 'demo-modal', title: 'Modal Title', size: 'md',
    }),
    children: '<p>Modal content goes here.</p>',
  },
];

const componentCard = (comp) => {
  const props = comp.props();
  const attrs = Object.entries(props).map(([k, v]) => {
    const jsonVal = JSON.stringify(v);
    if (typeof v === 'string' && !v.includes('"')) return `${k}="${v}"`;
    return `${k}={${jsonVal}}`;
  }).join(' ');

  const children = comp.children || '';

  return `    <div class="ec-preview-card" id="${comp.id}">
      <div class="ec-preview-card__header">
        <div class="ec-preview-card__title-group">
          <span class="ec-preview-card__type">Organism · ${comp.import}</span>
          <span class="ec-preview-card__name">${comp.name}</span>
        </div>
      </div>
      <div class="ec-preview-card__preview" style="width:100%;padding:var(--space-3);">
        <${comp.import} ${attrs}>${children}</${comp.import}>
      </div>
    </div>`;
};

console.log(ORGANISMS.map(componentCard).join('\n'));
