(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{49:function(t,e,o){var content=o(51);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(10).default)("7c208f02",content,!0,{sourceMap:!1})},50:function(t,e,o){"use strict";o(49)},51:function(t,e,o){var n=o(9)(!1);n.push([t.i,"#canvas-container[data-v-2b0bd303]{height:100%}",""]),t.exports=n},52:function(t,e,o){"use strict";o.r(e);const n=o(30)("lzw");var r={name:"HomePage",data:()=>({steps:[{label:"Home"},{label:""}]}),computed:{activeStep:{get(){return this.$store.getters.getActiveStep()},set(t){this.$store.commit("setActiveStepId",t)}},qrData:{get(){return this.$store.getters.getQrData()},set(t){this.$store.commit("setQrData",t)}}},methods:{async nextStep(){this.activeStep++;const t=await n.compress(this.qrData);this.$router.push({name:this.$store.getters.getSteps()[this.activeStep].to,query:{d:t}})}},mounted(){}},c=(o(50),o(7)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"section"},[o("h1",{staticClass:"title"},[t._v("How does this work?")]),t._v(" "),t._m(0),t._v(" "),o("p",{staticClass:"has-text-justified"},[t._v("\n    This site is divided into steps which will guide you into making your own drum module (the icons at the top of the page are clickable).\n    So, if you are ready to start that journey and build your own custom drum module, click the 'Next Step' button!\n    Note that you can save your progress at any time by clicking the permalink icon at the top of the page.\n  ")]),t._v(" "),o("p",{staticClass:"has-text-right"},[o("b-button",{attrs:{"icon-right":"angle-double-right"},on:{click:t.nextStep}},[t._v("Next Step")])],1)])}),[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("p",{staticClass:"has-text-justified"},[t._v("\n    This documentation is customizable, if you are coming from \n    "),o("a",{attrs:{href:"https://configure.exadrums.com",target:"_blank"}},[t._v("configure.exadrums.com")]),t._v(" \n    you are alreading reading your custom documentation, otherwise, you are reading the full documentation.\n  ")])}],!1,null,"2b0bd303",null);e.default=component.exports}}]);