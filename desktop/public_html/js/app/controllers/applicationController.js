App.ApplicationController = Ember.Controller.extend({
    units            : null,
    title            : 'Shopping Lists',
    updateCurrentPath: function ()
    {
        App.set('currentPath', this.get('currentPath'));
    }.observes('currentPath')
});