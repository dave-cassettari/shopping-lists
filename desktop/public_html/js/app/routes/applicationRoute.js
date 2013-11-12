App.ApplicationRoute = Ember.Route.extend({
    units          : null,
    model          : function ()
    {
        var i,
            store = this.get('store');

        for (i = 0; i < App.Unit.FIXTURES.length; i++)
        {
            store.push('unit', App.Unit.FIXTURES[i]);
        }
    },
    setupController: function (controller)
    {
        controller.set('units', this.store.findAll('unit'));
    }
});