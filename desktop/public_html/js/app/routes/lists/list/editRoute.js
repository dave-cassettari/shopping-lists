App.ListEditRoute = Ember.Route.extend({
    model          : function ()
    {
        return this.modelFor('list');
    },
    setupController: function (controller, model)
    {
        controller.set('model', model);
        controller.set('base', model.get('data'));
    }
});