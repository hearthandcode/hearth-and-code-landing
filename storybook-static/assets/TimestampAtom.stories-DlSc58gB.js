import{a as o,j as n,F as y}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";function i({iso:e,relative:b,variant:a="both",className:f=""}){const T=["kc-timestamp",`kc-timestamp--${a}`,f].filter(Boolean).join(" "),l=b??e;return o("time",{className:T,dateTime:e,title:e,children:[a==="absolute"&&n("span",{children:e}),a==="relative"&&n("span",{children:l}),a==="both"&&o(y,{children:[n("span",{className:"kc-timestamp__rel",children:l}),o("span",{className:"kc-timestamp__iso",children:["· ",e]})]})]})}try{i.displayName="TimestampAtom",i.__docgenInfo={description:"",displayName:"TimestampAtom",props:{iso:{defaultValue:null,description:"",name:"iso",required:!0,type:{name:"string"}},relative:{defaultValue:null,description:"",name:"relative",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"both"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"absolute"'},{value:'"relative"'},{value:'"both"'}]}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const j={title:"Knowledge/Atoms/TimestampAtom",component:i,tags:["autodocs"],argTypes:{variant:{control:"select",options:["absolute","relative","both"]}}},t={args:{iso:"2026-09-26T10:30:00Z",relative:"2 hours ago"}},s={args:{iso:"2026-09-26T10:30:00Z",variant:"absolute"}},r={args:{iso:"2026-09-26T10:30:00Z",relative:"5m ago",variant:"relative"}};var m,c,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    iso: '2026-09-26T10:30:00Z',
    relative: '2 hours ago'
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,d,v;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    iso: '2026-09-26T10:30:00Z',
    variant: 'absolute'
  }
}`,...(v=(d=s.parameters)==null?void 0:d.docs)==null?void 0:v.source}}};var g,h,_;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    iso: '2026-09-26T10:30:00Z',
    relative: '5m ago',
    variant: 'relative'
  }
}`,...(_=(h=r.parameters)==null?void 0:h.docs)==null?void 0:_.source}}};const k=["Both","Absolute","Relative"];export{s as Absolute,t as Both,r as Relative,k as __namedExportsOrder,j as default};
