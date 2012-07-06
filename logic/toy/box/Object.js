define([
    'jade!./tpl/Object',
    '../ToyContainer.js',
    './Settings.js'
],function(tpl,  ToyContainer, Settings){
    return ToyContainer.extend({
        className: 'logic-comp logic-comp-box',
        desc: '박스',
        type : 'box',        
        icon: 'icon-fullscreen',   
        mode : 'view',
        
        getDefaultValue: function() { 
            return { rowType : 'default' };   
        },           
        
        getSettings: function() { 
            return new Settings({parent : this});   
        },        
        
        isRoot: function() { 
            return this.model.get('isRoot');            
        },

        getTpl : function(data) { 
            return tpl(data);
        },
        
        setStyle: function(data) {
            // span 설정  
            if (!this.isRoot() && data.span) {
                this.resetSpan(data.span);
            }            
        }, 
        
        onRender: function(data) { 
            if (this.isRoot()) { 
                App.main.setTitle(data.title);    
            }
        }
    })
})
