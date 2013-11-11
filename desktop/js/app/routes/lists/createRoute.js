App.ListsCreateRoute = Ember.Route.extend({
    model         : function ()
    {
        return Em.Object.create({});
    },
    renderTemplate: function ()
    {
        this.render('list.edit', {
            controller: 'listsCreate'
        });
    }
});