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
                model = this.get('model');

            model.save().then(function (updatedModel)
            {
                self.transitionToRoute('trip', updatedModel);
            });
        }
    }
});