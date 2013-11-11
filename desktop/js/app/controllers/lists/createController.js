App.ListsCreateController = Ember.ObjectController.extend({
    actions: {
        save: function ()
        {
            var list = this.store.createRecord('list', this.get('model'));

//            list.set('created_on', new Date());
            list.save();

            this.transitionToRoute('list', list);
        }
    }
});