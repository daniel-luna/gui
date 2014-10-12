//Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'extjs/src/ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Paging'
]);

function _lang( key ) {

	return key + ' trad';
}

function create_grid(data) {
	var tabPanel = Ext.getCmp('GUITab');
	var tab = Ext.getCmp('tab_' + data.idComponente);
	
	if (tab == undefined) {
		guiGrid = Ext.create('comp.listGrid', {	gridId		: 'grid_' + data.idComponente,
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
			
			switch (data.componente) {
				case 'com_listgrid':
					create_grid(data);
					break;
				case 'com_editform':
					create_form(data, id_value);
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