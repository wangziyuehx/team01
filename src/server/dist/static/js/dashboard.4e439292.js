(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{"0f08":function(t,e,i){"use strict";var a=i("8ee0"),s=i.n(a);s.a},"365c":function(t,e,i){"use strict";i.d(e,"l",(function(){return r})),i.d(e,"k",(function(){return l})),i.d(e,"i",(function(){return h})),i.d(e,"c",(function(){return c})),i.d(e,"j",(function(){return d})),i.d(e,"f",(function(){return u})),i.d(e,"g",(function(){return f})),i.d(e,"e",(function(){return g})),i.d(e,"h",(function(){return v})),i.d(e,"b",(function(){return p})),i.d(e,"d",(function(){return b})),i.d(e,"a",(function(){return m}));var a=i("bc3a"),s=i.n(a);function n(t){var e=t.url,i=t.params,a=void 0===i?{}:i;return new Promise((function(t,i){s.a.get(e,{params:a}).then((function(e){t(e)})).catch((function(t){i(t)}))}))}function o(t){var e=t.url,i=t.data,a=void 0===i?{}:i,n=t.params,o=void 0===n?{}:n;return new Promise((function(t,i){s()({url:e,method:"post",transformRequest:[function(t){var e="";for(var i in t)e+=encodeURIComponent(i)+"="+encodeURIComponent(t[i])+"&";return e}],data:a,params:o}).then((function(e){t(e)}))}))}s.a.interceptors.request.use((function(t){return t}),(function(t){return Promise.error(t)})),s.a.defaults.timeout=1e4,s.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8",s.a.interceptors.response.use((function(t){if(200!==t.status)return Promise.reject(t);if(511===t.data.code);else if(510!==t.data.code)return Promise.resolve(t)}),(function(t){console.log(t),t.response.status}));var r="http://139.224.129.91",l=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return n({url:"/login",params:t})},h=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({url:"/index",params:t})},c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({url:"/changeinfo",params:t})},d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({url:"/infoname",params:t})},u=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({url:"/del",params:t})},f=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({url:"/delall",params:t})},g=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({url:"/dealt",params:t})},v=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({url:"/deldealt",params:t})},p=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({url:"/adddealt",params:t})},b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({url:"/changedealt",params:t})},m=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({url:"/add",params:t})}},"8ee0":function(t,e,i){},b367:function(t,e,i){!function(e,i){t.exports=i()}(0,(function(){"use strict";function t(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function e(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i=window.devicePixelRatio||1,a=10*i,s=a/2;return function(){function n(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.canvas=function(t){var e=document.getElementById(t),a=e.parentNode.clientWidth,s=e.parentNode.clientHeight;return e.style.width=a+"px",e.style.height=s+"px",e.width=a*i,e.height=s*i,e}(t),this.ctx=this.canvas.getContext("2d"),this.type="bar",this.showValue=!0,this.showGrid=!0,this.topPadding=60*i,this.leftPadding=50*i,this.rightPadding=10*i,this.bottomPadding=50*i,this.yEqual=5,this.yLength=0,this.xLength=0,this.ySpace=0,this.xRorate=0,this.yRorate=0,this.bgColor="#fff",this.axisColor="#666",this.gridColor="#eee",this.title={text:"",color:"#666",position:"top",font:"bold "+18*i+"px Arial",top:a,bottom:s},this.legend={display:!0,position:"top",color:"#666",font:14*i+"px Arial",top:45*i,bottom:15*i,textWidth:0},this.radius=100*i,this.innerRadius=60*i,this.colorList=["#4A90E2","#F5A623","#ff5858","#5e64ff","#2AC766","#743ee2","#b554ff","#199475"],this.init(e)}return function(e,i,a){i&&t(e.prototype,i),a&&t(e,a)}(n,[{key:"init",value:function(t){if(t.title=Object.assign({},this.title,t.title),t.legend=Object.assign({},this.legend,t.legend),Object.assign(this,t),!t.labels||!t.labels.length)throw new Error("缺少主要参数labels");if(!t.datasets||!t.datasets.length)throw new Error("缺少主要参数datasets");this.drawBackground(),"bar"===this.type||"line"===this.type?this.renderBarChart():this.renderPieChart(),this.drawLegend()}},{key:"renderBarChart",value:function(){this.yLength=Math.floor((this.canvas.height-this.topPadding-this.bottomPadding-a)/this.yEqual),this.xLength=Math.floor((this.canvas.width-this.leftPadding-this.rightPadding-a)/this.labels.length),this.ySpace=function(t,i){var a=t.map((function(t){return t.data.reduce((function(t,e){return e<t?t:e}))})),s=Math.ceil(Math.max.apply(Math,e(a))/i),n=s.toString().length-1;return n=2<n?2:n,Math.ceil(s/Math.pow(10,n))*Math.pow(10,n)}(this.datasets,this.yEqual),this.drawXAxis(),this.drawYAxis(),this.drawBarContent()}},{key:"drawBarContent",value:function(){var t=this.ctx,e=this.datasets.length;t.beginPath();for(var n=0;n<e;n++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.datasets[n].label).width),t.fillStyle=t.strokeStyle=this.datasets[n].fillColor||this.colorList[n];for(var o=this.datasets[n].data,r=0;r<o.length;r++)if(!(r>this.labels.length-1)){var l=this.xLength/(e+1),h=this.yLength/this.ySpace,c=this.leftPadding+this.xLength*r+l*(n+.5),d=c+l,u=this.canvas.height-this.bottomPadding,f=u-o[r]*h;if("bar"===this.type)t.fillRect(c,f,d-c,u-f),this.drawValue(o[r],c+l/2,f-s);else if("line"===this.type){var g=this.leftPadding+this.xLength*(r+.5);t.beginPath(),t.arc(g,f,3*i,0,2*Math.PI,!0),t.fill(),0!==r&&(t.beginPath(),t.strokeStyle=this.datasets[n].fillColor||this.colorList[n],t.lineWidth=2*i,t.moveTo(g-this.xLength,u-o[r-1]*h),t.lineTo(g,f),t.stroke(),t.lineWidth=1*i),this.drawValue(o[r],g,f-a)}}}t.stroke()}},{key:"renderPieChart",value:function(){for(var t=this.ctx,e=this.labels.length,i=this.datasets[0],a=i.data,s=a.reduce((function(t,e){return t+e})),n=-Math.PI/2,o=this.canvas.width/2,r=this.canvas.height/2,l=0;l<e;l++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.labels[l]).width),t.beginPath(),t.strokeStyle=t.fillStyle=i.colorList&&i.colorList[l]||this.colorList[l],t.moveTo(o,r);var h=n,c=n+=a[l]/s*2*Math.PI;t.arc(o,r,this.radius,h,c),t.closePath(),t.fill();var d=(h+c)/2;this.drawPieValue(a[l],d)}"ring"===this.type&&(t.beginPath(),t.fillStyle=this.bgColor,t.arc(o,r,this.innerRadius,0,2*Math.PI),t.closePath(),t.fill())}},{key:"drawValue",value:function(t,e,a){var s=this.ctx;this.showValue&&(s.textBaseline="middle",s.font=12*i+"px Arial",s.textAlign="center",s.fillText(t,e,a))}},{key:"drawPieValue",value:function(t,e){var i=this.ctx;if(this.showValue){var s=this.canvas.width/2,n=this.canvas.height/2,o=Math.ceil(Math.abs(this.radius*Math.cos(e))),r=Math.floor(Math.abs(this.radius*Math.sin(e)));i.textBaseline="middle",this.showValue&&(e<=0?(i.textAlign="left",i.moveTo(s+o,n-r),i.lineTo(s+o+a,n-r-a),i.moveTo(s+o+a,n-r-a),i.lineTo(s+o+3*a,n-r-a),i.stroke(),i.fillText(t,s+o+3.5*a,n-r-a)):0<e&&e<=Math.PI/2?(i.textAlign="left",i.moveTo(s+o,n+r),i.lineTo(s+o+a,n+r+a),i.moveTo(s+o+a,n+r+a),i.lineTo(s+o+3*a,n+r+a),i.stroke(),i.fillText(t,s+o+3.5*a,n+r+a)):e>Math.PI/2&&e<Math.PI?(i.textAlign="right",i.moveTo(s-o,n+r),i.lineTo(s-o-a,n+r+a),i.moveTo(s-o-a,n+r+a),i.lineTo(s-o-3*a,n+r+a),i.stroke(),i.fillText(t,s-o-3.5*a,n+r+a)):(i.textAlign="right",i.moveTo(s-o,n-r),i.lineTo(s-o-a,n-r-a),i.moveTo(s-o-a,n-r-a),i.lineTo(s-o-3*a,n-r-a),i.stroke(),i.fillText(t,s-o-3.5*a,n-r-a)))}}},{key:"drawBackground",value:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.drawTitle()}},{key:"drawTitle",value:function(){var t=this.title;if(t.text){var e=this.ctx;e.beginPath(),e.font=t.font,e.textAlign="center",e.fillStyle=t.color,"top"===t.position?(e.textBaseline="top",e.fillText(t.text,this.canvas.width/2,t.top)):(e.textBaseline="bottom",e.fillText(t.text,this.canvas.width/2,this.canvas.height-t.bottom))}}},{key:"drawXAxis",value:function(){var t=this.ctx,e=this.canvas.height-this.bottomPadding+.5;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding,e),t.lineTo(this.canvas.width-this.rightPadding,e),t.stroke(),this.drawXPoint()}},{key:"drawXPoint",value:function(){var t=this.ctx;t.beginPath(),t.font=12*i+"px Microsoft YaHei",t.textAlign=this.xRorate?"right":"center",t.textBaseline="top",t.fillStyle=this.axisColor;for(var e=0;e<this.labels.length;e++){var n=this.labels[e],o=this.leftPadding+this.xLength*(e+1)+.5,r=this.canvas.height-this.bottomPadding;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(o,r),t.lineTo(o,this.topPadding+a)):(t.moveTo(o,r),t.lineTo(o,r-s)),t.stroke(),t.save(),t.translate(o-this.xLength/2,r+s),t.rotate(-this.xRorate*Math.PI/180),t.fillText(n,0,0),t.restore()}}},{key:"drawYAxis",value:function(){var t=this.ctx;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding-.5,this.canvas.height-this.bottomPadding+.5),t.lineTo(this.leftPadding-.5,this.topPadding+.5),t.stroke(),this.drawYPoint()}},{key:"drawYPoint",value:function(){var t=this.ctx;t.font=12*i+"px Microsoft YaHei",t.textAlign="right",t.textBaseline="middle",t.beginPath();for(var e=0;e<this.yEqual;e++){var n=this.leftPadding,o=this.canvas.height-this.bottomPadding-this.yLength*(e+1)+.5;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(n,o),t.lineTo(this.canvas.width-this.rightPadding-a,o)):(t.strokeStyle=this.axisColor,t.moveTo(n-s,o),t.lineTo(n,o)),t.stroke(),t.save(),t.fillStyle=this.axisColor,t.translate(n-a,o),t.rotate(-this.yRorate*Math.PI/180),t.fillText(this.ySpace*(e+1),0,0),t.restore()}}},{key:"drawLegend",value:function(){var t=this.legend;if(t.display){var e=this.ctx,i="pie"===this.type||"ring"===this.type;e.beginPath(),e.font=t.font,e.textAlign="left",e.textBaseline="middle";for(var n=i?this.labels.length:this.datasets.length,o=(this.canvas.width-(this.legend.textWidth+(5*n-2)*a))/2,r=0,l=0;l<n;l++){var h=i?this.datasets[0]:this.datasets[l],c=(i?this.labels[l]:h.label)||"";e.fillStyle=h.colorList&&h.colorList[l]||h.fillColor||this.colorList[l],"top"===t.position?(this.drawLegendIcon(o+5*a*l+r,t.top-s,2*a,a),e.fillStyle=t.color,e.fillText(c,o+(5*l+3)*a+r,t.top)):"bottom"===t.position?(this.drawLegendIcon(o+5*a*l+r,this.canvas.height-t.bottom-s,2*a,a),e.fillStyle=t.color,e.fillText(c,o+(5*l+3)*a+r,this.canvas.height-t.bottom)):(e.fillRect(a,t.top+2*a*l,2*a,a),e.fillStyle=t.color,e.fillText(c,4*a,t.top+2*a*l+.5*a)),r+=Math.ceil(e.measureText(c).width)}}}},{key:"drawLegendIcon",value:function(t,e,n,o){var r=this.ctx;"line"===this.type?(r.beginPath(),r.strokeStyle=r.fillStyle,r.lineWidth=2*i,r.moveTo(t,e+s),r.lineTo(t+2*a,e+s),r.stroke(),r.lineWidth=1*i,r.arc(t+a,e+s,3*i,0,2*Math.PI,!0),r.fill()):r.fillRect(t,e,n,o)}}]),n}()}))},e2ad:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-head",{staticStyle:{position:"fixed",top:"0",left:"0"}}),i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:8}},[i("el-card",{staticClass:"mgb20",staticStyle:{height:"252px"},attrs:{shadow:"hover"}},[i("div",{staticClass:"user-info"},[i("img",{staticClass:"user-avator",attrs:{src:t.pic,alt:""}}),i("div",{staticClass:"user-info-cont"},[i("div",{staticClass:"user-info-name"},[t._v(t._s(t.name))]),i("div",[t._v(t._s(t.role))])])]),i("div",{staticClass:"user-info-list"},[t._v("\n                    上次登录时间：\n                    "),i("span",[t._v("2020-8-4")])]),i("div",{staticClass:"user-info-list"},[t._v("\n                    上次登录地点：\n                    "),i("span",[t._v("贵阳")])])]),i("el-card",{staticStyle:{height:"252px"},attrs:{shadow:"hover"}},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("项目进度统计")])]),t._v("系统开发\n                "),i("el-progress",{attrs:{percentage:71.3,color:"#42b983"}}),t._v("工伤认定小程序\n                "),i("el-progress",{attrs:{percentage:24.1,color:"#f1e05a"}}),t._v("原创派\n                "),i("el-progress",{attrs:{percentage:13.7}}),t._v("电子归档章\n                "),i("el-progress",{attrs:{percentage:5.9,color:"#f56c6c"}})],1)],1),i("el-col",{attrs:{span:16}},[i("el-row",{staticClass:"mgb20",attrs:{gutter:20}},[i("el-col",{attrs:{span:8}},[i("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[i("div",{staticClass:"grid-content grid-con-1"},[i("i",{staticClass:"el-icon-lx-people grid-con-icon"}),i("div",{staticClass:"grid-cont-right"},[i("div",{staticClass:"grid-num"},[t._v("1234")]),i("div",[t._v("用户访问量")])])])])],1),i("el-col",{attrs:{span:8}},[i("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[i("div",{staticClass:"grid-content grid-con-2"},[i("i",{staticClass:"el-icon-lx-notice grid-con-icon"}),i("div",{staticClass:"grid-cont-right"},[i("div",{staticClass:"grid-num"},[t._v("321")]),i("div",[t._v("系统消息")])])])])],1),i("el-col",{attrs:{span:8}},[i("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[i("div",{staticClass:"grid-content grid-con-3"},[i("i",{staticClass:"el-icon-lx-goods grid-con-icon"}),i("div",{staticClass:"grid-cont-right"},[i("div",{staticClass:"grid-num"},[t._v("5000")]),i("div",[t._v("数量")])])])])],1)],1),i("el-card",{staticStyle:{height:"403px"},attrs:{shadow:"hover"}},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("待办事项")]),i("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:t.additem}},[t._v("添加")])],1),i("el-table",{staticStyle:{width:"100%"},attrs:{"show-header":!1,data:t.todoList}},[i("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"todo-item"},[t._v(t._s(e.row.title))])]}}])}),i("el-table-column",{attrs:{width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("i",{staticClass:"el-icon-edit",staticStyle:{"margin-right":"16px"},on:{click:function(i){return t.editor(e.$index,e.row)}}}),i("i",{staticClass:"el-icon-delete",on:{click:function(i){return t.delpro(e.$index,e.row)}}})]}}])})],1)],1)],1)],1),i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:12}},[i("el-card",{attrs:{shadow:"hover"}},[i("schart",{ref:"bar",staticClass:"schart",attrs:{canvasId:"bar",options:t.options}})],1)],1),i("el-col",{attrs:{span:12}},[i("el-card",{attrs:{shadow:"hover"}},[i("schart",{ref:"line",staticClass:"schart",attrs:{canvasId:"line",options:t.options2}})],1)],1)],1),i("el-dialog",{attrs:{title:t.maintitle,visible:t.editVisible,width:"30%"},on:{"update:title":function(e){t.maintitle=e},"update:visible":function(e){t.editVisible=e}}},[i("el-form",{attrs:{"label-width":"70px"}},[i("el-form-item",{attrs:{label:"待办事项"}},[i("el-input",{model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.editVisible=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1)],1)},s=[],n=(i("ac6a"),i("7f7f"),i("f5ac")),o=(i("7ed4"),i("365c")),r={name:"dashboard",data:function(){return{name:localStorage.getItem("ms_username"),pic:localStorage.getItem("userimg"),userid:localStorage.getItem("userid"),todoList:[],maintitle:"2",editVisible:!1,title:"",form:"",data:[{name:"2018/09/04",value:1083},{name:"2018/09/05",value:941},{name:"2018/09/06",value:1139},{name:"2018/09/07",value:816},{name:"2018/09/08",value:327},{name:"2018/09/09",value:228},{name:"2018/09/10",value:1065}],options:{type:"bar",title:{text:"最近一周各品类销售图"},xRorate:25,labels:["周一","周二","周三","周四","周五"],datasets:[{label:"家电",data:[234,278,270,190,230]},{label:"百货",data:[164,178,190,135,160]},{label:"食品",data:[144,198,150,235,120]}]},options2:{type:"line",title:{text:"最近几个月各品类销售趋势图"},labels:["6月","7月","8月","9月","10月"],datasets:[{label:"家电",data:[234,278,270,190,230]},{label:"百货",data:[164,178,150,135,160]},{label:"食品",data:[74,118,200,235,90]}]}}},components:{Schart:n["a"]},created:function(){var t=this;Object(o["e"])({userid:this.userid}).then((function(e){console.log(e),t.todoList=e.data.dealt}))},computed:{role:function(){return"admin"===this.name?"超级管理员":"普通用户"}},methods:{changeDate:function(){var t=(new Date).getTime();this.data.forEach((function(e,i){var a=new Date(t-864e5*(6-i));e.name="".concat(a.getFullYear(),"/").concat(a.getMonth()+1,"/").concat(a.getDate())}))},editor:function(t,e){console.log(e),this.editVisible=!0,this.maintitle="修改待办事项",this.form=e,this.title=e.title,this.status=e.status},delpro:function(t,e){var i=this;console.log(e);var a=e.id;Object(o["h"])({id:a}).then((function(e){console.log(e),1==e.data.status&&i.todoList.splice(t,1)}))},additem:function(){this.maintitle="添加待办事项",this.editVisible=!0,this.title="",this.status=""},saveEdit:function(){var t=this,e=this.maintitle;if("添加待办事项"==e)console.log("添加待办事项"),Object(o["b"])({title:this.title,userid:this.userid}).then((function(e){console.log(e),1==e.data.status&&(t.editVisible=!1,t.$message.success("添加成功"),Object(o["e"])({userid:t.userid}).then((function(e){t.todoList=e.data.dealt})))}));else{console.log("修改待办事项");var i=this.form.id;Object(o["d"])({id:i,title:this.title,userid:this.userid}).then((function(e){console.log(e),1==e.data.status&&(t.editVisible=!1,t.$message.success("修改成功"),Object(o["e"])({userid:t.userid}).then((function(e){t.todoList=e.data.dealt})))}))}}}},l=r,h=(i("0f08"),i("2877")),c=Object(h["a"])(l,a,s,!1,null,"17c96c14",null);e["default"]=c.exports},f5ac:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("canvas",{attrs:{id:t.canvasId}})])},s=[];i("8e6e"),i("ac6a"),i("456d");function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var o=i("b367"),r=i.n(o);function l(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function h(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?l(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var c={props:{canvasId:{type:String,default:"",required:!0},options:{type:Object,required:!0}},mounted:function(){this.renderChart()},methods:{renderChart:function(){if(this.checkOptions()){var t=h({},this.options);new r.a(this.canvasId,t)}},checkOptions:function(){var t=this.options;return!(!t.datasets||!t.datasets.length)&&!(!t.labels||!t.labels.length)}},watch:{options:{handler:function(t,e){this.renderChart()},deep:!0}}},d=c,u=i("2877"),f=Object(u["a"])(d,a,s,!1,null,null,null);e["a"]=f.exports}}]);