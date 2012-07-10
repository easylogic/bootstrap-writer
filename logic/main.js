define([
    './LogicMain.js'
], function(LogicMain){
    return { 
        initialize: function(_id) {
             if (!window.console) { 
                 window.console = { 
                    log: function(str) { 
                        
                    }  
                 };                  
             } 

             window.App = _.extend(window.App, {
                 main: { 
                   contents: { 
                     rootBox: { 
                        model: { 
                            id : 'root',
                            get: function() { 
                                return false;     
                            }   
                        }    
                     }    
                   }  
                 },
                 
                 collection: {},
                 
							 menubox : {
								'box' :  { 
									name : 'Scaffolding', 
									view:  '',
									list: [ 'box' ] 
								},
								'text' : { 
									name: 'Text/Markup',
									view : 'btn-danger',
									list: [ 'html', 'jade', 'markdown', 'text']
								},
								'basecss' : { 
									name : 'Base CSS',
									view : 'btn-success',
									list : [ 'code', 'table']
								},								
								'component' : { 
									name : 'Component',
									view : 'btn-warning',
									list : [ 'alert', 'blockqoute', 'breadcrumb', 'download', 'hero-unit', 'image', 'label', 'page-header', 'progress', 'space', 'toolbar']
								},
								'list' : {
								  name : 'Plugins',
									view : 'btn-info',									
									list : [ 'collapse', 'carousel', 'tab']
								}
							 },
								 
    		       list: {
    		            'box' 			: { type : 'box',            name: 'Box', 			icon: 'icon-inbox', view: '' },
    		            'text' 			: { type : 'text',           name: 'Text',			icon: 'icon-text-width', view: 'btn-danger' }, 
    		            'html' 			: { type : 'html',           name: 'Html',			icon: 'icon-edit', view: 'btn-danger'  }, 
    		            'jade' 			: { type : 'jade',           name: 'Jade',			icon: 'icon-refresh', view: 'btn-danger'  }, 
    		            'markdown' 	    : { type : 'markdown',           name: 'MarkDown',  icon: 'icon-list-alt', view: 'btn-danger'  },
                    'code'          : { type : 'code',           name: 'Code',          icon: 'icon-qrcode', view: 'btn-success' },
    		            'table' 		: { type : 'table',          name: 'Table',			icon: 'icon-th', view: 'list', view: 'btn-success' },
    		            'breadcrumb' 		: { type : 'breadcrumb',          name: 'Breadcrumbs',			icon: 'icon-forward', view: 'btn-warning'   }, 
    		            'hero-unit' 		: { type : 'hero-unit',          name: 'Hero Unit',			icon: 'icon-comment', view: 'btn-warning'   }, 
    		            'toolbar' 		: { type : 'toolbar',          name: 'Button Groups',			icon: 'icon-download-alt', view: 'btn-warning'   }, 
    		            'alert' 		: { type : 'alert',          name: 'Alert',			icon: 'icon-info-sign', view: 'btn-warning'   }, 
    		            'label' 		: { type : 'label',          name: 'Label',			icon: 'icon-tag', view: 'btn-warning' }, 
    		            'page-header'   : { type : 'page-header',      name: 'Page Header',			icon: 'icon-folder-open', view: 'btn-warning' }, 
    		            'blockqoute' 	     : { type : 'blockqoute',          name: 'Blockqoute',			icon: 'icon-share', view: 'btn-warning' },
    		            'space' 	     : { type : 'space',          name: 'Space',		icon: 'icon-resize-horizontal', view: 'btn-warning' },
    		            
                    'image'       : { type : 'image',          name: 'Image',          icon: 'icon-picture', view: 'btn-warning' },    		            
    		            'download' 	  : { type : 'download',       name: 'Download',		    icon: 'icon-download', view: 'btn-warning' },
    		            'progress' 	  : { type : 'progress',       name: 'ProgressBar',			icon: 'icon-minus', view: 'component', view: 'btn-warning' },
    		            'collapse'   	: { type : 'collapse',      name: 'Collapse',		    icon: 'icon-tasks', view: 'list', view: 'btn-info'  },
    		            'carousel' 		: { type : 'carousel',          name: 'Carousel',		icon: 'icon-play-circle', view: 'list', view: 'btn-info' },
    		            'tab' 			: { type : 'tab',            name: 'Tab',				icon: 'icon-th-list', view: 'list', view: 'btn-info' }
    		        },                         
                 
                 toy : null,
                 
                 getId: function() {
                    return App.main.contents.rootBox.model.id;    
                 },
                 
                 getToy: function(id) { 
                   if (App.collection){
                    return App.collection[id];    
                   }
                    
                   return false; 
                 },
                 
                 setToy: function(id, toy) { 
                   if (!App.collection){
                        App.collection[id] = toy; 
                   }
                 },      

                 showMenuBox: function() { 
                     App.main.menubox.show();
                 },
                 
                 hideMenuBox: function() { 
                     App.main.menubox.hide();
                 },
                
                 setSelectToy: function(toy) { 
                   App.toy = toy;
                   App.hideMenuBox();  
                 },
                 
                 initSelectToy: function() { 
                   App.toy = null;
                   App.showMenuBox();  
                 },
                    
                 require: function(type, callback) {
                      require(["logic/toy/"+type+"/Object.js"], function(obj) {
                        if (obj) { 
                          callback(obj);    
                        }
                        
                      });      
                 }
             });
                         
            var main = new LogicMain({ _id : _id });
            App.main = main;
            $('.logic-main').html(main.render().el);
        }        
    };
})
