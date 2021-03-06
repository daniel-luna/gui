Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'extjs/src/ux');
Ext.require([
	//grid
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Paging',
	//row editing grid
    //'Ext.grid.*',
    //'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*',
    //multiselect / item-selector
    'Ext.form.Panel',
    'Ext.ux.form.MultiSelect',
    'Ext.ux.form.ItemSelector',
    'Ext.tip.QuickTipManager',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);


var objGridAdv_list = {
	// propiedades privadas
	_idComp		: '',
	_idCurrentFilter : 0,
	// propiedades públicas
	colFiltres	:	[],
	// métodos
	get_currentFilter	: function() {
		return this._idCurrentFilter;
	},
	set_currentFilter	: function ( current ) {
		this._idCurrentFilter = current;
	},
	ajax_call	: function () {
		//params, okCallback, errCallback
		$.ajax({
			data			: params.url_params,
			dataType		: 'json', //(objConfig.localhost ? 'json' : 'jsonp'), 
			jsonpCallback	: 'callbackResp',
			url				: params.url,
			success : function ( callbackResp ) {
				okCallback(callbackResp);
			},
			error : function ( XMLHttpRequest, textStatus, errorThrown ) {
				errCallback(textStatus);
			}
		});
	},
	load		: function ( idComp, data, current ) {
		this._idComp = idComp;
		for ( var x = 0; x < data.length; x++) {
			this.colFiltres.push( data[x] );
		}
		this.set_currentFilter( x );
	},
	get_filter	: function ( idFiltre ) {
		for ( var x = 0; x < this.colFiltres.length; x++) {
			if ( this.colFiltres[x].id == idFiltre) {
				this.set_currentFilter(x);
				return this.colFiltres[x];
			}
		}
		return '';
	},
	update_filter	: function ( idFiltre, data ) {
		for ( var x = 0; x < this.colFiltres.length; x++) {
			if ( this.colFiltres[x].id == idFiltre) return this.colFiltres[x];
		}
		return '';
	},
	delete_filter	: function ( idFiltre ) {
		if ( this.colFiltres[x].length > 1 ) {
			var cont = -1;
			for ( var x = 0; x < this.colFiltres.length; x++) {
				if ( this.colFiltres[x].id == idFiltre) cont = x;
			}
			if ( cont >= 0 ) this.colFiltres.splice(cont, 1);
		}
	}
}
var filterList;


function _lang( key ) {

	return key + ' trad';
}

function create_grid(data) {
	var tabPanel = Ext.getCmp('GUITab');
	var tab = Ext.getCmp('tab_' + data.idComponente);
	
	if (tab == undefined) {
	
		if ( tabPanel.items.length > 1 ) tabPanel.remove(tabPanel.items.getAt(1));

		var guiGrid = Ext.create('comp.listGrid', {	gridId		: 'grid_' + data.idComponente,
												idComponente: data.idComponente,
												columnId	: data.columnaId,
												lang		: data.lang,
												campos		: data.Campos,
												filtros		: data.Columnas,
												prj_alias	: data.prj_alias,
												com_alias	: data.com_alias,
												col_langs	: data.col_langs
												});

        var tab = tabPanel.add({
			id			: 'tab_' + data.idComponente,
			closable	: true,
			title		: data.titulo,
			border		: false,
			layout		: 'fit',
			defaults	: {
				collapsible	:	false
			},
			items		: guiGrid
        });
	}
	tabPanel.setActiveTab(tab);

}

function create_grid_adv_form ( items_data, sel_items_data, sel_filter_data ) {

	/* Pestaña de campos */
	/************************************************************************************************************************/
	var disp = [];
	for (var i=0; i < items_data.length; i++) {
		//var dips_item = {'value': i, 'text': items_data[i].name};
		var dips_item = {'value': items_data[i].name, 'text': items_data[i].name};
		disp.push(dips_item);
	}
	
	var sel_disp = [];
	if ( sel_items_data != -1 ) {
		for (var i=0; i < sel_items_data.length; i++) {
			sel_disp.push(sel_items_data[i].name);
		}
	}
		
	Ext.define('itemsel_data', {
		extend: 'Ext.data.Model',
		fields: [
			/* {name: 'value', type: 'int'}, */
			{name: 'value', type: 'string'},
			{name: 'text',  type: 'string'}
		]
	});
 
	var ds = Ext.create('Ext.data.Store', {
		model: 'itemsel_data',
		data : disp 
		/* [{value: 1, text: 'Uno'},  {value: 2, text: 'Dos'}, {value: 3, text: 'Tres'}, {value: 4, text: 'Cuatro'}, {value: 5, text: 'Cinco'}, {value: 6, text: 'Seis'}] */
	 });
	
	var isForm = Ext.widget('form', {
		title: 'ItemSelector Test',
		//width: 700,
		bodyPadding: 10,
		//height: 300,
		layout: 'fit',
		items:[{
			xtype: 'itemselector',
			name: 'itemselector',
			id: 'itemselector-field',
			anchor: '100%',
			//fieldLabel: 'ItemSelector',
			imagePath: '../src/ux/images/',
			store: ds,
			displayField: 'text',
			valueField: 'value',
			value: sel_disp, //['3', '4', '6'],
			allowBlank: false,
			msgTarget: 'side',
			fromTitle: 'Available',
			toTitle: 'Selected'
		}]
	});

	/* FIN Pestaña de campos */
	/************************************************************************************************************************/

	/* Pestaña de filtros */
	/************************************************************************************************************************/

    var valueOperand = Ext.create('Ext.data.ArrayStore', {
		fields: ['value', 'name'],
		data :[['', ''],['AND', 'AND'],['OR', 'OR']]
    });

    var valueOpen = Ext.create('Ext.data.ArrayStore', {
		fields: ['value', 'name'],
        data :[['', ''],['(', '(']]
    });


	Ext.define('itemfilter_data', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'name', type: 'string'}
		]
	});

	var dfilters = Ext.create('Ext.data.Store', {
		model: 'itemfilter_data',
		data : items_data 
	 });

	var field_data = [];
	for ( var i=0; i < items_data.length; i++) {
		var d = [];
		
		d.push(items_data[i].name);
		d.push(items_data[i].name);
		field_data.push(d);
	}
    var valueFields = Ext.create('Ext.data.ArrayStore', {
		fields: ['name'],
        data :field_data
    });

    var valueCondition = Ext.create('Ext.data.ArrayStore', {
		fields: ['value', 'name'],
		data :[['', ''],['>', '>'],['>=', '>='],['=', '='],['<', '<'],['<=', '<='],['<>', '<>'],['LIKE', 'LIKE'],['IS NULL', 'IS NULL'],['IS NOT NULL', 'IS NOT NULL']]
	});

	var valueClose = Ext.create('Ext.data.ArrayStore', {
		fields: ['value', 'name'],
		data: [['', ''],[')', ')']]
    });

	Ext.define('filter_model', {
		extend: 'Ext.data.Model',
		fields: ['operand', 'op_par', 'field', 'condition', 'value', 'cl_par']
	});

	var the_data = {};
	if ( sel_filter_data != -1 ) the_data = sel_filter_data;

	var filter_grid_store = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'filter_model',
        proxy: {
            type: 'memory'
        },
        data: the_data,
    });

	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
		clicksToMoveEditor: 1,
		autoCancel: false
	});


    // create the grid and specify what field you want to use for the editor at each column.
    var filter_grid = Ext.create('Ext.grid.Panel', {
        store: filter_grid_store,
        columns: [{
			header: 'Operando',
            dataIndex: 'operand',
            id: 'operand',
            editor : {
	            xtype: 'combo',
	            editable: false, 
	            valueField: 'value',
	            displayField: 'name',
	            store: valueOperand,
	            mode: 'local',
	            triggerAction: 'all',
	            flex: 1,
				forceSelection:true,
				allowBlank:true,
			}
        }, {
            header: 'Par.',
            dataIndex: 'open_parentesis',
            id: 'open_parentesis',
            editor: {
            	xtype: 'combo',
	            valueField: 'name',
	            displayField: 'name',
	            store: valueOpen,
	            mode: 'local',
	            triggerAction: 'all',
	            flex: 1,
				forceSelection:true,
				allowBlank:true,
			}
        }, {
            header: 'Campo',
            dataIndex: 'field',
            id: 'field',
            editor: {
            	xtype: 'combo',
	            valueField: 'name',
	            displayField: 'name',
	            store: valueFields,
	            mode: 'local',
	            triggerAction: 'all',
	            flex: 1,
				forceSelection:true,
				allowBlank:true,
			}
        }, {
            header: 'Condición',
            dataIndex: 'condition',
            id: 'condition',
            editor: {
            	xtype: 'combo',
	            valueField: 'value',
	            displayField: 'name',
	            store: valueCondition,
	            mode: 'local',
	            triggerAction: 'all',
	            flex: 1,
				forceSelection:true,
				allowBlank:true,
			}
        }, {
            header: 'Valor',
            dataIndex: 'value',
            id: 'field_value',
            editor: {
            	xtype: 'textfield',
	            flex: 1,
				forceSelection:true,
				allowBlank:true,
			}
        }, {
            header: 'Par.',
            dataIndex: 'close_parentesis',
            id: 'close_parentesis',
            editor: {
            	xtype: 'combo',
	            valueField: 'value',
	            displayField: 'name',
	            store: valueClose,
	            mode: 'local',
	            triggerAction: 'all',
	            flex: 1,
				forceSelection:true,
				allowBlank:true,
			}
        }

        ],
        //renderTo: 'editor-grid',
        //width: 600,
        //height: 400,
        //title: 'Employee Salaries',
        frame: true,
        tbar: [{
            text: 'Add Employee',
            iconCls: 'employee-add',
            handler : function() {
                rowEditing.cancelEdit();

                // Create a model instance
                var r = Ext.create('filter_model', {
					operand: '',
					op_par: '',
					field: '',
					condition: '',
					value: '',
					cl_par: ''
				});

				filter_grid_store.insert(0, r);
				rowEditing.startEdit(0, 0);

            }
        }, {
            itemId: 'removeEmployee',
            text: 'Remove Employee',
            iconCls: 'employee-remove',
            handler: function() {
                var sm = filter_grid.getSelectionModel();
                rowEditing.cancelEdit();
                filter_grid_store.remove(sm.getSelection());
                if (filter_grid_store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                filter_grid.down('#removeEmployee').setDisabled(!records.length);
            }
        }
    });

	/* FIN Pestaña de filtros */
	/************************************************************************************************************************/

	var win_opt = {
		id:'winFrm_alias', height: 350, width: 600, modal : true, layout : 'fit',
		items : {
			xtype:"tabpanel",
			activeTab:0,
			items:[{
				layout:"fit",
				xtype:"panel",
				title:"Campos",
				items:[ isForm ]
			},{
				layout: "fit",
				xtype:"panel",
				title:"Fitros",
				items: [filter_grid]
			}]
		}
	};
	
	return win_opt;
}

function create_grid_adv(data) {
	var tabPanel = Ext.getCmp('GUITab');
	var tab = Ext.getCmp('tab_' + data[0].idComponente);
	
	if (tab == undefined) {
		var loading = true;
		var center_region;
		
		if ( tabPanel.items.length > 1 ) tabPanel.remove(tabPanel.items.getAt(1));

		filterList = Object.create(objGridAdv_list);
		filterList.load ( data[0].idComponente, data[0].all_data, 0 );

		var combo_data = [];
		for (var x =  0; x < data[0].all_data.length; x++) {
			combo_data.push({ 'id': data[0].all_data[x].id, 'desc': data[0].all_data[x].titulo_filtro});
		}
 		var filtros = Ext.create('Ext.data.Store', {
			fields	: ['id', 'desc'],
			data	: combo_data
		});

		var combo_filter = Ext.create('Ext.form.ComboBox', {
    		//fieldLabel: '--',
    		store		: filtros,
			queryMode	: 'local',
			displayField: 'desc',
			valueField	: 'id',
    		listeners	: {
                        	// public event change - when selection1 dropdown is changed
                        	change: function(field, newValue, oldValue) {

                        		d = filterList.get_filter(newValue);
                        		if ( !loading ) {

									 Ext.getCmp('grid_items').items.each(function(item){
										Ext.getCmp('grid_items').remove(item, true);
									});
								  	 

									 Ext.getCmp('grid_items').add(Ext.create('comp.listGridAdv', {	gridId : 'grid_' + d.idComponente,
									 				idReg		: d.id,
													idComponente: d.idComponente,
													columnId	: d.columnaId,
													lang		: d.lang,
													campos		: d.Campos,
													filtros		: d.Columnas,
													prj_alias	: d.prj_alias,
													com_alias	: d.com_alias,
													col_langs	: d.col_langs
													}) 
									);

									 Ext.getCmp('grid_items').doLayout(); 

								}
												
							}
			}
		});
		
		combo_filter.setValue( data[0].id );

		var guiFilter = Ext.create('Ext.Panel', {
							//layout: 'fit',
							items: [ combo_filter,
									{ 	xtype: 'box',
										autoEl: {cn: 'Añadir nuevo filtro'},
										listeners : {
											render: function(c){
												c.getEl().on('click', function(){

													var d_filter = -1;
													if ( d.sWhere != '' )  d_filter = Ext.JSON.decode(d.sWhere);

													Ext.create('Ext.window.Window', create_grid_adv_form(Ext.JSON.decode(data[0].CamposDisponibles), -1, d_filter )).show();
												}, c, {stopEvent: true});
											}
										}
									},
									{	xtype: 'box',
										autoEl: {cn: 'Editar filtro actual'},
										listeners : { 
											render: function(c){
												c.getEl().on('click', function(){
													var d = filterList.get_filter(combo_filter.getValue());
													
													var d_filter = -1;
													if ( d.sWhere != '' )  d_filter = Ext.JSON.decode(d.sWhere);

													Ext.create('Ext.window.Window', create_grid_adv_form(Ext.JSON.decode(data[0].CamposDisponibles), Ext.JSON.decode(d.Campos), d_filter )).show();
												}, c, {stopEvent: true});
											}
										}
									},
									{	xtype: 'box',
										autoEl: {cn: 'Borrar filtro actual'},
										listeners : {
											render: function(c){
												c.getEl().on('click', function(){
													alert("Editar filtro");
												}, c, {stopEvent: true});
											}
										}
									}
								   ]
						});


		var guiGrid = Ext.create('comp.listGridAdv', {	gridId		: 'grid_' + data[0].idComponente,
												idReg		: data[0].id,
												idComponente: data[0].idComponente,
												columnId	: data[0].columnaId,
												lang		: data[0].lang,
												campos		: data[0].Campos,
												filtros		: data[0].Columnas,
												prj_alias	: data[0].prj_alias,
												com_alias	: data[0].com_alias,
												col_langs	: data[0].col_langs
												});

		//center_region = { id: 'grid_items', xtype : 'panel', region:"center", items : guiGrid };
        var tab = tabPanel.add({
			id			: 'tab_' + data[0].idComponente,
			closable	: true,
			title		: data[0].titulo,
			border		: false,
			//layout		: 'auto', //'fit',
			layout		: "border",
			items		: [
							{ id: 'grid_items', xtype : 'panel', region:"center", items : guiGrid }, 
							{ region: "west", split : true, xtype : 'panel', width : 210, defaults : { bodyStyle: 'padding:10px' }, layoutConfig: { titleCollapse: false, animate: true }, items: guiFilter }
						  ],
			defaults	: {
				collapsible	:	false
			}
        });
        
        loading = false;
	}
	tabPanel.setActiveTab(tab);

}


function create_form(data, id_value) {


	var guiForm = Ext.create('comp.simpleForm', { 	formId		: 'grid_' + data.idComponente,
										idComponente: data.idComponente,
										columnaId	: data.columnaId,
										lang		: data.lang,
										prj_alias	: data.prj_alias,
										com_alias	: data.com_alias,
										col_langs	: data.col_langs,
										campos		: data.campos,
										comboList	: data.comboList,
										id_value	: id_value
									});
									
	Ext.create('Ext.window.Window', {
		id		: 'winFrm_' + data.com_alias,
		height	: 400,
		width	: 400,
		modal	: true,
		layout	: 'fit',
		items	: [guiForm]
	}).show();
	
	//height: 308,width: 552
}

function create_manual_form(data, id_value) {

	eval(data.formData);
	
	if (data.windowData != '' ) eval("var win_opt = {id:'winFrm_alias', layout : 'fit', modal: true, items : [guiForm], " + data.windowData + " };");
	else  eval("var win_opt = {id:'winFrm_alias', layout : 'fit', modal: true, items : [guiForm] };");
	
	Ext.create('Ext.window.Window', win_opt ).show();
	
}

function dispatcher ( caller, prj_alias,  com_alias, col_langs, action, id_value) {

	/*
		caller		: string del objeto que llama al dispatcher
		prj_alias	: alias del proyecto
		com_alias	: alias del componente a crear
		col_langs	: json con los idiomas
		action		: 'list'/'edit'
	*/
	
	Ext.Ajax.request({
		url: 'php/dispatcher.php',
		params: {
			project		: prj_alias,
			component	: com_alias,
			lang		: col_langs.usr_lang,
			col_langs	: col_langs.col_lang,
			action		: action,
			key			: Math.random()
		},
		success: function(response) {
			var data = Ext.JSON.decode(response.responseText)
			
			switch (data[0].componente) {
				case 'com_listgrid':
					create_grid(data[0]);
					break;
					
				case 'com_listgrid_adv':
					console.log(data)
					create_grid_adv(data);
					break;
					
				case 'com_editform':
					create_form(data[0], id_value);
					break;
					
				case 'com_form':
					create_manual_form(data[0], id_value);
					break;
			}
		}
	});
	
}

function changeThemes ( sTheme ) {
	//alert( sTheme );
	Ext.Ajax.request({
		url: 'php/session_changes.php',
		params: { css : sTheme },
		success: function() {
					location.reload();
				},
		failure: function(){
			console.log('Theme changing failure');
		}
	});
}

var tbApp =  Ext.create('Ext.toolbar.Toolbar', {
 		items: [{
            // xtype: 'button', // default for Toolbars
            text: 'Logout',
            id: 'tb_logout',
            handler: function() {
                document.location = 'php/logout.php';
            }
        }, {
            xtype: 'splitbutton',
            text: 'Selecciona estilo',
        	menu: new Ext.menu.Menu({
 			items: [{
						text: 'Classic',
						handler: function () {
							changeThemes("ext-all");
						}
            		},{
						text: 'Neptune',
						handler: function () {
							changeThemes("ext-all-neptune");
						}
            		},{
						text: 'Gray',
						handler: function () {
							changeThemes("ext-all-gray");
						}
            		},{
						text: 'Rtl',
						handler: function () {
							changeThemes("ext-all-rtl");
						}
            		},{
						text: 'Access',
						handler: function () {
							changeThemes("ext-all-access");
						}
            		},
            ]
            })
        }
        /*
        ,
        // begin using the right-justified button container
        '->', // same as { xtype: 'tbfill' }
        {
            xtype: 'textfield',
            name: 'field1',
            emptyText: 'enter search term'
        },
        // add a vertical separator bar between toolbar items
        '-', // same as {xtype: 'tbseparator'} to create Ext.toolbar.Separator
        'text 1', // same as {xtype: 'tbtext', text: 'text1'} to create Ext.toolbar.TextItem
        {
            xtype: 'tbspacer'
        }, // same as ' ' to create Ext.toolbar.Spacer
        'text 2',
        {
            xtype: 'tbspacer',
            width: 50
        }, // add a 50px space
        'text 3'
        */
        ]
    });
    
// 1. Cargamos los TreeViews a los que el usuario tenga acceso
var treePanels = new Array();

for ( var nSites = 0; nSites < GUIobj.sites.length; nSites++ ) {
	alias = GUIobj.sites[nSites].prjAlias;
	//obj_langs = {'usr_lang': GUIobj.idioma, 'prj_lang': GUIobj.sites[nSites].defLang, 'col_lang': GUIobj.sites[nSites].prjLang};
	obj_langs = {'usr_lang': GUIobj.idioma, 'col_lang': GUIobj.sites[nSites].prjLang};
	
	treePanels[nSites] = Ext.create('comp.sysTree', {
		id				: 'nav_panel_' + GUIobj.sites[nSites].prjAlias, 
		rootId			: 'fldr_' + GUIobj.sites[nSites].prjAlias,
		alias			: GUIobj.sites[nSites].prjAlias,
		langs			: obj_langs,
		title			: GUIobj.sites[nSites].prjName,
		autoScroll		: true, 
		collapsible		: true,
		border			: true,
		autoHeight		: true,
		height			: 'auto',
		margins			: '0 0 3 3',
		iconCls			: 'nav'
	});
};

// 2. Cargamos el Tab fijo y la información que irá en él (por definir)
var guiTabs = Ext.create('Ext.tab.Panel', {
	id			: 'GUITab',
	xtype		: 'tabpanel',
    activeTab	: 0,
    plain		: true,
    items		: [{
					title: 'Dashboard',
					bodyPadding: 10,
					layout	: 'column',
					items	: 
							  [
								{
									xtype	: 'panel',
									title	: 'Chart 1',
									width	: '50%',
									height	: '220px',
									items	: chart_pan,
									bodyPadding:5
									
								},
								{
									xtype	: 'panel',
									title	: 'Chart 2',
									width	: '40%',
									height	: '220px',
									items	: chart_pan2,
									bodyPadding:5
								}
								]
				  }]

});
 

Ext.application({
	name: 'MyApp',
	launch: function() {
		Ext.create('Ext.container.Viewport', {
			layout	: 'border',
			items	:
				[{
					autoHeight	:	true,
					border		:	10,
					region		:	'north',
					items		:   [tbApp] 
				},
				{
					border		:	10,
					id			: 	'GUITree',
					layout		:	'accordion',
					region		:	'west',
					split		:	true,
					xtype		:	'panel',
					width		:	210,
					defaults	: {
						// applied to each contained panel
						bodyStyle: 'padding:15px'
					},
					layoutConfig: {
						// layout-specific configs go here
						titleCollapse: false,
						animate: true
					},
					items		:	treePanels
				},
				{
					border		: 10,
					bodyPadding	: '5px',
					id			: 'adminPanel',
					layout		: 'fit',
					region		: 'center',
					xtype		: 'panel',
					items		: [guiTabs]
				}]
		});
	}
});