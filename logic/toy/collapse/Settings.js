define([
    'jade!./tpl/Settings',
    'jade!./tpl/View',
    '../ToyListSettings.js'
],function(tpl, View, ToyListSettings){
    return ToyListSettings.extend({
        
        getAttributeData : function(value, elem) {
            return {
                list        : this.getList()
            };
        },        
        
        getPreview: function(obj) { 
          
          	var data = _.extend({}, obj);
          
            data.title = markdown.toHTML(data.title);
            data.text = markdown.toHTML(data.text);
            
            obj.viewText = View(data);
            
            return obj;
        },
        
        getTpl : function(data) { 
            return tpl(data);
        },
        
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                dataList: [
                    { type : 'text',        name : 'title', title: 'Title'}, 
                    { type : 'textarea',    name : 'text',  title: 'Content'} 
                ]
            })
        }
    })
})
