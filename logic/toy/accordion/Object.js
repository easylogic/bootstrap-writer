define([
    'jade!./tpl/Object',
    '../ToyObject.js',    
    './Settings.js',
    'jade!./tpl/wrap'
],function(tpl, ToyObject, Settings, wrapTpl){
    return ToyObject.extend({
        className: 'logic-comp logic-comp-accordion',
        mode : 'view',
        type : 'accordion',
        desc: '아코디언',
        icon: 'icon-tasks',          
        
        getSettings: function() { 
        	return new Settings({parent : this});	
        },
        
        getDefaultValue: function() { 
            return { list : [] };   
        },              
        
		getTpl : function(data) { 
		    return tpl(data);
		},
		
		onRender: function(data) { 

          var obj = this.$('.accordion');
          
          obj.find('a.accordion-toggle[data-toggle=collapse]').click(function(e){
              var index = $(this).data('index');

              obj.find('.collapse.in').collapse('hide')
              obj.find('.collapse[data-index=' + index + ']').collapse('toggle')
          })
		}

    })
})
