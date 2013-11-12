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

DS.RESTAdapter.reopen({
    host     : 'http://lists-api.localdomain',
    namespace: 'api'
});

App.ApplicationAdapter = DS.RESTAdapter;