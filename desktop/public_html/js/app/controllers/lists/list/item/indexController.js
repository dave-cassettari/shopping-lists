App.ItemController = App.AbstractEditController.extend({
    needs      : 'list',
    list       : Ember.computed.alias('controllers.list.model'),
    route      : 'list',
    routeParams: function ()
    {
        return this.get('list');
    }
});