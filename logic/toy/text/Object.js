define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-text',
        mode : 'view',
        type : 'text',
        desc: '텍스트',
        icon: 'icon-text-width',          
        
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
