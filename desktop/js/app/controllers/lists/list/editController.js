App.ListEditController = Ember.ObjectController.extend({
    data   : null,
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('list', this.get('model'));
        },
        save  : function ()
        {
            var name,
                data = this.get('data'),
                model = this.get('model');

            for (name in data)
            {
                if (!data.hasOwnProperty(name))
                {
                    continue;
                }

                model.set(name, data[name]);
            }

            model.save();

            this.transitionToRoute('list', model);
        }
    }
});