App.Item = DS.Model.extend(Ember.Copyable, {
    name    : DS.attr(),
    quantity: DS.attr(),
    list    : DS.belongsTo('list', { async: true }),
    unit    : DS.belongsTo('unit', { async: false }),
    amount  : function ()
    {
        var multiplier = this.get('unit.multiplier'),
//            canonical = this.get('unit.canonical'),
            quantity = this.get('quantity'),
            symbol = this.get('unit.symbol'),
            amount = quantity;// * multiplier;

//        console.log(this.get('unit'));
//        console.log(multiplier);
////        console.log(canonical);
//        console.log(quantity);
//        console.log(amount);

        return amount + symbol;
    }.property('quantity', 'unit.multiplier', 'unit.symbol') //'unit.canonical', 'unit.canonical.symbol'
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