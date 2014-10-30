
Ext.define('comp.listGrid', {
    extend: 'Ext.grid.Panel', 		// subclass Ext.Component
    alias: 'widget.listGrid',		// this component will have an xtype of 'managedimage'
	
	initComponent: function() {

		var idComponente	= this.initialConfig.idComponente;
		var columnId		= this.initialConfig.columnId;
		var lang			= this.initialConfig.lang;
		var campos			= Ext.JSON.decode(this.initialConfig.campos);
		var filtros			= Ext.JSON.decode(this.initialConfig.filtros);
		
		var prj_alias		= this.initialConfig.prj_alias;
		var com_alias		= this.initialConfig.com_alias;
		var col_langs		= this.initialConfig.col_langs;
		
		//1. Configuraciones de origen, codificación y filtro local o remoto ( siempre remoto )
		
		var encode = false;
		var local = false;

		var url = {
			local:  'grid-filter.json',  																	// static data file
			remote: 'comp/listGrid.php?id=' + idComponente + '&lang=' + lang + '&key=' + Math.random()
		};
		
		//2. Cargamos el modelo de datos
		Ext.define('GUIModel_' + idComponente, {
			extend: 'Ext.data.Model',
			fields: campos
		});
		
		//3. Cargamos el Store con el modelo de datos
		var gridStore = Ext.create('Ext.data.JsonStore', {
			storeId	: 'store_' + idComponente,
			// store configs
			autoDestroy: true,
			model: 'GUIModel_' + idComponente,
			proxy: {
				type: 'ajax',
				url: (local ? url.local : url.remote),
				reader: {
					type			: 'json',
					root			: 'data',
					idProperty		: 'id',
					totalProperty	: 'total'
				}
			},
			remoteSort: false,
			/* TODO: Ordenación por defecto. hace falta?

			sorters: [{
				property: 'id',
				direction: 'ASC'
			}],
			*/
			/* TODO: Parametrizar los registros por página? En la configuración del componente? */
			pageSize: 50
		});
		
		//4. Cargamos los filtros
		var filters = {
			ftype: 'filters',
			encode		: false,
			local		: local,
			autoLoad	: true,
			// Filters are most naturally placed in the column definition, but can also be added here.
			filters: [
				{
					type: 'boolean',
					dataIndex: 'visible'
				}
			]
		};
		
		var grid = this;
		var config = {
			border		: false,
			id			: 'grid_' + idComponente,
			store		: gridStore,
			columns		: filtros,
			forceFit	: true,
			loadMask	: true,
			features	: filters,
			dockedItems	: [Ext.create('Ext.toolbar.Paging', {
							dock: 'bottom',
							store: gridStore,
							items: [
										'->',
									{
										text: 'Encode: ' + (false ? 'On' : 'Off'),
										tooltip: 'Toggle Filter encoding on/off',
										enableToggle: true,
										handler: function (button, state) {
											var encode = (grid.filters.encode !== true);
											var text = 'Encode: ' + (encode ? 'On' : 'Off'); 
											grid.filters.encode = encode;
											grid.filters.reload();
											button.setText(text);
										} 
									},
									{
										text: 'Local Filtering: ' + (local ? 'On' : 'Off'),
										tooltip: 'Toggle Filtering between remote/local',
										enableToggle: true,
										handler: function (button, state) {
											var local = (grid.filters.local !== true),
											text = 'Local Filtering: ' + (local ? 'On' : 'Off'),
											newUrl = local ? url.local : url.remote,
											store = grid.view.getStore();
								 
											// update the GridFilter setting
											grid.filters.local = local;
											// bind the store again so GridFilters is listening to appropriate store event
											grid.filters.bindStore(store);
											// update the url for the proxy
											store.proxy.url = newUrl;
			
											button.setText(text);
											store.load();
										} 
									},
									{
										text: 'All Filter Data',
										tooltip: 'Get Filter Data for Grid',
										handler: function () {
											var data = Ext.encode(grid.filters.getFilterData());
											Ext.Msg.alert('All Filter Data',data);
										} 
									},{
										text: 'Clear Filter Data',
										handler: function () {
											grid.filters.clearFilters();
										} 
									},{
										text: 'Add Columns',
										handler: function () {
											if (grid.headerCt.items.length < 6) {
												grid.headerCt.add(createColumns(6, 4));
												grid.view.refresh();
												this.disable();
											}
										}
									}    
								]
				
							}
						)]
		}

		this.viewConfig = {
			forceFit : true
		};
		
        // apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));
		
		// call parent
		comp.listGrid.superclass.initComponent.apply(this, arguments);

		this.on({
			itemdblclick: function( item ) {
				//alert(this.getSelectionModel().selectionStart.data[columnId]);
				//alert ('dispatcher: listGrid -' + prj_alias + '-' + com_alias + '-' + col_langs.user_lang + ' - ' + col_langs.col_lang + '-' + 'edit' );
				dispatcher ('listGrid', prj_alias, com_alias, col_langs, 'edit', this.getSelectionModel().selectionStart.data[columnId]);

				//var x = eval('this.getSelectionModel().selections.items[0].data.'+IdField);
				//if	(this.getSelectionModel().selections.items.length>0) create_EditManager(BDData, x, IdNode, 'grid_'+IdNode, user_lang, project_lang, col_lang);
				//else Ext.Msg.alert(translate(user_lang, 'msg_title_atention'), translate(user_lang, 'msg_sel_toedit'));
			}
		});
		
		// bind the store again so GridFilters is listening to appropriate store event
		grid.filters.bindStore(gridStore);

		gridStore.proxy.url = 'comp/listGrid.php?id=' + idComponente + '&lang=' + lang + '&key=' + Math.random();
		gridStore.load();
	}
	
	

});