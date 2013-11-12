App.ListAddController = Ember.ObjectController.extend({
    units  : null,
    needs  : 'list',
    list   : Ember.computed.alias('controllers.list.model'),
    init   : function ()
    {
        this._super();

        this.set('units', this.store.find('unit'));
    },
    actions: {
        cancel: function ()
        {
            this.get('model').deleteRecord();

            this.transitionToRoute('list', this.get('list'));
        },
        save  : function ()
        {
            var self = this,
                list = this.get('list'),
                item = this.get('model');

            item.set('list', list);

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