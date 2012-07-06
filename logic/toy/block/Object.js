define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-block',
        mode : 'view',
        type : 'block',        
        desc: '인용',
        icon: 'icon-check',               
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
        getDefaultValue: function() { 
            return { kind : 'left' };   
        },          
		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
