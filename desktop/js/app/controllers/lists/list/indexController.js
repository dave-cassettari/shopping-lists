App.ListController = Ember.ObjectController.extend({
    confirm: false,
    actions: {
        remove: function ()
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