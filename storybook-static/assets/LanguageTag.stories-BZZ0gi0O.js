import{a as T,j as c}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";const j={python:"var(--color-accent-signal)",typescript:"var(--color-accent-plasma)",javascript:"var(--color-accent-gold)",rust:"var(--color-accent-ember)",yaml:"var(--color-accent-violet)",json:"var(--color-text-secondary)",bash:"var(--color-state-success)",markdown:"var(--color-text-display)",sql:"var(--color-state-caution)",go:"var(--color-accent-plasma)"};function t({language:o,variant:n="plain",className:x=""}){const L=j[o.toLowerCase()]??"var(--color-text-secondary)",N=["kc-language-tag",`kc-language-tag--${n}`,x].filter(Boolean).join(" ");return T("span",{className:N,style:{"--lang-color":L},children:[c("span",{className:"kc-language-tag__pip","aria-hidden":"true"}),n!=="minimal"&&c("span",{className:"kc-language-tag__label",children:o})]})}try{t.displayName="LanguageTag",t.__docgenInfo={description:"",displayName:"LanguageTag",props:{language:{defaultValue:null,description:"",name:"language",required:!0,type:{name:"string"}},variant:{defaultValue:{value:"plain"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"plain"'},{value:'"compact"'},{value:'"minimal"'}]}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const b={title:"Knowledge/Atoms/LanguageTag",component:t,tags:["autodocs"],argTypes:{variant:{control:"select",options:["plain","compact","minimal"]}}},a={args:{language:"typescript"}},e={args:{language:"python"}},r={args:{language:"rust"}},s={args:{language:"yaml",variant:"compact"}};var l,p,g;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    language: 'typescript'
  }
}`,...(g=(p=a.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var i,u,m;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    language: 'python'
  }
}`,...(m=(u=e.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var d,y,v;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    language: 'rust'
  }
}`,...(v=(y=r.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var _,f,h;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    language: 'yaml',
    variant: 'compact'
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const w=["TypeScript","Python","Rust","YAML"];export{e as Python,r as Rust,a as TypeScript,s as YAML,w as __namedExportsOrder,b as default};
