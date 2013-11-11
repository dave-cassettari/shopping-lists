App.ListsRoute = Ember.Route.extend({
    model: function ()
    {
        var route = this;

        return this.store.find('list').then(function(lists)
        {
            if (lists.get('length') == 0)
            {
                route.transitionTo('lists.create');
            }

            return lists;
        });
    }
});