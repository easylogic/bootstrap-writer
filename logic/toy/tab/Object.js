define([
    'jade!./tpl/Object',
    '../ToyObject.js',
    './Settings.js',
    'jade!./tpl/wrap'
],function(tpl,  ToyObject, Settings, wrapTpl){
    return ToyObject.extend({
        className: 'logic-comp logic-comp-tab',
        desc: '탭',
        type : 'tab',        
        icon: 'icon-th-list',   
        mode : 'view',
        
        getSettings: function() { 
            return new Settings({parent : this});   
        },        
        
        getDefaultValue: function() { 
            return { 
            	list : [],
            	tabType: 'tab'
            };   
        },              
        
        getTpl : function(data) { 
            return tpl(data);
        },
        
        onRender: function(data) {
            var self = this; 
            this.$('[data-toggle=tab],[data-toggle=pill]').on('show', function(e){
                var index = $(this).data('index')
                
                console.log(index);
                
                self.$('.tab-pane').removeClass('active');
                self.$('.tab-pane[data-index=' + index + ']').addClass('active');
            })
        }

    })
})
