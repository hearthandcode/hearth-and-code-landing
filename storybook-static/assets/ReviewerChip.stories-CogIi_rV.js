import{a as o,j as r}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";function c({name:i,initials:y,role:t,decision:e,className:w=""}){const f=y??i.split(/\s+/).map(j=>j[0]).slice(0,2).join("").toUpperCase(),R=["kc-reviewer-chip",e?`kc-reviewer-chip--${e}`:"",w].filter(Boolean).join(" ");return o("span",{className:R,children:[r("span",{className:"kc-reviewer-chip__avatar",children:f}),o("span",{className:"kc-reviewer-chip__body",children:[r("span",{className:"kc-reviewer-chip__name",children:i}),t&&r("span",{className:"kc-reviewer-chip__role",children:t})]}),e&&r("span",{className:"kc-reviewer-chip__decision",children:e})]})}try{c.displayName="ReviewerChip",c.__docgenInfo={description:"",displayName:"ReviewerChip",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},initials:{defaultValue:null,description:"",name:"initials",required:!1,type:{name:"string"}},role:{defaultValue:null,description:"",name:"role",required:!1,type:{name:"string"}},decision:{defaultValue:null,description:"",name:"decision",required:!1,type:{name:"enum",value:[{value:'"pending"'},{value:'"rejected"'},{value:'"approved"'},{value:'"abstained"'}]}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const q={title:"Knowledge/Atoms/ReviewerChip",component:c,tags:["autodocs"],argTypes:{decision:{control:"select",options:["approved","rejected","pending","abstained"]}}},a={args:{name:"Scott Rallya",role:"Architect",decision:"approved"}},n={args:{name:"Reviewer",role:"Security",decision:"pending"}},s={args:{name:"Reviewer",role:"Privacy",decision:"rejected"}};var p,l,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    name: 'Scott Rallya',
    role: 'Architect',
    decision: 'approved'
  }
}`,...(d=(l=a.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,u,v;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    name: 'Reviewer',
    role: 'Security',
    decision: 'pending'
  }
}`,...(v=(u=n.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var g,h,_;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    name: 'Reviewer',
    role: 'Privacy',
    decision: 'rejected'
  }
}`,...(_=(h=s.parameters)==null?void 0:h.docs)==null?void 0:_.source}}};const A=["Approved","Pending","Rejected"];export{a as Approved,n as Pending,s as Rejected,A as __namedExportsOrder,q as default};
