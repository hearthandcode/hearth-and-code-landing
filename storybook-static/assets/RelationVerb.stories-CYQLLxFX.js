import{a as k,j as n}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";const N={forward:"→",backward:"←",bidirectional:"↔"};function t({verb:o,direction:w="forward",className:x=""}){const y=["kc-relation-verb",`kc-relation-verb--${o}`,x].filter(Boolean).join(" ");return k("span",{className:y,children:[n("span",{className:"kc-relation-verb__arrow","aria-hidden":"true",children:N[w]}),n("span",{className:"kc-relation-verb__label",children:o})]})}try{t.displayName="RelationVerb",t.__docgenInfo={description:"",displayName:"RelationVerb",props:{verb:{defaultValue:null,description:"",name:"verb",required:!0,type:{name:"enum",value:[{value:'"is-a"'},{value:'"part-of"'},{value:'"causes"'},{value:'"requires"'},{value:'"enables"'},{value:'"precedes"'},{value:'"follows"'},{value:'"contradicts"'},{value:'"supports"'},{value:'"extends"'},{value:'"instance-of"'},{value:'"same-as"'}]}},direction:{defaultValue:{value:"forward"},description:"",name:"direction",required:!1,type:{name:"enum",value:[{value:'"forward"'},{value:'"backward"'},{value:'"bidirectional"'}]}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const j={title:"Knowledge/Atoms/RelationVerb",component:t,tags:["autodocs"],argTypes:{verb:{control:"select",options:["is-a","part-of","causes","requires","enables","precedes","follows","contradicts","supports","extends","instance-of","same-as"]},direction:{control:"select",options:["forward","backward","bidirectional"]}}},e={args:{verb:"is-a"}},a={args:{verb:"part-of"}},r={args:{verb:"causes"}},s={args:{verb:"extends",direction:"bidirectional"}};var c,i,l;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    verb: 'is-a'
  }
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,u,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    verb: 'part-of'
  }
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,v,b;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    verb: 'causes'
  }
}`,...(b=(v=r.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var f,g,_;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    verb: 'extends',
    direction: 'bidirectional'
  }
}`,...(_=(g=s.parameters)==null?void 0:g.docs)==null?void 0:_.source}}};const R=["IsA","PartOf","Causes","Bidirectional"];export{s as Bidirectional,r as Causes,e as IsA,a as PartOf,R as __namedExportsOrder,j as default};
