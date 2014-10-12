

    generateData = function(n, floor){
        var data = [],
            p = (Math.random() *  11) + 1,
            i;
            
        floor = (!floor && floor !== 0)? 20 : floor;
        
        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    };
    
    generateDataNegative = function(n, floor){
        var data = [],
            p = (Math.random() *  11) + 1,
            i;
            
        floor = (!floor && floor !== 0)? 20 : floor;
            
        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(((Math.random() - 0.5) * 100), floor),
                data2: Math.floor(((Math.random() - 0.5) * 100), floor),
                data3: Math.floor(((Math.random() - 0.5) * 100), floor),
                data4: Math.floor(((Math.random() - 0.5) * 100), floor),
                data5: Math.floor(((Math.random() - 0.5) * 100), floor),
                data6: Math.floor(((Math.random() - 0.5) * 100), floor),
                data7: Math.floor(((Math.random() - 0.5) * 100), floor),
                data8: Math.floor(((Math.random() - 0.5) * 100), floor),
                data9: Math.floor(((Math.random() - 0.5) * 100), floor)
            });
        }
        return data;
    };

    store1 = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
        data: generateData()
    });
    storeNegatives = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
        data: generateDataNegative()
    });
    store3 = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
        data: generateData()
    });
    store4 = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
        data: generateData()
    });
    store5 = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
        data: generateData()
    });    
    
    loadTask = new Ext.util.DelayedTask();



    var chart = Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            animate: true,
            store: store1,
            legend: {
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                title: 'Number of Hits',
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 1
                    }
                },
                minimum: 0,
                adjustMinimumByMajorUnit: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year',
                grid: true,
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
            }],
            series: [{
                type: 'area',
                highlight: false,
                axis: 'left',
                xField: 'name',
                yField: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                style: {
                    opacity: 0.93
                }
            }]
    });
    
    //var win = Ext.create('Ext.window.Window', {
	var chart_pan = Ext.create('Ext.panel.Panel', {
        width: 400,
        height: 550,
        //minHeight: 400,
        //minWidth: 550,
        hidden: false,
        shadow: false,
        maximizable: true,
        title: 'Area Chart',
        autoShow: true,
        layout: 'fit',
        tbar: [{
            text: 'Save Chart',
            handler: function() {
                Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
                    if(choice == 'yes'){
                        chart.save({
                            type: 'image/png'
                        });
                    }
                });
            }
        }, {
            text: 'Reload Data',
            handler: function() {
                // Add a short delay to prevent fast sequential clicks
                window.loadTask.delay(100, function() {
                    store1.loadData(generateData());
                });
            }
        }, {
            enableToggle: true,
            pressed: true,
            text: 'Animate',
            toggleHandler: function(btn, pressed) {
                chart.animate = pressed ? { easing: 'ease', duration: 500 } : false;
            }
        }],
        items: chart
    }); 
	
	
	
	
	/*******************************************************************************************************************************************/
	
