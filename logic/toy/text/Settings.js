define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        tagTypeList : [ 'div', 'p', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'section', 'header', 'footer'],

        getAttributeData : function(value, elem) { 
            return {
                tagType     : elem.find(".tagarea option:selected").val()
            };
        },        
        
        htmlEntities : function (str) {
            return String(str).replace(/&/g, '&amp;')
                              .replace(/</g, '&lt;')
                              .replace(/>/g, '&gt;')
                              .replace(/"/g, '&quot;')
                              .replace(/\n/g, "<br />\n");                 
        },           
        
        getPreview: function(obj) { 
          
            obj.viewText = this.htmlEntities(obj.text);

            return obj;
        },
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                markupTypeList : this.markupTypeList,
                styleTitleList: this.styleTitleList,
                tagTypeList: this.tagTypeList
            })
        },
        
        getTpl : function(data) { 
            return tpl(data);
        }  
    })
})
