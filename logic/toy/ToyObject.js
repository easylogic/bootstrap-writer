define([
    'jade!./tpl/object',
	'./ToyMenu.js',
	'./ToyModel.js'
],function(tpl, Menu, Model){
    return Backbone.View.extend({
        
        events: { 
            'dblclick .viewText'          : 'selectEdit'
        },
        
        appendBeforeObject: function(comp) {
           if (!this.isRoot() && this.parent.isContainer) {
                this.parent.beforeComp(this, comp);
            }            
        },
        
        appendAfterObject: function(comp) {
            if (!this.isRoot() && this.parent.isContainer) {
                this.parent.afterComp(this, comp);
            }
        },                
        
        
        getModel: function() { 
        	var model = new Model({ type : this.type });
        	model.view = this;
        	
        	return model; 
        },
        
        isRoot: function() { return false; },
        
        initialize: function(opt) {
            this.preload();
            this.base(opt);
        },
        
        preload: function() { 
            
        },
        
        base : function(opt) {
            opt = opt || {} ;
            
            var self = this; 

            this.model = this.getModel();
            this.model.view = this;
            
            this.settings = this.getSettings();
            
            if (App.main.mode != 'view') {
                this.menu = new Menu({ parent : this });
            }   
                        
            this.$el.hide();
            if (opt.isRoot) { this.model.set('isRoot', opt.isRoot); }            
            if (opt.parent) { this.parent = opt.parent; }            
                                                    
            if (opt._id) { 
                this.load(opt._id, function() { 
                    if (opt.success) opt.success.call(self);
                });    
            } else { 
                if (!this.isRoot() && opt.span) this.model.set('span', opt.span);
                this.save({
                    success: function() { 
                        if (opt.success) opt.success.call(self);    
                    }
                });            
            }            
        },      

        load: function(_id, callback) {
            var self = this;  
            this.model.id = _id;
            this.model.fetch({
                success: function() {
                    self.render();
                    callback();
                }
            });  
        },        
        
        toJSON : function() { 
            return this.model.toJSON();  
        },
    	
        setModel: function(obj) { 
          this.model.set(obj);  
          this.save();            
        },
        
        save: function(opt) { 
            this.model.save(opt);
        },        
        
        
        
        remove : function() { 
            if (this.parent) { 
                this.parent.removeComp(this.cid);    
            }
        },
        
        resetSpan: function(span) {
            // if span exists
            this.$el.removeClass(function(index, css){
                var matches = css.match(/span\d+/g) || [];
                return matches.join(' ');   
            });               
            
            if (span > 0) {
                this.$el.addClass('span' + span);     
            }
               
        },
        
        resetOffset: function(offset) {
            // if span exists
            this.$el.removeClass(function(index, css){
                var matches = css.match(/offset\d+/g) || [];
                return matches.join(' ');   
            });               
            
            if (offset > 0) {
                this.$el.addClass('offset' + offset);     
            }
        },        
        
        show: function(isSettings) { 
            this.$el.fadeIn('fast');

            if (isSettings) {
                this.settings.open();
            }
        },
        
        hide: function() { 
            this.$el.fadeOut('fast');  
        },
        
		getMaxSpan: function() {
		    return 12; 
		},
				
		getSpanList: function(max) { 
            var span_list = [];
            for(var i = 1; i <= max ; i++) { 
            	span_list.push(i);	
            }
            
            return span_list;					
		},
        
        showMenu: function(isView) {
            if (isView) { 
                this.getMenuPoint().show();    
            } else { 
                this.getMenuPoint().hide();
            }
        },
        
        appendLeft: function(comp, isCreate) {
            if (this.parent && this.parent.isContainer) 
                this.parent.beforeComp(this, comp, isCreate); 
        },
        appendRight: function(comp, isCreate) {
            if (this.parent && this.parent.isContainer)            
                this.parent.afterComp(this, comp, isCreate); 
        },
        
        getPoint: function(type) {  return this.$('.logic-comp-' + type + '[data-cid='+ this.cid + ']'); },
        getViewPoint: function() {  return this.getPoint('viewpoint'); },         
        getChildPoint: function() {  return this.getPoint('childpoint'); },         
        getIconPoint: function() {  return this.getPoint('iconpoint'); },         
        getMenuPoint: function() {  return this.getPoint('menu'); },         
        
        getTplData: function() { 
            var data =  _.extend(this.getDefaultValue(), this.toJSON(), {
                cid : this.cid,
                isRoot: this.isRoot()             
            });
            
            if (!data.viewText) {
                data.viewText = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" 
            }
            
            return data; 
        },
        
				
        getTransformCss: function(style) { 
            var temp = [];
            _.each(style, function(value, key){
                if (key.indexOf('transform-') > -1) { 
                    var name = key.replace("transform-", "");
                    
                    if (value != "")
                        temp.push("" + name + "(" + value + ")");
                }
            })
            
            value = temp.join(" ");

            var css = {};
            _.each(["", "-ms-", "-webkit-", "-o-", "-moz-"], function(prefix){
                css[prefix + "transform"] = value;
            })

            return css;
        },        
        
        setStyle: function(data) { 
            var obj = this.getViewPoint();

            //obj.css(data.style);
            
            this.resetSpan(data.span);          
            this.resetOffset(data.offset);          
            
            //obj.css(this.getTransformCss(data.style));
        },
        
        createMenu: function() { 
            // 메뉴 생성 
            if (App.main.mode != 'view') { 
                this.getMenuPoint().html(this.menu.render().el);
                this.menu.delegateEvents();                         
            }           
        },
        
        setPartEdit : function() { 
          $('.logic-comp').removeClass('part-edit');
          var offset = this.$el.offset();
          this.$el.after(this.$el.clone().addClass('clone'));         
          this.$el.addClass('part-edit');
          
          // 화면 중앙으로 정렬 ?
          this.$el.css({top: offset.top + 'px' , left: (offset.left - 30) + 'px'});
          
          var self = this; 
          $('.part-edit-drop').click(function(e){
              self.backPartEdit();
          }).show();
          
          this.menu.hideDeleteButton();
          
          App.setSelectToy(this);
        },
        
        backPartEdit: function() {
          this.$el.removeClass('part-edit');
          $('.clone').remove();
          this.$el.css({top:'',left:'',margin:''}); 
          $('.part-edit-drop').hide();
          this.menu.showDeleteButton();
          
          App.initSelectToy();
        }, 
          
        /**
         * 컴포넌트별에 객체추가 방식 
         * 
         * @param {Object} type Toy 타입
         * @param {Object} span 넓이
         * @param {Object} align parent 안에서의 위치, left, right
         */
        addObjectAt: function(type, span, align) {
              var Comp = null;
              var self = this;
              span = span || 12;
              align = align || 'left';
              
              App.require(type, function(Comp) {
                    var value = _.extend({span : span, parent: self.parent });
                    var obj = { } ;
                    
                    obj =  new Comp(value);
                    obj.render();

                    // 위치 선정
                    if (align == 'left') {
                        self.appendLeft(obj, true);
                    } else if (align == 'right'){
                        self.appendRight(obj, true);                        
                    }
                    
                    obj.show(true);
                    
                    setTimeout(function() { self.parent.save(); }, 1000);    
              });
        },          
        
        /**
         * set Content Area Droppable Zone 
         *  
         */
        setContentDropZone: function() {
            var self = this;
            var config = {
                over: function() { 
                    self.$el.addClass('dropzone_box');
                },
                
                out : function() { 
                    self.$el.removeClass('dropzone_box');
                },                
                drop: function(event, ui) {
                    
                    var comp = ui.draggable.data('comp');
                    
                    if (comp) {
                        if (comp.cid == self.cid) {
														self.$el.removeClass('dropzone_box');												
                            return;     
                        }                         
                        
                        if (self.isContainer)
                            self.insertComp(comp);    
                        else
                            self.appendRight(comp);    
                    } else { 
                        
                        var type = ui.draggable.data('type');
                        
                        if (self.isContainer) {
                            self.addObject(type, 12);
                        } else { 
                            self.addObjectAt(type, 12, 'right');
                        }
                    }
                     
                    self.$el.removeClass('dropzone_box');
                }
            }
            
            // content drop zone
            
            /*
            if (!self.isContainer) 
                this.getViewPoint().droppable(config); */
                     
            this.getMenuPoint().find('.target-middle').droppable(config);        
            
        },
        
        setMenuDropZone: function() {
             
            var self = this;             
            // menu drop zone        
            
            if (this.isRoot()) return; 
            
            this.getMenuPoint().find('.target-left').droppable({
                over: function() { 
                    self.$el.addClass('dropzone_box_layout');
                },
                
                out : function() { 
                    self.$el.removeClass('dropzone_box_layout');
                },
                drop: function(event, ui) {
                    
                    var comp = ui.draggable.data('comp');
                     
                    if (comp) {
                        if (comp.cid == self.cid) {
														self.$el.removeClass('dropzone_box_layout');   
                            return;     
                        }                         

                        if (self.isContainer) 
                            self.appendBeforeObject(comp);    
                        else
                            self.appendLeft(comp);    
                    } else { 
                        var type = ui.draggable.data('type');
                        self.addObjectAt(type, 12);
                    }
                     
                    self.$el.removeClass('dropzone_box_layout');                                        
                }
            });             
        },
        
        setDropEvent: function() { 

            if (App.main.mode == 'view') return;

                 
            this.setMenuDropZone();

            
            this.setContentDropZone();

        },
        
        setDragEvent: function() { 

            if (App.main.mode == 'view') return;
             
            var self = this;
            
            this.$el.hover(
                function(e){
                    if (!App.main.dragging) { 
                        $('.select_box').removeClass('select_box');
                        self.$el.addClass('select_box');      
                    }
                    return false;
                },
                function(e){
                    if (!App.main.dragging) { 
                        self.$el.removeClass('select_box');
                    }
                    return false;                     
                }
            );
            
            
            if (!this.isRoot()) { 
                this.menu.$('.target-left a.btn').draggable({ 
                    helper: 'clone', 
                    drag : function(){
                       $(this).data('comp', self);
                    }
                });                
							
            }            
            
            this.menu.$('.target-left a.btn').click(_.bind(this.selectEdit, this));                      
           
        },
        
        selectEdit: function() {
            
            if (App.mode != 'view') this.settings.open(); 
            return false;   
        },
        
        update : function() { 
            this.render();
        },

        /**
         * just override
         *  
         */        
        getTpl : function(data) { return ""; },         
        getSettings: function() { return {}; },        
         
        /**
         * enabled override
         *  
         */ 
        renderViewPoint: function(data) {  this.getPoint('viewpoint').html(this.getTpl(data)); },
        renderChildPoint: function(data) {  },
        getDefaultValue: function() { return {}; },        
        onRender: function(data) { }, 
        isContainer: false,         
        isCustomRender: false,         
        
        render: function() {
            
            // load data 
            var data = this.getTplData();
            
            // apply tpl html
            this.$el.html(tpl(data));
            
            // render view Point 
            this.renderViewPoint(data);

            this.delegateEvents();
            
            // set style   
            this.setStyle(data);
            
            // create menu 
            this.createMenu();
            
            this.setDragEvent();
            
            this.setDropEvent();

            
            // after render  
            this.onRender(data);            
            
            this.renderChildPoint(data);
            
            return this;    
        }
    })
})
