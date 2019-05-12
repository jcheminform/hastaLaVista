'use strict';var _Mathround=Math.round;define(['modules/default/defaultview','components/jsNMR/src/nmr','jcampconverter'],function(a,c,d){'use strict';function e(){}return $.extend(!0,e.prototype,a,{init:function(){this.dom=$('<div />'),this.module.getDomContent().html(this.dom),this.resolveReady()},inDom:function(){this.nmr=new c({dom:this.dom,mode:'2d',symmetric:!0,minimap:!1})},onResize:function(){this.nmr.resize2DTo(this.width,this.height)},blank:{jcampx:function(i){this.nmr.removeSerie2DX(i)},jcampy:function(i){this.nmr.removeSerie2DY(i)},jcamp2d:function(i){this.nmr.removeSerie2D(i)},jcampxy:function(i){this.nmr.removeSerie2DX(i),this.nmr.removeSerie2DY(i)}},update:{jcampx:function(i){this.addSerieJcampXOrY(i,!0,!1)},jcampy:function(i){this.addSerieJcampXOrY(i,!1,!0)},jcampxy:function(i){this.addSerieJcampXOrY(i,!0,!0)},jcamp2d:function(i){function k(u,v,w){return 0>w&&(w+=1),1<w&&(w-=1),w<1/6?u+6*(v-u)*w:w<1/2?v:w<2/3?u+6*((v-u)*(2/3-w)):u}var n=this,o={lineColor:'rgb('+function(u,v,w){var z,A,B;if(0==v)z=A=B=w;else{var C=0.5>w?w*(1+v):w+v-w*v,D=2*w-C;z=k(D,C,u+1/3),A=k(D,C,u),B=k(D,C,u-1/3)}return[_Mathround(255*z),_Mathround(255*A),_Mathround(255*B)]}(100/360,0.8,0.4).join()+')',twoDColor:{fromPositive:{h:100,s:0.3,l:0.7},toPositive:{h:100,s:1,l:0.5},fromNegative:{h:100,s:0.3,l:0.5},toNegative:{h:100,s:1,l:0.3}}};d.convert(i.get()+'',!0).then(function(u){var v=u.contourLines;n.nmr.setSerie2D('SomeName',v,o),n.redraw()})},annotations:function(){}},addSerieJcampXOrY:function(i,j,k){var m=this,n='SomeName',o={label:'Chemical 1'};d.convert(i.get()+'',!0).then(function(u){var v=u.spectra[0].data[0];j&&m.nmr.setSerie2DX(n,v,o),k&&m.nmr.setSerie2DY(n,v,o),m.redraw()})},redraw:function(){this.nmr.redrawAll2D()}}),e});
