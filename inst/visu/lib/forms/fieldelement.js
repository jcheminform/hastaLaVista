'use strict';define(['jquery'],function(a){'use strict';var b=function(){};return b.defaultOptions={},a.extend(b.prototype,{init:function(d){this.options=a.extend(!0,{},b.options,d),this.validation={error:void 0,value:void 0}},getDom:function(){return this._dom||(this._dom=this._makeDom()),this.field.changed(this),this.dom},display:function(){this.getDom().show()},hide:function(){this.getDom().hide()},getName:function(){return this.field.name},getExpander:function(){var e=this.form.getExpanderDom();e.css(this.groupElement.getExpanderInfosFor(this)).css('height','')},hideExpander:function(){this.form.hideExpander()},showExpander:function(){this.getExpander(),this.field.showExpander(this)},redoTabIndices:function(){this.fieldElement&&this.fieldElement.attr('tabindex',1),this.form.incrementTabIndex(this)},focus:function(){this.fieldElement&&this.fieldElement.trigger('click').trigger('focus')},setValueSilent:function(d,e){var f=this._value;this._validate(d),this.validation.error||(d=this.validation.value,this._value=d,this.field.changed(this),!e&&this.form.fieldElementValueChanged(this,d,f),this._inDom&&this.form.conditionalDisplayer.changed(this,f))},showError:function(){return!!this.dom&&((this.dom.removeClass('form-field-valid'),!!this.validation.feedback)?(this.validation.feedback._class&&this.dom.addClass('form-field-error'),this.validation.feedback.message&&this.addValidationMessage(this.validation.feedback.message),!0):void 0)},hideError:function(){return!!this.dom&&(this.dom.removeClass('form-field-error'),this.field.options.validation&&this.field.options.validation.positiveFeedback?(this.dom.addClass('form-field-valid'),this.field.options.validation.positiveFeedback.message&&this.addValidationMessage(this.field.options.validation.positiveFeedback.message,!0)):this.removeValidationMessage(),!0)},addValidationMessage:function(d,e){this.validationMessageDOM||(this.validationMessageDOM=a('<div />')),e?this.validationMessageDOM.addClass('form-field-valid-message').removeClass('form-field-error-message'):this.validationMessageDOM.addClass('form-field-error-message').removeClass('form-field-valid-message'),this.dom.after(this.validationMessageDOM.html(d))},removeValidationMessage:function(){this.validationMessageDOM&&this.validationMessageDOM.remove()},_validate:function(d){this.validation.value=d,this.backupValidation(),this.validation.error=void 0,this.validate(d),this.validation.error||this.field.validate(this,d),this.doValidationFeedback()},validate:function(){},backupValidation:function(){this._backedUpValidation=this._backedUpValidation||{},this._backedUpValidation.error=this.validation.error,this._backedUpValidation.value=this.validation.value},doValidationFeedback:function(){(!0===this._backedUpValidation.error||void 0===this._backedUpValidation.error)&&!1===this.validation.error&&(this.hideError()||(this.validation.error=void 0)),!this._backedUpValidation.error&&!0===this.validation.error&&(this.showError()||(this.validation.error=void 0))},setDefaultOr:function(d){if(void 0!==d&&null!==d)this.value=this.insertValue(d);else{var e=this.field.options.default;Array.isArray(e)&&(e=e.slice()),this.value=this.insertValue(e)}},inDom:function(){},unSelect:function(d){d&&(d.preventDefault(),d.stopPropagation()),this.selected=!1,this.form.unSelectFieldElement(this),this.field.domExpander&&this.hideExpander(),this.fieldElement&&this.fieldElement.removeClass('selected')},select:function(d){d&&(d.preventDefault(),d.stopPropagation()),this.selected=!0,this.form.selectFieldElement(this),this.field.domExpander&&this.showExpander(),this.fieldElement&&this.fieldElement.addClass('selected')},toggleSelect:function(d){this.selected?this.unSelect(d):this.select(d)},extractValue:function(){return this.field.options.extractValue?this.field.options.extractValue(this.value):this.value},insertValue:function(d){return this.field.options.insertValue?this.field.options.insertValue(d):d}}),Object.defineProperty(b.prototype,'form',{enumerable:!0,configurable:!1,get:function(){return this._form||this.field.form},set:function(d){this._form=d}}),Object.defineProperty(b.prototype,'field',{enumerable:!0,configurable:!1,get:function(){return this._field},set:function(d){this._field=d}}),Object.defineProperty(b.prototype,'groupElement',{enumerable:!0,configurable:!1,get:function(){return this._groupElement},set:function(d){this._groupElement=d}}),Object.defineProperty(b.prototype,'value',{enumerable:!0,configurable:!1,get:function(){return this._value},set:function(d){this.setValueSilent(d),this.checkValue()}}),b});
