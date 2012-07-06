define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js'
],function(tpl, Toy, Settings){
    return Toy.extend({
        className: 'logic-comp logic-comp-image',
        mode : 'view',
        type : 'image',        
        desc: '이미지',
        icon: 'icon-picture',
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
        getDefaultValue: function() { 
            return { link : '' };   
        },            
        
		getViewPoint: function() {  
			return this.getPoint('viewpoint').find('.viewText'); 
		},    

		getTpl : function(data) { 
		    return tpl(data);
		}

    })
})
