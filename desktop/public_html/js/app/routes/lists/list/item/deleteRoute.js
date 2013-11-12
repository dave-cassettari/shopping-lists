App.ItemDeleteRoute = Ember.Route.extend({
    model: function ()
    {
        return this.modelFor('item');
    }
});