'use strict';define(['modules/types/display/jqgrid/controller','src/util/util'],function(a,b){'use strict';function c(){a.call(this)}return b.inherits(c,a),c.prototype.moduleInformation={name:'Table (fast)',description:'Displays a fast grid',author:'Norman Pellet',date:'24.12.2013',license:'MIT',cssClass:'fasttable'},c.prototype.references.showList={label:'Array of display flags',type:'array'},c.prototype.variablesIn.push('showList'),c.prototype.actionsIn.toggleOff='Toggle row off',c.prototype.actionsIn.toggleOn='Toggle row on',c});
