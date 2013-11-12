App.List = DS.Model.extend(Ember.Copyable, {
    name      : DS.attr(),
    user_id   : DS.attr(),
    created_on: DS.attr(),
    items     : DS.hasMany('item', { async: true }),
    itemsCount: function ()
    {
        return this.get('items.length');
    }.property('items.@each')
});

App.List.FIXTURES = [
    {
        id        : 1,
        name      : 'Sausage and Mash',
        created_on: '2013-11-11 12:10:00',
        created_by: 1,
        items     : [1, 2, 3]
    },
    {
        id        : 2,
        name      : 'Weekly Essentials',
        created_on: '2013-11-11 11:45:00',
        created_by: 2,
        items     : []
    }
];