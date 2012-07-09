define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-progress',

        type : 'progress',        
 
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
        getDefaultValue: function() { 
            return { 
            	kind : 'default',
            	percent : 100
            };   
        },                
        
		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
