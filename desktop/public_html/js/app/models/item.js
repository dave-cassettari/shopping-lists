App.Item = DS.Model.extend(Ember.Copyable, {
    name     : DS.attr(),
    quantity : DS.attr(),
    complete : DS.attr(),
    list     : DS.belongsTo('list', { async: true }),
    unit     : DS.belongsTo('unit', { async: false }),
    tripItems: DS.hasMany('tripItem'),
    amount   : function ()
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