define([
    'jade!./tpl/LogicToolbar'
], function(tpl) { 
    return Backbone.View.extend({
        className: 'logic-toolbar btn-toolbar',
        
        events: { 
          'click a.btn.logic-comp-save': 'saveAll',
          'click .btn.logic-comp-view': 'selectMode',
          'click .btn.logic-copy': 'copy'
        },
        
        htmlEntities : function (str) {
            return String(str).replace(/&/g, '&amp;')
                              .replace(/</g, '&lt;')
                              .replace(/>/g, '&gt;')
                              .replace(/"/g, '&quot;')
                              ;                 
        },         
        
        setTextIndent: function($dom) { 
            var inden = "\t";  
        },
        
        copy : function(e) { 

            var obj = $('.logic-contents').clone();
            
            obj.find('.logic-comp-menu,.logic-comp-iconpoint,.logic-comp-childpoint:empty,logic-comp-viewpoint:empty').remove();
            
            var temp = $('<div />');
            temp.append(obj);
            
            var prev = $('<pre />');
			var popup = $('<div class="alert" />');
			
			popup.append('<a class="close" data-dismiss="alert" href="#">&times;</a>');
            
            var text = style_html(temp.html(), { 
              'indent_size': 2,
              'indent_char': ' ',
              'max_char': 78,
              'brace_style': 'expand',
              'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u']
            });

            prev.text(text).appendTo(popup);
            
            popup.appendTo('body').css({
                top: 100,
                left: '30%',
                position: 'absolute',
                width: 700,
                overflow: 'auto'
            }).show();
        },
        
        selectMode: function(e) { 
            if ( $(e.currentTarget).hasClass('active') ) {
                $(e.currentTarget).text('Edit');
                $('.logic-comp-header,.logic-comp-menu,.logic-comp-footer').show();
            } else {
                $(e.currentTarget).text('View'); 
                $('.logic-comp-header,.logic-comp-menu,.logic-comp-footer').hide();
            }
        },
        
        saveAll: function(e) { 
            var data = App.main.contents.toData();
            
            console.log(data);
        },
        
        render : function() { 
						this.$el.append(tpl())
            return this;    
        }
    });
})
