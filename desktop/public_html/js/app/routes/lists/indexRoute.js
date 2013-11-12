App.ListsRoute = Ember.Route.extend({
    model     : function ()
    {
        return this.store.find('list');
    },
    afterModel: function (lists)
    {
        var length = lists.get('length');

        if (length === 0)
        {
            this.transitionTo('lists.create');
        }
//        else if (length > 0)
//        {
//            this.transitionTo('list', lists.get('firstObject'));
//        }
    }
});