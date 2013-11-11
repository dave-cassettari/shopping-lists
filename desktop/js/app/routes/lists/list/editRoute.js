App.ListEditRoute = Ember.Route.extend({
    model          : function ()
    {
        return this.modelFor('list');
    },
    setupController: function (controller, model)
    {
        var data = Ember.Object.create(model.get('data'));

        controller.set('data', data);
        controller.set('model', model);
    }
});