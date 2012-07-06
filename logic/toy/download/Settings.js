define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        
        getPreview: function(obj) { 
          
            obj.viewText = "<a href='"+ this.htmlEntities(obj.text) + "' ><i class='icon-file'></i> " +  this.htmlEntities(obj.title) + "</a>";
            
            return obj;
        },
        
        getTpl : function(data) { 
            console.log(data);
            return tpl(data);
        }  
    })
})
