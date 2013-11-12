App.AbstractEditController = Ember.ObjectController.extend({
    data       : null,
    route      : null,
    routeParams: null,
    watch      : function ()
    {
        this.set('data', this.get('model.data'));
    }.observes('model.data'),
    actions    : {
        cancel: function ()
        {
            var name,
                data = this.get('data'),
                item = this.get('model');

            for (name in data)
            {
                if (!data.hasOwnProperty(name))
                {
                    continue;
                }

                item.set(name, data[name]);
            }

            if (this.routeParams)
            {
                item = this.routeParams();
            }

            this.transitionToRoute(this.get('route'), item);
        },
        save  : function ()
        {
            var self = this,
                item = this.get('model');

            item.save().then(function (params)
            {
                if (self.routeParams)
                {
                    params = self.routeParams();
                }

                self.transitionToRoute(self.get('route'), params);
            });
        }
    }
});