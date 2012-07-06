define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        
        getPreview: function(obj) { 
          
            obj.viewText = "<div class='page-header'><h1>" + this.htmlEntities(obj.title) + "&nbsp;<small>" + this.htmlEntities(obj.text) + "</small></h1></div>";
            
            return obj;
        },

        
        getTpl : function(data) { 
            return tpl(data);
        }  
    })
})
