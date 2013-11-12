//App.LSAdapter = DS.LSAdapter.extend({
//    namespace: 'app.key.1'
//});
//
//DS.JSONSerializer.reopen({
//    serializeHasMany: function (record, json, relationship)
//    {
//        var key = relationship.key;
//
//        var relationshipType = DS.RelationshipChange.determineRelationshipType(
//            record.constructor, relationship);
//
//        if (relationshipType === 'manyToNone'
//                || relationshipType === 'manyToMany'
//            || relationshipType === 'manyToOne')
//        {
//            json[key] = Ember.get(record, key).mapBy('id');
//        }
//    }
//});
//App.ApplicationAdapter = DS.LSAdapter;

//App.ApplicationAdapter = DS.FixtureAdapter;

DS.Model.reopen({
    apiErrors: null
});

DS.Store.reopen({
    isLoading: false,
});

DS.RESTAdapter.reopen({
    namespace   : 'api',
    createRecord: function (store, type, record)
    {
        var promise = this._super(store, type, record);

        store.set('isLoading', true);

        promise.then(function()
        {
            store.set('isLoading', false);
            record.set('apiErrors', null);
        }, function (response)
        {
            var json = response.responseJSON;

            console.log(json);

            if (json && json.hasOwnProperty('apiErrors'))
            {
                record.set('apiErrors', json.apiErrors);
            }

            store.set('isLoading', false);
        });

        return promise;
    },
    updateRecord: function (store, type, record)
    {
        var promise = this._super(store, type, record);

        promise.then(function()
        {
            store.set('isLoading', false);
            record.set('apiErrors', null);
        }, function (response)
        {
            var json = response.responseJSON;

            console.log(response);

            if (json && json.hasOwnProperty('apiErrors'))
            {
                record.set('apiErrors', json.apiErrors);
            }
        });

        return promise;
    }
});

App.ApplicationAdapter = DS.RESTAdapter;