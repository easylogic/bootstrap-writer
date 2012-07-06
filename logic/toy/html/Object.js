define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js',
    '../ToyMenu.js'
],function(tpl, Toy, Settings, Menu){
    return Toy.extend({
        className: 'logic-comp logic-comp-html',
        mode : 'view',
        type : 'html',        
        desc: 'HTML',
        icon: 'icon-edit',    
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
