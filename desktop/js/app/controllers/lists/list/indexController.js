App.ListController = Ember.ObjectController.extend({
    confirm   : false,
    actions   : {
        cancel: function ()
        {
            this.set('confirm', false)
        },
        delete: function ()
        {
            if (!this.get('confirm'))
            {
                this.set('confirm', true);

                return;
            }

            this.set('confirm', false);
            this.get('model').deleteRecord();
            this.get('model').save();

            this.transitionToRoute('lists');
        }
    }
});