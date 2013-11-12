App.ItemIndexRoute = Ember.Route.extend({
    model: function (params)
    {
        return this.modelFor('item');
    }
});