import{a as P,j as c}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";const S={primary:"◉",derived:"⊛",cited:"↗",verified:"✓",inferred:"◐",speculative:"◌"};function i({kind:e,source:_,className:h=""}){const N=["kc-provenance",`kc-provenance--${e}`,h].filter(Boolean).join(" ");return P("span",{className:N,title:_,children:[c("span",{className:"kc-provenance__icon","aria-hidden":"true",children:S[e]}),c("span",{className:"kc-provenance__label",children:e})]})}try{i.displayName="ProvenanceMarker",i.__docgenInfo={description:"",displayName:"ProvenanceMarker",props:{kind:{defaultValue:null,description:"",name:"kind",required:!0,type:{name:"enum",value:[{value:'"primary"'},{value:'"derived"'},{value:'"cited"'},{value:'"verified"'},{value:'"inferred"'},{value:'"speculative"'}]}},source:{defaultValue:null,description:"",name:"source",required:!1,type:{name:"string"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const I={title:"Knowledge/Atoms/ProvenanceMarker",component:i,tags:["autodocs"],argTypes:{kind:{control:"select",options:["primary","derived","cited","verified","inferred","speculative"]}}},r={args:{kind:"primary",source:"Original"}},a={args:{kind:"verified",source:"Independent reviewer"}},s={args:{kind:"cited"}},n={args:{kind:"speculative",source:"Hypothesis"}};var o,t,d;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    kind: 'primary',
    source: 'Original'
  }
}`,...(d=(t=r.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};var p,l,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    kind: 'verified',
    source: 'Independent reviewer'
  }
}`,...(u=(l=a.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var m,v,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    kind: 'cited'
  }
}`,...(g=(v=s.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var f,k,y;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    kind: 'speculative',
    source: 'Hypothesis'
  }
}`,...(y=(k=n.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};const M=["Primary","Verified","Cited","Speculative"];export{s as Cited,r as Primary,n as Speculative,a as Verified,M as __namedExportsOrder,I as default};
