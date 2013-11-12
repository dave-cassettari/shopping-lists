App.ListAddRoute = Ember.Route.extend({
    model          : function ()
    {
        return this.get('store').createRecord('item');
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