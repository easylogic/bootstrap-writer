define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        kindList: [ 'default', 'info', 'success', 'warning', 'danger'],
        
        getAttributeData : function(value, elem) { 
            return {
                kind        : elem.find(".kind option:selected").val(),
                percent     : elem.find(".percent").val(),
            };
        },        
        
        getPreview: function(obj) { 
          
            var temp = "<div class='bar' style='width: " + parseInt(obj.percent) + "%'></div>";
            
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
