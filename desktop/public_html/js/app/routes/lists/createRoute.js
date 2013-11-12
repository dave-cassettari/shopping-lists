App.ListsCreateRoute = Ember.Route.extend({
    model         : function ()
    {
        return this.get('store').createRecord('list');
    },
    renderTemplate: function ()
    {
        this.render('list.edit', {
            controller: 'listsCreate'
        });
    }
});