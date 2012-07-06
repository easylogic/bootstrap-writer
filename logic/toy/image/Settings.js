define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        
        getAttributeData : function(value, elem) { 
            return {
                link       : elem.find('.link').val()
            };
        },        
        
        getPreview: function(obj) { 
          
            obj.viewText = "<div class='thumbnail'><img src='"+ this.htmlEntities(obj.text) + "'></div><div class='caption'><p>" + markdown.toHTML(obj.title) + "</p></div>";
            
            return obj;
        },
        
        getTpl : function(data) { 
            return tpl(data);
        }  
    })
})
