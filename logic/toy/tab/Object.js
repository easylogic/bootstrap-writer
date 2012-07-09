define([
    'jade!./tpl/Object',
    '../ToyObject.js',
    './Settings.js',
    'jade!./tpl/wrap'
],function(tpl,  ToyObject, Settings, wrapTpl){
    return ToyObject.extend({
        className: 'logic-comp logic-comp-tab',

        type : 'tab',        
        
        getSettings: function() { 
            return new Settings({parent : this});   
        },        
        
        getDefaultValue: function() { 
            return { 
            	list : [],
            	tabType: 'tab',
							directionType : 'default'
            };   
        },              
        
        getTpl : function(data) { 
            return tpl(data);
        },
        
        onRender: function(data) {
            var self = this; 
            this.$('[data-toggle=tab],[data-toggle=pill]').on('show', function(e){
                var index = $(this).data('index')
                
                self.$('.tab-pane').removeClass('active');
                self.$('.tab-pane[data-index=' + index + ']').addClass('active');
            })
        }

    })
})
