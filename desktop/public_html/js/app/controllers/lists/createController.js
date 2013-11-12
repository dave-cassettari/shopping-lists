App.ListsCreateController = Ember.ObjectController.extend({
    actions: {
        cancel: function ()
        {
            this.get('model').deleteRecord();

            this.transitionToRoute('lists');
        },
        save  : function ()
        {
            var self = this,
                list = this.get('model');

            var promise = list.save();

            promise.then(function (list)
            {
                self.transitionToRoute('list', list);
            });
        }
    }
});