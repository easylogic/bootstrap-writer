define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-text',

        type : 'text',
        
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
        getDefaultValue: function() { 
            return { tagType : 'p' };   
        },
        
		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
