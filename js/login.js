
Ext.onReady(function(){
  
    var login = Ext.create('Ext.form.Panel', {
        url:'login_proc.php', 
        title:'Please Login', 
		bodyStyle: 'padding: 5px 5px 5px 5px;',
        defaultType:'textfield',
        items:[{ 
                fieldLabel:'Usuario', 
                name:'loginUsername', 
                allowBlank:false 
				,value:'web'
            },{ 
                fieldLabel:'Contraseña',
                name:'loginPassword', 
                inputType:'password',
                allowBlank:false 
				,value:'web'
            }],
 
		// All the magic happens after the user clicks the button     
        buttons:[{ 
                text:'Login',
                formBind: true,	 
                // Function that fires when user clicks the button 
                handler:function(){ 
                    login.getForm().submit({ 
                        method:'POST', 
                        waitTitle:'Conectando', 
                        waitMsg:'Enviando información...', 
                        success:function(form, action){ 
							obj=Ext.JSON.decode(action.response.responseText);
							window.location = '../index.php';
                        },
                        failure:function(form, action){ 
                            if(action.failureType == 'server'){ 
                                obj = Ext.JSON.decode(action.response.responseText); 
                                Ext.Msg.alert('Login Failed!', obj.errors.reason); 
                            }else{ 
                                Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
                            } 
                            login.getForm().reset(); 
                        } 

                    }); 
                } 
            }] 
    });
 
	// This just creates a window to wrap the login form. 
	// The login object is passed to the items collection.       
    var win = new Ext.Window({
		//layout: 'form',
		bodyPadding: 5,
        layout	: 'fit',
        //width	: 300,
        //height	: 150,
        closable: false,
        //resizable: false,
        //plain	: true,
        border 	: false,
        items	: [login]
	});
	win.show();
});