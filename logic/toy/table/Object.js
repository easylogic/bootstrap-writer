define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-table',
        mode : 'view',
        type : 'table',
        desc: '강조',
        icon: 'icon-th',              

        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
        getDefaultValue: function() { 
            return { 
                kind : 'default',
                list: [],
                table: false,
                striped: false,
                bordered: false,
                condensed: false
            };   
        },		

		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
