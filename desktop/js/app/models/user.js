App.User = DS.Model.extend({
    firstName: DS.attr(),
    lastName : DS.attr(),
    lists    : DS.attr(),
    fullName : function ()
    {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName')
});

App.User.FIXTURES = [
    {
        id  : 1,
        name: 'Dave Cassettari'
    },
    {
        id  : 2,
        name: 'Haran Rajkumar'
    }
];