'use strict';define(['modules/default/defaultmodel','src/util/datatraversing'],function(a,b){'use strict';function c(){}return $.extend(!0,c.prototype,a,{getjPath:function(e){var f=[];return'result'===e&&b.getJPathsFromElement(this.module.controller.variables,f),f}}),c});
