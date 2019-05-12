'use strict';define(['modules/default/defaultview','lib/twigjs/twig','src/util/debug','src/util/colorbar','src/util/color','components/papa-parse/papaparse.min','src/util/api','lodash','src/util/urldata'],function(a,b,d,f,h,j,k,l,m){'use strict';function n(){}var t=293,v=['alkali','alkaline','transition','lanthanoid','actinoid','poor','metalloid','nonmetal','halogen','noble'];return $.extend(!0,n.prototype,a,{init(){this.dom=$('<div class="periodic-table">'),this.elements=[],this.foreground=this._getOptions('foreground'),this.background=this._getOptions('background'),this.createTemplateFromPref('','pref'),this.createTemplateFromPref('hl','pref')},blank:{template(){this.template=b.twig({data:''}),this.dom.empty().unbind()},hltemplate(){this.hltemplate=b.twig({data:''}),this.dom.empty().unbind()},value(){this.dom.empty().unbind()}},inDom(){this.module.getDomContent().html(this.dom),this.getElements().then(()=>{this._activateHighlights(),this.resolveReady(),this.render()})},createTemplateFromPref(w){var x=w+'templateSource';if(x=this.module.getConfiguration(x),'pref'===x){var y=this.module.getConfiguration(w+'template');this[w+'template']=b.twig({data:y})}else this[w+'template']=b.twig({data:''})},createTemplateFromVar(w,x){var y=w+'templateSource';y=this.module.getConfiguration(y),'varin'===y&&(this[w+'template']=b.twig({data:x}))},update:{value(w){this.getElements(w).then(()=>{this._activateHighlights(),this.render()})},template(w){var x=w.get().toString();try{this.createTemplateFromVar('',x),this.render()}catch(y){d.info('Problem with template: '+y)}},hltemplate(w){var x=w.get()+'';try{this.createTemplateFromVar('hl',x),this.render()}catch(y){d.info('Problem with highlight template: '+y)}}},getElements(w){return Promise.resolve().then(()=>{var x=this.module.getConfiguration('elementsSource'),y=this.module.getConfiguration('elementsCode'),A=this.module.getConfiguration('elementsUrl');if('varin'===x&&w)this.setElements(w);else if('pref'===x)this.parseElements(y);else if('url'===x)return m.get(A,1800).then((B)=>{this.parseElements(B)})})},setElements(w){var x=w.filter((B)=>{return'atom'===B.label+''});if(this.module.getConfigurationCheckbox('useHighlights','yes'))for(var y=0;y<x.length;y++)x[y]._highlight=x[y].name;this.metadata=w.filter((B)=>{return'atom'!==B.label+''});var A=this.module.getConfiguration('varName');A&&'varin'!==this.module.getConfiguration('elementsSource')&&k.createData(A,w),this.dataElements=DataObject.check(x,!0),this.elements=JSON.parse(JSON.stringify(DataObject.resurrect(x)))},parseElements(w){var x;if('string'==typeof w)try{if(x=JSON.parse(w),!Array.isArray(x))throw new Error}catch(y){try{x=j.parse(w,{delimiter:'\t',header:!0,dynamicTyping:!0}),x=x.data}catch(A){return void d.error('Could not parse elements')}}else x=w;this.setElements(x)},render(){function w(M){var N=M.data('idx'),O=x.elements[N];O&&(x.defaultLegend.addClass('hidden'),E.removeClass('hidden'),F.removeClass('hidden'),E.empty().unbind(),E.append(x.hltemplate.render({element:O})))}var x=this;x.dom.empty().unbind(),x.dom.append('<div class="indic-p indic-g"></div>');for(var y=1;19>y;y++)x.dom.append('<div class="indic-g group'+y+'"><p>'+y+'</p></div>');for(var A=1;8>A;A++)x.dom.append('<div class="indic-p period'+A+'"><p>'+A+'</p></div>');for(var C,B=0;B<this.elements.length;B++)C=$('<div>'+this.template.render({element:this.elements[B]})+'</div>').data('idx',B),C.addClass('element e'+this.elements[B].Z+' period'+this.elements[B].period+' group'+this.elements[B].group+' block-'+this.elements[B].block+' '+this.elements[B].serie),x.dom.append(C);var D=$('<div class="legend"></div>');x.dom.find('div.e1').after(D),x.defaultLegend=$('<div class="default-legend"></div>');var E=$('<div class="element-zoom hidden"></div>'),F=$('<div class="element-datas hidden"></div>');D.append(x.defaultLegend).append(E).append(F),x.innerLegend=$('<div class="inner-legend"></div>'),x.defaultLegend.append(x.innerLegend),x.colorSerie=$(`<ul class="color-serie hidden">
                <li class="alkali">Alkali metals</li>
                <li class="alkaline">Alkalin earth metals</li>
                <li class="transition">Transition metals</li>
                <li class="lanthanoid">Lanthanoids</li>
                <li class="actinoid">Actinoids</li>
                <li class="poor">Post-transition metals</li>
                <li class="metalloid">Metalloids</li>
                <li class="nonmetal">Nonmetals</li>
                <li class="halogen">Halogens</li>
                <li class="noble">Noble gases</li>
                </ul>`),x.innerLegend.append(x.colorSerie);var G=x.$elements=x.dom.find('.element');x.innerLegend.append('<div class="stateOfMatter"></div>'),x.stateOfMatter=x.innerLegend.find('.stateOfMatter'),'state'===x.foreground.mode&&(x.stateOfMatter.append(`<table><tbody>
                <tr><td class="solid">S</td><td>Solid</td><td class="liquid">L</td><td>Liquid</td></tr>
                <tr><td class="gas"">G</td><td>Gas</td><td class="unknown">U</td><td>Unknown</td></tr>
                </tbody></table>`),x.stateOfMatter.append('<dl class="periodic-value-list"><dt>Pressure</dt><dd>101.325 kPa</dd></dl></div>')),'state'===x.foreground.mode?(x.defaultLegend.append(`<div class="periodicSlider" id="foregroundSlider"><input type="range" min="${0}" max="${6e3}" step="${1}" value="${t}"/></div>`),x.innerLegend.find('dl').append(`<dt>Temperature</dt><dd id="foregroundVal">${t} K</dd>`),this.updateElementPhase(t)):'custom'===x.foreground.mode?(x._addSlider('foreground'),x.updateColors('foreground',x.foreground.val)):'fixed'===x.foreground.mode&&G.css('color',x.foreground.fixedcolor),'custom'===x.background.mode?(x._addSlider('background'),x.updateColors('background',x.background.val)):'fixed'===x.background.mode&&G.css('background-color',x.background.fixedcolor);var H=!1;this.innerLegend.on('click','ul.color-serie li',(M)=>{x.unselectElements(M,G);var N=$(M.target).attr('class').split(' '),O=v.find((P)=>{return N.some((Q)=>Q===P)});O&&(G.filter('.'+O).toggleClass('el-selected'),x.elementsSelected(),M.stopPropagation())}),x.defaultLegend.on('input','#foregroundSlider>input',(M)=>{'state'===x.foreground.mode?(this.updateElementPhase(M.target.value),x.innerLegend.find('#foregroundVal').html(`${M.target.value} K`)):(this.updateColors('foreground',M.target.value),x.innerLegend.find('#foregroundVal').html(`${M.target.value} ${this.foreground.unit}`))}),x.defaultLegend.on('input','#backgroundSlider>input',(M)=>{this.updateColors('background',M.target.value),x.innerLegend.find('#backgroundVal').html(`${M.target.value} ${this.background.unit}`)});var I=l.debounce(()=>{$('.element-zoom').delay(5e4).empty().unbind(),x.defaultLegend.removeClass('hidden'),this.module.getConfigurationCheckbox('display','families')&&x.colorSerie.removeClass('hidden'),E.addClass('hidden'),F.addClass('hidden')},150);I(),G.mouseenter(function(){var M=$(this),N=x.getZ(M);x._doHighlight(N,!0),x.module.controller.elementHovered(N),H||(I.cancel(),w(M))}),G.mouseleave(function(){var M=$(this),N=x.getZ(M);x._doHighlight(N,!1),H||I()}),G.click(function(M){x.unselectElements(M,G);var N=$(this);N.toggleClass('el-selected'),x.elementSelected(N),w(N),x.elementsSelected(),H=!0,M.stopPropagation()}),G.dblclick(function(){var M=$(this);M.removeClass('el-selected'),H=!1}),x.dom.on('click','.indic-p',function(M){var N=$(this).attr('class').replace(/^.*(period\d+).*$/,'$1'),O=N.substr(6);x.unselectElements(M,G);var P=G.filter('.'+N);P.toggleClass('el-selected'),x.module.controller.periodSelected(O),x.elementsSelected(),M.stopPropagation()}),x.module.getDomContent().on('click',function(){H=!1,I(),G.removeClass('el-selected'),x.module.controller.elementsSelected(x.elements.map((M)=>M.Z))}),x.dom.on('click','.indic-g',function(M){var N=$(this).attr('class').replace(/^.*(group\d+).*$/,'$1'),O=N.substr(5);x.unselectElements(M,G);var P=G.filter('.'+N);P.toggleClass('el-selected'),x.module.controller.groupSelected(O),x.elementsSelected(),M.stopPropagation()});D.after('<div class="interactive-zone"><div id="slider"></div>');x.dom.find('div.e56').after('<div class="indic-f period6"><p>57-71</p></div>'),x.dom.find('div.e88').after('<div class="indic-f period7"><p>89-103</p></div>'),x.module.controller.elementsSelected(x.elements.map((M)=>M.Z))},_getOptions(w){var x=this.module.getConfiguration,y={};return['Min','Max','Val','MinColor','MaxColor','NeutralColor','NoValueColor','FixedColor','Step','Label','Unit','Mode','Jpath'].forEach((A)=>{var B=A.toLowerCase();y[B]=x(`${w}${A}`),A.match(/color/i)&&(y[B]=h.array2rgba(y[B]))}),[['ShowSlider','yes']].forEach((A)=>{y[A[0].toLowerCase()]=this.module.getConfigurationCheckbox(`${w}${A[0]}`,A[1])}),y},_getGradientFunction(w,x){var y=this.defaultLegend.width(),B={stops:[this[w].mincolor,this[w].neutralcolor,this[w].maxcolor],stopPositions:[this[w].min,x,this[w].max],domain:[this[w].min,this[w].max],stopType:'values',width:y,height:51,returnMode:'svg',axis:{orientation:'top'}};B.axis.tickValues=B.stopPositions;var C=this.defaultLegend.find(`#${w}Slider .periodicGradient`);return C.empty(),C[0]&&f.renderSvg(C[0],B),f.getColorScale(B)},_addSlider(w){this[w].showslider&&this.defaultLegend.append(`<div class="periodicSlider" id="${w}Slider"><input type="range" min="${this[w].min}" max="${this[w].max}" step="${this[w].step}" value="${this[w].val}"/><div class="periodicGradient"></div></div>`),this.innerLegend.find('dl').append(`<dt>${this[w].label}</dt><dd id="${w}Val">${this[w].val} ${this[w].unit}</dd>`)},unselectElements(w,x){w.ctrlKey||w.metaKey||x.removeClass('el-selected')},elementSelected(w){this.module.controller.elementSelected(this.getZ(w))},elementsSelected(){var w=this.dom.find('.el-selected').map((x,y)=>{return this.getZ($(y))}).toArray();this.module.controller.elementsSelected(w)},onActionReceive:{select(w){var x=this.dom.find('.element').toArray();this._selectElements(x,w)},setSelected(w){var x=this.dom.find('.element');this.unselectElements({},x),this._selectElements(x.toArray(),w)}},_selectElements(w,x){if(Array.isArray(x))for(var B,y=(D)=>D.Z===x[A],A=0;A<x.length;A++)B=this.elements.findIndex(y),0<=B&&$(w[B]).addClass('el-selected');else if('function'==typeof x)for(var C=0;C<this.elements.length;C++)x(this.elements[C])&&$(w[C]).addClass('el-selected');this.elementsSelected()},getZ(w){return w.attr('class').replace(/^.*[^a-zA-Z]e(\d+).*$/,'$1')},updateColors(w,x){for(var y=this._getGradientFunction(w,x),A=this.dom.find('.element'),B=0;B<A.length;B++){var C=$(A[B]),D=C.data('idx'),E=+this.dataElements.getChildSync([D].concat(this[w].jpath));if(isNaN(E))var F={rgba:this[w].novaluecolor};else F=y(E),F.rgba=h.array2rgba(h.hex2rgb(F.color).concat(F.opacity));'foreground'===w?C.css({color:F.rgba}):C.css({backgroundColor:F.rgba})}},updateElementPhase(w){for(var x=this.dom.find('.element'),y=0;y<x.length;y++){var A=$(x[y]),B=A.data('idx');if(void 0!==B){var C=this.elements[B],D=+C.boiling,E=+C.melting;isNaN(D)&&isNaN(E)?(A.removeClass('solid liquid gas'),A.addClass('unknown')):w<E?(A.removeClass('liquid gas unknown'),A.addClass('solid')):w<D?(A.removeClass('solid gas unknown'),A.addClass('liquid')):(A.removeClass('liquid solid unknown'),A.addClass('gas'))}}},_activateHighlights:function(){var x=this,y=l(x.elements).map('_highlight').flatten().filter((B)=>!l.isUndefined(B)).value();x._highlighted=[],k.killHighlight(x.module.getId());for(var A=0;A<y.length;A++)k.listenHighlight({_highlight:y[A]},function(B,C,D,E){E===x.module.getId()||(!Array.isArray(C)&&(C=[C]),x._highlighted=B?l(x._highlighted).push(C).flatten().uniq().value():l.filter(x._highlighted,function(F){return-1===C.indexOf(F)}),x._drawHighlight())},!1,x.module.getId())},_doHighlight(w,x){if(this.elements){var y=this.elements.find((A)=>A.Z==w);y&&k.highlightId(y.name,x,this.module.getId())}},_drawHighlight(){if(this.elements&&this.$elements){var w=this.elements.filter((x)=>{return-1<this._highlighted.indexOf(x._highlight)});this._unhighlightElements(),w.forEach((x)=>{this._highlightElement(x.Z)})}},_unhighlightElements(){this.$elements.css({border:'',transform:'scale(1)',zIndex:0})},_highlightElement(w){var x=this.$elements.filter('.e'+w);x.css({border:'solid 2px red',transform:'scale(1.1)',zIndex:1})}}),n});
