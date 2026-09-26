import{a as q,j as o}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";const A={anecdotal:0,weak:1,moderate:2,strong:3,conclusive:4};function c({tier:e,showLabel:b=!0,className:x=""}){const E=A[e],j=["kc-evidence-strength",`kc-evidence-strength--${e}`,x].filter(Boolean).join(" ");return q("span",{className:j,children:[o("span",{className:"kc-evidence-strength__bars","aria-label":`Evidence strength: ${e}`,children:[0,1,2,3,4].map(i=>o("span",{className:`kc-evidence-strength__bar${i<=E?" is-filled":""}`},i))}),b&&o("span",{className:"kc-evidence-strength__label",children:e})]})}try{c.displayName="EvidenceStrength",c.__docgenInfo={description:"",displayName:"EvidenceStrength",props:{tier:{defaultValue:null,description:"",name:"tier",required:!0,type:{name:"enum",value:[{value:'"anecdotal"'},{value:'"weak"'},{value:'"moderate"'},{value:'"strong"'},{value:'"conclusive"'}]}},showLabel:{defaultValue:{value:"true"},description:"",name:"showLabel",required:!1,type:{name:"boolean"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const I={title:"Knowledge/Atoms/EvidenceStrength",component:c,tags:["autodocs"],argTypes:{tier:{control:"select",options:["anecdotal","weak","moderate","strong","conclusive"]}}},a={args:{tier:"anecdotal"}},r={args:{tier:"weak"}},s={args:{tier:"moderate"}},t={args:{tier:"strong"}},n={args:{tier:"conclusive"}};var l,d,m;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    tier: 'anecdotal'
  }
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var u,p,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    tier: 'weak'
  }
}`,...(g=(p=r.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var v,h,_;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    tier: 'moderate'
  }
}`,...(_=(h=s.parameters)==null?void 0:h.docs)==null?void 0:_.source}}};var k,f,S;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    tier: 'strong'
  }
}`,...(S=(f=t.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var w,y,N;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    tier: 'conclusive'
  }
}`,...(N=(y=n.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};const L=["Anecdotal","Weak","Moderate","Strong","Conclusive"];export{a as Anecdotal,n as Conclusive,s as Moderate,t as Strong,r as Weak,L as __namedExportsOrder,I as default};
