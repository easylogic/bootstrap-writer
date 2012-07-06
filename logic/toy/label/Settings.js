define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({

        kindList: [ 'default', 'info', 'success', 'warning', 'important', 'inverse'],        
             
        getPreview: function(obj) { 
            
            var text = $(markdown.toHTML(obj.text));
            text.prepend("<span class='label label-" + this.htmlEntities(obj.kind) +"'>" + this.htmlEntities(obj.title) + "</span> " )
            
            var div = $('<div />');
            
            div.append(text);
            
            obj.viewText = div.html() ;
            
            return obj;
        },        
        
        getAttributeData : function(value, elem) { 
            return {
                kind        : elem.find(".kind option:selected").val()
            };
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
