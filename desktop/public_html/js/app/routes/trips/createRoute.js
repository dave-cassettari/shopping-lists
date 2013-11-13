App.TripsCreateRoute = Ember.Route.extend({
    model          : function ()
    {
        var model = this.get('store').createRecord(App.Trip);

        model.set('createdOn', new Date());

        return model;
    },
    renderTemplate : function ()
    {
        this.render('trip.edit', {
            controller: 'tripsCreate'
        });
    },
    setupController: function (controller, model)
    {
        var lists = this.get('store').find('list');

        lists.then(function(lists)
        {
            lists.forEach(function(list)
            {
                list.set('selected', false);
            });
        });

        controller.set('model', model);
        controller.set('lists', lists);
    }
});