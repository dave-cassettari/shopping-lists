App.ListsCreateController = Ember.ObjectController.extend({
    actions: {
        cancel : function ()
        {
            this.get('model').deleteRecord();

            this.transitionToRoute('lists');
        },
        confirm: function ()
        {
            var self = this,
                list = this.get('model');

            list.save().then(function (list)
            {
                self.transitionToRoute('list', list);
            });
        }
    }
});