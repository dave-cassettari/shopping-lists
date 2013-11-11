App.ListsCreateController = Ember.ObjectController.extend({
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('lists');
        },
        save  : function ()
        {
            console.log(this.get('model'));
            console.log(this.get('data'));
            var list = this.store.createRecord('list', this.get('model'));

            list.save();

            this.transitionToRoute('list', list);
        }
    }
});