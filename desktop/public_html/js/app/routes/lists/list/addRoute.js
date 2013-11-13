App.ListAddRoute = Ember.Route.extend({
    model         : function ()
    {
        return this.get('store').createRecord(App.Item);
    },
    renderTemplate: function ()
    {
        this.render('item/index', {
            controller: 'listAdd'
        });
    }
});