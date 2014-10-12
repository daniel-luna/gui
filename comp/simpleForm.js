function translate(a, b)
{
return b;
}

Ext.define('comp.simpleForm', {
    extend		: 'Ext.form.Panel', 		// subclass Ext.Component
    alias		: 'widget.simpleForm',		// this component will have an xtype of 'managedimage'
    //title		: 'My Form',
	autoWidth	:	true,
	frame		:	false,
	frameHeader	:	false,
	border		:	0,
	initComponent: function() {
		/* VIEJO
		var id_value	=	this.idValue;
		var node		=	this.idNode;
		var alias		=	this.alias;

		var form		=	this.form;
		var frmPanel	= 	Ext.getCmp(id);
		var bFileUpload	=	this.bFileForm;

		var user_lang 	=	this.user_lang;
		var project_lang= this.project_lang;
		var col_lang 	= this.col_lang

		var thisForm	=	this;
		*/
		
		var formId 		= this.formId;
		var idComponente= this.idComponente;
		var columnaId	= this.columnaId;
		var lang		= this.lang;
		var prj_alias	= this.prj_alias;
		var com_alias	= this.com_alias;
		var col_langs	= this.col_langs;
		var campos		= this.campos;
		var comboList	= this.comboList;
		var id_value	= this.id_value;

		var objStore = new Object;
		if ( comboList != 'undefined' )
		{
			comboList = Ext.JSON.decode(comboList);
			for (var l_count = 0; l_count < comboList.length; l_count++) {
			
				Ext.define('combo_model_' + comboList[l_count].lst_alias, {
												extend: 'Ext.data.Model',
												fields: [{name: 'id', type:'int'}, {name:'descr', type:'string'}]
												//fields: [{name: comboList[l_count].lst_alias, type:'int'}, {name:'descr', type:'string'}]
											});
											
				var url_params = '?bd_alias=' + comboList[l_count].bd_alias + '&prj_alias=' + comboList[l_count].prj_alias + '&lst_alias=' + comboList[l_count].lst_alias;
				url_params += '&tbl_name=' + comboList[l_count].tbl_name + '&from=' + comboList[l_count].from;
				url_params += '&id_field=' + comboList[l_count].id_field + '&desc_field=' + comboList[l_count].desc_field;
				url_params += '&where_filter=' + comboList[l_count].where_filter; 
				
				//objStore[comboList[l_count].lst_alias]
				s = "var " + comboList[l_count].lst_alias + "_store = Ext.create('Ext.data.Store', {";
				s = s + "model: combo_model_" + comboList[l_count].lst_alias + ",";
				s = s + "autoLoad: true,";
				s = s + "proxy: {";
				s = s + "	async : false,";
				s = s + "	type: 'ajax',";
				s = s + "	url: 'comp/simpleForm/combo.php' + url_params,";
				s = s + "	reader: {";
				s = s + "		type: 'json',";
				s = s + "		root: 'data'";
				s = s + "	}},";
				s = s + "root: 'data'";
				s = s + "});";
				eval(s);

			}
		}
		
		
		var config = {
			id				: 'frm_'+com_alias,
			preventHeader	: true,
			labelWidth		: 80,
			url				: 'comp/simpleForm.php?action=save&id_value='+id_value+'&node='+com_alias,
			border			: 0,
			width			: '100%',
			bodyStyle		: 'padding:10px;',
			monitorValid	: true,
			fileUpload		: true,
			//,fileUpload: bFileUpload
			// The "name" attribute defines the name of variables sent to the server.
			items: eval(campos),
/*
			,items: 
				[{	xtype:"tabpanel",
					activeTab	:	0,
					activeTab: 0,
					width:'100%',
					//plain: true,
					layout		:	'fit',
					tabConfig: {
						height	:	'20px',
						cls		:	'tab',
						//icon	:	'http://localhost/admin/imgs/folder_wrench.png'
					},					
					items: [
						{
							title			: 'Tab 1',
							width			: '100%',
							bodyPadding		: 10,
							items 			: eval(campos) //eval(this.form)
						},
						{
							title: 'Tab 2',
							items : [          {
								fieldLabel 	: "frm_Name",
								xtype		: "textfield",
								name 		: "Nombre",
								anchor 		: "95%",
								allowBlank 	:false
							}]							
						}
					]
				}]
*/
		
			viewConfig		: {forceFit:true},
			loadMask		: true,
			buttons			: [{ 
								text: "aceptar", //translate(user_lang, 'btn_Accept'),
								formBind: true,	 
								// Function that fires when user clicks the button 
								handler:function(){ 
									var form = this.up('form').getForm();
									form.submit({
										//frmPanel.getForm().submit({
										method:'POST', 
										waitTitle:'Conectando', 
										waitMsg:'Enviando información...',
										success:function(form, action){
											obj=Ext.JSON.decode(action.response.responseText);
											if (obj.success) {
												Ext.getCmp('winFrm_'+com_alias).close();
											} else { alert(obj.success); alert(obj.err); }
										},
										failure:function(form, action){ 
											if(action.failureType == 'server'){ 
												obj = Ext.JSON.decode(action.response.responseText); 
												Ext.Msg.alert('Operation Failed!', obj.err);  //.reason); 
											}else{ 
												Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
											} 
											frmPanel.getForm().reset();
										} 
									}); 
								} 
							},{
								text: "cancelar", //translate(user_lang, 'btn_Cancel'),
								// Function that fires when user clicks the button 
								handler:function(){ 
									Ext.getCmp('frm_'+com_alias).close();
									Ext.getCmp('winFrm_'+com_alias).close();
								}
							}] 			
		}; // eo config object */

        // apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));

		// call parent
		comp.simpleForm.superclass.initComponent.apply(this, arguments);
			
    } // eo function initComponent

	,onRender:function() {
		// call parent
		comp.simpleForm.superclass.onRender.apply(this, arguments);
		
		if (this.id_value > 0){		
			// loads form after initial layout
			this.load({
				url		: 'comp/simpleForm/load.php?bd_alias=' + this.prj_alias + '&com_alias=' + this.com_alias + '&com_id=' + this.idComponente + '&id_value=' + this.id_value + '&lang=' + this.lang,
				waitMsg	: 'loading....'
			});
		}
		
		//this.add(new Ext.form.TextField({name: 'language', id: 'language', value: this.project_lang}));
		
//		Ext.getCmp('winFrm').doLayout();
		
	} // eo function onRender	
	,onItemCheck:function(item, checked){
	/*
		if (checked) {
			var thisForm=Ext.getCmp(id);

			var language=item.value;
			var project_lang=language;
			for (var i=0; i<thisForm.its.length; i++){			
				
				//thisForm.its[i].fieldLabel=it[i].fieldLabel;
				if (thisForm.its[i].xtype=='combo') {
					var modelDest = Ext.getCmp(thisForm.its[i].id);
					//set and disable cities
					modelDest.setDisabled(true);
					modelDest.setValue('');
					modelDest.store.removeAll();				
					//reload region store and enable region 
					modelDest.store.clearData();
					modelDest.store.reload({params:{'action':'cmb', 'name': thisForm.its[i].name, 'db': thisForm.db,'lang': language}});
					modelDest.setDisabled(false);
				}
			}	
			
			thisForm.load({
				url:'php/cmnForm.php?action=load&id='+id+'&id_value='+thisForm.id_value+'&node='+thisForm.node+'&db='+thisForm.db+'&lang='+item.value
				//,waitMsg:'Loading...'
				,waitMsg:translate(project_lang, 'msg_loading')
				//,params:{cmd:'load'}
			});
			//var thisLang=Ext.get('language');
			//thisLang.value=item.value;
			thisForm.getForm().findField('language').setValue(language);
		}
		//Ext.Msg.alert(item.text+" "+item.value, this.id+'&id_value='+this.id_value+'&node='+this.node+'&db='+this.db);
	*/
	}
});
