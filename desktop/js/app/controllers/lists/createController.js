App.ListsCreateController = Ember.ObjectController.extend({
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('lists');
        },
        save  : function ()
        {
            var list = this.store.createRecord('list', this.get('model'));

//            list.set('created_on', new Date());
            list.save();

            this.transitionToRoute('list', list);
        }
    }
});