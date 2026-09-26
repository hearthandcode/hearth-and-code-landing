import{j as e,a as p,F as x}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";function o({author:s,year:F,locator:i,href:c,variant:V="inline",className:j=""}){const l=["kc-citation-ref",`kc-citation-ref--${V}`,j].filter(Boolean).join(" "),u=p(x,{children:[e("span",{className:"kc-citation-ref__author",children:s}),p("span",{className:"kc-citation-ref__year",children:["(",F,")"]}),i&&e("span",{className:"kc-citation-ref__locator",children:i})]});return c?e("a",{className:l,href:c,children:u}):e("span",{className:l,children:u})}try{o.displayName="CitationRef",o.__docgenInfo={description:"",displayName:"CitationRef",props:{author:{defaultValue:null,description:"",name:"author",required:!0,type:{name:"string"}},year:{defaultValue:null,description:"",name:"year",required:!0,type:{name:"string | number"}},locator:{defaultValue:null,description:"",name:"locator",required:!1,type:{name:"string"}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"inline"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"inline"'},{value:'"footnote"'},{value:'"parenthetical"'}]}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const I={title:"Knowledge/Atoms/CitationRef",component:o,tags:["autodocs"],argTypes:{variant:{control:"select",options:["inline","footnote","parenthetical"]},year:{control:"number"}}},a={args:{author:"Rallya",year:2026,locator:"p.42"}},r={args:{author:"Frost",year:2016,variant:"footnote"}},t={args:{author:"Popper",year:1959,variant:"parenthetical"}},n={args:{author:"Rallya",year:2026,href:"#"}};var m,d,f;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    author: 'Rallya',
    year: 2026,
    locator: 'p.42'
  }
}`,...(f=(d=a.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};var h,y,g;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    author: 'Frost',
    year: 2016,
    variant: 'footnote'
  }
}`,...(g=(y=r.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var _,v,N;t.parameters={...t.parameters,docs:{...(_=t.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    author: 'Popper',
    year: 1959,
    variant: 'parenthetical'
  }
}`,...(N=(v=t.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var R,k,q;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    author: 'Rallya',
    year: 2026,
    href: '#'
  }
}`,...(q=(k=n.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};const b=["Inline","Footnote","Parenthetical","WithLink"];export{r as Footnote,a as Inline,t as Parenthetical,n as WithLink,b as __namedExportsOrder,I as default};
