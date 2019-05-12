'use strict';define(['modules/default/defaultview','src/util/util','src/util/api','src/util/typerenderer','src/util/color','sprintf','lodash'],function(c,d,f,g,h,j,k){'use strict';function l(){}function m(q){return n(q)||o(q)}function n(q){return!!q&&(q instanceof DataString||'string'===q.type)}function o(q){return!!q&&(q instanceof DataNumber||'number'===q.type)}function p(q){var r=q.target.innerText;this._lastValueNumber&&(r=+r),this._lastValue.setValue(r,!0),this.module.model.dataTriggerChange(this._lastValue)}return $.extend(!0,l.prototype,c,{init:function(){var r='<div></div>';this.dom=this.module.getConfigurationCheckbox('append','yes')?$(r).css({height:'100%',width:'100%',"overflow-x":'hidden',"overflow-y":'scroll'}):$(r).css({display:'table',"table-layout":'fixed',height:'100%',width:'100%'}),this.values=[],this.module.getDomContent().html(this.dom),this.fillWithVal({type:'html',value:this.module.getConfiguration('defaultvalue','')}),this.resolveReady(),this._relsForLoading=['value']},blank:{value:function(){if(this.module.getConfigurationCheckbox('append','yes'))for(var r=this.module.getConfiguration('maxEntries'),s=this.dom.children(),t=s.length-r,u=0;u<t;u++)s[u].remove();else this.dom.empty()},color:function(){this.module.getDomContent().css('background-color','#FFF')}},update:{color:function(r){this.module.getDomContent().css('background-color',r.get())},value:function(r,s){(r instanceof DataNumber||'number'===r.type)&&(this._lastValueNumber=!0);var t=this.values.find((u)=>u.name===s);t?t.value=r:(this.values.push({name:s,value:r}),this.values.sort((u,w)=>{var x=this.module.definition.vars_in.findIndex((z)=>z.name===u.name),y=this.module.definition.vars_in.findIndex((z)=>z.name===w.name);return x<y?-1:1})),this._lastValue=r,this.renderAll()}},onResize:function(){this.renderAll(),this.refresh()},renderAll:function(){var r=this._lastValue;if(r){var s=this,t=this.module.getConfiguration('sprintf'),u=d.evalOptions(this.module.getConfiguration('rendererOptions'))||{},w=this.module.getConfiguration('forceType');if(w&&(u.forceType=w),!t)s.fillWithVal(r,u);else if(!w){var A,x=[],y=!0,z=!1;try{for(var C,D,B=s.values[Symbol.iterator]();!(y=(C=B.next()).done);y=!0)D=C.value,x.push(this.renderVal(D.value))}catch(F){z=!0,A=F}finally{try{!y&&B.return&&B.return()}finally{if(z)throw A}}Promise.all(x).then(function(F){var G=[t].concat(F);s.fillWithVal(j.sprintf.apply(null,G),{forceType:'html'})})}else try{var E=[t];E=E.concat(s.values.map((F)=>DataObject.resurrect(F.value.get()))),r=j.sprintf.apply(this,E),s.fillWithVal(r,u)}catch(F){s.fillWithVal(r,u)}}},_scrollDown:function(){var r=this.dom[0].scrollHeight;this.dom.scrollTop(r)},renderVal:function(r,s){var t=$('<span>');return g.render(t,r,s).then(function(){return t.html()}).catch(function(){return'[failed]'})},fillWithVal:function(r,s){var C,t=this,u=this.module.getConfiguration('valign'),w=this.module.getConfiguration('align'),x=this.module.getConfiguration('fontcolor'),y=this.module.getConfiguration('fontsize'),z=this.module.getConfiguration('font'),A=this.module.getConfigurationCheckbox('preformatted','pre'),B=this.module.getConfigurationCheckbox('preformatted','selectable');if(x&&(x=h.getColor(x)),this.module.getConfigurationCheckbox('append','yes'))C=$('<div>').css({fontFamily:z||'Arial',fontSize:y||'10pt',color:x||'#000000',"vertical-align":u||'top',textAlign:w||'center',width:'100%',"white-space":A?'pre':'normal',"word-wrap":'break-word',"user-select":B?'text':'none'}),this.dom.append(C);else{C=$('<div />').css({fontFamily:z||'Arial',fontSize:y||'10pt',color:x||'#000000',display:'table-cell',"vertical-align":u||'top',textAlign:w||'center',width:'100%',height:'100%',"white-space":A?'pre':'normal',"word-wrap":'break-word',"user-select":B?'text':'none'}),this.dom.html(C);var D;this.module.getConfigurationCheckbox('editable','yes')&&m(this._lastValue)&&(C.attr('contenteditable',!0),C.on('input',0<t.module.getConfiguration('debounce')?k.debounce(p,t.module.getConfiguration('debounce')).bind(t):p.bind(t)),C.on('keyup',function(E){27===E.keyCode&&C.blur()}),C.on('click',function(){D||(D=!0,C.html(r+''),C.focus())}),C.on('blur',function(){D=!1,g.render(C,r,s).then(function(){t._scrollDown()})}))}this._scrollDown(),g.render(C,r,s).then(function(){t._scrollDown()})}}),l});
