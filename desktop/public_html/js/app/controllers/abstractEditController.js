App.AbstractEditController = Ember.ObjectController.extend({
    data       : null,
    route      : null,
    routeParams: null,
    watch      : function ()
    {
        this.set('data', this.get('model.data'));
    }.observes('model.data'),
    goBack     : function (params)
    {
        var routeParams = this.get('routeParams');

        if (routeParams)
        {
            params = routeParams.call(this);
        }

        this.transitionToRoute(this.get('route'), params);
    },
    actions    : {
        cancel : function ()
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

            this.goBack(item);
        },
        confirm: function ()
        {
            var self = this,
                item = this.get('model');

            item.save().then(function (updatedItem)
            {
                self.goBack(updatedItem);
            });
        }
    }
});