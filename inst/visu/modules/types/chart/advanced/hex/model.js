'use strict';define(['modules/default/defaultmodel','src/util/datatraversing'],function(a,b){'use strict';function c(){}return $.extend(!0,c.prototype,a,{getjPath:function(e){var f;switch(e){case'point':if(f=this.module.data||new DataArray,f=f.get(0),!f)return[];break;default:f=this.module._data;}var g=[];return b.getJPathsFromElement(f,g),g}}),c});
