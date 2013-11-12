App.ItemRoute = Ember.Route.extend({
    model          : function (params)
    {
        var list = this.modelFor('list');

        return this.store.find('item', {
            id     : params.item_id,
            list_id: list.get('id')
        });
    },
    setupController: function (controller, model)
    {
        controller.set('model', model);
        controller.set('units', controller.store.find('unit'));
    }
});