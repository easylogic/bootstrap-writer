define([
    'jade!./tpl/Settings',
    'jade!./tpl/View',
    '../ToyListSettings.js'
],function(tpl, View, ToyListSettings){
    return ToyListSettings.extend({

        getAttributeData : function(value, elem) {
            return {
                list        : this.getList(),
                delay		: this.$('.delay').val(),
                button		: this.$('.button').attr('checked')
                
            };
        },        
        
        getPreview: function(obj) { 
          
            var data = _.extend({}, obj);
          
            data.title = this.htmlEntities(obj.title);
            data.text = markdown.toHTML(obj.text);
            
            obj.viewText = View(data);
            
            return obj;
        },
        
        getTpl : function(data) { 
            return tpl(data);
        },
        
        getListTpl: function(obj) { 
            var content = "<div>";
            if (obj.image) { 
                content += "<img data-name='image' src='" +obj.image+  "' width=50 height=50 /> &nbsp;" ;                
            }
            content += "<span data-name='title'>" + obj.title+ "</span>" ;
            content += "</div>";
            
            return content; 
        },        
        
        getDataObject: function(obj) { 
            return { title : obj.title, text : obj.text, image : obj.image };
        },      
        
        modifyDataObject: function(obj) { 
            var $dom = $(obj.target);
            $dom.find('[data-name=title]').html(obj.title);
            $dom.find('[data-name=image]').attr(src, obj.image);
        },          
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                dataList: [
                    { type : 'image',       name : 'image', title: 'Image'}, 
                    { type : 'text',        name : 'title', title: 'Title'}, 
                    { type : 'textarea',    name : 'text',  title: 'Content'} 
                ]
            })
        }        

    })
})
