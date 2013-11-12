App.ListAddRoute = Ember.Route.extend({
    model         : function ()
    {
        return this.get('store').createRecord('item');
    },
    renderTemplate: function ()
    {
        this.render('item/index', {
            controller: 'listAdd'
        });
    }
});