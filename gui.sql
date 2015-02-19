-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-02-2015 a las 18:51:51
-- Versión del servidor: 5.5.32
-- Versión de PHP: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `gui`
--
CREATE DATABASE IF NOT EXISTS `gui` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `gui`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `com_editform`
--

CREATE TABLE IF NOT EXISTS `com_editform` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idComponente` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `sSQL` text NOT NULL,
  `columnaId` varchar(50) NOT NULL,
  `comboList` text,
  `campos` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `com_editform`
--

INSERT INTO `com_editform` (`id`, `idComponente`, `titulo`, `sSQL`, `columnaId`, `comboList`, `campos`) VALUES
(1, 2, 'mnuUsers', 'SELECT * FROM gui_usuarios WHERE id = ''{id_value}''', 'id', '[{"bd_alias": "gui", "prj_alias": "gui", "lst_alias": "idPerfil", "tbl_name": "gui_perfiles", "from": "gui_perfiles INNER JOIN gui_perfiles_i18n ON gui_perfiles.id = gui_perfiles_i18n.idPerfil", "id_field": "gui_perfiles.id", "desc_field": "gui_perfiles_i18n.nombre", "where_filter": ""}, {"bd_alias": "gui", "prj_alias": "gui", "lst_alias": "idIdioma", "tbl_name": "gui_idiomas", "from": "", "id_field": "clave", "desc_field": "nombre", "where_filter": "" }]', '[{"xtype": "hiddenfield", "name": "id", "fieldLabel": "Label", "anchor": "100%"}, {"xtype": "textfield", "id": "username", "name": "username", "fieldLabel": "usrUsername", "anchor": "100%"}, {"xtype": "textfield", "id": "password", "name": "password", "fieldLabel": "usrPassword", "anchor": "100%"}, {"xtype": "textfield", "id": "nombre", "name": "nombre", "fieldLabel": "usrName", "anchor": "100%"}, {"xtype": "textfield", "id": "apellidos", "name": "apellidos", "fieldLabel": "usrSurname", "anchor": "100%"}, {"xtype": "combobox", "id": "idPerfil", "name": "idPerfil", "fieldLabel": "usrProfile", "store": idPerfil_store, "displayField": "descr", "valueField": "id", "hiddenName": "idPerfil", "mode": "remote", "anchor": "100%"}, {"xtype": "textfield", "id": "mail", "name": "mail", "fieldLabel": "usrMail", "anchor": "100%"}, {"xtype": "combobox", "id": "idIdioma", "name": "idIdioma", "fieldLabel": "usrLanguage", "store": idIdioma_store, "displayField": "descr", "valueField": "id", "hiddenName": "idIdioma", "mode": "remote", "anchor": "100%"}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `com_form`
--

CREATE TABLE IF NOT EXISTS `com_form` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idComponente` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `windowData` text,
  `formData` text NOT NULL,
  `jsData` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `com_form`
--

