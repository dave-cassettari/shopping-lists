App.ItemController = Ember.ObjectController.extend({
    needs  : 'list',
    list   : Ember.computed.alias('controllers.list.model'),
    actions: {
        cancel: function ()
        {
//            var name,
//                base = this.get('base'),
//                model = this.get('model');
//
//            console.log(this.get('model.name'));
//
//            for (name in base)
//            {
//                if (!base.hasOwnProperty(name))
//                {
//                    continue;
//                }
//
//                model.set(name, base[name]);
//            }

            this.transitionToRoute('list', this.get('list'));
        },
        save  : function ()
        {
            var self = this,
                model = this.get('model');

            console.log(this.get('model.unit.id'));

            this.store.find('unit', this.get('model.unit')).then(function (unit)
            {
                console.log(unit);
                console.log(model);

                model.set('unit', unit);
                model.save().then(function()
                {
                    self.transitionToRoute('list', self.get('list'));
                });
            });
        }
    }
});