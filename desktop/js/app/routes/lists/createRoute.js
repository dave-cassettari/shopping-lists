App.ListsCreateRoute = Ember.Route.extend({
    model         : function ()
    {
//        return Ember.Object.create();
        return this.store.find('list', 1);
    },
    renderTemplate: function ()
    {
        this.render('list.edit', {
            controller: 'listsCreate'
        });
    }
});