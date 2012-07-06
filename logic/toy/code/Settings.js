define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        syntaxList : [ 
            'text', 'html', 'css', 'javascript', 'cpp', 'java', 'c', 'ruby', 'python', 
            'clj', 'css', 'go', 'hs', 'lisp', 'lua', 'ml', 
            'n', 'proto', 'scala', 'sql', 'tex', 'vb', 'vhdl', 
            'wiki', 'xq', 'yaml'
        ],

        getAttributeData : function(value, elem) { 
            return {
                syntax      : elem.find(".syntax option:selected").val()
            };
        },        
        
        getPreview: function(obj) { 
          
            obj.viewText = prettyPrintOne(this.htmlEntities(obj.text), obj.syntax, 1);

            return obj;
        },
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                syntaxList: this.syntaxList 
            })
        },        
        
        getTpl : function(data) { 
            return tpl(data);
        }  
    })
})
