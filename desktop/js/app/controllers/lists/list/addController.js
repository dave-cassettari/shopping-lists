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
            var self = this,
                list = this.get('list'),
                data = this.get('model');

            data.set('list', list);

            this.store.find('unit', this.get('model.unit_id')).then(function(unit)
            {
                data.set('unit', unit);

                var item = self.store.createRecord('item', data);

                item.save().then(function ()
                {
                    list.get('items').pushObject(item);
                    list.save();

                    self.transitionToRoute('list', list);
                });
            });
        }
    }
});