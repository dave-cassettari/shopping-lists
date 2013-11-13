App.Trip = DS.Model.extend(Ember.Copyable, {
    createdOn: DS.attr(),
    user     : DS.belongsTo('user', { async: true}),
    lists    : DS.hasMany('list', { async: true }),
    tripItems: DS.hasMany('tripItem', { async: true })
});