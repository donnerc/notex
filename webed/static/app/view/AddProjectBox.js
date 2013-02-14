Ext.define ('Webed.view.AddProjectBox', {
    extend: 'Ext.window.Window',
    alias: 'widget.add-project-box',

    requires: [
        'Ext.form.Panel'
    ],

    border: false,
    iconCls: 'icon-report_add-16',
    layout: 'fit',
    modal: true,
    resizable: false,
    title: 'Add Project',
    width: 320,

    items: [{
        xtype: 'form',
        layout: 'vbox',
        bodyPadding: '4px',

        items: [{
            xtype: 'textfield',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText: 'Enter project name ..',
            name: 'name',
            value: 'Project',
            width: '100%'
        },{
            xtype: 'add-project-box-mime',
            name: 'mime',
            allowBlank: false,
            emptyText: 'Select type ..',
            style: 'margin: 0;',
            value: 'application/project',
            width: '100%'
        }]
    }],

    buttons: [{
        text: 'Confirm',
        iconCls: 'icon-tick-16',
        action: 'confirm'
    },{
        text: 'Cancel',
        iconCls: 'icon-cross-16',
        action: 'cancel'
    }]
});

Ext.define ('Webed.view.AddProjectBoxMime', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.add-project-box-mime',

    requires: [
        'Ext.XTemplate'
    ],

    store: {
        fields: ['mime', 'name'],
        data : [{
            'mime':'application/project',
            'name':'Default'
        },{
            'mime':'application/project+rest',
            'name':'reStructuredText'
        },{
            'mime':'application/project+latex',
            'name':'LaTex'
        }]
    },

    queryMode: 'local',
    displayField: 'name',
    valueField: 'mime',

    tpl: Ext.create ('Ext.XTemplate',
        '<tpl for=".">',
        '<div class="x-boundlist-item">{name}',
        '<div class="w-boundlist-item-rhs">{mime}</div>',
        '</div>',
        '</tpl>'
    )
});