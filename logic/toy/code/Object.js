define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-code',
				
        type : 'code',        
				
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
				
        getDefaultValue: function() { 
            return { syntax : 'text' };   
        },            
				
				getTpl : function(data) { 
						return tpl(data);
				}

    })
})
