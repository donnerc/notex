describe ('NodeTree', function () {
    var view = null, controller = null, store = null;

    beforeEach (function () {
        if (Ext.get ('test-area'))
            Ext.removeNode (Ext.get ('test-area').dom);
        Ext.DomHelper.append (Ext.getBody (),
            "<div id='test-area' style='display:none'/>");

        if (!view) view = Ext.create ('Webed.view.NodeTree', {
            renderTo: 'test-area' });
        expect (view).toBeTruthy ();
        if (!controller) controller = window.app.getController ('NodeTree');
        expect (controller).toBeTruthy ();
        if (!store) store = controller.getStore ('Nodes');
        expect (store).toBeTruthy ();
    });

    afterEach (function () {
        view.destroy ();
        view = null;
        store = null;
        controller = null;
    });

    it ('should load nodes', function () {
        store.on ('load', function (store, node, records, successful, opts) {
            expect (successful).toBeTruthy ();
            expect (records.length).toBeGreaterThan (1);
        }, this);

        store.load ();

        waitsFor (function () {
            return !store.isLoading ();
        }, 'store to load', 250);
    });

    it ('should create a node', function () {

        function check (node) {
            $.extend (node, {
                uuid: UUID.random ()
            });

            window.app.fireEvent ('create_node', node);
            var base = view.getRootNode ();
            expect (base).toBeTruthy ();

            waitsFor (function () {
                return base.findChild ('uuid', uuid, true) != null;
            }, node.mime + ' ' + 'node to be created', 250);

            var semo = view.getSelectionModel ();
            expect (semo).toBeTruthy ();
            var record = semo.getLastSelected ();
            expect (record).toBeTruthy ();
            var uuid = record.get ('uuid');
            expect (uuid).toEqual (node.uuid);
        }

        runs (function () { check ({
            name: 'project', mime: 'application/project'
        })});

        runs (function () { check ({
            name: 'folder', mime: 'application/folder'
        })});
    });

    it ('should create a leaf', function () {

        function check (leaf) {
            $.extend (leaf, {
                uuid: UUID.random ()
            });

            window.app.fireEvent ('create_leaf', leaf);
            var base = view.getRootNode ();
            expect (base).toBeTruthy ();

            waitsFor (function () {
                return base.findChild ('uuid', uuid, true) != null;
            }, '"' + leaf.mime + '"' + ' ' + 'leaf to be created', 250);

            var semo = view.getSelectionModel ();
            expect (semo).toBeTruthy ();
            var record = semo.getLastSelected ();
            expect (record).toBeTruthy ();
            var uuid = record.get ('uuid');
            expect (uuid).toEqual (leaf.uuid);
        }

        runs (function () { check ({
            name: 'document', mime: 'text/plain'
        })});
    });
});