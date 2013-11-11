App.Item = DS.Model.extend(Ember.Copyable, {
    name    : DS.attr(),
    quantity: DS.attr(),
    list    : DS.belongsTo('list'),
    unit    : DS.belongsTo('unit'),
    amount  : function ()
    {
        var unit = this.get('unit'),
            quantity = this.get('quantity'),
            canonical = unit.get('canonical');

        console.log(this.get('list'));
        console.log(unit);
        console.log(unit.get('symbol'));
        console.log(quantity);
        console.log(canonical);

        return quantity + this.get('unit.symbol');
    }.property('quantity', 'unit')
});

App.Item.FIXTURES = [
    {
        id      : 1,
        name    : 'Sausages',
        list    : 1,
        unit    : 2,
        quantity: 0.1
    },
    {
        id      : 2,
        name    : 'Mash',
        list    : 1,
        unit    : 1,
        quantity: 400
    },
    {
        id      : 3,
        name    : 'Gravy',
        list    : 1,
        unit    : 4,
        quantity: 600
    }
];