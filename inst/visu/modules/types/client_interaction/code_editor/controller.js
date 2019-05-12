'use strict';define(['jquery','modules/default/defaultcontroller','src/data/structures','src/util/aceHelper'],function(a,b,c,d){'use strict';function f(){}function g(h){try{return JSON.parse(h)}catch(j){return null}}return a.extend(!0,f.prototype,b),f.prototype.moduleInformation={name:'Code editor',description:'Write code in any language and send the content to another module',author:'Micha\xEBl Zasso',date:'27.08.2014',license:'MIT'},f.prototype.references={data:{label:'String containing the code'},jsonValue:{label:'JSON-parsed value'},typedValue:{label:'The typed value'}},f.prototype.events={onEditorChange:{label:'The value in the editor has changed',refVariable:['data','jsonValue','typedValue']},onButtonClick:{label:'The button was clicked',refAction:['data','jsonValue'],refVariable:['data','jsonValue','typedValue']}},f.prototype.variablesIn=['data'],f.prototype.configurationStructure=function(){for(var h=c._getList(),j=h.length,k=Array(j),m=0;m<j;m++)k[m]={key:h[m],title:h[m]};var n={groups:{group:{options:{type:'list'},fields:{mode:{type:'combo',title:'Mode',options:[{title:'Text',key:'text'},{title:'Javascript',key:'javascript'},{title:'JSON',key:'json'},{title:'YAML',key:'yaml'},{title:'HTML',key:'html'},{title:'XML',key:'xml'},{title:'Markdown',key:'markdown'}],default:'text'},outputType:{type:'combo',title:'Type of output value (optional)',options:k},btnvalue:{type:'text',title:'Button text',default:'Send script'},iseditable:{title:'Display editor',default:['editable'],type:'checkbox',options:{editable:'Show the code editor'}},hasButton:{title:'Display button',default:['button'],type:'checkbox',options:{button:'Show the button'}},variable:{title:'Variable',type:'checkbox',options:{modify:'Modify input variable'},default:[]},storeOnChange:{title:'On change',type:'checkbox',options:{store:'Store value in the preferences on change'},default:[]},debouncing:{title:'Debouncing',type:'float',default:0},script:{type:'jscode',title:'Code',mode:'html'}}}}};return n.groups.ace=d.getConfig(),d.getConfig(),n},f.prototype.configAliases=Object.assign(d.getAliases('ace'),{mode:['groups','group',0,'mode',0],btnvalue:['groups','group',0,'btnvalue',0],iseditable:['groups','group',0,'iseditable',0],hasButton:['groups','group',0,'hasButton',0],script:['groups','group',0,'script',0],outputType:['groups','group',0,'outputType',0],variable:['groups','group',0,'variable',0],storeOnChange:['groups','group',0,'storeOnChange',0],debouncing:['groups','group',0,'debouncing',0]}),f.prototype.onEditorChanged=function(h,j){!j&&this.module.getConfigurationCheckbox('variable','modify')&&'string'===DataObject.getType(this.module.view._data)&&(this.module.view._data.setValue(h,!0),this.module.model.dataTriggerChange(this.module.view._data)),this.createDataFromEvent('onEditorChange','data',h);var k=g(h);this.createDataFromEvent('onEditorChange','jsonValue',k);var m=this.getTypedValue(h);null!==m&&this.createDataFromEvent('onEditorChange','typedValue',m)},f.prototype.onButtonClick=function(h){this.createDataFromEvent('onButtonClick','data',h),this.sendActionFromEvent('onButtonClick','data',h);var j=g(h);this.createDataFromEvent('onButtonClick','jsonValue',j),this.sendActionFromEvent('onButtonClick','jsonValue',j);var k=this.getTypedValue(h);null!==k&&this.createDataFromEvent('onButtonClick','typedValue',k)},f.prototype.getTypedValue=function(h){var j=this.module.getConfiguration('outputType');return j?{type:this.module.getConfiguration('outputType'),value:h}:null},f});
