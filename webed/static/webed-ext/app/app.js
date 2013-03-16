Ext.Loader.setConfig ({
    enabled: true
});

Ext.Loader.setPath ({
    'Ext': '../static/ext/src',
    'Ext.ux': '../static/ext/src/ux',
    'Webed': '../static/webed-ext/app'
});

Ext.require ([
    'Ext.form.field.VTypes',
    'Ext.data.writer.Json',
    'Ext.data.reader.Json',
    'Ext.data.proxy.Rest',

    'Webed.store.MIMEs',
    'Webed.store.Linguas',
    'Webed.store.Nodes',
    'Webed.store.Leafs',
    'Webed.store.Properties',

    'Webed.view.Viewport'
]);

Ext.application ({
    name: 'Webed',
    models: ['MIME', 'Lingua', 'Node', 'Leaf', 'Property'],
    stores: ['MIMEs', 'Linguas', 'Nodes', 'Leafs', 'Properties'],

    requires: [
        'Ext.container.Viewport'
    ],

    controllers: [
        'panel.ImageViewer',
        'panel.TextEditor',
        'statusbar.StatusBar',
        'tab.TabManager',
        'toolbar.MainToolbar',
        'toolbar.TextToolbar',
        'toolbar.RestToolbar',
        'AddFileBox',
        'AddFolderBox',
        'AddProjectBox',
        'ArchiveUploadBox',
        'ConfirmBox',
        'DeleteBox',
        'FileUploadBox',
        'InsertLinkBox',
        'InsertPictureBox',
        'Leaf',
        'LeafList',
        'Node',
        'NodeTree',
        'Property',
        'RenameBox'
    ],

    paths: {
        'Webed': '../static/webed-ext/app'
    },

    launch: function () {
        Ext.create ('Webed.view.Viewport');
    },

    get_selection: function () {
        return assert (this.getController ('NodeTree')).get_selection ();
    }
});
