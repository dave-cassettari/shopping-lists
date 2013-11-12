App.ListDeleteController = Ember.ObjectController.extend({
    actions: {
        cancel : function ()
        {
            this.transitionToRoute('list', this.get('model'));
        },
        confirm: function ()
        {
            this.get('model').deleteRecord();
            this.get('model').save();

            this.transitionToRoute('lists');
        }
    }
});