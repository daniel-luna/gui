
var objGridAdv_list = {
	// propiedades privadas
	_idComp		: '',
	// propiedades públicas
	colFiltres	:	[],
	// métodos
	load	: function ( idComp, data ) {
		this._idComp = idComp;
		for ( var x = 0; x < data.length; x++) {
			this.colFiltres.push( data[x] );
		}
	}
}


Ext.define('comp.listGridAdv', {
    extend: 'Ext.grid.Panel', 		// subclass Ext.Component
    alias: 'widget.listGridAdv',		// this component will have an xtype of 'managedimage'
	
	initComponent: function() {

		var idReg			= this.initialConfig.idReg;
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
			remote: 'comp/listGridAdv.php?id=' + idComponente + '&lang=' + lang + '&idReg=' + idReg + '&key=' + Math.random()
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
			remoteSort: false
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
			name		: 'list_component',
			id			: 'grid_' + idComponente,
			//id			: 'list_component',
			store		: gridStore,
			columns		: filtros,
			forceFit	: true,
			loadMask	: true,
			features	: filters
		}

		this.viewConfig = {
			forceFit : true
		};
		
        // apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));
		
		// call parent
		comp.listGridAdv.superclass.initComponent.apply(this, arguments);

		this.on({
			itemdblclick: function( item ) {
				//alert(this.getSelectionModel().selectionStart.data[columnId]);
				//alert ('dispatcher: listGrid -' + prj_alias + '-' + com_alias + '-' + col_langs.user_lang + ' - ' + col_langs.col_lang + '-' + 'edit' );
				dispatcher ('listGridAdv', prj_alias, com_alias, col_langs, 'edit', this.getSelectionModel().selectionStart.data[columnId]);

				//var x = eval('this.getSelectionModel().selections.items[0].data.'+IdField);
				//if	(this.getSelectionModel().selections.items.length>0) create_EditManager(BDData, x, IdNode, 'grid_'+IdNode, user_lang, project_lang, col_lang);
				//else Ext.Msg.alert(translate(user_lang, 'msg_title_atention'), translate(user_lang, 'msg_sel_toedit'));
			}
		});
		
		// bind the store again so GridFilters is listening to appropriate store event
		grid.filters.bindStore(gridStore);

		gridStore.proxy.url = 'comp/listGridAdv.php?id=' + idComponente + '&lang=' + lang + '&idReg=' + idReg + '&key=' + Math.random();
		gridStore.load();
	}
	
	

});