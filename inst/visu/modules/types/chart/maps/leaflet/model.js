'use strict';define(['modules/default/defaultmodel','src/util/datatraversing'],function(a,b){'use strict';function c(){}return $.extend(!0,c.prototype,a,{getjPath:function(e){var f;switch(e){case'item':f=this.module.data;break;default:return[];}var g=[];return b.getJPathsFromElement(f,g),g}}),c});
