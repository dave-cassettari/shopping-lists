App.Trip = DS.Model.extend(Ember.Copyable, {
    name : DS.attr(),
    lists: DS.attr()
});

App.Trip.FIXTURES = [];