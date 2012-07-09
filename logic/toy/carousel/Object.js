define([
    'jade!./tpl/Object',
    '../ToyObject.js',
    './Settings.js',
    'jade!./tpl/wrap'
],function(tpl,  ToyObject, Settings, wrapTpl){
    return ToyObject.extend({
        className: 'logic-comp logic-comp-carousel',
        type : 'carousel',        

        getSettings: function() { 
            return new Settings({parent : this});   
        },        
        
        getDefaultValue: function() { 
            return { 
            	list : [],
            	delay : 5,
            	button : false 
            };   
        },              
        
        getTpl : function(data) { 
            return tpl(data);
        },
        
        onRender: function(data) { 
        
            var obj = this.$('.carousel');
        
            obj.find('.carousel-control.left').click(function(e){  obj.carousel('prev'); });
            obj.find('.carousel-control.right').click(function(e){  obj.carousel('next'); });
            
            obj.carousel({
                interval : data.delay * 1000
            });    
            
        }

    })
})
