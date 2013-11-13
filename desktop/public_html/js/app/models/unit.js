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