import{a as h,j as n}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";function l({status:r,label:S,size:y="md",className:P=""}){const N=["kc-status-pill",`kc-status-pill--${r}`,`kc-status-pill--${y}`,P].filter(Boolean).join(" ");return h("span",{className:N,children:[n("span",{className:"kc-status-pill__dot","aria-hidden":"true"}),n("span",{className:"kc-status-pill__label",children:S??r})]})}try{l.displayName="StatusPill",l.__docgenInfo={description:"",displayName:"StatusPill",props:{status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"enum",value:[{value:'"draft"'},{value:'"active"'},{value:'"approved"'},{value:'"rejected"'},{value:'"pending"'},{value:'"open"'},{value:'"closed"'},{value:'"sealed"'},{value:'"archived"'},{value:'"review"'}]}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},size:{defaultValue:{value:"md"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const x={title:"Knowledge/Atoms/StatusPill",component:l,tags:["autodocs"],argTypes:{status:{control:"select",options:["open","closed","pending","sealed","active","archived","review","rejected","approved","draft"]},size:{control:"select",options:["sm","md"]}}},e={args:{status:"sealed"}},a={args:{status:"approved",label:"Gate Passed"}},s={args:{status:"pending"}},t={args:{status:"rejected"}};var o,d,c;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    status: 'sealed'
  }
}`,...(c=(d=e.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var u,p,i;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    status: 'approved',
    label: 'Gate Passed'
  }
}`,...(i=(p=a.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var m,v,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    status: 'pending'
  }
}`,...(g=(v=s.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var f,_,j;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    status: 'rejected'
  }
}`,...(j=(_=t.parameters)==null?void 0:_.docs)==null?void 0:j.source}}};const V=["Sealed","Approved","Pending","Rejected"];export{a as Approved,s as Pending,t as Rejected,e as Sealed,V as __namedExportsOrder,x as default};
