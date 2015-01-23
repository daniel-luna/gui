<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<title>GUI</title>
	<link rel="stylesheet" href="extjs/resources/css/ext-all-neptune.css"/>
	<link rel="stylesheet" type="text/css" href="extjs/src/ux/css/ItemSelector.css" />
	    
	<script type="text/javascript" src="extjs/ext-all-debug.js"></script>
	<script type="text/javascript" src="extjs/locale/ext-lang-ca_ES.js"></script>
	

	<script type="text/javascript">
		Ext.Loader.setConfig({enabled: true});
		//Ext.Loader.setPath('Ext.ux', '../ux');
		Ext.Loader.setPath('Ext.ux', 'extjs/src/ux');
		Ext.require([
			'Ext.form.Panel',
			'Ext.ux.form.MultiSelect',
			'Ext.ux.form.ItemSelector',
			'Ext.tip.QuickTipManager',
			'Ext.ux.ajax.JsonSimlet',
			'Ext.ux.ajax.SimManager'
		]);

		Ext.onReady(function(){
			Ext.tip.QuickTipManager.init();

			Ext.ux.ajax.SimManager.init({
				delay: 300,
				defaultSimlet: null
			}).register({
				'Numbers': {
					data: [[123,'One Hundred Twenty Three'],
							['1', 'One'], ['2', 'Two'], ['3', 'Three'], ['4', 'Four'], ['5', 'Five'],
							['6', 'Six'], ['7', 'Seven'], ['8', 'Eight'], ['9', 'Nine']],
					stype: 'json'
				}
			});


			var ds = Ext.create('Ext.data.ArrayStore', {
				fields: ['value','text'],
				proxy: {
					type: 'ajax',
					url: 'Numbers',
					reader: 'array'
				},
				autoLoad: true,
				sortInfo: {
					field: 'value',
					direction: 'ASC'
				}
			});

			/*
			 * Ext.ux.form.ItemSelector Example Code
			 */
			var isForm = Ext.widget('form', {
				title: 'ItemSelector Test',
				width: 700,
				bodyPadding: 10,
				height: 300,
				//renderTo: 'itemselector',
				layout: 'fit',
				items:[{
					xtype: 'itemselector',
					name: 'itemselector',
					id: 'itemselector-field',
					anchor: '100%',
					//fieldLabel: 'ItemSelector',
					imagePath: 'extjs/src/ux/images/', 
					store: ds,
					displayField: 'text',
					valueField: 'value',
					value: ['3', '4', '6'],
					allowBlank: false,
					msgTarget: 'side',
					fromTitle: 'Available',
					toTitle: 'Selected'
				}]
				/*
				,
				dockedItems: [{ xtype: 'toolbar',
								dock: 'top',
								items: {
									text: 'Options',
									menu: [{
										text: 'Get value',
										handler: function(){
											var value = Ext.getCmp('itemselector-field').getValue();
											Ext.Msg.alert('Value is a split array', value.join(', '));
										} 
									}, {
										text: 'Set value (2,3)',
										handler: function(){
											Ext.getCmp('itemselector-field').setValue(['2', '3']);
										}
									},{
										text: 'Toggle enabled',
										checked: true,
										checkHandler: function(item, checked){
											Ext.getCmp('itemselector-field').setDisabled(!checked);
										}
									},{
										text: 'Toggle delimiter',
										checked: true,
										checkHandler: function(item, checked) {
											var field = Ext.getCmp('itemselector-field');
											if (checked) {
												field.delimiter = ',';
												Ext.Msg.alert('Delimiter Changed', 'The delimiter is now set to <b>","</b>. Click Save to ' +
															  'see that values are now submitted as a single parameter separated by the delimiter.');
											} else {
												field.delimiter = null;
												Ext.Msg.alert('Delimiter Changed', 'The delimiter is now set to <b>null</b>. Click Save to ' +
															  'see that values are now submitted as separate parameters.');
											}
										}
									}]
								}
							}, {
								xtype: 'toolbar',
								dock: 'bottom',
								ui: 'footer',
								defaults: {
									minWidth: 75
								},
								items: ['->', {
									text: 'Clear',
									handler: function(){
										var field = Ext.getCmp('itemselector-field');
										if (!field.disabled) {
											field.clearValue();
										}
									}
								}, {
									text: 'Reset',
									handler: function() {
										Ext.getCmp('itemselector-field').up('form').getForm().reset();
									}
								}, {
									text: 'Save',
									handler: function(){
										var form = Ext.getCmp('itemselector-field').up('form').getForm();
										form.getValues(true);
										if (form.isValid()){
											Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+
												form.getValues(true));
										}
									}
								}]
							}]
				*/
			});


			var win_opt = { id		: 'winFrm_alias',
							height	: 400,
							width	: 700,
							layout	: 'fit',
							items	: {
										xtype		: "tabpanel",
										activeTab	:0,
										items		: [{
														 xtype	: "panel",
														 title	: "Campos",
														 items	: [ isForm ]
														},{
														 xtype:"panel",
														 title:"Fitros"
														}]
										}
							};

			Ext.create('Ext.window.Window', win_opt ).show();
		});
	</script>
</head>
<body>
	<h1><?php echo getcwd();?></h1>
    <div id="multiselect" class="demo-ct"></div>
    
	<div id="itemselector" class="demo-ct"></div>
</body>
</html>