/*!
 * 2020-12-31日上线，闲语H5是陈刚的第一个全栈项目，自己完成从前端设计，
 * 到后端接口的设计，
 * 以及Linux系统上Redis和MongoDB数据库安装使用，Nginx代理部署，HTTPS以及域名申请，
 * 见证了过去半年所有空闲时间的努力！新的一年，奥利给！我轻轻的来了，又轻轻地走了......
 */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["group-poem"],{"07de":function(t,e,o){"use strict";o("fe94")},"1edf":function(t,e,o){"use strict";o("929b")},"527f":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ancient-list"},[o("back-top",{attrs:{title:"诗词列表"}}),o("div",{ref:"ancient-list-container",staticClass:"ancient-list-container",attrs:{id:"ancient-list-container"}},[t.showSkeleton?o("div",{staticClass:"xianyu-poem-skeleton"},[o("poem-skeleton")],1):o("van-pull-refresh",{attrs:{"loosing-text":"别老拽着,快放开我","loading-text":"正在刷新中","success-text":"刷新成功"},on:{refresh:t.pullDownRefresh},model:{value:t.pullDown,callback:function(e){t.pullDown=e},expression:"pullDown"}},[o("div",{staticClass:"poem-list-container"},[o("van-list",{attrs:{finished:t.lodeMoreFinished,"immediate-check":!1,"finished-text":"没有更多了"},on:{load:t.onLoadMoreHandle},model:{value:t.lodeMore,callback:function(e){t.lodeMore=e},expression:"lodeMore"}},t._l(t.poemList,(function(e,n){return o("poem-item",{key:e._id,attrs:{itemvalue:e,"no-margin":n===t.poemList.length-1},on:{click:function(o){return t.$router.push("/ancient-poetry/"+e._id)}}})})),1)],1)])],1)],1)},s=[],i=o("ae0e"),a=o("60bb"),l=o("e1da"),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("skeleton",{staticClass:"poem-list-skeleton",attrs:{theme:"opacity","bg-color":"#dcdbdc"}},t._l(8,(function(t){return o("skeleton",{key:t+Math.random(),staticClass:"poem-list-skeleton-item",attrs:{theme:"opacity","bg-color":"#dcdbdc"}},[o("skeleton",{staticClass:"poem-list-skeleton-item-title",attrs:{theme:"opacity","bg-color":"#dcdbdc"}},[o("tb-skeleton",{attrs:{width:"64%",height:"16px",shape:"rect"}}),o("tb-skeleton",{attrs:{width:"24%",height:"13px",shape:"rect"}})],1),o("skeleton",{staticClass:"poem-list-skeleton-item-author",attrs:{theme:"opacity","bg-color":"#dcdbdc"}},[o("tb-skeleton",{attrs:{width:"100px",height:"13px",shape:"rect"}})],1)],1)})),1)},c=[],d={},u=d,h=(o("1edf"),o("2877")),p=Object(h["a"])(u,r,c,!1,null,"4f0ee66c",null),m=p.exports,f={name:"AncientPoetryList",data(){return{poemList:[],pullDown:!1,lodeMore:!1,lodeMoreFinished:!1,currentPage:1,total:0,perPage:20,listScrollTop:0,showSkeleton:!0}},computed:{totalPage(){return Math.ceil(this.total/this.perPage)}},mounted(){this.$store.commit("addCachedPages","AncientPoetryList"),this.getPoemHandle(),document.getElementById("ancient-list-container").addEventListener("scroll",Object(a["debounce"])(this.listScrollHandle,30))},activated(){this.$refs["ancient-list-container"].scrollTop=this.listScrollTop},beforeDestroy(){document.getElementById("ancient-list-container").removeEventListener("scroll",this.listScrollHandle,!0)},methods:{async getPoemHandle(){const t=await Object(i["b"])(this.currentPage);0===t.errno&&(this.poemList=t.data,this.total=t.total,setTimeout(()=>{this.showSkeleton=!1},30))},async pullDownRefresh(){this.currentPage=1,this.lodeMoreFinished=!1,this.loadMore=!0;const t=await Object(i["b"])(this.currentPage);0===t.errno&&(this.poemList=t.data,this.total=t.total,this.pullDown=!1,this.lodeMore=!1,this.$toast("刷新成功"))},async onLoadMoreHandle(){if(this.currentPage>=this.totalPage)return void(this.lodeMoreFinished=!0);const t=await Object(i["b"])(++this.currentPage);0===t.errno&&(this.poemList=[...this.poemList,...t.data],this.lodeMore=!1)},listScrollHandle(){this.listScrollTop=this.$refs["ancient-list-container"].scrollTop}},components:{PoemItem:l["a"],PoemSkeleton:m}},b=f,g=(o("07de"),Object(h["a"])(b,n,s,!1,null,"d03e7654",null));e["default"]=g.exports},"6bc3":function(t,e,o){"use strict";o("fd93")},"929b":function(t,e,o){},ae0e:function(t,e,o){"use strict";o.d(e,"b",(function(){return s})),o.d(e,"a",(function(){return i})),o.d(e,"c",(function(){return a}));var n=o("751a");const s=(t=1,e="")=>n["a"].get(`/poems?current_page=${t}&q=${e}`),i=t=>n["a"].get("/poems/"+t),a=()=>n["a"].post("/poems/hot")},e1da:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ancient-item",class:{"no-margin":t.noMargin},on:{click:function(e){return t.$emit("click")}}},[o("div",{staticClass:"ancient-item-title"},[o("h1",{domProps:{innerHTML:t._s(t.itemvalue.poem_title)}}),o("p",[t._v(" ["),o("span",{domProps:{innerHTML:t._s(t.itemvalue.author_dynasty)}}),t._v("] ")])]),o("p",{staticClass:"ancient-item-author",domProps:{innerHTML:t._s(t.itemvalue.poem_author)}})])},s=[],i={name:"PoemItem",props:{last:{type:Boolean,default:!0},itemvalue:{type:Object,default:()=>{},required:!0},noMargin:{type:Boolean,default:!1}}},a=i,l=(o("6bc3"),o("2877")),r=Object(l["a"])(a,n,s,!1,null,"a137c460",null);e["a"]=r.exports},fd93:function(t,e,o){},fe94:function(t,e,o){}}]);