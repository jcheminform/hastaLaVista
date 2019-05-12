'use strict';define(['modules/types/client_interaction/code_editor/controller','src/util/util','src/util/debug'],function(CodeEditor,Util,Debug){'use strict';function Controller(){CodeEditor.call(this)}function getRequireStart(a){var b='( [ "src/util/api"',c='function( API';if(a)for(var e,d=0;d<a.length;d++)e=a[d],e.lib&&(b+=', "'+e.lib+'"',c+=', '+(e.alias||'required_anonymous_'+d));return b+' ], '+c+' ){'}return Util.inherits(Controller,CodeEditor),Controller.prototype.moduleInformation={name:'Filter editor',description:'Write code for a filter and test it in real time',author:'Micha\xEBl Zasso',date:'04.02.2014',license:'MIT'},Controller.prototype.references=$.extend({},Controller.prototype.references,{dataobject:{label:'Object to filter'},filteredObject:{label:'Filtered object'}}),Controller.prototype.events={onButtonClick:{label:'Button was clicked / Incoming variable',refVariable:['filteredObject']}},Controller.prototype.variablesIn=['dataobject'],Controller.prototype.actionsIn=$.extend({},Controller.prototype.actionsIn,{doFilter:'Trigger the filter'}),Controller.prototype.configurationStructure=function(){return{groups:{group:{options:{type:'list'},fields:{script:{type:'jscode',title:'Code',default:'//When the result is ready, use resolve(result) to send it.\n//In case of an error, use reject(error)\nresolve(value);'}}},libs:{options:{type:'table',multiple:'true'},fields:{lib:{type:'text',title:'url'},alias:{type:'text',title:'alias'}}}}}},Controller.prototype.configAliases={script:['groups','group',0,'script',0],libs:['groups','libs',0]},Controller.prototype.onButtonClick=function(a,b){var c=this,d=this.executeFilter(a,b);d.then(function(e){'undefined'!=typeof e&&c.createDataFromEvent('onButtonClick','filteredObject',e)},function(e){Debug.error('Filter execution error (filter title: '+c.module.definition.title+') : ',e)})},Controller.prototype.executeFilter=function(filter,object){var neededLibs=this.module.getConfiguration('libs'),requireStart='require'+getRequireStart(neededLibs),requireBody='(function(value, resolve, reject){'+filter+'\n})(object, resolve, reject);',requireEnd='});';return new Promise(function(resolve,reject){eval('"use strict";'+requireStart+requireBody+requireEnd)})},Controller.prototype.export=function(){var a=this.module.getConfiguration('libs'),b='define'+getRequireStart(a)+'\n    return {\n    filter: ',c='function( value, resolve, reject ) {\n            '+this.module.getConfiguration('script').replace(/(\r\n|\r|\n)/g,'\n            ')+'\n        }\n    };';return b+c+'\n});'},Controller});
