App.ListRoute = Ember.Route.extend({
    model: function (params)
    {
        return this.store.find('list', params.list_id);
    }
});