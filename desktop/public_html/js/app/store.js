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

var intercept = function (store, type, record)
{
    var promise = this._super(store, type, record);

    store.set('isLoading', true);

    promise.then(function (model)
    {
        store.set('isLoading', false);
        record.set('apiErrors', null);
    }, function (response)
    {
        var json = response.responseJSON;

        store.set('isLoading', false);

        if (json && json.hasOwnProperty('apiErrors'))
        {
            record.set('apiErrors', json.apiErrors);
        }
    });

    return promise;
};

DS.RESTAdapter.reopen({
    namespace   : 'api',
    createRecord: function (store, type, record)
    {
        return intercept.call(this, store, type, record);
    },
    updateRecord: function (store, type, record)
    {
        return intercept.call(this, store, type, record);
    }
});

App.ApplicationAdapter = DS.RESTAdapter;