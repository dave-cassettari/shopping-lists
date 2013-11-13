App.TripsController = Ember.ArrayController.extend({
    sortProperties: ['created_on'],
    sortAscending : false,
    tripsCount    : function ()
    {
        return this.get('model.length');
    }.property('@each')
});