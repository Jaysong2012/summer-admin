(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92398664"],{"427a":function(t,n,e){},"735d":function(t,n,e){"use strict";var s=e("f370"),o=e.n(s);o.a},8380:function(t,n,e){"use strict";var s=e("427a"),o=e.n(s);o.a},"9ed6":function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"login-container"},[e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,"auto-complete":"on","label-position":"left"}},[e("div",{staticClass:"title-container"},[e("h3",{staticClass:"title"},[t._v("\n        "+t._s(t.$t("login.title"))+"\n      ")]),e("lang-select",{staticClass:"set-language"})],1),e("el-form-item",{attrs:{prop:"name"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"user"}})],1),e("el-input",{attrs:{placeholder:t.$t("login.username"),name:"username",type:"text","auto-complete":"on"},model:{value:t.loginForm.name,callback:function(n){t.$set(t.loginForm,"name",n)},expression:"loginForm.name"}})],1),e("el-form-item",{attrs:{prop:"passwd"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"password"}})],1),e("el-input",{attrs:{type:t.passwordType,placeholder:t.$t("login.password"),name:"password","auto-complete":"on"},nativeOn:{keyup:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.handleLogin(n)}},model:{value:t.loginForm.passwd,callback:function(n){t.$set(t.loginForm,"passwd",n)},expression:"loginForm.passwd"}}),e("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[e("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1),e("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(n){return n.preventDefault(),t.handleLogin(n)}}},[t._v("\n      "+t._s(t.$t("login.logIn"))+"\n    ")]),e("div",{staticStyle:{position:"relative"}},[e("div",{staticClass:"tips"},[e("span",[t._v(t._s(t.$t("login.username"))+" : admin")]),e("span",[t._v(t._s(t.$t("login.password"))+" : "+t._s(t.$t("login.any")))])]),e("div",{staticClass:"tips"},[e("span",{staticStyle:{"margin-right":"18px"}},[t._v("\n          "+t._s(t.$t("login.username"))+" : editor\n        ")]),e("span",[t._v(t._s(t.$t("login.password"))+" : "+t._s(t.$t("login.any")))])]),e("el-button",{staticClass:"thirdparty-button",attrs:{type:"primary"},on:{click:function(n){t.showDialog=!0}}},[t._v("\n        "+t._s(t.$t("login.thirdparty"))+"\n      ")])],1)],1),e("el-dialog",{attrs:{title:t.$t("login.thirdparty"),visible:t.showDialog},on:{"update:visible":function(n){t.showDialog=n}}},[t._v("\n    "+t._s(t.$t("login.thirdpartyTips"))+"\n    "),e("br"),e("br"),e("br")])],1)},o=[],a=e("61f7"),i=e("1131"),r={name:"Login",components:{LangSelect:i["a"]},data:function(){var t=function(t,n,e){Object(a["b"])(n)?e():e(new Error("Please enter the correct user name"))},n=function(t,n,e){n.length<6?e(new Error("The password can not be less than 6 digits")):e()};return{loginForm:{name:"admin",passwd:"1111111"},loginRules:{name:[{required:!0,trigger:"blur",validator:t}],passwd:[{required:!0,trigger:"blur",validator:n}]},passwordType:"password",loading:!1,showDialog:!1,redirect:void 0}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},created:function(){},destroyed:function(){},methods:{showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},handleLogin:function(){var t=this;this.$refs.loginForm.validate(function(n){if(!n)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("LoginByUsername",t.loginForm).then(function(){t.loading=!1,t.$router.push({path:t.redirect||"/"})}).catch(function(){t.loading=!1})})},afterQRScan:function(){}}},l=r,c=(e("735d"),e("8380"),e("2877")),d=Object(c["a"])(l,s,o,!1,null,"c3db2f44",null);n["default"]=d.exports},f370:function(t,n,e){}}]);