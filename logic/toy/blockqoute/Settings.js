define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        kindList: [ 'left', 'right'],
        
        getAttributeData : function(value, elem) { 
            return {
                kind        : elem.find("select.kind option:selected").val()
            };
        },        
        
        getPreview: function(obj) { 
          
            var temp = markdown.toHTML(obj.text);
            
            if (obj.title) { 
               temp += "<small>"+this.htmlEntities(obj.title) +"</small>"; 
            }

            obj.viewText = temp; 

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
