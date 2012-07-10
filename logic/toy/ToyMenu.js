define([
	'jade!./tpl/menu'
],function(tpl){
    return Backbone.View.extend({

        isPartEdit : false,

        events: { 
            'dblclick'   : 'partEdit',
            'click span.remove-btn': 'remove'
        },
        
        partEdit: function() { 
          
          if (this.isRoot && this.isRoot()) { 
            return; 
          }
            
          if (this.isPartEdit) { 
            this.isPartEdit = false; 
            this.parent.backPartEdit();    
          } else { 
            this.isPartEdit = true; 
            this.parent.setPartEdit();              
          }
        },
        
        openSettings : function(e) {
            this.settings.open();
        },
                
        remove: function(e) { 
            if (confirm("정말 삭제하시겠습니까?")) { 
              this.parent.remove();
              $(this.parent.el).remove();
              delete this.parent;                
            }
        },                

        
        show : function() { 
            this.$el.show();  
        },
        
        hide : function () { 
            this.$el.hide();  
        },
        
        hideDeleteButton: function() { 
           this.$('.target-right').hide(); 
        },
        
        showDeleteButton: function() { 
           this.$('.target-right').show(); 
        },        
        
        getSettings: function(obj) { 
        	return obj; 
        },
        
        initialize : function (opt) { 
            if (opt.parent) this.parent = opt.parent;   
        },        
        
        render: function() {
            var data = this.parent.toJSON();            
            
            this.$el.html(tpl(data));
						
            return this; 
        }                
   })
})
