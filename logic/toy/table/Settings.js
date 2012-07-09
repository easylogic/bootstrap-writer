define([
    'jade!./tpl/Settings',
    '../ToySettings.js'
],function(tpl, ToySettings){
    return ToySettings.extend({
        
        kindList: [ 'default', 'info', 'success', 'error', 'info'],
        
        getAttributeData : function(value, elem) { 
            return {
                list        : this.getList(),
                table       : elem.find(".table").attr('checked'),
                striped     : elem.find(".striped").attr('checked'),
                bordered    : elem.find(".bordered").attr('checked'),
                condensed   : elem.find(".condensed").attr('checked')
            };
        },        
        
        getPreview: function(obj) { 

            var div = $("<div />");
            var table  = $('<table />');
            
            div.html(table); 
          
            for(var i in obj.list) { 
                var row = obj.list[i];
                var rowEl = $('<tr />');
                
                for(var j in row) { 
                    var col = row[j];
                    var colEl = (i == 0 ) ? $("<th />") : $('<td />');
                    
                    colEl.html($(markdown.toHTML(col)).html());
                    
                    rowEl.append(colEl);    
                }
                
                table.append(rowEl);    
            }
            
            if (obj.table) table.addClass('table');
            if (obj.striped) table.addClass('table-striped');
            if (obj.bordered) table.addClass('table-bordered');
            if (obj.condensed) table.addClass('table-condensed');
          
            obj.viewText = div.html();
            
            return obj;
        },
        
        getLocalConfig : function(config) { 
            return _.extend(config, {
                kindList: this.kindList
            })
        },
        
        getTpl : function(data) { 
            return tpl(data);
        }, 
        
        getList: function() { 
          var rows = this.$('.list-row').length;
          var list = this.$('.list-row td input[type=text].data').map(function(i, e){
              return e.value 
          }).get();
          var cols = list.length / rows;
          
          var data = [];
          
          for (var i in list) { 
            if (typeof list[i] == 'function') continue;
              
            var r = parseInt(i / cols);
            var c = i % cols;
            var value = list[i];
            
            if (!data[r]) { 
                data[r] = [];
            }
            
            data[r][c] = value;       
          }
          
          return data; 
        },
        
        addRow: function() { 
            var self = this;             
            var last = this.$('.list-row:last')[0];
            
            if (last) { 
                var obj = $(last).clone();
                obj.find('input[type=text]').val('');
                obj.find('.move a.btn').click(function(e){
                    obj.remove();
                })

                
                this.$('.list').append(obj);    
            } else { 
                this.initRow();
            }
        },
        
        removeColumn : function(index) {
            var idx = index;             
            this.$('.list-row').each(function(i, obj){
              var selector = 'td:nth-child(' + (idx + 1) + ') input[type=text]';
              
              $(obj).find(selector).parent().remove();
            }) 
            
            this.$('.column td:nth-child('+ (idx+1) + ')').remove();
            
            this.$('.column td a.btn:not(.ui-state-disabled)').each(function(i, e){
                 var index = i + 1;
                 $(e).data('index', index);
                 $(e).attr('data-index', index);
            })            
        },
        
        addColumnButton: function() { 
            
            var self = this ;
            var count = this.$('.column td').length || 0;
            var column = $("<td><a class='btn span1' style='cursor: pointer;' data-index='" +count+ "'>x</a></td>");
            
            column.find('.btn').click(function(e){
                var index = $(this).data('index');
                self.removeColumn(index);
            })
            
            this.$('.column').append(column);  
        },
        
        addColumn : function() { 
            var self = this;
            
            var last = this.$('.list-row:last')[0];
            
            if (last) { 
                this.$('.list-row').each(function(i, e){
                    $(e).append(self.getTextField());
                })
                    
                this.addColumnButton();              
                                  
            } else { 
                this.initRow();    
            }

        },
        
        initRow: function() { 
            var obj = $('<tr class="list-row" />');
            obj.append(this.getMoveField())
            
            obj.find('.move a.btn').click(function(e){
                obj.remove();
            })            
            
            obj.append(this.getTextField())
            this.$('.list').append(obj);    
                
            this.addColumnButton();            
        },
        
        initRowData: function() { 
            this.$('.list-row input[type=text]').val('');  
        },

        getMoveField: function() { 
            return "<td class='row move'><a class='btn span1'>&times;</a></td>";  
        },
        
        getTextField: function(value) { 
            value = value || '';
            return "<td><input type='text' class='span1 data' style='margin:0px; margin-right: 2px; width: 54px;' value='" + value + "' /></td>";  
        },
        
        loadData: function(list) { 
            
            list = list || [];
            
            if (list.length == 0) return; 
            
            
            var arr = list[0];
            
            for (var i = 0; i < arr.length; i++)
                this.addColumn() 
            
            for (var j = 0; j < list.length - 1; j++) { 
                this.addRow();    
            }            
            
            var rows = this.$('.list-row');
            for(var index  in list) { 
                $(rows[index]).find('input[type=text]').each(function(col, e){
                    $(e).val(list[index][col]);
                })         
            }
            
            

        },
        
        setList: function(list) {
            _.each(list, function(row, i){
                var rowEl = this.$('.list-row:nth-child(' + (i + 1) + ')');
                
                rowEl.find('td input[type=text]').each(function(index, e) { 
                    $(e).val(row[index]);    
                })
            }) 

        },
        
        changeData : function(arr, indexArr) { 
            var temp = [];
            
            _.each(indexArr, function(i) { 
                temp.push(arr[i-1]);    
            })
            
            return temp;  
        },
        
        onRender: function(data) { 
            var self = this; 
            this.$('.list').sortable().disableSelection();
            this.$('.column').sortable({
                items: "td:not(.ui-state-disabled)",
                cancel: ".ui-state-disabled",
                update: function(event, ui) { 
                    var list = self.getList();
                    
                    var temp = self.$('.column td a.btn:not(.ui-state-disabled)').map(function(i, e){
                        var index = $(e).data('index');
                        $(e).data('index', i + 1);
                        
                        return index;
                    }).get();
                    
                    _.each(list, function(obj, i) {
                        list[i] = self.changeData(list[i], temp);
                    })
                    
                    self.setList(list);
                }
            }).disableSelection();
            
            this.$('.init_row').click(function(e){ 
                if (confirm('데이타를 비우겠습니까?')) { 
                    self.initRowData();    
                }
            });
            this.$('.add_row').click(function(e){ self.addRow();  });
            this.$('.add_column').click(function(e){ self.addColumn();  });
            
            this.loadData(data.list);
        }
    })
})
