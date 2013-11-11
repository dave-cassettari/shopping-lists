App.ListEditController = Ember.ObjectController.extend({
    data   : null,
    actions: {
        cancel: function ()
        {
            console.log(this.get('model'));
            this.transitionToRoute('list', this.get('model'));
        },
        save  : function ()
        {
            var data = this.get('data'),
                model = this.get('model');

            console.log(data);
            console.log(model.get('data'));

            model.set('data', data);
            model.save();

            console.log(model.get('data'));

            this.transitionToRoute('list', model);
        }
    }
});