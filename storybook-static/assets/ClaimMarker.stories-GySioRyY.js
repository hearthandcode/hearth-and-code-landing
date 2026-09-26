import{j as r,a as b,F as j}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";function m({index:n,confidence:e,href:a,className:s=""}){const o=e===void 0?"var(--color-text-secondary)":e>=80?"var(--color-state-success)":e>=50?"var(--color-accent-gold)":"var(--color-state-error)",c=["kc-claim-marker",s].filter(Boolean).join(" "),M=b(j,{children:[r("span",{className:"kc-claim-marker__bracket",children:"["}),r("span",{className:"kc-claim-marker__index",children:n}),r("span",{className:"kc-claim-marker__bracket",children:"]"})]});return r(q,{Tag:a?"a":"span",href:a,className:c,style:{"--claim-color":o},title:e!==void 0?`Confidence: ${e}%`:void 0,children:M})}function q({Tag:n,href:e,className:a,style:s,title:o,children:c}){return n==="a"?r("a",{className:a,style:s,title:o,href:e,children:c}):r("span",{className:a,style:s,title:o,children:c})}try{m.displayName="ClaimMarker",m.__docgenInfo={description:"",displayName:"ClaimMarker",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},confidence:{defaultValue:null,description:"",name:"confidence",required:!1,type:{name:"number"}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const T={title:"Knowledge/Atoms/ClaimMarker",component:m,tags:["autodocs"],argTypes:{index:{control:"number"},confidence:{control:{type:"range",min:0,max:100}}}},t={args:{index:1}},i={args:{index:2,confidence:92}},d={args:{index:3,confidence:65}},l={args:{index:4,confidence:30}};var p,u,f;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    index: 1
  }
}`,...(f=(u=t.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var g,x,_;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    index: 2,
    confidence: 92
  }
}`,...(_=(x=i.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};var k,y,C;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    index: 3,
    confidence: 65
  }
}`,...(C=(y=d.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var h,v,N;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    index: 4,
    confidence: 30
  }
}`,...(N=(v=l.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};const D=["Default","HighConfidence","MediumConfidence","LowConfidence"];export{t as Default,i as HighConfidence,l as LowConfidence,d as MediumConfidence,D as __namedExportsOrder,T as default};
