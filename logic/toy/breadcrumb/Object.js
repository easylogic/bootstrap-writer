define([
    'jade!./tpl/Object',
    '../ToyObject.js',
    './Settings.js',
    'jade!./tpl/wrap'
],function(tpl,  ToyObject, Settings, wrapTpl){
    return ToyObject.extend({
        className: 'logic-comp logic-comp-breadcrumb',
        type : 'breadcrumb',        

        getSettings: function() { 
            return new Settings({parent : this});   
        },        
        
        getDefaultValue: function() { 
            return { 
            	list : []
            };   
        },              
        
        getTpl : function(data) { 
            return tpl(data);
        }
    })
})
