(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/newsBox/newsBox"],{3507:function(i,t,e){"use strict";var n=e("98f7"),o=e.n(n);o.a},"4d4a":function(i,t,e){"use strict";(function(i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={name:"newsBox",props:{item:{type:Object,default:function(){return{title:"新闻标题",imgPath:"/static/img/nopic.png",posttime:"2000-1-1 00:00:00",author:"盘古"}}}},data:function(){return{titleClicked:!1,swipeSelect:null,totalWidth:0,swipeConfig:{up:{show:!0,confirm:!1},del:{show:!0,confirm:!1}}}},mounted:function(){this.swipeSelect=i.createSelectorQuery().in(this).select(".swipe-right-select"),this.totalWidth=i.getWindowInfo().windowWidth},methods:{popPic:function(){this.$emit("popPic",this.item.imgPath)},goNewsDetail:function(){this.titleClicked=!0,this.$emit("goNewsDetail",{id:this.item._id,title:this.item.title})},up:function(i){this.swipeConfig.up.confirm?(this.$emit("up",i),this.swipeConfig.up.confirm=!1,this.swipeConfig.del.show=!0):(this.swipeConfig.del.show=!1,this.swipeConfig.up.confirm=!0)},del:function(i){this.swipeConfig.del.confirm?(this.$emit("del",i),this.swipeConfig.del.confirm=!1,this.swipeConfig.up.show=!0):(this.swipeConfig.up.show=!1,this.swipeConfig.del.confirm=!0)},ontouchend:function(){var i=this;this.swipeSelect.boundingClientRect((function(t){t.left==i.totalWidth&&(i.swipeConfig.del.confirm=!1,i.swipeConfig.up.show=!0,i.swipeConfig.up.confirm=!1,i.swipeConfig.del.show=!0)})).exec()},swipeClose:function(i){this.swipeConfig.del.confirm||this.swipeConfig.up.confirm||i.detail.instance.close()}},watch:{}};t.default=e}).call(this,e("543d")["default"])},8892:function(i,t,e){"use strict";e.r(t);var n=e("982c"),o=e("9d51");for(var s in o)["default"].indexOf(s)<0&&function(i){e.d(t,i,(function(){return o[i]}))}(s);e("3507");var f=e("f0c5"),c=Object(f["a"])(o["default"],n["b"],n["c"],!1,null,"70c9961d",null,!1,n["a"],void 0);t["default"]=c.exports},"982c":function(i,t,e){"use strict";e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return s})),e.d(t,"a",(function(){return n}));var n={uniDateformat:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat")]).then(e.bind(null,"1f2b"))}},o=function(){var i=this.$createElement;this._self._c},s=[]},"98f7":function(i,t,e){},"9d51":function(i,t,e){"use strict";e.r(t);var n=e("4d4a"),o=e.n(n);for(var s in n)["default"].indexOf(s)<0&&function(i){e.d(t,i,(function(){return n[i]}))}(s);t["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/newsBox/newsBox-create-component',
    {
        'components/newsBox/newsBox-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8892"))
        })
    },
    [['components/newsBox/newsBox-create-component']]
]);