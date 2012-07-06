define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({

        rowTypeList : [
            'default',
            'fluid'
        ],

        getAttributeData : function(value, elem) { 
            var data = {
                rowType     : elem.find('.rowType option:selected').val()
            };
            
            if (this.isRoot()) { 
                data.text =  elem.find('.text').val();   
            }
            
            return data; 
        },
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                span : this.parent.model.get('span'),
                isRoot : this.isRoot(),
                toyList: this.toyList,
                rowTypeList: this.rowTypeList               
            })
        },
        
        getTpl : function(data) { 
            return tpl(data);
        }           
    })
})
