define([
    'jade!./tpl/Settings',
    'jade!./tpl/View',
    '../ToyListSettings.js'
],function(tpl, View, ToyListSettings){
    return ToyListSettings.extend({

        getAttributeData : function(value, elem) {
            return {
                list        : this.getList(),
                tabType     : this.$('.tabType').val()
            };
        },        
        
        getPreview: function(obj) { 
          
            var data = _.extend({}, obj);
            
            data.title = this.htmlEntities(obj.title);
            data.text = markdown.toHTML(obj.text);
          
            obj.viewText = View(data);
            
            return obj;
        },
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                tabList: ['tab', 'pill'],
                dataList: [
                    { type : 'text',        name : 'title', title: '제목'}, 
                    { type : 'textarea',    name : 'text',  title: '내용'} 
                ]
            })
        },           
        
        getTpl : function(data) { 
            return tpl(data);
        }
    })
})
