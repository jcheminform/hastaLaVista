'use strict';define(['jquery','src/header/components/default','src/util/versioning','forms/button','src/util/util'],function(a,b,c,d,e){'use strict';function f(){for(var l=['view','data'],n=0;n<l.length;n++)(function(o){var p=0==o?c.getView():c.getData(),q=0==o?c.getViewHandler():c.getDataHandler();k[l[o]].copyToLocal=new d('Copy to local',function(){q.serverCopy(p)},{color:'red'}),k[l[o]].snapshotLocal=new d('Snapshot',function(){q.localSnapshot(p)},{color:'blue'}),k[l[o]].autosaveLocal=new d('Autosave',function(r,s,t){q.localAutosave(s,function(){return p},function(){t.children().find('span').remove();var u=new Date;u=e.pad(u.getHours())+':'+e.pad(u.getMinutes()),t.children().append('<span> ('+u+')</span>')})},{checkbox:!0,color:'blue'}),k[l[o]].branchLocal=new d('Make branch',function(){require(['forms/formfactory','src/util/ui','forms/button'],function(r,s,t){var u=s.dialog({width:'80%',title:'Make branch'});u.parent().css('zIndex',1e4),r.newform(u,{sections:{cfg:{config:{multiple:!1,title:'Branch name'},groups:{general:{config:{type:'list'},fields:[{type:'Text',name:'name',multiple:!1,title:'Name'}]}}}}},function(v){var w=new t('Save',function(){v.dom.trigger('stopEditing');var x=v.getValue();q.localBranch(p,x.cfg[0].general[0].name[0]),v.getDom().dialog('close')});w.setColor('blue'),v.addButtonZone(w)})})},{color:'blue'}),k[l[o]].revertLocal=new d('Revert head',function(){q.localRevert(p)},{color:'blue'}),k[l[o]].localToServer=new d('Push to server',function(r,s,t){q.serverPush(p).done(function(){t.children().find('span').remove();var u=new Date;u=e.pad(u.getHours())+':'+e.pad(u.getMinutes()),t.children().append('<span> ('+u+')</span>')})},{color:'green'})})(n);return k}function g(){}var k={view:{},data:{}};return e.inherits(g,b,{getReady:function(){if(this.$_elToOpen)return this.$_elToOpen;this.$_elToOpen=a('<div />').attr('id','visualizer-dataviews'),this._ready=!0,f();var m=this.$_elToOpen;m.append('<h1>Data</h1>'),m.append(k.data.copyToLocal.render()),m.append(k.data.localToServer.render()),m.append(k.data.snapshotLocal.render()),m.append(k.data.autosaveLocal.render()),m.append(k.data.branchLocal.render()),m.append(k.data.revertLocal.render());var n=a('<div class="ci-dataview-path"><label>Data path : </label></div>');m.append(n);var o=a('<div />').appendTo(n);o.append(c.getDataHandler().getDom()),m.append('<br /><br />'),m.append('<h1>View</h1>'),m.append(k.view.copyToLocal.render()),m.append(k.view.localToServer.render()),m.append(k.view.snapshotLocal.render()),m.append(k.view.autosaveLocal.render()),m.append(k.view.branchLocal.render()),m.append(k.view.revertLocal.render());var n=a('<div class="ci-dataview-path"><label>View path : </label></div>');m.append(n);var o=a('<div />').appendTo(n);o.append(c.getViewHandler().getDom()),this._versionDiv=m,c.getViewHandler().updateButtons=this.updateButtons,c.getViewHandler().doUpdateButtons(),c.getDataHandler().updateButtons=this.updateButtons,c.getDataHandler().doUpdateButtons()},updateButtons:function(m,n,o){k[m].autosaveLocal&&('head'!==n||'local'!==o?k[m].autosaveLocal.disable():k[m].autosaveLocal.enable(),'local'==o?(k[m].copyToLocal.disable(),k[m].snapshotLocal.enable(),k[m].branchLocal.enable(),'head'==n?k[m].revertLocal.disable():k[m].revertLocal.enable()):(k[m].copyToLocal.enable(),k[m].snapshotLocal.disable(),k[m].branchLocal.disable(),k[m].revertLocal.disable()))},_onClick:function(){this.getReady();this.setStyleOpen(this._open),this._open?this.open():this.close()}}),g});