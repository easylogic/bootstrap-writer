define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-md',
        mode : 'view',
        type : 'markdown',        
        desc: '마크다운',
        icon: 'icon-list-alt',           
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
