define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-page-header',
        mode : 'view',
        type : 'page-header',        
        desc: '제목',
        icon: 'icon-folder-open',         
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
