(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{56:function(e,t,l){"use strict";l.r(t);const n=l(30)("lzma");var c={data:()=>({value:'{"v":0,"s":1,"steps":[{"id":0},{"id":1},{"id":2},{"id":3}]}',computedValue:""}),methods:{async change(){const e=await n.compress(this.value);this.computedValue=e}}},o=l(7),component=Object(o.a)(c,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",{staticClass:"section"},[l("b-field",{attrs:{label:"Value"}},[l("b-input",{on:{input:e.change},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),l("b-field",{attrs:{label:"Value"}},[l("b-input",{attrs:{type:"textarea"},model:{value:e.computedValue,callback:function(t){e.computedValue=t},expression:"computedValue"}})],1),e._v("\n    Length: "+e._s(e.computedValue.length)+"\n")],1)}),[],!1,null,null,null);t.default=component.exports}}]);