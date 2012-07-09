define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-alert',
        type : 'alert',

        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
        getDefaultValue: function() { 
            return { kind : 'default' };   
        },		

		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
