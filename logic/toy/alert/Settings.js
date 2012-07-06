define([
    'jade!./tpl/Settings',
    'jade!./tpl/View',
    '../ToySettings.js'
],function(tpl, View ToySettings){
    return ToySettings.extend({
        
        kindList: [ 'default', 'info', 'success', 'error', 'info'],
        
        getAttributeData : function(value, elem) { 
            return {
                kind        : elem.find(".kind option:selected").val()
            };
        },        
        
        getPreview: function(obj) { 
          	
            obj.viewText = "<strong>" + this.htmlEntities(obj.title) + "</strong> " + markdown.toHTML(obj.text);
            
            return obj;
        },
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                kindList: this.kindList
            })
        },
        
        getTpl : function(data) { 
            return tpl(data);
        }  
    })
})
