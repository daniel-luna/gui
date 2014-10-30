//Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'extjs/src/ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Paging'
]);


var objGridAdv_list = {
	// propiedades privadas
	_idComp		: '',
	// propiedades públicas
	colFiltres	:	[],
	// métodos
	load		: function ( idComp, data ) {
		this._idComp = idComp;
		for ( var x = 0; x < data.length; x++) {
			this.colFiltres.push( data[x] );
		}
	},
	get_filter	: function ( idFiltre ) {
		for ( var x = 0; x < this.colFiltres.length; x++) {
			if ( this.colFiltres[x].id == idFiltre) return this.colFiltres[x];
		}
		
		return '';
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

function create_grid_adv(data) {
	var tabPanel = Ext.getCmp('GUITab');
	var tab = Ext.getCmp('tab_' + data[0].idComponente);
	
	if (tab == undefined) {
		var loading = true;
		var center_region;
		
		if ( tabPanel.items.length > 1 ) tabPanel.remove(tabPanel.items.getAt(1));

		filterList = Object.create(objGridAdv_list);
		filterList.load ( data[0].idComponente, data[0].all_data );

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
								  	 

									 Ext.getCmp('grid_items').add(Ext.create('comp.listGridAdv', {	gridId		: 'grid_' + d.idComponente,
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
									{ xtype: 'box', autoEl: {cn: 'Añadir nuevo filtro'}, listeners : { click: function() {
										 alert('new clicked!');
									}} },
									{ xtype: 'box', autoEl: {cn: 'Editar filtro actual'}, listeners : { click: function() { alert('edit clicked!'); }} },
									{ xtype: 'box', autoEl: {cn: 'Borrar filtro actual'}, listeners : { click: function() { alert('del clicked!'); }} },
									
									
		{
fieldLabel: 'User',
id: 'kanri-user',
xtype: 'box',
autoEl: {
	cn: 'eoeoeoeoeoe'
	/*
	tag: 'a'
	href: '#',
	html: 'User',
	*/
},
listeners: {
	render: function(c){
		c.getEl().on('click', function(){
		alert("asdfasdfasdf");
			//Ext.getCmp('kanri-content-panel').layout.setActiveItem('kanri-user-panel');
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
		layout	: 'fit',
		items	: [guiForm]
	}).show();
	
	//height: 308,width: 552
}

function create_manual_form(data, id_value) {

	eval(data.formData);
	
	if (data.windowData != '' ) eval("var win_opt = {id:'winFrm_alias', layout : 'fit', items : [guiForm], " + data.windowData + " };");
	else  eval("var win_opt = {id:'winFrm_alias', layout : 'fit', items : [guiForm] };");
	
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

var logout_button = Ext.create('Ext.Button', {
    text: 'Logout',
    renderTo: Ext.getBody(),
    handler: function() {
        document.location = 'php/logout.php';
    }
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
					items		:   [logout_button]
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