'use strict';define(['modules/default/defaultmodel','src/util/datatraversing'],function(a,b){'use strict';function c(){}function d(e){if(null==e)return[];var f=[];return b.getJPathsFromElement(e,f),f}return $.extend(!0,c.prototype,a,{getValue:function(){return this.dataValue},getjPath:function(f,g){var h=this.module.getDataFromRel('matrix');if(h)return(h=h.value,!!h)?'row'===f?Array.isArray(h.yLabel)?(h=h.yLabel[0],d(h,g)):void 0:'col'===f?Array.isArray(h.xLabel)?(h=h.xLabel[0],d(h,g)):void 0:'intersect'==f&&(h=h.data[0][0],d(h,g)):void 0}}),c});