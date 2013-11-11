App.ListsController = Ember.ArrayController.extend({
    sortProperties: ['created_on', 'name'],
    sortAscending : false,
    listsCount    : function ()
    {
        return this.get('model.length');
    }.property('@each')
});