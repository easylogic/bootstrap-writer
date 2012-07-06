define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        
        getPreview: function(obj) { 
          
            obj.viewText = markdown.toHTML(obj.text);

            return obj;
        },
        
        getTpl : function(data) { 
            return tpl(data);
        }  
    })
})
