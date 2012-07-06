define([ 
    './ToySettings.js'
],function(ToySettings){
    return ToySettings.extend({

        
        getList: function() {
            var list = [] 
            this.$('.data_list').find('.alert').each(function(i, obj){
                list.push($(obj).data('obj'));
            })
            
            return list;
        },
        
        getListTpl: function(obj) { 
            var content = "<div>";
            content += "<span data-name='title'>" + obj.title+ "</span>" ;
            content += "</div>";
            
            return content; 
        },
        
        addList: function(obj) { 
            var self = this; 
            var content = this.getListTpl(obj);
            var div = $('<div />').addClass('alert alert-success').data('obj', obj).html(content).css({
               'margin-bottom': '2px',
               'cursor' : 'pointer'
            }).click(function(e){
                var obj = $(this).data('obj');
                
                self.setDataList(obj);
                self.$('.data_target').data('target', this);
            });
            
            div.prepend("<button class='close'>&times;</button>")
            
            div.find('.close').click(function(e){
                div.remove();
            })
            this.$('.data_list').append(div);              
        },
        
        getDataObject: function(obj) { 
            return { title : obj.title, text : obj.text};
        },
        
        modifyDataObject: function(obj) { 
            var $dom = $(obj.target);
            $dom.find('[data-name=title]').html(obj.title);
        },
        
        modifyTab: function(obj) { 
            var $dom = $(obj.target);
            $dom.data('obj', this.getDataObject(obj));
            
            this.modifyDataObject(obj);
        },        
        
        getDataList: function() {
            var list = {}; 
            this.$('.data[data-name]').each(function(i, obj){
                var $dom = $(obj);
                
                list[$dom.data('name')] = $dom.val();
            })
            
            return list;
        },
        
        setDataList: function(obj) { 
            
            if (obj.empty) { 
                this.$('.data[data-name]').val('');
                return; 
            }
            
            for(var i in obj) { 
                if (typeof obj[i] == 'function') continue;
                
                this.$('.data[data-name=' + i  +']').val(obj[i]);
            }   
            
        },
        
        onRender: function(data) {
            var self = this;  
            
            for(var i in data.list) { 
                var obj = data.list[i];
                
                if (typeof obj == 'function') continue;
                
                this.addList(obj);      
            }
            
            this.$('.add_data').click(function(){
                var obj =  self.getDataList()
                
                self.addList(obj);
                
                self.setDataList({ empty : true})                  
            })
            
            this.$('.modify_data').click(function(){
                var obj =  self.getDataList()
                
                obj.target = self.$('.data_target').data('target');
                
                self.modifyTab(obj);
            })            
            
            this.$('.data_list').sortable();
        }        
      
    })
})
