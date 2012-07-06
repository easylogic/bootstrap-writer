define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        kindList: [ 'left', 'right'],
        styleTitleList: {

        },

        getPreview: function(obj) { 
          
            obj.viewText = '&nbsp;'; 

            return obj;
        },
        
        getTpl : function(data) { 
            return tpl(data);
        }  
    })
})
