(this["webpackJsonpfuksipassi-react"]=this["webpackJsonpfuksipassi-react"]||[]).push([[0],{45:function(e,t,n){},46:function(e,t,n){},52:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var s=n(0),c=n.n(s),a=n(20),r=n.n(a),i=(n(45),n(9)),l=(n(46),n(36)),j=n(5),o=n(10),u=n.n(o),d=n(17),b="http://127.0.0.1:5000",h={loginUser:function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch(b+"/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),deleteUser:function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch(b+"/signout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),fetchData:function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch(b+"/data?token="+t.user_id,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),useWindowSize:function(){var e=Object(s.useState)({width:void 0,height:void 0}),t=Object(i.a)(e,2),n=t[0],c=t[1];return Object(s.useEffect)((function(){function e(){c({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),n}},x=n(1),O=function(e){var t=e.setUser,n=e.id_jarj,c=Object(s.useState)(),a=Object(i.a)(c,2),r=a[0],l=a[1],j=Object(s.useState)(),o=Object(i.a)(j,2),b=o[0],O=o[1],p=Object(s.useState)(),m=Object(i.a)(p,2),v=m[0],f=m[1],y=function(){var e=Object(d.a)(u.a.mark((function e(s){var c,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s.preventDefault(),c={useremail:r,password:b,id_jarj:n},e.next=4,h.loginUser(c);case 4:(a=e.sent).user_id?t(a):f(!0);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(x.jsxs)("div",{children:[Object(x.jsx)("div",{class:"nav",children:Object(x.jsx)("div",{class:"row",children:Object(x.jsxs)("div",{class:"center",children:[Object(x.jsx)("div",{class:"col s12 m2 brand-site",children:Object(x.jsx)("a",{href:"https://www.syrinx.fi",children:Object(x.jsx)("img",{src:"./static/img/syrinx_logo.png",alt:"",class:"responsive-img"})})}),Object(x.jsx)("div",{class:"col s12 m4 offset-m2",children:Object(x.jsx)("a",{href:"",class:"",children:Object(x.jsx)("h3",{class:"brand-text brand-logo",children:"Syrinx Fuksipassi"})})})]})})}),Object(x.jsxs)("div",{class:"center brand-text",children:[Object(x.jsx)("h4",{children:"Kirjaudu"}),Object(x.jsx)("p",{children:"Anna isamail (yliopiston JYU) s\xe4hk\xf6posti pitk\xe4ss\xe4 muodossa"}),Object(x.jsx)("p",{children:"Esim."}),Object(x.jsx)("p",{children:Object(x.jsx)("i",{children:"kalle.h.ankka@student.jyu.fi"})})]}),!0===v&&Object(x.jsx)("p",{class:"center error",children:"V\xe4\xe4r\xe4 s\xe4hk\xf6posti tai salasana!"}),Object(x.jsxs)("form",{class:"kuittaus",onSubmit:y,children:[Object(x.jsx)("input",{type:"email",name:"useremail",placeholder:"S\xe4hk\xf6posti",pattern:".*@student.jyu.fi",required:!0,onChange:function(e){return l(e.target.value)}})," ",Object(x.jsx)("input",{type:"password",name:"password",placeholder:"Ainej\xe4rjest\xf6n Salasana",id:"password",required:!0,onChange:function(e){return O(e.target.value)}})," ",Object(x.jsx)("div",{class:"center",children:Object(x.jsx)("input",{class:"btn yellow darken-2",type:"submit",value:"Kirjaudu"})})]})]})},p=n(35),m=n(76),v=function(e){var t=e.name,n=e.setUser,s=h.useWindowSize().width<=700?"column":"row",c=[3,6,1,2];if("column"==s){var a,r=[],i=Object(p.a)(c);try{for(i.s();!(a=i.n()).done;){a.value;r.push(0)}}catch(l){i.e(l)}finally{i.f()}c=r}return Object(x.jsx)("div",{className:"nav",children:Object(x.jsxs)(m.a,{container:!0,spacing:3,direction:s,children:[Object(x.jsx)(m.a,{item:!0,xs:c[0],children:Object(x.jsx)("div",{className:"header",children:Object(x.jsx)("a",{href:"https://www.syrinx.fi",children:Object(x.jsx)("img",{src:"https://www.syrinx.fi/wp-content/uploads/2019/02/copy-syrinx_logoGreenBackgroundveryYellowWithText.png",alt:"",className:"responsive-img"})})})}),Object(x.jsx)(m.a,{item:!0,xs:c[1],children:Object(x.jsx)("div",{className:"header",children:Object(x.jsx)("a",{href:"",className:"",children:Object(x.jsx)("h3",{className:"brand-text brand-logo",children:"Syrinx Fuksipassi"})})})}),Object(x.jsx)(m.a,{item:!0,xs:c[2],children:Object(x.jsx)("div",{className:"header",children:t})}),Object(x.jsx)(m.a,{item:!0,xs:c[3],children:Object(x.jsx)("div",{className:"header",children:Object(x.jsx)("button",{onClick:function(e){n()},className:"btn-small logout-btn yellow darken-2",name:"logout-submit",children:"Kirjaudu ulos"})})})]})})},f=function(){return Object(x.jsxs)("div",{class:"center container",children:[Object(x.jsx)("p",{class:"info-text",children:"T\xe4m\xe4 on Syrinx Ry:n virallinen Fuksipassi 2020. Seuraavia teht\xe4vi\xe4 suorittamalla saat kaiken irti fuksisyksyst\xe4si ja p\xe4\xe4set samalla sukeltamaan osaksi Syrinxin toimintaa!"}),Object(x.jsx)("p",{class:"info-text",children:"Vaikka fuksipassin t\xe4ytt\xe4miseen tulee suhtautua omistautuneesti ja asianmukaisella vakavuudella, muista aina teht\xe4vi\xe4 suorittaessasi pit\xe4\xe4 hauskaa ja hakea rennosti uusia kokemuksia."}),Object(x.jsx)("p",{class:"info-text info-text-last",children:"Antoisaa fuksisyksy\xe4!"})]})},y=function(e){var t=e.task;return Object(x.jsxs)("div",{className:"card z-depth-0",children:[Object(x.jsxs)("div",{className:"card-content center",children:[Object(x.jsxs)("h6",{children:["Teht\xe4v\xe4 ",t.num]}),Object(x.jsx)("h5",{children:t.kuvaus})]}),Object(x.jsx)("div",{className:"card-action center",children:t.lahetetty&t.suoritettu?Object(x.jsx)("button",{className:"btn brand-text grey",children:"L\xe4hetetty"}):t.suoritettu?Object(x.jsx)("button",{className:"btn brand-text btn-suoritettu",children:"Suoritettu"}):Object(x.jsxs)("form",{children:[Object(x.jsx)("input",{className:"hide",name:"id"}),Object(x.jsx)("input",{type:"text",placeholder:"Viesti / Tutorin nimi",name:"message",id:"1973",className:"perusopinnot"}),Object(x.jsx)("button",{type:"submit",className:"btn brand-text yellow darken-2",children:"L\xe4het\xe4"})]})})]})},k=function(e){var t=e.user,n=Object(s.useState)(),c=Object(i.a)(n,2),a=c[0],r=c[1],l=Object(s.useState)([]),j=Object(i.a)(l,2),o=j[0],b=j[1],O=h.useWindowSize();Object(s.useEffect)((function(){Object(d.a)(u.a.mark((function e(){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.fetchData(t);case 2:n=e.sent,b(n.tehtavat),console.log(n),console.log(o);case 6:case"end":return e.stop()}}),e)})))();for(var e={},n=0,s=Object.keys(o);n<s.length;n++){e[s[n]]=!1}r(e)}),[]);var p=O.width<=700?"column":"row",v=O.width<=700?12:6,f=Object.keys(o);return Object(x.jsxs)("div",{className:"container",children:[Object(x.jsx)("h4",{className:"center gray-text",children:"Teht\xe4v\xe4t"}),f.length>0?f.map((function(e){return Object(x.jsxs)("div",{className:"",children:[Object(x.jsxs)("button",{className:"accordion ".concat(a[e]?"active":""),type:"button",onClick:function(t){return function(e,t){e.preventDefault();var n=Object.assign({},a);n[t]=!n[t],r(n)}(t,e)},children:[Object(x.jsx)("h5",{children:e}),Object(x.jsx)("br",{}),Object(x.jsxs)("h6",{children:[o[e].suoritettu," / ",o[e].kpl]})]}),Object(x.jsx)("div",{className:"panel ".concat(a[e]?"show":""),children:Object(x.jsx)(m.a,{container:!0,spacing:2,direction:p,children:o[e].tehtavat.length>0?o[e].tehtavat.map((function(e){return Object(x.jsx)(m.a,{item:!0,xs:v,children:Object(x.jsx)(y,{task:e})},e.id)})):null})})]})})):null]})},g=function(e){var t=e.user,n=e.setUser,s=function(){var e=Object(d.a)(u.a.mark((function e(s){var c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s.preventDefault(),c={user_id:t.user_id},e.next=4,h.deleteUser(c);case 4:e.sent,n();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{className:"policy",children:[Object(x.jsx)("h5",{className:"center gray-text",children:"Luodaanko uusi k\xe4ytt\xe4j\xe4?"}),Object(x.jsx)("p",{className:"center brand-text",children:"Email"}),Object(x.jsxs)("p",{className:"center gray-text",children:["Luomalla k\xe4ytt\xe4j\xe4n hyv\xe4ksyt palvelun k\xe4ytt\xf6ehdot sek\xe4 ",Object(x.jsx)("a",{href:"./gdpr",children:"rekisteri- ja tietosuojaselosteen"})]}),Object(x.jsx)("div",{className:"center margin-top-bottom",children:Object(x.jsx)("button",{onClick:function(e){var s=Object.assign({},t);s.isnewuser=!1,n(s)},className:"btn green-syrinx",children:"Kyll\xe4"})}),Object(x.jsx)("div",{className:"center margin-top-bottom",children:Object(x.jsx)("button",{onClick:s,className:"btn yellow darken-2",children:"Ei"})})]}),Object(x.jsx)("div",{className:"policy-background"})]})},w=n(33),N=n(37),S=n(78),T=n(80),C=n(79);var U=function(e){e.user;var t=Object(s.useState)(),n=Object(i.a)(t,2),c=n[0],a=n[1],r=Object(s.useState)(),l=Object(i.a)(r,2),j=l[0],o=l[1];Object(s.useEffect)((function(){o(function(){for(var e={kuitattavat:[]},t=0;t<10;t++)e.kuitattavat.push({name:"Nimi Sukunimit"+t});return e}())}),[]);return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)("div",{children:Object(x.jsx)("ul",{children:void 0!==j?j.kuitattavat.map((function(e,t){return Object(x.jsxs)("li",{children:[Object(x.jsxs)("div",{className:"collapsible-header",onClick:function(e){var n;c===(n=t)?a():a(n)},children:[" ",e.name]}),Object(x.jsx)("div",{className:"".concat(c===t?"collapsible-body":"hidden"," "),children:Object(x.jsxs)("form",{children:[Object(x.jsx)("div",{children:Object(x.jsx)("button",{className:"btn-small kuittaa-btn",style:{backgroundColor:"#fbc02d"},children:"Kuittaa valitut"})}),Object(x.jsx)("div",{children:Object(x.jsxs)("ul",{children:[Object(x.jsx)("li",{children:"Teht\xe4v\xe4 1"}),Object(x.jsx)("li",{children:"Teht\xe4v\xe4 2"})]})})]})})]},t)})):null})})})},E=["children","value","index"];function F(e){var t=e.children,n=e.value,s=e.index,c=Object(N.a)(e,E);return Object(x.jsx)("div",Object(w.a)(Object(w.a)({role:"tabpanel",hidden:n!==s,id:"simple-tabpanel-".concat(s),"aria-labelledby":"full-width-tab-".concat(s)},c),{},{children:n===s&&Object(x.jsx)(x.Fragment,{children:t})}))}var _=Object(S.a)({primary:{color:"black"}}),z=function(e){e.user;var t=Object(s.useState)(0),n=Object(i.a)(t,2),c=n[0],a=n[1],r=(_(),h.useWindowSize().width<=700?"100%":"75%");return Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)("div",{style:{width:r,margin:"auto"},children:[Object(x.jsxs)(T.a,{value:c,onChange:function(e,t){a(t)},textColor:"primary",indicatorColor:"primary",TabIndicatorProps:{style:{background:"black","text-color":"black"}},variant:"fullWidth",centered:!0,children:[Object(x.jsx)(C.a,{label:"Pyynn\xf6t",style:{color:"rgba(0, 0, 0, 0.7)"}}),Object(x.jsx)(C.a,{label:"Teht\xe4v\xe4t",style:{color:"rgba(0, 0, 0, 0.7)"}}),Object(x.jsx)(C.a,{label:"K\xe4ytt\xe4j\xe4t",style:{color:"rgba(0, 0, 0, 0.7)"}})]}),Object(x.jsx)(F,{value:c,index:0,children:Object(x.jsx)(U,{})}),Object(x.jsx)(F,{value:c,index:1,children:Object(x.jsx)("div",{children:Object(x.jsx)("p",{children:"Teht\xe4v\xe4t"})})}),Object(x.jsx)(F,{value:c,index:2,children:Object(x.jsx)("div",{children:Object(x.jsx)("p",{children:"K\xe4ytt\xe4j\xe4t"})})})]})})},K=(n(52),function(){var e=Object(s.useState)(),t=Object(i.a)(e,2),n=t[0],c=t[1];return console.log(n),n?n.is_admin?Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(v,{setUser:c,name:"Otto Virtanen"}),Object(x.jsx)(z,{user:n})]}):Object(x.jsxs)(x.Fragment,{children:[n.isnewuser?Object(x.jsx)(g,{user:n,setUser:c}):Object(x.jsx)(x.Fragment,{}),Object(x.jsx)(v,{setUser:c,name:"Otto Virtanen"}),Object(x.jsx)(f,{}),Object(x.jsx)(k,{user:n})]}):Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(l.a,{children:Object(x.jsxs)(j.c,{children:[Object(x.jsx)(j.a,{path:"/syrinx",children:Object(x.jsx)(O,{setUser:c,id_jarj:"1"})}),Object(x.jsx)(j.a,{path:"/",children:Object(x.jsx)("p",{children:"Public frontpage"})})]})})})});r.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(K,{})}),document.getElementById("root"))}},[[55,1,2]]]);
//# sourceMappingURL=main.39667879.chunk.js.map