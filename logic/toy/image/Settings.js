define([
    'jade!./tpl/Settings',
		'jade!./tpl/View',
    '../ToyListSettings.js'
],function(tpl, View, ToyListSettings){
    return ToyListSettings.extend({
        
        getAttributeData : function(value, elem) { 
            return {
                image       : elem.find('.image').val(),
                link       : elem.find('.link').val(),
								list			 : this.getList()
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
        } ,
				
       
        getListTpl: function(obj) { 
            var content = "<div>";
            content += "<span data-name='title'>" + obj.title+ "</span>" ;
            content += "</div>";
            
            return content; 
        },        
        
        getDataObject: function(obj) { 
            return { title : obj.title, link : obj.link, type: obj.type};
        },      
        
        modifyDataObject: function(obj) { 
            var $dom = $(obj.target);
            $dom.find('[data-name=title]').html(obj.title);
        },          
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                dataList: [
										{ type : 'select',  name : 'type', title: 'Button Type', select: [ 'primary', 'danger', 'warning', 'success', 'info', 'inverse' ] }, 
                    { type : 'text',    name : 'title', title: 'Title'}, 
                    { type : 'text',    name : 'link',  title: 'Link'} 
                ]
            })
        }   				
    })
})
