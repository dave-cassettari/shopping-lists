App.ListsRoute = Ember.Route.extend({
    model: function ()
    {
        var route = this;

//        for (var i = 0; i < App.Unit.FIXTURES.length; i++)
//        {
//            var data = App.Unit.FIXTURES[i],
//                unit = this.store.createRecord('unit', data);
//
//            unit.save();
//
////            this.store.find('unit', data.id).then(function(found)
////            {
////                console.log(found);
////            });
//        }

        return this.store.find('list').then(function (lists)
        {
            if (lists.get('length') == 0)
            {
                route.transitionTo('lists.create');
            }

            return lists;
        });
    }
});