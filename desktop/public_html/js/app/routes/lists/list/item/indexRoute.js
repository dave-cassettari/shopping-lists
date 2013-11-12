App.ItemRoute = Ember.Route.extend({
    model: function (params)
    {
        var self = this,
            list = this.modelFor('list');

        return this.store.find('item', params.item_id);

//        return this.store.find('item', {
//            id     : params.item_id,
//            list_id: list.get('id')
//        }).then(function (item)
//            {
//                console.log(item.get('data'));
//                self.get('store').push('item', item.get('data'));
//            });
    }
});