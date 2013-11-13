App.User = DS.Model.extend({
    firstName: DS.attr(),
    lastName : DS.attr(),
    lists    : DS.hasMany('list', { async: true }),
    fullName : function ()
    {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName')
});
