define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        
        getAttributeData : function(value, elem) {
            var text = this.$('.text').getCode();
            
            console.log(text);
             
            return {
                text       : text
            };
        },        
                
        onShow: function() { 
            this.$('.text').redactor({
                lang: 'ko',
                css : 'bootstrap.css',
                autoresize: true,
                focus: true,
                buttons: ['html', '|', 'formatting', '|', 'bold', 'italic', 'deleted', '|', 'unorderedlist', 'orderedlist', 'outdent', 'indent', '|',
                    'image', 'video', 'file', 'link', '|',
                    'fontcolor', 'backcolor', '|', 'alignleft', 'aligncenter', 'alignright', 'justify', '|',
                    'horizontalrule', 'fullscreen']                
            });
            
            this.$('.text').setFocus();            
        },
        
        getPreview: function(obj) { 
          
            obj.viewText = obj.text;

            return obj;
        },
        
        getTpl : function(data) { 
            return tpl(data);
        },
        
        onRender: function(data) { 

        }
    })
})
