App.ItemRoute = Ember.Route.extend({
    model: function (params)
    {
        var list = this.modelFor('list');

        return this.store.find('item', {
            list_id: list.get('id'),
            item_id: params.item_id
        });
    },
    setupController: function (controller, model)
    {
        controller.set('model', model);
        controller.set('units', controller.store.findAll('unit'));
    }
});