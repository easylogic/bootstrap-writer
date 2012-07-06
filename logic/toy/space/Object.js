define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-space',
        mode : 'view',
        type : 'space',        
        desc: '빈 공간',
        icon: 'icon-resize-horizontal',     
        getSettings: function() { 
        	return new Settings({parent : this});	
        },

		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
