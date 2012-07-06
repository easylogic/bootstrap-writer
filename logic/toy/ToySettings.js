define([ 
	'jade!./tpl/settings'
],function(tpl){
    return Backbone.View.extend({
        className : 'modal hide fade in',
        styleList: {
            "class" : "",
            "height" : "",
            "width" : "",
            "position": "",
            "left" : "",
            "right" : "",
            "top" : "",
            "bottom" : "",
            "color": "",   
            "font-weight": "",
            "font-style": "",
            "font-size" : "",
            "font-family" : "",
            "line-height" : "",
            "text-shadow" : "",
            "text-align" : "",
            'text-decoration' : '',
            'text-transform' : '',
            'text-indent' : '',
            "background-color": '',
            "background-image": "",
            "background-repeat": "",
            "background-attachment": "",
            "background-position": "",
            "background-clip": "",
            "background-origin": "",
            "background-size": "",
            "border-color" : "",
            "border-width" : "",
            "border-style" : "",
            "border-radius" : "",
            "border-image" : "",
            "box-shadow" : "",
            "margin": "",
            "padding": "",
            "transform-translate" : "",
            "transform-rotate" : "",
            "transform-scale" : "",
            "transform-skew" : "",
            "transform-matrix" : "",
            "transform-translate3d" : "",
            "transform-rotate3d" : "",
            "transform-scale3d" : "",
            "transform-matrix3d" : ""            
        },      
 
        
        styleValueList: { 
            'position' : ['static', 'relative', 'absolute', 'fixed'],
            'color' : 'color',
            'font-style': ['normal', 'italic', 'oblique'],
            'text-align': ['left', "right", 'justify', 'center'],
            'text-decoration': ['none', 'overline', 'line-through', "underline", "blink"],
            'text-transform': ['none', 'capitalize', 'uppercase', 'lowercase'],
            'background-color' : 'color',
            'border-color' : 'color',
            'border-style' : ['none','hidden','dotted','dashed','solid','double','dot-dash','dot-dot-dash','wave','groove','ridge','inset','outset'],
            "transform" : "function"  
        },
        
        stylePrefixList: {
            "transform": ["", "-ms-", "-webkit-", "-o-", "-moz-"]  
        },
        
        events: {
          'change input[type=text][data-style],select[data-style]' : 'changePreview',
          'change textarea.customarea' : 'changePreviewCustom',
          'click a.remove': 'remove',
          'click a.save': 'update'
        },     
        
        isRoot: function() { 
            return this.parent.isRoot();  
        },    
        
        update : function(e) { 
            var value = this.getPreview(this.getData(this.$el));
            
            this.parent.setModel(value);
            this.parent.update();
                                    
            this.$el.modal('hide');
        },
        
        preview: function(e) { 
            
        },
        
        remove: function(e) { 
            if (confirm("정말 삭제하시겠습니까?")) { 
              this.$el.modal('hide');             
              this.parent.remove();
              this.parent.$el.remove();
              delete this.parent;                
            }
        },
        
        initialize: function(opt) { 
            if (opt.parent) this.parent = opt.parent;
        },
        
        getWindowWidth: function() { 
          return {
              width: '850px',
              left: '42%'
          };
        },        
        
        onShow: function() { },
        
        open : function() {
            var self = this;
            
            this.render();
                        
            $('body').append(this.$el);
            this.$el
                .on('show', function(){
                    var width = self.getWindowWidth();
                    if (width) { 
                        $(this).css(width);    
                    }
                    
                    self.onShow();
                })
                .on('hidden', function(){
                    self.$el.remove();
                })
                .modal({
                    backdrop: false
                });
        },
        getPreview: function(obj) { 
            return obj;
        },        
        
        getStyleData : function(style, elem) { 
            // 스타일 확장
            var value = {} ; 
            _.each(style, function(obj, key) {  
                value[key] = elem.find("input[data-style=" + key + "],select[data-style=" + key + "]").val(); 
            })
            
            return value;
        },
        
        getAttributeData : function(value, elem) { 
            return { };
        },
        
        getDefaultAttributeData : function(value, elem) { 
            return { 
                title       : elem.find('.title').val(),
                text        : elem.find('.text').val(), 
                span        : elem.find('.spanarea option:selected').val(),
                offset      : elem.find('.offsetarea option:selected').val()
            };
        },        
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                kindList: this.kindList
            })
        },        
        
        getData : function (elem) {
            var value = this.parent.model.toJSON();
            
            // 속성 확장 
            value = _.extend(value, this.getDefaultAttributeData(value, elem), this.getAttributeData(value, elem));
                        
            // 스타일 확장 
            //value.style = _.extend(this.styleList, value.style, this.getStyleData(value.style, elem));
      
            return value; 
        },
        
        getTplConfig: function() {
            var defaultValue = this.parent.getDefaultValue() 
            var data = this.parent.toJSON() 
            var config = _.extend(defaultValue, data, {
                max_span : this.parent.getMaxSpan(),                
                style : _.extend(this.styleList, this.getTransformCssFromStyle(data.style), data.style),
                styleTitleList: this.styleTitleList,
                styleValueList: this.styleValueList
            });
            
            config.span_list = this.parent.getSpanList(config.max_span);
            
            return this.getLocalConfig(config);
        },
        
        getTransformCssFromStyle: function(style) { 
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
        
        getTransformCss: function() { 
            
            var style = {};
            this.$('input[type=text][data-style|="transform"],select[data-style|="transform"]').each(function(index, elem){
                style[$(elem).data('style')] = $(elem).val();
            })

            return this.getTransformCssFromStyle(style);
                        
        },
        
        getCssCustom: function() { 
            var style = {};
            this.$('input[type=text][data-style],select[data-style]').each(function(index, elem){
                style[$(elem).data('style')] = $(elem).val();
            })

            try { 
                return JSON.stringify(style, null, 4);    
            } catch(e) { 
                alert(e.message);
            }
            
        },
        
        changePreview: function(e) {
            
            var key = $(e.currentTarget || e).data('style');
            var value = $(e.currentTarget || e).val();
            
            if (key.indexOf("transform") > -1) { 
                this.$('.preview_body').css(this.getTransformCss());
            } else { 
                this.$('.preview_body').css(key, value);    
            }
        },
        
        changePreviewCustom: function(e) { 
            var obj = JSON.parse($(e.currentTarget).val());

            this.$('input[type=text][data-style],select[data-style]').each(function(index, elem){
                $(elem).val(obj[$(elem).data('style')]);
            })

            this.$('.preview_body').css(obj);

        },        
        
        onRender: function(data) { 
            
        },
        
        htmlEntities : function (str) {
            return String(str).replace(/&/g, '&amp;')
                              .replace(/</g, '&lt;')
                              .replace(/>/g, '&gt;')
                              .replace(/"/g, '&quot;')
                              ;                 
        }, 
        
        render: function() {
            var data = this.getTplConfig();
            
            this.$el.html(this.getTpl(data));
            
            //this.$el.find('.modal-body').html(this.getTpl(data));
            this.delegateEvents();
            
            this.onRender(data);
            
            return this;     
        }        
      
    })
})
