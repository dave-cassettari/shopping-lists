App.TripItem = DS.Model.extend({
    complete: DS.attr('boolean'),
    trip    : DS.belongsTo('trip'),
    item    : DS.belongsTo('item')
});