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

var error = function (xhr, textStatus, err)
{
    console.log(xhr.responseText);

    errors = null;

    try
    {
        errors = JSON.parse(xhr.responseText).errors;
    }
    catch (e)
    {

    }

    if (errors)
    {
        record.set('apiErrors', errors);
    }
    record.send('becameInvalid');
};

DS.Model.reopen({
    apiErrors: null
});

DS.RESTAdapter.reopen({
    namespace   : 'api',
    createRecord: function (store, type, record)
    {
        return this._super(store, type, record).then(null, function (response)
        {
            var json = response.responseJSON;

            if (json && json.hasOwnProperty('apiErrors'))
            {
                record.set('apiErrors', json.apiErrors);
            }
        });
    }
});

App.ApplicationAdapter = DS.RESTAdapter;