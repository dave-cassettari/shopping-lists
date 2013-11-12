App.ListsCreateRoute = Ember.Route.extend({
    model         : function ()
    {
        return Ember.Object.create();
    },
    renderTemplate: function ()
    {
        this.render('list.edit', {
            controller: 'listsCreate'
        });
    },
    actions       : {
        error: function (reason)
        {
            alert(reason);
        }
    }
});