'use strict';define(['modules/types/client_interaction/code_editor/view','src/util/util','ace/ace','src/util/context','jquery'],function(a,b,c,d,e){'use strict';function f(){a.call(this)}return b.inherits(f,a),f.prototype.inDom=function(){var g=this;this.editable=!0,e('<div id="'+this._id+'"></div>').css('height','100%').css('width','100%').appendTo(this.editorCell),this.editor=c.edit(this._id);var h=this.module.getConfiguration('script')||'';this._code=h,this.editor.$blockScrolling=Infinity,this.editor.getSession().setOption('useWorker',!1),this.editor.getSession().setMode('./mode/javascript'),this.editor.setValue(h,-1),this.editor.getSession().on('change',function(){g.editorChanged()}),this.buttonCell.append(e('<span>Execute filter</span>').addClass('form-button').on('click',function(){g.module.controller.onButtonClick(g._code,g._object)})),this.table.prepend(e('<tr><td>function(value, resolve, reject) {</td></tr>').css('height','10px')),e('<tr><td>}</td></tr>').css('height','10px').insertBefore(this.buttonRow),this.resolveReady()},f.prototype.editorChanged=function(){var g=this.editor.getValue();this._code=g,this.module.definition.configuration.groups.group[0].script[0]=g},f.prototype.blank.dataobject=function(){this._object=null},f.prototype.update.dataobject=function(g){this._object=g,this.module.controller.onButtonClick(this._code,this._object)},f.prototype.onActionReceive.doFilter=function(){this.module.controller.onButtonClick(this._code,this._object)},f});
