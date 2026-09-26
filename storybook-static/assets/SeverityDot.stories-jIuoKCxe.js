import{a as q,j as o}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";function t({severity:n,label:i,size:S="md",pulsing:C=!1,className:N=""}){const k=["kc-severity-dot",`kc-severity-dot--${n}`,`kc-severity-dot--${S}`,C?"is-pulsing":"",N].filter(Boolean).join(" ");return q("span",{className:k,children:[o("span",{className:"kc-severity-dot__pip","aria-hidden":"true"}),i&&o("span",{className:"kc-severity-dot__label",children:i})]})}try{t.displayName="SeverityDot",t.__docgenInfo={description:"",displayName:"SeverityDot",props:{severity:{defaultValue:null,description:"",name:"severity",required:!0,type:{name:"enum",value:[{value:'"info"'},{value:'"success"'},{value:'"caution"'},{value:'"warning"'},{value:'"error"'},{value:'"critical"'}]}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},size:{defaultValue:{value:"md"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},pulsing:{defaultValue:{value:"false"},description:"",name:"pulsing",required:!1,type:{name:"boolean"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const j={title:"Knowledge/Atoms/SeverityDot",component:t,tags:["autodocs"],argTypes:{severity:{control:"select",options:["info","success","caution","warning","error","critical"]},size:{control:"select",options:["sm","md","lg"]},pulsing:{control:"boolean"}}},e={args:{severity:"info",label:"Info"}},a={args:{severity:"success",label:"OK"}},s={args:{severity:"caution",label:"Caution"}},r={args:{severity:"critical",label:"Critical",pulsing:!0}};var l,c,u;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    label: 'Info'
  }
}`,...(u=(c=e.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var p,d,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    severity: 'success',
    label: 'OK'
  }
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var v,y,g;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    severity: 'caution',
    label: 'Caution'
  }
}`,...(g=(y=s.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var f,_,b;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    severity: 'critical',
    label: 'Critical',
    pulsing: true
  }
}`,...(b=(_=r.parameters)==null?void 0:_.docs)==null?void 0:b.source}}};const x=["Info","Success","Caution","Critical"];export{s as Caution,r as Critical,e as Info,a as Success,x as __namedExportsOrder,j as default};
