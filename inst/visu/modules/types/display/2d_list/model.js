'use strict';define(['modules/default/defaultmodel','src/util/datatraversing'],function(a,b){'use strict';function c(){}return $.extend(!0,c.prototype,a,{getValue:function(){return this.dataValue},getjPath:function(){var e=[],f=this.module.getDataFromRel('list');return f&&null!=f?(f=f[0],b.getJPathsFromElement(f,e),e):e}}),c});
