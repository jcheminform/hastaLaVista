"use strict";function _asyncToGenerator(a){return function(){var b=a.apply(this,arguments);return new Promise(function(f,g){function h(j,k){try{var n=b[j](k),o=n.value}catch(p){return void g(p)}return n.done?void f(o):Promise.resolve(o).then(function(p){h("next",p)},function(p){h("throw",p)})}return h("next")})}}define(["jquery","modules/default/defaultcontroller","src/util/api","src/util/versioning","src/data/structures","src/util/debug","src/util/util","src/util/ui","src/util/mimeTypes"],function(a,b,f,g,h,j,k,n,o){"use strict";function p(){this.flushData=this.flushData.bind(this)}function q(t){for(var u=[],v=function(y){var z=t[y];u.push({kind:z.kind,type:"text/plain"===z.type?"auto":z.type,str:new Promise(function(A){z.getAsString(A)}),id:y})},w=0;w<t.length;w++)v(w);return u}function r(t){return function(u){return o.lookup(u)||t}}function s(t){for(var w,u="",v=0;v<t.length;v++)w=t[v],u+="mime"===w.filter?"Mime: ":"Extension: ",u+=w.extension+"<br>";return u+="<br><br>",u}return a.extend(!0,p.prototype,b),p.prototype.moduleInformation={name:"Drag and drop",description:"Drop a file or paste some content to load",author:"Norman Pellet, Micha\xEBl Zasso",date:"31.07.2014",license:"MIT",cssClass:"dragdrop"},p.prototype.references={data:{label:"First data element"},dataarray:{label:"Array of loaded data"}},p.prototype.events={onRead:{label:"The data has been read",refVariable:["data","dataarray"],refAction:["data","dataarray"]}},p.prototype.configurationStructure=function(){var t=k.getStructuresComboOptions();return{groups:{group:{options:{type:"list"},fields:{label:{type:"text",title:"Text displayed by default",default:"Drop your file here"},dragoverlabel:{type:"text",title:"Text displayed on drag"},hoverlabel:{type:"text",title:"Text displayed on hover drop / paste area",default:"Drag'n drop or paste here"},fileSelectLabel:{type:"text",title:"Text displayed on file select button",default:"Select file"},labelFontSize:{type:"float",title:"Size of the label text",default:26},checkOptions:{type:"checkbox",title:"General options",options:{promptAmbiguous:"Prompt for filename when ambiguous"},default:["promptAmbiguous"]},inputOptions:{type:"checkbox",title:"Input options",options:{allowDrop:"Allow files to be dropped",allowPaste:"Allow text to be pasted",allowCamera:"Allow taking pictures with camera",allowFileInput:"Allow open file dialog",showFileInputButton:"Show file input button"},default:["allowDrop","allowPaste","allowFileInput"]}}},vars:{options:{type:"table",multiple:!0,title:"For files"},fields:{filter:{type:"combo",title:"filter on",options:[{title:"File extension",key:"ext"},{title:"Mime-type",key:"mime"}],default:"ext"},extension:{type:"text",title:"Filter",default:"*"},filetype:{type:"combo",title:"Read type",options:[{title:"Text",key:"text"},{title:"Base64 Encoded",key:"base64"},{title:"Object URL",key:"url"},{title:"Array buffer",key:"buffer"}],default:"text"},type:{type:"combo",title:"Force type",options:t,default:""},mime:{type:"text",title:"Force mime-type"},variable:{type:"text",title:"Temporary variable",default:"file"}}},string_general:{options:{type:"list",title:"For strings (general)"},fields:{askFilename:{type:"checkbox",title:"Ask for filename",options:{yes:"Yes"},default:[]}}},string:{options:{type:"table",multiple:!0,title:"For strings"},fields:{filter:{type:"combo",title:"filter on",options:[{title:"File extension",key:"ext"},{title:"Mime-type",key:"mime"}],default:"ext"},extension:{type:"text",title:"Filter",default:"*"},type:{type:"combo",title:"Force type",options:t,default:""},mime:{type:"text",title:"Force mime-type"},variable:{type:"text",title:"Temporary variable",default:"str"}}},photo:{options:{type:"table",multiple:!1,title:"For photos"},fields:{variable:{type:"text",title:"Temporary variable",default:"photo"}}}}}},p.prototype.configAliases={vartype:["groups","group",0,"vartype",0],label:["groups","group",0,"label",0],dragoverlabel:["groups","group",0,"dragoverlabel",0],hoverlabel:["groups","group",0,"hoverlabel",0],fileSelectLabel:["groups","group",0,"fileSelectLabel",0],labelFontSize:["groups","group",0,"labelFontSize",0],inputOptions:["groups","group",0,"inputOptions",0],vars:["groups","vars",0],string:["groups","string",0],photo:["groups","photo",0],showPhotoButton:["groups","group",0,"showPhotoButton",0],capture:["groups","group",0,"capture",0],checkOptions:["groups","group",0,"checkOptions",0],askFilename:["groups","string_general",0,"askFilename",0]},p.prototype.initImpl=function(){var t,u,v,w,x=this.module.getConfiguration("vars");if(x){var y=[];for(t=0,u=x.length;t<u;t++)v=x[t],w=a.extend({},v),y.push(w),w.match=v.extension?new RegExp("^"+v.extension.replace(/\*/g,".*").replace(/\?/g,".")+"$","i"):/^.*$/i,v.filter||(w.filter="ext");this.fileCfg=y}var z=this.module.getConfiguration("string");if(z){var A=[];for(t=0,u=z.length;t<u;t++)v=z[t],w=a.extend({},v),A.push(w),w.match=v.filter?new RegExp("^"+v.extension.replace(/\*/g,".*").replace(/\?/g,".")+"$","i"):/^text\/plain$/i,w.filetype="text";this.stringCfg=A,this.photoCfg=this.module.getConfiguration("photo")}this.resolveReady()},p.prototype.parseString=function(t,u){try{if(u.cfg.type)var v=h._parse(u.cfg.type,t);else v=t;this.tmpVar(v,u)}catch(w){j.info("Value could not be parsed: ",t,w)}},p.prototype.open=function(t){if(t.items&&t.items.length||t.files.length){for(var u,v=!0,w=0;w<t.items.length;w++)"string"!==t.items[w].kind&&(v=!1);1===t.items.length&&(v=!1),u=v?q(t.items):t.items,this.module.model.tmpVars=new DataObject,this.module.model.tmpVarsArray=new DataObject;var A,B,C,D,x=[],y=this.fileCfg,z=this.stringCfg;if(!u)for(A=0;A<t.files.length;A++)B=t.files[A],D=a.Deferred(),x.push(D),(C=this.checkMetadata(B,y,r("application/octet-stream")))?(C.def=D,this.read(B,C)):D.resolve();else if(v){var C={};C.cfg=z,C.def=a.Deferred(),x.push(C.def),this.treatMultipleString(u,C)}else for(A=0;A<u.length;A++)B=u[A],D=a.Deferred(),x.push(D),"file"===B.kind?(B=B.getAsFile(),(C=this.checkMetadata(B,y,r("application/octet-stream")))?(C.def=D,this.read(B,C)):D.resolve()):(C={},C.cfg=z,C.def=D,this.treatString(B,C));a.when.apply(window,x).done(this.flushData)}},p.prototype.openPhoto=function(t){var u=this.checkPhotoMetadata(this.photoCfg);u.def=a.Deferred(),this.fileRead(t,u),u.def.done(this.flushData)},p.prototype.flushData=function(){this.createDataFromEvent("onRead","data",this.module.model.tmpVars),this.sendActionFromEvent("onRead","data",this.module.model.tmpVars),this.createDataFromEvent("onRead","dataarray",this.module.model.tmpVarsArray),this.sendActionFromEvent("onRead","dataarray",this.module.model.tmpVarsArray),this.module.model.tmpVars=new DataObject,this.module.model.tmpVarsArray=new DataObject},p.prototype.treatMultipleString=function(t,u){n.choose(t,{noConfirmation:!0,returnRow:!0,idField:"id",columns:[{id:"key",name:"content-type",field:"type"}]}).then((v)=>{return"auto"===v.type&&(v.type=""),void 0==v?void u.def.resolve():void(v.getAsString=function(w){v.str.then(w)},this.treatString(v,u))})},p.prototype.treatString=function(t,u){var v=s(u.cfg);t.getAsString((w)=>{if(this.module.getConfigurationCheckbox("askFilename","yes"))n.enterValue({description:v,label:"Enter filename",validationMessage:"Incorrect file extension",validation:(y)=>{return this.checkMetadata(t,u.cfg,r("text/plain"),y)}}).then((y)=>{if(void 0!=y){var z=this.checkMetadata(t,u.cfg,r("text/plain"),y);return z?void(Object.assign(u,z),this.parseString(w,u)):void u.def.resolve()}});else{var x=this.checkMetadata(t,u.cfg,r("text/plain"));if(!x)return void u.def.resolve();Object.assign(u,x),this.parseString(w,u)}})},p.prototype.checkMetadata=function(t,u,v,w){if(!u)return j.warn("No file filter configured");w=w||t.name||"";var z,A,x=t.type||v(w),y=w.split(".");z=2>y.length?"":y.pop().toLowerCase();for(var D,B=0,C=u.length;B<C;B++)if(D=u[B].filter,"ext"===D){var E=u[B].extension;if("*"===E||-1!==E.split(",").indexOf(z)){A=u[B];break}}else{var F=u[B].match;if(F.test(x)){A=u[B];break}}if(!A){var G=`Did not find match for ${w} (${x})`;return n.showNotification(G,"warn"),j.warn(G)}return{filename:w,mime:A.mime||x||"application/octet-stream",cfg:A}},p.prototype.checkPhotoMetadata=function(t){var u=t[0];return u.filetype="url",u.type="png",{mime:"image/png",cfg:u}},p.prototype.fileRead=function(t,u){switch(u.cfg.filetype){case"text":{this.parseString(t,u);break}case"base64":{var v=t.indexOf(";base64,");this.tmpVar(t.substr(v+8),u);break}case"url":case"buffer":{this.tmpVar(t,u);break}}},p.prototype.read=(()=>{var t=_asyncToGenerator(regeneratorRuntime.mark(function u(v,w){var y,z,x=this;return regeneratorRuntime.wrap(function(B){for(;;)switch(B.prev=B.next){case 0:if(!("image.png"===w.filename&&this.module.getConfigurationCheckbox("checkOptions","promptAmbiguous"))){B.next=8;break}return B.next=3,n.enterValue({label:"Enter image name (without file extension)",validationMessage:"Incorrect file extension",validation:function(D){return x.checkMetadata(v,x.fileCfg,"image/png",`${D}.png`)}});case 3:if(y=B.sent,null!=y){B.next=7;break}return w.def.resolve(),B.abrupt("return");case 7:w.filename=`${y}.png`;case 8:z=new FileReader,z.onload=function(C){x.fileRead(C.target.result,w)},z.onerror=function(C){j.error(C)},B.t0=w.cfg.filetype,B.next="text"===B.t0?14:"base64"===B.t0?16:"url"===B.t0?16:"buffer"===B.t0?18:20;break;case 14:return z.readAsText(v),B.abrupt("break",20);case 16:return z.readAsDataURL(v),B.abrupt("break",20);case 18:return z.readAsArrayBuffer(v),B.abrupt("break",20);case 20:case"end":return B.stop();}},u,this)}));return function(){return t.apply(this,arguments)}})(),p.prototype.tmpVar=function(t,u){"object"!=typeof t&&u.cfg.type&&(t={type:u.cfg.type,value:t});var v=u.cfg.variable,w=new DataObject({encoding:u.cfg.filetype,filename:u.filename,mimetype:u.mime,contentType:u.mime,content:t});this.module.model.tmpVarsArray[v]||(this.module.model.tmpVarsArray[v]=new DataArray),this.module.model.tmpVarsArray[v].push(w),this.module.model.tmpVars[v]=w,u.def.resolve()},p.prototype.emulDataTransfer=function(t){for(var u={files:t.target.files,items:[]},v=0;v<t.target.files.length;v++)(function(w){u.items.push({kind:"file",getAsFile:function(){return t.target.files[w]}})})(v);return u},p});
