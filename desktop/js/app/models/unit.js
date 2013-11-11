App.Unit = DS.Model.extend({
    name      : DS.attr(),
    group     : DS.attr(),
    symbol    : DS.attr(),
    multiplier: DS.attr(),
    items     : DS.hasMany('unit', { async: true }),
    canonical : DS.belongsTo('unit')
});

App.Unit.FIXTURES = [
    {
        id        : 1,
        group     : 'Weight',
        name      : 'Grams',
        symbol    : 'g',
        multiplier: 1,
        canonical : 1
    },
    {
        id        : 2,
        group     : 'Weight',
        name      : 'Kilograms',
        symbol    : 'kg',
        multiplier: 0.001,
        canonical : 1
    },
    {
        id        : 3,
        group     : 'Weight',
        name      : 'Milligrams',
        symbol    : 'mg',
        multiplier: 1000,
        canonical : 1
    },
    {
        id        : 4,
        group     : 'Volume',
        name      : 'Millilitres',
        symbol    : 'ml',
        multiplier: 1,
        canonical : 4
    },
    {
        id        : 4,
        group     : 'Volume',
        name      : 'Litres',
        symbol    : 'l',
        multiplier: 0.001,
        canonical : 4
    }
];