define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
         
        getPreview: function(obj) { 
          
            var jadeTpl = require("jade").get().compile(obj.text); 
            obj.viewText = jadeTpl();   

            return obj;
        },
        
        getTpl : function(data) { 
            return tpl(data);
        }  
    })
})
