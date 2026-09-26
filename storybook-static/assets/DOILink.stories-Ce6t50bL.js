import{a as h,j as t}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";function s({doi:e,short:p=!0,className:m=""}){const u=e.startsWith("http")?e:`https://doi.org/${e}`,g=p?e.replace(/^https?:\/\/(dx\.)?doi\.org\//,"doi:"):e;return h("a",{className:["kc-doi-link",m].filter(Boolean).join(" "),href:u,target:"_blank",rel:"noopener noreferrer",title:e,children:[t("span",{className:"kc-doi-link__icon","aria-hidden":"true",children:"⊕"}),t("span",{className:"kc-doi-link__label",children:g})]})}try{s.displayName="DOILink",s.__docgenInfo={description:"",displayName:"DOILink",props:{doi:{defaultValue:null,description:"",name:"doi",required:!0,type:{name:"string"}},short:{defaultValue:{value:"true"},description:"",name:"short",required:!1,type:{name:"boolean"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const x={title:"Knowledge/Atoms/DOILink",component:s,tags:["autodocs"],argTypes:{short:{control:"boolean"}}},r={args:{doi:"10.1234/example.2026.001"}},a={args:{doi:"https://doi.org/10.1234/example.2026.001",short:!1}};var o,n,l;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    doi: '10.1234/example.2026.001'
  }
}`,...(l=(n=r.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var i,c,d;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    doi: 'https://doi.org/10.1234/example.2026.001',
    short: false
  }
}`,...(d=(c=a.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const y=["Default","Full"];export{r as Default,a as Full,y as __namedExportsOrder,x as default};
