App.ListsCreateController = Ember.ObjectController.extend({
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('lists');
        },
        save  : function ()
        {
            var list = this.store.createRecord('list', this.get('model'));

            list.save();

            this.transitionToRoute('list', list);
        }
    }
});