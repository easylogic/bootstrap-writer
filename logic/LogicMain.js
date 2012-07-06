define([
    'jade!./tpl/LogicMain', 
    './LogicToolbar.js',
    './LogicMenuBox.js',
    './LogicContents.js'
], function(tpl, LogicToolbar, LogicMenuBox, LogicContents) { 
    return Backbone.View.extend({
        initialize: function(opt) { 

            this.mode = App.mode;
            
            this.toolbar    = new LogicToolbar({ _id : opt._id});
            this.menubox    = new LogicMenuBox();
            this.contents   = new LogicContents({ _id : opt._id});
            
            if (opt._id) this._id = opt._id;
        },
        
        setTitle: function(title) { 
            
            var h1 = $('<h1 />').append(title).append('&nbsp;');
            
            this.$(".logic-view .titlebar").html(h1);
        },
        
        render: function() {
            
            this.$el.html(tpl())
            
            if (this.mode != 'view') { 
                this.$(".toolbar").append(this.toolbar.render().el);    
                this.$(".menubox").append(this.menubox.render().el);    
            }
            
            this.$(".logic-view .contents").append(this.contents.render().el);
             
            return this;    
        }
    })    
});
