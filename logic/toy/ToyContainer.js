define([
    './ToyObject.js'
],function(ToyObject){
    return ToyObject.extend({
        isContainer: true,
        
        /**
         * 움직이는 toy 를  현재 toy 앞으로  
         * 
         * parent 랜더링 다시 
         *  
         */
        beforeComp: function(src, target, isCreate) {
            this.beforeRender(src, target, isCreate);
            this.beforeToy(src, target);
        },
        
        /**
         * 움직이는 toy 를  현재 toy 뒤로  
         * 
         * parent 랜더링 다시 
         *  
         */        
        afterComp: function(src, target, isCreate) {
            this.afterRender(src, target, isCreate);    
            this.afterToy(src, target);                
        },  
        
        /**
         * 움직이는 toy 를  child 맨 마지막 순서로   
         * 
         * parent 랜더링 다시 
         *  
         */
        insertComp: function(target) {
            this.insertRender(target);          
            this.insertToy(target);
        },
        
        removeComp: function(cid) {
            var temp = []; 
            for (var i in this.children) {
                var child = this.children[i];
                
                if (typeof child == 'function') continue;
                if (child.cid == cid) continue;
                 
                temp.push(child);
            }
            
            this.children = temp;
            this.save();
        },
        
        // add element after rendering
        firstComp: function(obj) { 
            this.firstToy(obj);
            this.firstRender(obj);                
        },
        
        // add element after rendering 
        lastComp: function(obj) { 
            this.lastToy(obj);
            this.lastRender(obj);    
        },        
        
        insertObject: function(comp) {
            this.insertComp(comp);
        },                           
        
        /**
         * children 랜더링 규칙 
         * 
         */

        /**
         * 움직이는 toy 앞으로 추가 될 때 
         *  
         */        
        beforeRender: function(src, target, isCreate) { 
            target.hide();
            if (isCreate) { 
                var wrap = this.wrap("");
                src.$el.parent().before(wrap.html(target.$el));
            } else { 
                src.$el.parent().before(target.$el.parent());    
            }                       
            
            target.show();
        },
        
        afterRender: function(src, target, isCreate) { 
            target.hide(); 
            if (isCreate) { 
                var wrap = this.wrap("");
                src.$el.parent().after(wrap.html(target.$el));
            } else { 
                src.$el.parent().after(target.$el.parent());    
            }           
            target.show();
        },        
        
        insertRender: function(target) { 
            target.hide();   
            var wrap = this.wrap("");         
            this.getChildPoint().append(wrap.html(target.$el));
            target.show();
        },        
        
        firstRender: function(obj) { 
            this.prependElement(obj.render().el);
        },

        lastRender: function(obj) { 
            this.appendElement(obj.render().el);
        },
        
        appendElement : function(elem) {
            this.getChildPoint().append(elem);  
        },
        
        prependElement : function(elem) { 
            this.getChildPoint().prepend(elem);  
        },        
        
        
        /**
         * children 저장 규칙 
         *  
         */        
        
        /**
         * 움직이는 toy 앞으로 저장 
         *  
         */
        beforeToy: function(src, target) { 
            target.remove();
            
            var temp = [];
            for(var i in this.children) { 
                var child = this.children[i];
                if (child.cid == src.cid) { temp.push(target); }
                temp.push(child);
            }
            
            this.children = temp; 
            
            this.save();
        },


        /**
         * 움직이는 toy 뒤로  저장 
         *  
         */
        afterToy: function(src, target) { 
            target.remove();
                        
            var temp = [];
            for(var i in this.children) { 
                var child = this.children[i]; 
                temp.push(child); 
                if (child.cid == src.cid) { temp.push(target); }
            }
            
            this.children = temp; 
            this.save();
        },        
        
        /**
         * 전체 toy 중 마지막으로 저장 
         *  
         */
        insertToy: function(target) { 
            target.remove();
                        
            this.children.push(target); 
            this.save();
        },      
        
        /**
         * 첫번째 toy 로 추가  
         */
        firstToy: function(obj) { 
            this.children.unshift(obj);
        },
        
        setToy: function(i, obj) { 
            this.children[i] = obj;
        },

        /**
         * 마지막 toy 로 추가  
         */                
        lastToy: function(obj) { 
            this.children.push(obj);
        },        
  
        /**
         * wrapper 생성 
         *  
         */
        addWrap: function(html) {
            html = html || ""; 
            var wrap_html = this.initWrap(html);
            this.appendElement(wrap_html);
            
            return wrap_html;
        },     
        
        initWrap: function(html) { 
            return $('<div />').html(html);            
        },             
        
        addObjectById: function(obj, isLoad, i) { 
           
            var self = this, opt = obj, isLoad = isLoad || false, i = i || 0;
            var wrap_html = this.addWrap();
            var index = i; 
            
            App.require(obj.type, function(Comp){
                var toy = new Comp({parent: self, _id : obj.id});
                wrap_html.html(toy.$el);
                
                self.children[index] = toy;
                toy.show(false);
            })
        },
        
        renderChildPoint: function(data) { 
       		for(var i in this.children) { 
       		  var child = this.children[i];
       		  
       		  if (typeof child == 'function') continue;
       		  
       		  var wrap_html = this.addWrap();
       		  wrap_html.html(child.render().el);
       	  } 	
        },        
        
        
        addObject: function(type, span, align) {
           
              var Comp = null;
              var self = this;
              align = align || 'last';
              
              App.require(type, function(Comp) {
                    var value = _.extend({span : span, parent: self});
                    var obj = { } ;
                    
                    obj =  new Comp(value);
                    
                    if (align == 'first') {
                        self.firstComp(obj);
                    } else if (align == 'last'){
                        self.lastComp(obj);
                    }
                    
                    obj.show(true);
                    
                    $("html,body").animate({scrollTop: obj.$el.offset().top+30});
                    
                    setTimeout(function() { self.save(); }, 1000);
                        
              });
        },        
      

        load: function(_id) {
            var self = this;  
            this.model.id = _id;
            this.model.fetch({
                success: function() {
                    self.render();
                    self.loadToies();
                }
            });  
        },        
        
        loadToies: function() {
            this.children = this.model.get('children');
            
            for(var i in this.children) { 
                var child = this.children[i];
                
                if (typeof child == 'function') continue;
                
                this.addObjectById(child, true, i);
            }             
        },
        
        getToies: function() {
            var temp = []; 
            if (this.children) { 
                for(var i in this.children) {
                    var child = this.children[i];
                    
                    if (typeof child == 'function') continue;
                     
                    temp.push({ type : child.type, id : child.model.id });
                }
            }  
            
            return temp;
        },        

        save: function() { 
            var obj = {};
            if (this.isContainer) { 
                obj = { children: this.getToies() };
            }
            this.model.save(obj);
        },   

        
        wrap : function(elem) { 
            return $('<div />').html(elem);
        },
        
        preload: function(opt) { 
            this.children = [];
        }
    })
})
