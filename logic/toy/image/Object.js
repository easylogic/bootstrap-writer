define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-image',

        type : 'image',        

        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
        getDefaultValue: function() { 
            return { 
            	list : [],
							link : '',
							image: ''
            };   
        },        

				getTpl : function(data) { 
						return tpl(data);
				}

    })
})
