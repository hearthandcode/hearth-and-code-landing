import{a as l,j as u}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";function n({value:t,max:y=100,variant:b="medium",showValue:x=!1,className:N=""}){const o=Math.min(100,Math.max(0,t/y*100)),k=["kc-confidence-bar",`kc-confidence-bar--${b}`,N].filter(Boolean).join(" ");return l("span",{className:k,children:[u("span",{className:"kc-confidence-bar__track",children:u("span",{className:"kc-confidence-bar__fill",style:{width:`${o}%`}})}),x&&l("span",{className:"kc-confidence-bar__value",children:[o.toFixed(0),"%"]})]})}try{n.displayName="ConfidenceBar",n.__docgenInfo={description:"",displayName:"ConfidenceBar",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"number"}},max:{defaultValue:{value:"100"},description:"",name:"max",required:!1,type:{name:"number"}},variant:{defaultValue:{value:"medium"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"low"'},{value:'"medium"'},{value:'"high"'},{value:'"stated"'}]}},showValue:{defaultValue:{value:"false"},description:"",name:"showValue",required:!1,type:{name:"boolean"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const j={title:"Knowledge/Atoms/ConfidenceBar",component:n,tags:["autodocs"],argTypes:{variant:{control:"select",options:["low","medium","high","stated"]},value:{control:{type:"range",min:0,max:100}},showValue:{control:"boolean"}}},e={args:{value:20,variant:"low",showValue:!0}},a={args:{value:55,variant:"medium",showValue:!0}},r={args:{value:85,variant:"high",showValue:!0}},s={args:{value:75,variant:"stated",showValue:!0}};var c,i,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    value: 20,
    variant: 'low',
    showValue: true
  }
}`,...(d=(i=e.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var m,p,v;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    value: 55,
    variant: 'medium',
    showValue: true
  }
}`,...(v=(p=a.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};var h,f,g;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    value: 85,
    variant: 'high',
    showValue: true
  }
}`,...(g=(f=r.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var w,V,_;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    value: 75,
    variant: 'stated',
    showValue: true
  }
}`,...(_=(V=s.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};const C=["Low","Medium","High","Stated"];export{r as High,e as Low,a as Medium,s as Stated,C as __namedExportsOrder,j as default};
