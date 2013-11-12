App.ListAddController = Ember.ObjectController.extend({
    units  : null,
    needs  : 'list',
    list   : Ember.computed.alias('controllers.list.model'),
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('list', this.get('list'));
        },
        save  : function ()
        {
            var item,
                self = this,
                list = this.get('list'),
                data = this.get('model');

            data.set('list', list);

            item = this.store.createRecord('item', data);

            item.save().then(function (saved)
            {
                console.log(saved);

                list.get('items').pushObject(item);
                list.save();

                self.transitionToRoute('list', list);
            });
        }
    }
});