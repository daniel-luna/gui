	
Ext.define('comp.sysTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.sysTree',
    border:false,
    initComponent:function() {
	
		var idTree		 = this.id;
		var rootIdTree	 = this.rootId;
		var comp_alias	 = this.alias;
		var col_langs	 = this.langs;

		var store = Ext.create('Ext.data.TreeStore', {
			proxy: {
				type: 'ajax',
				//url: 'comp/sysTree.php?alias=' + comp_alias + '&user_lang=' + col_langs.usr_lang + '&project_lang=' + col_langs.prj_lang + '&col_lang=' + col_langs.col_lang
				url: 'comp/sysTree.php?alias=' + comp_alias + '&user_lang=' + col_langs.usr_lang + '&col_lang=' + col_langs.col_lang
			},
			root: {
				text: 'Categories',
				id: 'src',
				draggable:false,
				expanded: true,
				id:rootIdTree
			}
		});		
		
		var config = {
			id				:	idTree,
			// these are the config options for the tree itself				
			margins			:	0,
			border			:	0,
			width			:	"100%",
			useArrows		:	true,
			rootVisible		:	false,			
			expanded		:	true,			
			border			:	false,
			store: store
		}
 
        // apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));
	  
		// call parent
		comp.sysTree.superclass.initComponent.apply(this, arguments);
		
		// load the store at the latest possible moment
		this.on({
			itemclick: function (t, record, item, index, e, eOpts){
				if (Ext.util.Format.substr(record.data.id,0,5)!='fldr_') {
					dispatcher('sysTree', comp_alias,  record.data.id, col_langs, 'list');
					//create_ListManager(aliasParam, record.data.id, record.data.text, user_lang, project_lang, col_lang);
				}
			}
		});

    } // eo function initComponent
 
});
