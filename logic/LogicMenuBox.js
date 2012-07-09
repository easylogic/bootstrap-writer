define([
    'jade!./tpl/LogicMenuBox'
], function(tpl) { 
    return Backbone.View.extend({

        
        themes: [
            { type : 'default',     name : 'Bootstrap' },
            { type : 'amelia',      name : 'amelia' },
            { type : 'cerulean',    name : 'cerulean' },
            { type : 'cyborg',      name : 'cyborg' },
            { type : 'journal',     name : 'journal' },
            { type : 'readable',    name : 'readable' },
            { type : 'simplex',     name : 'simplex' },
            { type : 'slate',       name : 'slate' },
            { type : 'spacelab',    name : 'spacelab' },
            { type : 'spruce',      name : 'spruce' },
            { type : 'superhero',   name : 'superhero' },
            { type : 'united',      name : 'united' }
        ],
        
        events: {  
            'click a.theme': 'select_themes'     
        },
        
        select_themes: function(e) { 
            var theme = $(e.currentTarget).data('type');
            App.setThemes(theme);
        },
        
        show: function() { this.$el.show(); } ,
        hide : function() { this.$el.hide(); }, 
        
        render : function() { 
            this.$el.append(tpl({
                toyList: this.toyList,
                themes: this.themes
            }))
            
            //this.$el.css('position', 'fixed');
            this.$('[data-name=toy]').draggable({
                helper: 'clone',
                revert: true,
                containment: 'window'
            }).click(function(e){
                App.main.contents.rootBox.addObject($(this).data('type'), 12);
            });
            
            return this;    
        }
    });
})
