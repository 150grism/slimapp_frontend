webpackJsonp([0],{0:function(e,t){},CL8r:function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("7+uW"),r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]},n=s("VU/8")({name:"app"},r,!1,function(e){s("pj9E")},null,null).exports,a=s("/ocq"),o=s("8+8L"),d={props:["logSignin"],data:function(){return{user:"",password:"",userId:0}},methods:{login:function(e){var t=this;e.preventDefault(),"login"===this.logSignin?this.$http.post("http://37.139.26.228/api/users/login",{user:this.user,password:this.password}).then(function(e){var s=e.body[0].user_id;0!==s?t.$emit("logingin",s):console.log("no user"),t.cancel()}):this.$http.post("http://37.139.26.228/api/users/signup",{user:this.user,password:this.password}).then(function(e){console.log(e),t.cancel()}),this.user="",this.password=""},cancel:function(){this.$emit("displaying","no")}}},l={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{ref:"modal",staticClass:"log-sign-in"},[s("form",{staticClass:"form",on:{submit:e.login}},[s("label",[e._v("User"),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user,expression:"user"}],staticClass:"user",attrs:{type:"text"},domProps:{value:e.user},on:{input:function(t){t.target.composing||(e.user=t.target.value)}}})]),e._v(" "),s("label",[e._v("Password"),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"password",attrs:{type:"text"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e._v(" "),"login"===e.logSignin?s("input",{staticClass:"submit",attrs:{type:"submit",value:"Log in"}}):s("input",{staticClass:"submit",attrs:{type:"submit",value:"Sign up"}})]),e._v(" "),s("button",{staticClass:"cancel",on:{click:e.cancel}},[e._v("Cancel")])])},staticRenderFns:[]},c=s("VU/8")(d,l,!1,function(e){s("CL8r")},"data-v-49573552",null).exports,u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"toolbar"},[s("div",{staticClass:"toolbar__left"},[s("a",{staticClass:"toolbar__item update-all-breeds",on:{click:e.allBreedsPicturesUpdater}},[e._v("Update All pictures")]),e._v(" "),s("a",{staticClass:"toolbar__item all-breeds",on:{click:e.allBreedsGetter}},[e._v("All Breeds")]),e._v(" "),s("a",{staticClass:"toolbar__item saved-breeds",on:{click:e.savedBreedsGetter}},[e._v("Saved Breeds")]),e._v(" "),s("a",{staticClass:"toolbar__item saved-pictures",on:{click:e.savedPicturesGetter}},[e._v("Saved Pictures")])]),e._v(" "),s("div",{staticClass:"toolbar__right"},[s("a",{staticClass:"toolbar__item login",on:{click:e.logerin}},[e._v("Log in")]),e._v(" "),s("a",{staticClass:"toolbar__item signup",on:{click:e.signerup}},[e._v("Sign up")])])])},staticRenderFns:[]},h=s("VU/8")({props:[],data:function(){return{}},methods:{allBreedsPicturesUpdater:function(){this.$emit("allBreedsPicturesUpdating")},allBreedsGetter:function(){this.$emit("allBreedsGetting")},savedBreedsGetter:function(){this.$emit("savedBreedsGetting")},savedPicturesGetter:function(){this.$emit("savedPicturesGetting")},logerin:function(){this.$emit("logingin","login")},signerup:function(){this.$emit("signingup","signup")}}},u,!1,function(e){s("Wks1")},"data-v-b1bc5db4",null).exports,p=s("iPd/"),g={props:["url","breed","subbreed","mode","userId","userPicBreedId"],data:function(){return{clickState:!1,autoRows:10,rowGap:2}},directives:{imagesLoaded:s.n(p).a},watch:{autoRows:function(){}},methods:{packGrid:function(){var e=this.$refs.tile,t=e.children[0],s=Math.floor((t.height+this.rowGap)/(this.autoRows+this.rowGap));e.style.gridRowEnd="span "+s,t.height=s*(this.autoRows+this.rowGap)-this.rowGap;var i=e.children[1];i.style.height=t.height-34+"px",i.style.width=t.width+"px",i.style.marginLeft=-t.width/2+"px",i.style.fontSize=Math.min(t.height,t.width)/7+"px";var r=e.children[2];r.style.width=t.width+"px",r.style.marginLeft=-t.width/2+"px",r.style.fontSize=Math.min(t.width/7,30)+"px"},mouseover:function(e){this.$refs.tile.children[2].style.visibility="visible"},mouseleave:function(e){var t=this.$refs.tile;t.children[2].style.visibility="hidden",t.children[1].style.display="none",this.clickState=!1},click:function(e){var t=this.$refs.tile;this.clickState=!this.clickState,this.clickState?t.children[1].style.display="flex":t.children[1].style.display="none"},savee:function(e){var t="breed"===e?{breed:this.breed,subbreed:this.subbreed}:{breed:this.breed,subbreed:this.subbreed,picture_url:this.url};console.log(e);var s="breed"===e?"http://37.139.26.228/api/users/"+this.userId+"/save":"http://37.139.26.228/api/users/"+this.userId+"/picture/save";this.$http.post(s,t).then(function(e){console.log("hello there",e)})},deletee:function(e){var t="breed"===e?"http://37.139.26.228/api/users/"+this.userPicBreedId+"/delete":"http://37.139.26.228/api/users/"+this.userPicBreedId+"/picture/delete";this.$http.delete(t).then(function(e){console.log(e)})},breedOpener:function(){this.$emit("breedOpening")},changeGridConsts:function(e,t){this.autoRows=e,this.rowGap=t}},created:function(){window.innerWidth<534?this.changeGridConsts(40,5):window.innerWidth<787?this.changeGridConsts(20,2):window.innerWidth<1039?this.changeGridConsts(15,2):console.log("ok")}},v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"images-loaded",rawName:"v-images-loaded",value:e.packGrid,expression:"packGrid"}],ref:"tile",staticClass:"ABreed",on:{mouseover:e.mouseover,mouseleave:e.mouseleave,click:e.click}},[s("img",{attrs:{src:e.url,alt:e.subbreed+" "+e.breed}}),e._v(" "),s("div",{staticClass:"text-wall"},[s("div",{staticClass:"text-wall__big-block"},[s("div",{staticClass:"text-wall__block"},[s("span",{staticClass:"text-wall__item save-breed",on:{click:function(t){e.savee("breed")}}},[e._v("+breed")]),e._v(" "),s("span",{staticClass:"text-wall__item delete-breed",on:{click:function(t){e.deletee("breed")}}},[e._v("-breed")])]),e._v(" "),s("div",{staticClass:"text-wall__block"},[s("span",{staticClass:"text-wall__item save-picture",on:{click:function(t){e.savee("picture")}}},[e._v("+picture")]),e._v(" "),s("span",{staticClass:"text-wall__item delete-picture",on:{click:function(t){e.deletee("picture")}}},[e._v("-picture")])])]),e._v(" "),s("span",{staticClass:"open",on:{click:e.breedOpener}},[e._v("OPEN")])]),e._v(" "),s("span",{staticClass:"breedTag"},[e._v(e._s(e.subbreed?e.subbreed+" "+e.breed:e.breed))])])},staticRenderFns:[]},b={components:{Login:c,Toolbar:h,ABreed:s("VU/8")(g,v,!1,function(e){s("W/aX")},"data-v-ee9c7ac6",null).exports},data:function(){return{bigArray:[],allBreeds:[],savedBreeds:[],savedPictureUrls:[],breedImageURLs:[],url:"",photosOfABreed:"",urlIndex:2,breedIndex:[0,1],mode:"all breeds",logSignin:"no",userId:1}},methods:{fetchAllBreeds:function(){var e=this;this.$http.get("https://dog.ceo/api/breeds/list/all").then(function(t){var s=t.body.message,i=function(t){if(s[t].length){s[t].forEach(function(s){var i=s.toLowerCase();e.allBreeds.push([t,i])})}else e.allBreeds.push([t,""])};for(var r in s)i(r);e.allBreeds.sort(),e.bigArray=e.allBreeds}).then(function(){e.fetchRandomBreedsPictures(e.allBreeds)})},fetchRandomBreedsPictures:function(e){var t=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;e.map(function(e){var r=""!==e[i]?"https://dog.ceo/api/breed/"+e[s]+"/"+e[i]+"/images/random":"https://dog.ceo/api/breed/"+e[s]+"/images/random";t.$http.get(r).then(function(t){e.push(t.body.message)})}),console.log(e)},openBreed:function(e){var t=this;console.log(e),4===e.length?this.breedIndex=[1,2]:this.breedIndex=[0,1],this.photosOfABreed=""!==e[this.breedIndex[1]]?e[this.breedIndex[1]]+" "+e[this.breedIndex[0]]:e[this.breedIndex[0]];var s=""!==e[this.breedIndex[1]]?"https://dog.ceo/api/breed/"+e[this.breedIndex[0]]+"/"+e[this.breedIndex[1]]+"/images":"https://dog.ceo/api/breed/"+e[this.breedIndex[0]]+"/images";this.$http.get(s).then(function(s){var i=s.body.message;t.urlIndex=2,t.bigArray=[],t.mode="one breed",i.forEach(function(s){t.bigArray.push([e[t.breedIndex[0]],e[t.breedIndex[1]],s])}),t.breedIndex=[0,1]})},showSavedBreeds:function(){var e=this;this.$http.get("http://37.139.26.228/api/user/"+this.userId+"/saved").then(function(t){var s=t.body;console.log(s),e.urlIndex=3,e.bigArray=[],e.savedBreeds=[],e.breedIndex=[1,2],e.mode="all breeds",console.log(e.savedBreeds),s.forEach(function(t){e.savedBreeds.push([t.userbreed_id,t.breed_name,t.subbreed_name])}),e.bigArray=e.savedBreeds,console.log(e.bigArray)}).then(function(){e.fetchRandomBreedsPictures(e.savedBreeds,1,2)})},showSavedPictures:function(){var e=this;this.photosOfABreed="",this.$http.get("http://37.139.26.228/api/user/"+this.userId+"/pictures/saved").then(function(t){var s=t.body;console.log(s),e.urlIndex=3,e.savedPictureUrls=[],e.breedIndex=[1,2],e.bigArray=[],e.mode="one breed",s.forEach(function(t){e.savedPictureUrls.push([t.userpicture_id,t.breed_name,t.subbreed_name,t.picture_url])}),e.bigArray=e.savedPictureUrls})},updateAllBreedsPictures:function(){this.allBreeds.forEach(function(e){e.pop()}),console.log(this.allBreeds),this.fetchRandomBreedsPictures(this.allBreeds)},showAllBreeds:function(){this.photosOfABreed="",this.breedIndex=[0,1],this.mode="all breeds",this.urlIndex=2,this.bigArray=this.allBreeds},signOrLogIn:function(e){this.logSignin=e},logingIn:function(e){console.log(e),this.userId=e}},created:function(){this.fetchAllBreeds()}},f={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"AllBreeds"},[s("Toolbar",{on:{allBreedsPicturesUpdating:e.updateAllBreedsPictures,savedBreedsGetting:function(t){e.showSavedBreeds()},savedPicturesGetting:function(t){e.showSavedPictures()},allBreedsGetting:function(t){e.showAllBreeds()},signingup:e.signOrLogIn,logingin:e.signOrLogIn}}),e._v(" "),"no"!==e.logSignin?s("Login",{attrs:{logSignin:e.logSignin},on:{displaying:e.signOrLogIn,logingin:e.logingIn}}):e._e(),e._v(" "),s("div",{ref:"images",staticClass:"images",attrs:{id:"images"}},e._l(e.bigArray,function(t){return void 0!==t[e.urlIndex]?s("ABreed",{key:t[0]+t[e.urlIndex],attrs:{url:t[e.urlIndex],userPicBreedId:t[0],breed:t[e.breedIndex[0]],subbreed:t[e.breedIndex[1]],mode:e.mode,userId:e.userId},on:{breedOpening:function(s){e.openBreed(t)}}}):e._e()}))],1)},staticRenderFns:[]},m=s("VU/8")(b,f,!1,function(e){s("YffU")},"data-v-1d1163bc",null).exports;i.default.use(a.a),i.default.use(o.a);var _=new a.a({routes:[{path:"/",name:"AllBreeds",component:m},{path:"/:breed",name:"AllBreeds",component:m}]});i.default.config.productionTip=!1,new i.default({el:"#app",router:_,template:"<App/>",components:{App:n}})},"W/aX":function(e,t){},Wks1:function(e,t){},YffU:function(e,t){},pj9E:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.e0ea6f560a8ca71670fb.js.map