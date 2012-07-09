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
          
            data.title = this.htmlEntities(obj.title);
						data.text = markdown.toHTML(obj.text);
						
						var toolbar = [];
						var index = 0;
						
						for(var i in data.list) { 
							if (typeof data.list[i] == 'function') continue;
							
							if (!toolbar[index]) { 
								toolbar[index] = [];
							}
							toolbar[index].push(data.list[i]);
							
							if (data.list[i].last) { 
								index++;
							}
						}
						
						data.toolbar = toolbar;
            
            obj.viewText = View(data);
            
            return obj;
        },
        
        getTpl : function(data) { 
            return tpl(data);
        },
        
        getListTpl: function(obj) { 
            var content = "<div>";
            content += "<span data-name='title'>" + obj.title+ "</span>" ;
            content += "</div>";
            
            return content; 
        },        
				
				addLine: function(obj) { 
					return $('<div />').addClass('alert alert-' + (!obj.last ? 'success' : 'info')).data('obj', obj);
				},			
        
        getDataObject: function(obj) { 
            return { title : obj.title, link : obj.link, type: obj.type, last: obj.last};
        },      
        
        modifyDataObject: function(obj) { 
            var $dom = $(obj.target);
            $dom.find('[data-name=title]').html(obj.title);
        },          
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                dataList: [
										{ type : 'select',  name : 'type', title: 'Button Type', select: [ 'primary', 'danger', 'warning', 'success', 'info', 'inverse' ] }, 
										{ type : 'select',  name : 'last', title: 'Last', select: [ 'last' ] }, 
                    { type : 'text',    name : 'title', title: 'Title'}, 
                    { type : 'text',    name : 'link',  title: 'Link'} 
                ]
            })
        }        

    })
})
