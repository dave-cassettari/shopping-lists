App.List = DS.Model.extend(Ember.Copyable, {
    name      : DS.attr(),
    createdOn : DS.attr(),
    selected  : DS.attr('boolean'),
    user      : DS.belongsTo('user', { async: true }),
    items     : DS.hasMany('item', { async: true }),
    trips     : DS.hasMany('trip', { async: true }),
    itemsCount: function ()
    {
        return this.get('items.length');
    }.property('items.@each')
});