INSERT INTO `com_form` (`id`, `idComponente`, `titulo`, `windowData`, `formData`, `jsData`) VALUES
(1, 7, 'Evento', 'title: ''Eventos'', height : 250, width : 450', 'var guiForm = Ext.create(''Ext.form.Panel'', {\n	bodyPadding: 5,\n	width: 350,\n	url: ''comp/manualForm/form_save.php'', layout: ''anchor'', defaults: { anchor: ''100%''},\n	defaultType: ''textfield'',\n	items: [\n{ xtype:''hidden'', name:''table''},\n{ xtype:''hidden'', name:''id_value''},\n{\n    xtype:"textfield",\n    allowBlank: false,\n    fieldLabel:"Titulo",\n    name:"titulo"\n  },{\n    xtype:"textareafield",\n    allowBlank: false,\n    fieldLabel:"Descripcion",\n    name:"descripcion"\n  },{\n    xtype:"datefield",\n    allowBlank: false,\n    dateFormat: ''d/m/Y'',\n    fieldLabel:"Fecha",\n    name:"fecha"\n  }],\n	buttons: [\n{text: ''Reset'', handler: function() { this.up(''form'').getForm().reset(); }}, { text: ''Submit'', formBind: true, disabled: true, handler: function() { var form = this.up(''form'').getForm(); if (form.isValid()) { form.submit({	 success: function(form, action) { Ext.Msg.alert(''Success'', action.result.msg);}, failure: function(form, action) { Ext.Msg.alert(''Failed'', action.result.msg); }}); } } }\n	] ,\n	listeners: { \n		afterrender: function(component, eOpts) {\n			if ( id_value > 0)  this.load({ url: ''comp/manualForm/form_load.php?table=evento&id_value='' + id_value, waitMsg : ''loading....'' });\n		}\n	}\n\n});', ''),
(2, 8, 'Noticia', 'title: ''Simple Form'', height : 450, width : 850', 'Ext.define(''combo_model_id_tipo'', {\r\n	extend: ''Ext.data.Model'',\r\n	fields: [{name: ''id'', type:''int''}, {name:''descr'', type:''string''}]\r\n});\r\nvar id_tipo_store = Ext.create(''Ext.data.Store'', {\r\n	model: ''combo_model_id_tipo'',\r\n	proxy: {\r\n		async : false,\r\n		type: ''ajax'',\r\n		url: ''comp/manualForm/select.php?action=load&table=tipos_noticia'',\r\n		reader: {\r\n			type: ''json'',\r\n			root: ''data''\r\n		}\r\n	},\r\n	autoLoad: true\r\n	,root: ''data''\r\n});\r\n \r\n\r\nvar guiForm = Ext.create(''Ext.form.Panel'', {\r\n	bodyPadding: 5,\r\n	width: 350,\r\n	url: ''comp/manualForm/form_save.php'', layout: ''anchor'', /*defaults: { anchor: ''100%''},*/\r\n	defaultType: ''textfield'',\r\n	items: [\r\n		{fieldLabel: ''titulo'', name: ''titulo'', allowBlank: false },\r\n		{fieldLabel: ''Breve'', name: ''breve'', allowBlank: false, anchor: ''100%'' },\r\n		{xtype: ''htmleditor'', name: ''descripcion'', fieldLabel: ''Descripción'',anchor: ''100%''},\r\n		{fieldLabel: ''Fecha'', name: ''fecha'', xtype: ''datefield'', tooltip: ''Fecha de publicacion'', width: 250},\r\n		{xtype: ''combobox'', id: ''id_tipo'', name: ''id_tipo'', fieldLabel: ''Tipo'', store: id_tipo_store, displayField: ''descr'', valueField: ''id'', hiddenName: ''id_tipo'', mode: ''remote'', width: 250}\r\n	],\r\n	buttons: [\r\n		{ text: ''Submit'',\r\n		  formBind: true,\r\n		  disabled: true,\r\n		  handler: function() {\r\n			var form = this.up(''form'').getForm();\r\n			if (form.isValid()) {\r\n				form.submit({\r\n					success: function(form, action) {\r\n						Ext.Msg.alert(''Success'', action.result.msg);\r\n					},\r\n					failure: function(form, action) {\r\n						Ext.Msg.alert(''Failed'', action.result.msg); \r\n					}\r\n				});\r\n			}\r\n		  }\r\n		}\r\n	] ,\r\n	listeners: { \r\n		afterrender: function(component, eOpts) {\r\n			if ( id_value > 0)  this.load({ url: ''comp/manualForm/form_load.php?table=noticia&id_value='' + id_value, waitMsg : ''loading....'' });\r\n		}\r\n	}\r\n\r\n});', ''),
(3, 10, 'Enlaces', 'title: ''Eventos'', height : 200, width : 450', 'var guiForm = Ext.create(''Ext.form.Panel'', {\r\n	bodyPadding: 5,\r\n	width: 350,\r\n	url: ''comp/manualForm/form_save.php'', layout: ''anchor'', defaults: { anchor: ''100%''},\r\n	defaultType: ''textfield'',\r\n	items: [\r\n{ xtype:''hidden'', name:''table''},\r\n{ xtype:''hidden'', name:''id_value''},\r\n{\r\n    xtype:"textfield",\r\n    allowBlank: false,\r\n    fieldLabel:"Descripcion",\r\n    name:"descripcion"\r\n  },{\r\n    xtype:"textfield",\r\n    allowBlank: false,\r\n    fieldLabel:"Url",\r\n    name:"url"\r\n  }],\r\n	buttons: [\r\n{text: ''Reset'', handler: function() { this.up(''form'').getForm().reset(); }}, { text: ''Submit'', formBind: true, disabled: true, handler: function() { var form = this.up(''form'').getForm(); if (form.isValid()) { form.submit({	 success: function(form, action) { Ext.Msg.alert(''Success'', action.result.msg);}, failure: function(form, action) { Ext.Msg.alert(''Failed'', action.result.msg); }}); } } }\r\n	] ,\r\n	listeners: { \r\n		afterrender: function(component, eOpts) {\r\n			if ( id_value > 0)  this.load({ url: ''comp/manualForm/form_load.php?table=enlace&id_value='' + id_value, waitMsg : ''loading....'' });\r\n		}\r\n	}\r\n\r\n});', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `com_listgrid`
--

CREATE TABLE IF NOT EXISTS `com_listgrid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idComponente` int(11) NOT NULL,
  `titulo` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `sSQL` text COLLATE utf8_unicode_ci NOT NULL,
  `columnaId` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Campos` text COLLATE utf8_unicode_ci NOT NULL,
  `Columnas` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `com_listgrid`
--

INSERT INTO `com_listgrid` (`id`, `idComponente`, `titulo`, `sSQL`, `columnaId`, `Campos`, `Columnas`) VALUES
(1, 3, 'mnuProfiles', 'SELECT g.id AS id, nombre FROM gui_perfiles g INNER JOIN gui_perfiles_i18n gi ON g.id = gi.idPerfil WHERE idIdioma = ''{lang}''', 'id', '[{"name": "id", "type": "int"}, {"name": "nombre", "type": "string"}]', '[{"dataIndex": "id", "text": "Id", "filterable" : true, "width": 30}, {"dataIndex": "nombre", "text": "colProfile", "id": "nombre", "filter": {"type": "string"}}]'),
(2, 2, 'mnuUsers', 'SELECT u.id AS id_u, u.nombre AS nombre, u.apellidos AS apellidos, u.username AS username, pi.nombre AS perfil, pi.idIdioma FROM (gui_usuarios u INNER JOIN gui_perfiles p ON u.idPerfil = p.id) INNER JOIN gui_perfiles_i18n pi ON p.id = pi.idPerfil HAVING pi.idIdioma = ''{lang}''', 'id', '[{"name": "id_u", "type": "int"}, {"name": "nombre", "type": "string"}, {"name": "apellidos", "type": "string"}, {"name": "username", "type": "string"}, {"name": "perfil", "type": "string"}]', '[{"dataIndex": "id_u", "text": "Id", "filterable" : true}, {"dataIndex": "nombre", "text": "colName", "filter": {"type": "string"}}, {"dataIndex": "apellidos", "text": "colSurname", "filter": {"type": "string"}}, {"dataIndex": "username", "text": "colUsername", "filter": {"type": "string"}}, {"dataIndex": "perfil", "text": "colProfile", "filter": {"type": "string"}}]'),
(3, 17, 'mnuLanguages', 'SELECT id, nombre, clave FROM gui_idiomas WHERE 1', 'id', '[{"name": "id", "type": "int"}, {"name": "nombre", "type": "string"}, {"name": "clave", "type": "string"}]', '[{"dataIndex": "id", "text": "Id", "filterable": true}, {"dataIndex": "nombre", "text": "Nombre", "filter": {"type": "string"}}, {"dataIndex": "clave", "text": "Clave", "filter": {"type": "string"}}]'),
(4, 6, 'mnuProjects', 'SELECT p.id AS id, p.alias AS alias, pi.nombre AS nombre, pi.descripcion AS descripcion FROM gui_proyectos p INNER JOIN gui_proyectos_i18n pi ON p.id = pi.idProyecto WHERE 1', 'id', '[{"name": "id", "type": "int"}, {"name": "alias", "type": "string"}, {"name": "nombre", "type": "string"}, {"name": "descripcion", "type": "string"}]', '[{"dataIndex": "id", "text": "Id", "filterable": true}, {"dataIndex": "alias", "text": "Alias", "filter": {"type": "string"}}, {"dataIndex": "nombre", "text": "Nombre", "filter": {"type": "string"}}, {"dataIndex": "descripcion", "text": "Descripcion", "filter": {"type": "string"}}]'),
(5, 7, 'Eventos', 'SELECT id, titulo, fecha FROM pro_eventos WHERE 1', 'id', '[{"name": "id", "type": "int"}, {"name": "titulo", "type": "string"}, {"name": "fecha", "type": "date"}]', '[{"dataIndex": "id", "text": "Id", "filterable" : true}, {"dataIndex": "titulo", "text": "Título", "id": "titulo", "filter": {"type": "string"}}, {"dataIndex": "fecha", "text": "Fecha", "id": "fecha", "filter": {"type": "date"}, "xtype": "datecolumn", "format":"d/m/Y"}]'),
(6, 8, 'Noticias', 'SELECT n.id, n.titulo, n.fecha, p.descripcion FROM pro_noticias n INNER JOIN pro_tipos_noticia p ON n.id_tipo = p.id', 'id', '[{"name": "id", "type": "int"}, {"name": "titulo", "type": "string"}, {"name": "descripcion", "type": "string"}, {"name": "fecha", "type": "date"}]', '[{"dataIndex": "id", "text": "Id", "filterable" : true}, {"dataIndex": "titulo", "text": "Título", "id": "titulo", "filter": {"type": "string"}}, {"dataIndex": "descripcion", "text": "Descripción", "id": "descripcion", "filter": {"type": "string"}}, {"dataIndex": "fecha", "text": "Fecha", "id": "fecha", "filter": {"type": "date"}, "xtype": "datecolumn", "format":"d/m/Y"}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `com_listgrid_adv`
--

CREATE TABLE IF NOT EXISTS `com_listgrid_adv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idComponente` int(11) NOT NULL,
  `titulo` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `titulo_filtro` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sSelect` text COLLATE utf8_unicode_ci NOT NULL,
  `sFrom` text COLLATE utf8_unicode_ci NOT NULL,
  `sWhere` text COLLATE utf8_unicode_ci NOT NULL,
  `columnaId` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Campos` text COLLATE utf8_unicode_ci NOT NULL,
  `Columnas` text COLLATE utf8_unicode_ci NOT NULL,
  `CamposDisponibles` text COLLATE utf8_unicode_ci NOT NULL,
  `porDefecto` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `com_listgrid_adv`
--

INSERT INTO `com_listgrid_adv` (`id`, `idComponente`, `titulo`, `titulo_filtro`, `sSelect`, `sFrom`, `sWhere`, `columnaId`, `Campos`, `Columnas`, `CamposDisponibles`, `porDefecto`) VALUES
(1, 10, 'Enlaces', 'Ver todos los registros', 'SELECT id, descripcion, url', 'FROM pro_enlaces', '', 'id', '[{"name": "id", "type": "int"}, {"name": "url", "type": "string"}]', '[{"dataIndex": "id", "text": "Id", "filterable": true}, {"dataIndex": "url", "text": "Url", "filter": {"type": "string"}}]', '[{"name": "id", "type": "int"}, {"name": "descripcion", "type": "string"}, {"name": "url", "type": "string"}]', b'1'),
(2, 10, 'Enlaces', 'Los de google', 'SELECT id, descripcion, url', 'FROM pro_enlaces', '[{"operand": "", "op_par": "(", "field": "url", "condition": "LIKE", "value": "%google%", "cl_par": ")" }, {"operand": "AND", "op_par": "(", "field": "id", "condition": ">=", "value": "3", "cl_par": ")" }]', 'id', '[{"name": "id", "type": "int"}, {"name": "descripcion", "type": "string"}, {"name": "url", "type": "string"}]', '[{"dataIndex": "id", "text": "Id", "filterable": true}, {"dataIndex": "descripcion", "text": "Descripción", "filter": {"type": "string"}}, {"dataIndex": "url", "text": "Url", "filter": {"type": "string"}}]', '[{"name": "id", "type": "int"}, {"name": "descripcion", "type": "string"}, {"name": "url", "type": "string"}]', b'0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gui_idiomas`
--

CREATE TABLE IF NOT EXISTS `gui_idiomas` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `clave` varchar(5) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `gui_idiomas`
--

INSERT INTO `gui_idiomas` (`id`, `clave`, `nombre`) VALUES
(1, 'ca_ES', 'Català'),
(2, 'es_ES', 'Catellano'),
(3, 'en_GB', 'English');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gui_locales`
--

CREATE TABLE IF NOT EXISTS `gui_locales` (
  `idProyecto` int(11) NOT NULL,
  `aliasProyecto` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `clave` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ca_ES` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `es_ES` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `en_GB` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `gui_locales`
--

INSERT INTO `gui_locales` (`idProyecto`, `aliasProyecto`, `clave`, `ca_ES`, `es_ES`, `en_GB`) VALUES
(1, 'gui', 'tabAdmin', 'Administració', 'Administración', 'Admin'),
(1, 'gui', 'treeUser', 'USUARIS', 'USUARIOS', 'USERS'),
(1, 'gui', 'treeConfig', 'CONFIGURACIÓ', 'CONFIGURACIÓN', 'CONFIG'),
(1, 'gui', 'mnuUsers', 'Usuaris', 'Usuarios', 'Users'),
(1, 'gui', 'mnuProfiles', 'Perfils', 'Perfiles', 'Profiles'),
(1, 'gui', 'mnuLanguages', 'Idiomes', 'Idiomas', 'Languages'),
(1, 'gui', 'mnuProjects', 'Projectes', 'Proyectos', 'Projects'),
(1, 'gui', 'colProfile', 'Perfil', 'Perfil', 'Profile'),
(1, 'gui', 'colName', 'Nom', 'Nombre', 'Name'),
(1, 'gui', 'colSurname', 'Cognoms', 'Apellidos', 'Surname'),
(1, 'gui', 'colUsername', 'Usuari', 'Usuario', 'Username');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gui_perfiles`
--

CREATE TABLE IF NOT EXISTS `gui_perfiles` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `alias` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `gui_perfiles`
--

INSERT INTO `gui_perfiles` (`id`, `alias`) VALUES
(1, 'anonimo'),
(2, 'registrado'),
(3, 'editor'),
(4, 'admin'),
(5, 'webmaster'),
(7, 'a_esborrar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gui_perfiles_i18n`
--

CREATE TABLE IF NOT EXISTS `gui_perfiles_i18n` (
  `idPerfil` int(5) NOT NULL,
  `idIdioma` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `Nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Descripcion` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `gui_perfiles_i18n`
--

INSERT INTO `gui_perfiles_i18n` (`idPerfil`, `idIdioma`, `Nombre`, `Descripcion`) VALUES
(1, 'ca_ES', 'Anònim', 'Usuari per defecte per a accedir a la web.'),
(1, 'es_ES', 'Anónimo', 'Usuario por defecto al acceder a la web.'),
(2, 'ca_ES', 'Registrat', 'Usuari logat a un portal.'),
(2, 'es_ES', 'Registrado', 'Usuario logado en un portal.'),
(3, 'es_ES', 'Editor', 'Usuari que te permisos per a gestionar contingut del portal.'),
(3, 'en_GB', 'Editor', 'Usuari que te permisos per a gestionar contingut del portal.'),
(4, 'ca_ES', 'Administrador', 'Usuari que te permisos per a gestionar contingut i configuració del portal.'),
(4, 'es_ES', 'Administrador', 'Usuario que tiene permisos para gestionar contenido y configuración del portal.'),
(5, 'ca_ES', 'Webmaster', 'Usuari que gestiona opcions avançades dels portals i configuracions.'),
(5, 'es_ES', 'Webmaster', 'Usuario que gestiona opciones avanzadas de los portales y configuraciones.'),
(1, 'en_GB', 'Anonymous', 'Default user accessing the web.'),
(2, 'en_GB', 'Registered', 'User logged into a site.'),
(3, 'ca_ES', 'Editor', 'Usuari que te permisos per a gestionar contingut del portal.'),
(4, 'en_GB', 'Manager', 'User who has permissions to manage content and configuration of the site.'),
(5, 'en_GB', 'Webmaster', 'Advanced user who manages the content and settings of the sites.'),
(7, 'ca_ES', 'Perfil a esborrar', 'aquest és en català'),
(7, 'es_ES', 'Perfil a borrar', 'Este es en castellano'),
(7, 'en_GB', 'Profile to erase', 'This is in english');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gui_proyectos`
--

CREATE TABLE IF NOT EXISTS `gui_proyectos` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) NOT NULL,
  `home` varchar(255) DEFAULT NULL,
  `dbName` varchar(255) DEFAULT NULL,
  `multilang` enum('S','N') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `gui_proyectos`
--

INSERT INTO `gui_proyectos` (`id`, `alias`, `home`, `dbName`, `multilang`) VALUES
(2, 'app', 'http://localhost/bicis/', 'bicis', 'S'),
(1, 'gui', 'admin', 'gui', 'S');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gui_proyectos_i18n`
--

CREATE TABLE IF NOT EXISTS `gui_proyectos_i18n` (
  `idProyecto` int(5) NOT NULL,
  `idIdioma` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idProyecto`,`idIdioma`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `gui_proyectos_i18n`
--

INSERT INTO `gui_proyectos_i18n` (`idProyecto`, `idIdioma`, `nombre`, `descripcion`) VALUES
(1, 'ca_ES', 'Administració', 'Gestió del GUI'),
(1, 'es_ES', 'Administración', 'Gestión del GUI'),
(2, 'es_ES', 'Proyecto', 'Gestión'),
(1, 'en_GB', 'Admin', 'GUI management');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gui_proyectos_idiomas`
--

CREATE TABLE IF NOT EXISTS `gui_proyectos_idiomas` (
  `idProyecto` int(5) NOT NULL,
  `idIdioma` varchar(5) NOT NULL,
  `defecto` enum('S','N') NOT NULL,
  PRIMARY KEY (`idProyecto`,`idIdioma`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `gui_proyectos_idiomas`
--

INSERT INTO `gui_proyectos_idiomas` (`idProyecto`, `idIdioma`, `defecto`) VALUES
(1, 'ca_ES', 'S'),
(1, 'es_ES', 'N'),
(2, 'es_ES', 'S'),
(1, 'en_GB', 'N');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gui_proyectos_nodos`
--

CREATE TABLE IF NOT EXISTS `gui_proyectos_nodos` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `idProyecto` int(5) NOT NULL,
  `idNodoPadre` int(5) DEFAULT NULL,
  `alias` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `titulo` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `icono` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `listado` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `edicion` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=18 ;

--
-- Volcado de datos para la tabla `gui_proyectos_nodos`
--

INSERT INTO `gui_proyectos_nodos` (`id`, `idProyecto`, `idNodoPadre`, `alias`, `titulo`, `icono`, `listado`, `edicion`) VALUES
(1, 1, NULL, 'treeUser', 'treeUser', NULL, NULL, NULL),
(2, 1, 1, 'gui_usuarios', 'mnuUsers', NULL, 'com_listgrid', 'com_editform'),
(3, 1, 1, 'gui_perfiles', 'mnuProfiles', NULL, 'com_listgrid', NULL),
(7, 2, NULL, 'eventos', 'eventos', NULL, 'com_listgrid', 'com_form'),
(8, 2, NULL, 'noticias', 'noticias', NULL, 'com_listgrid', 'com_form'),
(9, 2, NULL, 'fotografias', 'fotografias', NULL, '2', NULL),
(10, 2, NULL, 'enlaces', 'enlaces', NULL, 'com_listgrid_adv', 'com_form'),
(11, 2, NULL, 'carreras', 'carreras', NULL, '2', NULL),
(4, 1, NULL, 'treeConfig', 'treeConfig', NULL, NULL, NULL),
(6, 1, 4, 'gui_proyectos', 'mnuProjects', NULL, 'com_listgrid', NULL),
(15, 2, NULL, 'config', 'config', NULL, NULL, NULL),
(16, 2, 15, 'nodes', 'nodes', NULL, NULL, NULL),
(17, 1, 4, 'gui_idiomas', 'mnuLanguages', NULL, 'com_listgrid', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gui_proyectos_usuarios`
--

CREATE TABLE IF NOT EXISTS `gui_proyectos_usuarios` (
  `idProyecto` int(5) NOT NULL,
  `idUsuario` int(5) NOT NULL,
  PRIMARY KEY (`idProyecto`,`idUsuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `gui_proyectos_usuarios`
--

INSERT INTO `gui_proyectos_usuarios` (`idProyecto`, `idUsuario`) VALUES
(1, 1),
(2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gui_usuarios`
--

CREATE TABLE IF NOT EXISTS `gui_usuarios` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `idPerfil` int(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(25) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `idIdioma` varchar(5) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `gui_usuarios`
--

INSERT INTO `gui_usuarios` (`id`, `idPerfil`, `username`, `password`, `nombre`, `apellidos`, `mail`, `idIdioma`, `foto`) VALUES
(1, 4, 'web', 'web', 'Administrador', 'General', NULL, 'es_ES', 'foto_dani.jpg'),
(2, 3, 'editor', 'editor', 'Usuario', 'Editor', NULL, 'es_ES', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pro_enlaces`
--

CREATE TABLE IF NOT EXISTS `pro_enlaces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `pro_enlaces`
--

INSERT INTO `pro_enlaces` (`id`, `descripcion`, `url`) VALUES
(1, 'Enlace a dani', 'http://www.danielluna.net'),
(2, 'Pral. de Google', 'http://www.google.es'),
(3, 'Mapas de Google', 'http://maps.google.es'),
(4, 'Drive', 'http://drive.google.es');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pro_eventos`
--

CREATE TABLE IF NOT EXISTS `pro_eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `pro_eventos`
--

INSERT INTO `pro_eventos` (`id`, `titulo`, `descripcion`, `fecha`) VALUES
(1, 'Primer evento', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', '2014-10-05'),
(2, 'Evento segundo 2', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', '2015-02-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pro_noticias`
--

CREATE TABLE IF NOT EXISTS `pro_noticias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` text NOT NULL,
  `descripcion` text NOT NULL,
  `breve` text NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `pro_noticias`
--

INSERT INTO `pro_noticias` (`id`, `titulo`, `descripcion`, `breve`, `id_tipo`, `fecha`) VALUES
(1, 'Primera noticia de prueba para estos', 'Lorem fistrum te voy a borrar el cerito te va a hasé pupitaa a wan se calle ustée diodenoo torpedo jarl condemor benemeritaar. A gramenawer por la gloria de mi madre a wan no te digo trigo por no llamarte Rodrigor. Te va a hasé pupitaa torpedo no puedor me cago en tus muelas no te digo trigo por no llamarte Rodrigor hasta luego Lucas jarl está la cosa muy malar mamaar. Papaar papaar torpedo qué dise usteer va usté muy cargadoo. Ese hombree pecador diodeno a wan condemor apetecan mamaar tiene musho peligro benemeritaar. Amatomaa hasta luego Lucas a gramenawer ese hombree hasta luego Lucas diodenoo llevame al sircoo al ataquerl papaar papaar. Ahorarr por la gloria de mi madre amatomaa a gramenawer sexuarl no te digo trigo por no llamarte Rodrigor hasta luego Lucas quietooor amatomaa.', 'Lorem fistrum te voy a borrar el cerito te va a hasé pupitaa a wan se calle ustée diodenoo torpedo jarl condemor benemeritaar.', 1, '2014-10-19'),
(2, 'Segunda noticia', 'Lorem fistrum no te digo trigo por no llamarte Rodrigor a gramenawer tiene musho peligro fistro jarl te va a hasé pupitaa hasta luego Lucas al ataquerl fistro. Me cago en tus muelas de la pradera al ataquerl jarl llevame al sircoo sexuarl. Caballo blanco caballo negroorl benemeritaar ese pedazo de va usté muy cargadoo está la cosa muy malar ese pedazo de a wan. Torpedo diodenoo qué dise usteer va usté muy cargadoo ese hombree te va a hasé pupitaa hasta luego Lucas sexuarl no te digo trigo por no llamarte Rodrigor me cago en tus muelas. Qué dise usteer benemeritaar se calle ustée no puedor te va a hasé pupitaa de la pradera a gramenawer sexuarl mamaar papaar papaar por la gloria de mi madre. Se calle ustée papaar papaar ese pedazo de al ataquerl. A gramenawer te voy a borrar el cerito hasta luego Lucas ahorarr la caidita caballo blanco caballo negroorl papaar papaar pupita benemeritaar te voy a borrar el cerito. Sexuarl te va a hasé pupitaa jarl pupita la caidita por la gloria de mi madre diodenoo.\r\n\r\nLlevame al sircoo torpedo ese que llega a peich diodeno a gramenawer no puedor te voy a borrar el cerito. Benemeritaar apetecan la caidita condemor ese que llega a wan papaar papaar te va a hasé pupitaa. Qué dise usteer de la pradera caballo blanco caballo negroorl por la gloria de mi madre pupita me cago en tus muelas está la cosa muy malar a wan te va a hasé pupitaa por la gloria de mi madre qué dise usteer. A peich está la cosa muy malar se calle ustée fistro diodeno pecador diodeno caballo blanco caballo negroorl ahorarr. Diodenoo a peich la caidita ese hombree te voy a borrar el cerito condemor al ataquerl a wan pupita. Qué dise usteer pupita pecador ese pedazo de fistro de la pradera diodeno se calle ustée amatomaa jarl. Jarl a gramenawer jarl diodenoo te va a hasé pupitaa quietooor ahorarr sexuarl diodenoo ese pedazo de. Te voy a borrar el cerito se calle ustée sexuarl sexuarl se calle ustée me cago en tus muelas tiene musho peligro de la pradera hasta luego Lucas tiene musho peligro amatomaa.', 'Lorem fistrum no te digo trigo por no llamarte Rodrigor a gramenawer tiene musho peligro fistro jarl te va a hasé pupitaa hasta luego Lucas al ataquerl fistro. Me cago en tus muelas de la pradera al ataquerl jarl llevame al sircoo sexuarl. Caballo blanco caballo negroorl benemeritaar ese pedazo de va usté muy cargadoo está la cosa muy malar ese pedazo de a wan.', 1, '2014-10-20'),
(3, 'Otra noticia más (tercera)', 'Lorem fistrum a gramenawer ahorarr benemeritaar. De la pradera está la cosa muy malar qué dise usteer está la cosa muy malar hasta luego Lucas. Ese pedazo de no te digo trigo por no llamarte Rodrigor ese que llega qué dise usteer. Está la cosa muy malar te voy a borrar el cerito amatomaa caballo blanco caballo negroorl pupita te va a hasé pupitaa no te digo trigo por no llamarte Rodrigor por la gloria de mi madre caballo blanco caballo negroorl. A peich pecador de la pradera ese pedazo de a gramenawer por la gloria de mi madre amatomaa condemor jarl. A peich mamaar diodenoo ese pedazo de papaar papaar a wan al ataquerl por la gloria de mi madre ese que llega. Ahorarr por la gloria de mi madre está la cosa muy malar va usté muy cargadoo a wan va usté muy cargadoo ese hombree.', 'Lorem fistrum a gramenawer ahorarr benemeritaar. De la pradera está la cosa muy malar qué dise usteer está la cosa muy malar hasta luego Lucas. Ese pedazo de no te digo trigo por no llamarte Rodrigor ese que llega qué dise usteer.', 2, '2014-10-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pro_tipos_noticia`
--

CREATE TABLE IF NOT EXISTS `pro_tipos_noticia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `pro_tipos_noticia`
--

INSERT INTO `pro_tipos_noticia` (`id`, `descripcion`) VALUES
(1, 'Internacional'),
(2, 'Nacional');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
