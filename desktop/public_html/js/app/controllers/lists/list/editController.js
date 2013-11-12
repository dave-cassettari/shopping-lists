App.ListEditController = Ember.ObjectController.extend({
    base   : null,
    actions: {
        cancel: function ()
        {
            var name,
                base = this.get('base'),
                model = this.get('model');

            for (name in base)
            {
                if (!base.hasOwnProperty(name))
                {
                    continue;
                }

                model.set(name, base[name]);
            }

            this.transitionToRoute('list', model);
        },
        save  : function ()
        {
            var model = this.get('model');

            model.save();

            this.transitionToRoute('list', model);
        }
    }
});