var jsonData = [
    {
        date: '1/1/2009',
        IE: 44.8,
        Firefox: 45.5,
        Chrome: 3.9,
        Safari: 3,
        Opera: 2.3,
        Other: 0.5
    },
    {
        date: '2/1/2009',
        IE: 43.6,
        Firefox: 46.4,
        Chrome: 4,
        Safari: 3,
        Opera: 2.2,
        Other: 0.8
    },
    {
        date: '3/1/2009',
        IE: 43.3,
        Firefox: 46.5,
        Chrome: 4.2,
        Safari: 3.1,
        Opera: 2.3,
        Other: 0.6
    },
    {
        date: '4/1/2009',
        IE: 42.1,
        Firefox: 47.1,
        Chrome: 4.9,
        Safari: 3,
        Opera: 2.2,
        Other: 0.7
    },
    {
        date: '5/1/2009',
        IE: 41,
        Firefox: 47.7,
        Chrome: 5.5,
        Safari: 3,
        Opera: 2.2,
        Other: 0.6
    },
    {
        date: '6/1/2009',
        IE: 40.7,
        Firefox: 47.3,
        Chrome: 6,
        Safari: 3.1,
        Opera: 2.1,
        Other: 0.8
    },
    {
        date: '7/1/2009',
        IE: 39.4,
        Firefox: 47.9,
        Chrome: 6.5,
        Safari: 3.3,
        Opera: 2.1,
        Other: 0.8
    },
    {
        date: '8/1/2009',
        IE: 39.3,
        Firefox: 47.4,
        Chrome: 7,
        Safari: 3.3,
        Opera: 2.1,
        Other: 0.9
    },
    {
        date: '9/1/2009',
        IE: 39.6,
        Firefox: 46.6,
        Chrome: 7.1,
        Safari: 3.6,
        Opera: 2.2,
        Other: 0.9
    },
    {
        date: '10/1/2009',
        IE: 37.5,
        Firefox: 47.5,
        Chrome: 8,
        Safari: 3.8,
        Opera: 2.3,
        Other: 0.9
    },
    {
        date: '11/1/2009',
        IE: 37.7,
        Firefox: 47,
        Chrome: 8.5,
        Safari: 3.8,
        Opera: 2.3,
        Other: 0.7
    },
    {
        date: '12/1/2009',
        IE: 37.2,
        Firefox: 46.4,
        Chrome: 9.8,
        Safari: 3.6,
        Opera: 2.3,
        Other: 0.7
    },
    {
        date: '1/1/2010',
        IE: 36.2,
        Firefox: 46.3,
        Chrome: 10.8,
        Safari: 3.7,
        Opera: 2.2,
        Other: 0.8
    },
    {
        date: '2/1/2010',
        IE: 35.3,
        Firefox: 46.5,
        Chrome: 11.6,
        Safari: 3.8,
        Opera: 2.1,
        Other: 0.7
    },
    {
        date: '3/1/2010',
        IE: 34.9,
        Firefox: 46.2,
        Chrome: 12.3,
        Safari: 3.7,
        Opera: 2.2,
        Other: 0.7
    },
    {
        date: '4/1/2010',
        IE: 33.4,
        Firefox: 46.4,
        Chrome: 13.6,
        Safari: 3.7,
        Opera: 2.2,
        Other: 0.7
    },
    {
        date: '5/1/2010',
        IE: 32.2,
        Firefox: 46.9,
        Chrome: 14.5,
        Safari: 3.5,
        Opera: 2.2,
        Other: 0.7
    },
    {
        date: '6/1/2010',
        IE: 31,
        Firefox: 46.6,
        Chrome: 15.9,
        Safari: 3.6,
        Opera: 2.1,
        Other: 0.8
    },
    {
        date: '7/1/2010',
        IE: 30.4,
        Firefox: 46.4,
        Chrome: 16.7,
        Safari: 3.4,
        Opera: 2.3,
        Other: 0.8
    },
    {
        date: '8/1/2010',
        IE: 30.7,
        Firefox: 45.8,
        Chrome: 17,
        Safari: 3.5,
        Opera: 2.3,
        Other: 0.7
    },
    {
        date: '9/1/2010',
        IE: 31.1,
        Firefox: 45.1,
        Chrome: 17.3,
        Safari: 3.7,
        Opera: 2.2,
        Other: 0.6
    },
    {
        date: '10/1/2010',
        IE: 29.7,
        Firefox: 44.1,
        Chrome: 19.2,
        Safari: 3.9,
        Opera: 2.2,
        Other: 0.9
    },
    {
        date: '11/1/2010',
        IE: 28.6,
        Firefox: 44,
        Chrome: 20.5,
        Safari: 4.0,
        Opera: 2.3,
        Other: 0.6
    },
    {
        date: '12/1/2010',
        IE: 27.5,
        Firefox: 43.5,
        Chrome: 22.4,
        Safari: 3.8,
        Opera: 2.2,
        Other: 0.6
    }
];


    var fields = ['date', 'IE', 'Chrome', 'Firefox', 'Safari', 'Opera', 'Other'];

    var browserStore = Ext.create('Ext.data.JsonStore', {
        fields: fields,
        data: jsonData
    });

    var colors = ['rgb(47, 162, 223)',
                  'rgb(60, 133, 46)',
                  'rgb(234, 102, 17)',
                  'rgb(154, 176, 213)',
                  'rgb(186, 10, 25)',
                  'rgb(40, 40, 40)'];

    Ext.chart.theme.Browser = Ext.extend(Ext.chart.theme.Base, {
        constructor: function(config) {
            Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
                colors: colors
            }, config));
        }
    });

    var chart_dos = Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            animate: true,
            theme: 'Browser:gradients',
            defaultInsets: 30,
            store: browserStore,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: fields.slice(1),
                title: 'Usage %',
                grid: true,
                decimals: 0,
                minimum: 0,
                maximum: 100
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['date'],
                title: 'Month of the Year',
                label: {
                    renderer: function(v) {
                        return v.match(/([0-9]*)\/[0-9]*\/[0-9][0-9]([0-9]*)/).slice(1).join('/');
                    }
                }
            }],
            series: [{
                type: 'area',
                axis: 'left',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 170,
                  height: 28,
                  renderer: function(storeItem, item) {
                      var d = Ext.Date.format(new Date(storeItem.get('date')), 'M y'),
                          percent = storeItem.get(item.storeField) + '%';
                          
                      this.setTitle(item.storeField + ' - ' + d + ' - ' + percent);
                  }
                },
                xField: 'name',
                yField: fields.slice(1),
                style: {
                    lineWidth: 1,
                    stroke: '#666',
                    opacity: 0.86
                }
            }]
        });
 

    var chart_pan2 = Ext.create('Ext.panel.Panel', {
        width: 400,
        height: 550,
        //minHeight: 400,
        //minWidth: 550,
        hidden: false,
        shadow: false,
        maximizable: false,
        title: 'What is the trend in Browser Usage?',
        renderTo: Ext.getBody(),
        layout: 'fit',
        tbar: [{
            text: 'Save Chart',
            handler: function() {
                Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
                    if(choice == 'yes'){
                        chart_dos.save({
                            type: 'image/png'
                        });
                    }
                });
            }
        }],
        items: chart_dos
    });
	
	
	