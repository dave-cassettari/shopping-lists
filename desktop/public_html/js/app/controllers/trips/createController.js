App.TripsCreateController = Ember.ObjectController.extend({
    lists  : null,
    actions: {
        cancel : function ()
        {
            this.get('model').deleteRecord();

            this.transitionToRoute('trips');
        },
        confirm: function ()
        {
            var self = this,
                model = this.get('model'),
                lists = this.get('lists');

//            model.set('lists', []);
////            model.get('lists').clear();

//            if (model.get('lists.length') == 0)
//            {
//                model.set('lists', []);
//            }
//
//            console.log( model.get('lists.length'));
//
//            lists.forEach(function (list)
//            {
//                console.log(list.get('selected'));
//                if (list.get('selected'))
//                {
//                    model.get('lists').pushObject(list.get('id'));
//                }
//            });
//            console.log( model.get('lists.length'));

            lists.forEach(function (list)
            {
//                console.log(list.get('selected'));
                if (list.get('selected'))
                {
//                    model.get('lists').pushObject(list);
//                    list.get('trips').then(function(trips)
//                    {
//                        trips.pushObject(model);
//                    });

                    model.get('lists').then(function(lists)
                    {
                        lists.pushObject(list);
                    });

//                    model.get('lists').pushObject(list);


                    list.get('trips').then(function(trips)
                    {
                        trips.pushObject(model);
                    });

                }
            });

//            model.get('lists').then(function(lists)
//            {
//                lists.pushObject(model);
//            }).pushObject(list);

            model.save().then(function (model)
            {
//                console.log(model.get('lists.length'));

//                lists.forEach(function (list)
//                {
//                    console.log(list.get('selected'));
//                    if (list.get('selected'))
//                    {
//                        model.get('lists').pushObject(list);
//                        list.get('trips').then(function(trips)
//                        {
//                            trips.pushObject(model);
//                        });
//                    }
//                });

                console.log(model.get('lists.length'));

//                model.save();

//                self.transitionToRoute('trip', model);
            });
        }
    }
});