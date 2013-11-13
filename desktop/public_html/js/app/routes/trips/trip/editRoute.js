App.TripEditRoute = Ember.Route.extend({
    model          : function ()
    {
        return this.modelFor('trip');
    },
    setupController: function (controller, model)
    {
        controller.set('model', model);
        controller.set('lists', this.store.find('list'));
    }
});