App.ItemRoute = Ember.Route.extend({
    model: function (params)
    {
        var self = this,
            list = this.modelFor('list');

        // check list id matches

        return this.store.find('item', params.item_id);
    }
});