App.ListAddController = Ember.ObjectController.extend({
    needs  : ['list', 'application'],
    list   : Ember.computed.alias('controllers.list.model'),
    actions: {
        cancel : function ()
        {
            this.get('model').deleteRecord();

            this.transitionToRoute('list', this.get('list'));
        },
        confirm: function ()
        {
            var self = this,
                list = this.get('list'),
                item = this.get('model');

            item.set('list', list);

            item.save().then(function (saved)
            {
                list.get('items').pushObject(item);
                list.save();

                self.transitionToRoute('list', list);
            });
        }
    }
});