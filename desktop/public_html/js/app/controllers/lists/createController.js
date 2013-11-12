App.ListsCreateController = Ember.ObjectController.extend({
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('lists');
        },
        save  : function ()
        {
            var self = this,
                list = this.store.createRecord('list', this.get('model'));

            list.on('becameInvalid', function (response)
            {
                console.log(response);
                self.set('model', response);
            });

            list.save().then(function (list)
            {
                self.transitionToRoute('list', list);
            }, function (response)
            {
                var json = response.responseJSON;

                console.log(json);

                if (json && json.hasOwnProperty('apiErrors'))
                {
                    list.set('apiErrors', json.apiErrors);

                    console.log(json.apiErrors);
                }

                list.send('becameInvalid');
            });
        }
    }
});