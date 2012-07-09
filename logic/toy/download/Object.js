define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-download',
				
        type : 'download',        
				
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
				getTpl : function(data) { 
						return tpl(data);
				}

    })
})
