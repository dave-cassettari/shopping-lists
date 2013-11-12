App.ListDeleteRoute = Ember.Route.extend({
    model: function ()
    {
        return this.modelFor('list');
    }
});