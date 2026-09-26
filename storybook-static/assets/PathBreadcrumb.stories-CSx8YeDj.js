import{j as e,a as N,F as v}from"./jsx-runtime-__TNlaZv.js";import"./index-CleY8y_P.js";import"./_commonjsHelpers-Cpj98o6Y.js";const F={folder:"◫",file:"◧",package:"⌘"};function n({segment:o,href:t,icon:k="folder",className:y=""}){const c=["kc-path-segment",y].filter(Boolean).join(" "),l=N(v,{children:[e("span",{className:"kc-path-segment__icon","aria-hidden":"true",children:F[k]}),e("span",{className:"kc-path-segment__name",children:o})]});return t?e("a",{className:c,href:t,children:l}):e("span",{className:c,children:l})}try{n.displayName="PathBreadcrumb",n.__docgenInfo={description:"",displayName:"PathBreadcrumb",props:{segment:{defaultValue:null,description:"",name:"segment",required:!0,type:{name:"string"}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string"}},icon:{defaultValue:{value:"folder"},description:"",name:"icon",required:!1,type:{name:"enum",value:[{value:'"folder"'},{value:'"file"'},{value:'"package"'}]}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const j={title:"Knowledge/Atoms/PathBreadcrumb",component:n,tags:["autodocs"],argTypes:{icon:{control:"select",options:["folder","file","package"]}}},a={args:{segment:"knowledge/atoms",icon:"folder"}},r={args:{segment:"CitationRef.astro",icon:"file"}},s={args:{segment:"@hearthandcode/core",icon:"package"}};var i,d,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    segment: 'knowledge/atoms',
    icon: 'folder'
  }
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,u,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    segment: 'CitationRef.astro',
    icon: 'file'
  }
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var f,h,_;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    segment: '@hearthandcode/core',
    icon: 'package'
  }
}`,...(_=(h=s.parameters)==null?void 0:h.docs)==null?void 0:_.source}}};const q=["Folder","File","Package"];export{r as File,a as Folder,s as Package,q as __namedExportsOrder,j as default};
