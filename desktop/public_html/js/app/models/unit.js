App.Unit = DS.Model.extend({
    name        : DS.attr(),
    group       : DS.attr(),
    symbol      : DS.attr(),
    multiplier  : DS.attr(),
    items       : DS.hasMany('item', { async: true }),
    canonical   : DS.attr(),
    alternatives: DS.attr()
//    canonical   : DS.belongsTo('unit', { inverse: 'alternatives', async: true }),
//    alternatives: DS.hasMany('unit', { inverse: 'canonical', async: true })
});

App.Unit.FIXTURES = [
    {
        id          : 1,
        group       : 'Weight',
        name        : 'Grams',
        symbol      : 'g',
        multiplier  : 1,
        canonical   : null,
        alternatives: [2, 3]
    },
    {
        id          : 2,
        group       : 'Weight',
        name        : 'Kilograms',
        symbol      : 'kg',
        multiplier  : 1000,
        canonical   : 1,
        alternatives: []
    },
    {
        id          : 3,
        group       : 'Weight',
        name        : 'Milligrams',
        symbol      : 'mg',
        multiplier  : 0.001,
        canonical   : 1,
        alternatives: []
    },
    {
        id          : 4,
        group       : 'Volume',
        name        : 'Millilitres',
        symbol      : 'ml',
        multiplier  : 1,
        canonical   : null,
        alternatives: [5]
    },
    {
        id          : 5,
        group       : 'Volume',
        name        : 'Litres',
        symbol      : 'l',
        multiplier  : 1000,
        canonical   : 4,
        alternatives: []
    }
];