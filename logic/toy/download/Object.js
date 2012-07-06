define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-download',
        mode : 'view',
        type : 'download',        
        desc : '다운로드',
        icon : 'icon-download',            
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
