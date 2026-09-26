import{j as e,a as V,F as x}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";const q={noun:"◆",abbreviation:"⌖",verb:"◆",phrase:"◆",adjective:"◆"};function o({term:c,type:s="noun",definition:i,href:p,className:A=""}){const l=["kc-concept-term",`kc-concept-term--${s}`,A].filter(Boolean).join(" "),m=V(x,{children:[e("span",{className:"kc-concept-term__type","aria-label":`type: ${s}`,children:q[s]}),e("span",{className:"kc-concept-term__label",children:c})]});return p?e("a",{className:l,title:i,href:p,children:m}):e("span",{className:l,title:i,children:m})}try{o.displayName="ConceptTerm",o.__docgenInfo={description:"",displayName:"ConceptTerm",props:{term:{defaultValue:null,description:"",name:"term",required:!0,type:{name:"string"}},type:{defaultValue:{value:"noun"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"noun"'},{value:'"verb"'},{value:'"adjective"'},{value:'"phrase"'},{value:'"abbreviation"'}]}},definition:{defaultValue:null,description:"",name:"definition",required:!1,type:{name:"string"}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const P={title:"Knowledge/Atoms/ConceptTerm",component:o,tags:["autodocs"],argTypes:{type:{control:"select",options:["noun","verb","adjective","phrase","abbreviation"]}}},r={args:{term:"Provenance",type:"noun"}},a={args:{term:"ADT",type:"abbreviation",definition:"Algebraic Data Type"}},n={args:{term:"extends",type:"verb"}},t={args:{term:"open-source intelligence",type:"phrase"}};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    term: 'Provenance',
    type: 'noun'
  }
}`,...(g=(d=r.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var b,v,y;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    term: 'ADT',
    type: 'abbreviation',
    definition: 'Algebraic Data Type'
  }
}`,...(y=(v=a.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var f,h,_;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    term: 'extends',
    type: 'verb'
  }
}`,...(_=(h=n.parameters)==null?void 0:h.docs)==null?void 0:_.source}}};var N,T,j;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    term: 'open-source intelligence',
    type: 'phrase'
  }
}`,...(j=(T=t.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};const S=["Noun","Abbreviation","Verb","Phrase"];export{a as Abbreviation,r as Noun,t as Phrase,n as Verb,S as __namedExportsOrder,P as default};
