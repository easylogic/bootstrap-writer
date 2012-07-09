define([
    'jade!./tpl/Object',
    '../ToyObject.js',
    './Settings.js'
],function(tpl,  ToyObject, Settings, wrapTpl){
    return ToyObject.extend({
        className: 'logic-comp logic-comp-toolbar',
        type : 'toolbar',        

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
