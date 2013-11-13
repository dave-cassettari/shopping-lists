App.TripController = Ember.ObjectController.extend({
//    incompleteCount: function ()
//    {
////        var lists = this.get('lists'),
////            items = this.get('tripItems');
////
//////        console.log(lists);
//////        console.log(lists);
////
////        console.log(lists.reduce(function(previousValue, list)
////        {
////            console.log(list.get('items'));
////            console.log(list.get('items.length'));
////            return (previousValue + list.get('items.length'));
////        }, 0));
//
////        return 0;
//        return this.get('lists.length');
//    }.property('lists', 'lists.@each.items.length'),

    tripItemsCount: function ()
    {
        return this.get('tripItems.length');
    }.property('tripItems.@each'),

    updateItemsCompleted: function ()
    {
        var self = this,
            completed = [],
            lists = self.get('lists');

        if (!lists.then)
        {
            return;
        }

        lists.then(function (lists)
        {
            self.get('tripItems').then(function (tripItems)
            {
                tripItems.forEach(function (tripItem)
                {
                    if (tripItem.get('complete'))
                    {
                        completed.push(tripItem.get('item.id'));
                    }
                });

                lists.forEach(function (list)
                {
                    list.get('items').then(function (items)
                    {
                        items.forEach(function (item)
                        {
                            var id = item.get('id'),
                                complete = (completed.indexOf(id) > -1);

                            item.set('complete', complete);
                        });
                    });
                });
            });
        });
    }.observes('lists.@each', 'lists.@each.itemsCount'),

    actions: {
        toggleComplete: function (item)
        {
            var ids = [],
                complete = true,
                tripItem = null,
                trip = this.get('model');

            this.get('tripItems').then(function (tripItems)
            {
                tripItems.forEach(function (tripItemElement)
                {
                    if (tripItemElement.get('item.id') == item.get('id'))
                    {
                        tripItem = tripItemElement;
                    }
                });

                if (!tripItem)
                {
                    tripItem = this.store.createRecord(App.TripItem);
                }

                tripItem.set('trip', trip);
                tripItem.set('item', item);
                tripItem.toggleProperty('complete');
                tripItem.save();

                item.set('complete', tripItem.get('complete'));
            });
        }
    }
});