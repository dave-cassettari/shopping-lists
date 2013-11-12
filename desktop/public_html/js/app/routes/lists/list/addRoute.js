App.ListAddRoute = Ember.Route.extend({
    model          : function ()
    {
        return Ember.Object.create();
    },
    renderTemplate : function ()
    {
        this.render('item', {
            controller: 'listAdd'
        });
    },
    setupController: function (controller, model)
    {
        controller.set('model', model);
        controller.set('units', controller.store.find('unit'));
    }
});