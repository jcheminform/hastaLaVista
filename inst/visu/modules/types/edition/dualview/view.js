'use strict';define(['modules/default/defaultview','modules/types/edition/onde/view','modules/types/display/template-twig/view'],function(a,b,c){'use strict';function d(){this.twigV=new c,this.ondeV=new b}return $.extend(!0,d.prototype,a,{setModule:function(f){this.module=f,this.twigV.module=$.extend({},f),this.twigV.module.view=this.twigV,f.twigM=this.twigV.module,this.ondeV.module=$.extend({},f),this.ondeV.module.view=this.ondeV,f.ondeM=this.ondeV.module;var g=this,h=function(){return g.module.getConfiguration.apply(g.module,arguments)};this.twigV.module.getConfiguration=h,this.ondeV.module.getConfiguration=h},init:function(){this.dom=$('<div></div>').css({height:'100%',width:'100%'}),this.twigV.init(),this.ondeV.init();var g=this,h=this.ondeV.exportForm;this.ondeV.exportForm=function(){h.apply(this),g.loadTwig()},this.ondeV.initForm()},blank:{},inDom:function(){this.module.getDomContent().html(this.dom),this.loadTwig(),this.resolveready()},update:{value:function(f,g){this._value=[f,g],this.twigV.update.value.apply(this.twigV,arguments),this.ondeV.update.inputValue.apply(this.ondeV,arguments)}},loadOnde:function(){this.dom.html(this.ondeV.dom)},loadTwig:function(){var f=this;this.dom.html(this.twigV.dom),this.twigV.dom.dblclick(function(){f.loadOnde()}),this._value&&this.twigV.update.value.apply(this.twigV,this._value),this.twigV.render()}}),d});