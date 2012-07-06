define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-label',
        mode : 'view',
        type : 'label',        
        desc: '라벨',
        icon: 'icon-tag',
        
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
