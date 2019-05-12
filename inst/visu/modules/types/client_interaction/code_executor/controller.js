'use strict';define(['jquery','modules/types/client_interaction/code_editor/controller','src/util/api','src/util/debug','src/util/sandbox','src/util/util'],function(a,c,d,f,g,h){'use strict';function j(){c.call(this),this.currentScript=null,this.outputObject={},this.reloaded=!0,this.scriptID=0,this.executing=0}function k(n,o){var p=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};this.controller=n,this.title=n.module.definition.title+'',this.libs=o;var q=l(this),r=this.controller.module.view._code;this._sandbox=new g,this._sandbox.setContext(q);try{this.theFunction=this._sandbox.run(`(${p.topAwait?'async ':''}function(`+n.neededAliases+') {'+r+'\n})','CodeExecutor'+this.controller.module.getId())}catch(s){m(this.title,s)}this.wasSet=!1}function l(n){var o=function(D,E){n.wasSet=!0,n.doVariable(D,E)},p=function(){n.wasSet=!0,n.controller.outputObject={}},q=function(D){n.wasSet=!0,delete n.controller.outputObject[D]},r=function(D){n.done(D)},s=function(){n.async()},t=function(D,E){d.doAction(D,E)},u=function(D){n.controller.showButton(D)},w=function(D){n.controller.hideButton(D)},A={variables:{},variable:null,event:null,button:null,action:null,defined:0,set:o,get:function(D){var E=this.variables[D];if(E)return E.get()},sendAction:t,setAsync:s,done:r,clear:p,unset:q,showButton:u,hideButton:w,enableButton:function(D){n.controller.enableButton(D)},disableButton:function(D){n.controller.disableButton(D)},getButton:function(D){return n.controller._getButton(D)},moduleTriggerChange:n.controller.module.model.dataTriggerChange.bind(n.controller.module.model)},B={getVariable(){return A.variable},getVariables(){return A.variables},getEvent(){return A.event},getButton(){return A.button},getAction(){return A.action},getDefined(){return A.defined},set:o,get:function(D){return A.get(D)},sendAction:t,setAsync:s,done:r,clear:p,unset:q,showButton:u,hideButton:w};return n.context=A,B}function m(n,o){var p='';o&&o.stack&&(p=o.message,o=o.stack);var q='Code executor error';n&&(q+=' ('+n+')'),p&&(q+=': '+p),f.error(q),f.warn(o)}return h.inherits(j,c),j.prototype.moduleInformation={name:'Code executor',description:'Write code that can be executed on input variable, action or just the push of a button',author:'Micha\xEBl Zasso',date:'12.01.2015',license:'MIT'},j.prototype.references={inputValue:{label:'Input value'},outputValue:{label:'Output value'}},j.prototype.events={onScriptEnded:{label:'Code execution ended',refVariable:['outputValue']}},j.prototype.variablesIn=['inputValue'],j.prototype.actionsIn=a.extend({},j.prototype.actionsIn,{execute:'Execute the code'}),j.prototype.configurationStructure=function(){return{groups:{group:{options:{type:'list'},fields:{display:{type:'checkbox',title:'Display',options:{editor:'Code editor',buttons:'Buttons'},default:['editor','buttons']},execOnLoad:{type:'checkbox',title:'Execute on load',options:{yes:'Yes'},default:[]},asyncAwait:{type:'checkbox',title:'Async/Await support',options:{top:'Top-level await'},default:['top']},script:{type:'jscode',title:'Code',default:''}}},libs:{options:{type:'table',multiple:!0,title:'Required libraries'},fields:{lib:{type:'text',title:'url'},alias:{type:'text',title:'alias'}}},buttons:{options:{type:'table',multiple:!0,title:'Buttons'},fields:{name:{type:'text',title:'Name',default:'button1'},label:{type:'text',title:'Label',default:'Execute'},hide:{type:'checkbox',title:'Hide on load',options:{hide:'Yes'},default:[]},disable:{type:'checkbox',title:'Disable on load',options:{disable:'Yes'},default:[]}}}}}},j.prototype.configAliases={script:['groups','group',0,'script',0],execOnLoad:['groups','group',0,'execOnLoad',0],asyncAwait:['groups','group',0,'asyncAwait',0],display:['groups','group',0,'display',0],libs:['groups','libs',0],buttons:['groups','buttons',0]},j.prototype.onButtonClick=function(n){return 0<this.executing?f.warn('Already executing...'):void this.initExecutor().then(function(o){o.setButton(n),o.execute()})},j.prototype.onLoadScript=function(){this.initExecutor().then(function(n){n.setLoadScript(),n.execute()})},j.prototype.onVariableIn=function(n){this.initExecutor().then(function(o){o.setVariable(n),o.execute()})},j.prototype.onActionIn=function(n,o){this.initExecutor().then(function(p){p.setAction(n,o),p.execute()})},j.prototype.initImpl=function(){this.stopExecution();var n=this.module.getConfiguration('libs'),o=[],p=[];if(n)for(var r,q=0;q<n.length;q++)r=n[q],r.lib&&(o.push(r.lib),p.push(r.alias||'required_anonymous_'+q));o.unshift('src/util/api'),p.unshift('API'),this.neededUrls=o,this.neededAliases=p.join(', '),this.resolveReady(),this.reloaded=!0,this.module.getConfigurationCheckbox('execOnLoad','yes')&&this.onLoadScript()},j.prototype.initExecutor=function(){var o,n=this,p=this.module.view._code;if(!this.reloaded&&this.currentScript==p)o=Promise.resolve(this._executor||this._loadingExecutor);else{this.reloaded=!1;var q=new Promise((r)=>{require(this.neededUrls,function(){for(var t=arguments.length,u=Array(t),w=0;w<t;w++)u[w]=arguments[w];for(var x=Array(n.neededUrls.length),y=0;y<n.neededUrls.length;y++)x[y]=u[y];var z=new k(n,x,{topAwait:n.module.getConfigurationCheckbox('asyncAwait','top')});n.currentScript=p,n._executor=z,n._loadingExecutor=null,r(z)})});this._loadingExecutor=q,o=q}return o.then((r)=>{return r.init(),r})},j.prototype.onGlobalPreferenceChange=function(){this.reloaded=!0},j.prototype.startExecution=function(){this.executing++,this.module.view.disableButtons()},j.prototype.stopExecution=function(){0<this.executing&&this.executing--,0===this.executing&&this.module.view.enableButtons()},j.prototype.showButton=function(n){this._changeButton(n,'show')},j.prototype.hideButton=function(n){this._changeButton(n,'hide')},j.prototype.disableButton=function(n){this._changeButtonProperty(n,'disabledFromScript',!0),this._changeButton(n,'disable')},j.prototype.enableButton=function(n){this._changeButtonProperty(n,'disabledFromScript',!1),this._changeButton(n,'enable')},j.prototype._changeButtonProperty=function(n,o,p){if(this.module.view.buttons){var q=this.module.view.buttons.find((r)=>r.name===n);q?q[o]=p:f.error(`button ${n} not found`)}},j.prototype._getButton=function(n){return this.module.view.buttons.find((o)=>o.name===n)},j.prototype._changeButton=function(n,o){if(this.module.view.buttons){var p=this.module.view.buttons.find((q)=>q.name===n);p?p[o]():f.error(`button ${n} not found`)}},k.prototype.init=function(){this.context.event=null,this.context.button=null,this.context.action=null,this.context.variable=null,this.context.variables={},this.context.defined=0},k.prototype.setButton=function(n){this.context.event='button',this.context.button=n},k.prototype.setLoadScript=function(){this.context.event='load'},k.prototype.setVariable=function(n){this.context.variable=n,this.context.event='variable'},k.prototype.setAction=function(n,o){this.context.event='action',this.context.action={name:n,value:o}},k.prototype.doVariable=function(n,o){this.controller.outputObject[n]=o},k.prototype.execute=function(){this.controller.startExecution();var n=this.controller.module.view._input,o={},p=0;for(var q in n)null!=n[q]&&(p++,o[q]=n[q]);this.context.variables=o,this.context.defined=p,this.wasSet=!1,this._async=!1,this._done=Promise.resolve();try{var r=Promise.resolve(this.theFunction.apply(this.context,this.libs));this._async||(this._done=r)}catch(s){m(this.title,s)}this.setOutput()},k.prototype.setOutput=function(){var n=this;this._done.then(function(){return n.wasSet&&n.controller.createDataFromEvent('onScriptEnded','outputValue',n.controller.outputObject),null},function(o){m(n.title,o)}).then(function(){n.controller.stopExecution()})},k.prototype.async=function(){if(!this._async){this._async=!0;var n=this;this._done=new Promise(function(o,p){n.done=function(q){'Error'===h.objectToString(q)?p(q):o()}})}},k.prototype.done=function(){},j});