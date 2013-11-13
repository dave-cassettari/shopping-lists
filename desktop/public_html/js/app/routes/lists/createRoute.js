App.ListsCreateRoute = Ember.Route.extend({
    model         : function ()
    {
        return this.get('store').createRecord(App.List);
    },
    renderTemplate: function ()
    {
        this.render('list.edit', {
            controller: 'listsCreate'
        });
    }
});