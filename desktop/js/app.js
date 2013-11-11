'use strict';

window.App = Ember.Application.create();
App.ListEditController = Ember.ObjectController.extend({
    data   : null,
    actions: {
        save: function ()
        {
            var data = this.get('data'),
                model = this.get('model');

            console.log(data);
            console.log(model.get('data'));

            model.set('data', data);
            model.save();

            console.log(model.get('data'));

            this.transitionToRoute('list', model);
        }
    }
});
App.ListController = Ember.ObjectController.extend({
    confirm: false,
    actions: {
        remove: function ()
        {
            if (!this.get('confirm'))
            {
                this.set('confirm', true);

                return;
            }

            this.set('confirm', false);
            this.get('model').deleteRecord();
            this.get('model').save();

            this.transitionToRoute('lists');
        }
    }
});
App.ListsController = Ember.ArrayController.extend({
    sortProperties: ['created_on', 'name'],
    sortAscending : false,
    listsCount    : function ()
    {
        return this.get('model.length');
    }.property('@each')
});
App.List = DS.Model.extend(Ember.Copyable, {
    name : DS.attr(),
    items: DS.attr()
});

App.List.FIXTURES = [
    {
        id        : 1,
        name      : 'Sausage and Mash',
        created_on: '2013-11-11 12:10:00',
        created_by: 1,
        items     : []
    },
    {
        id        : 2,
        name      : 'Weekly Essentials',
        created_on: '2013-11-11 11:45:00',
        created_by: 2,
        items     : []
    }
];
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
App.Router.map(function ()
{
    this.resource('lists', function ()
    {
        this.resource('list', { path: '/:list_id' }, function ()
        {
            this.route('edit');
        });
        this.route('create');
    });
});
App.IndexRoute = Ember.Route.extend({
    redirect: function ()
    {
        this.transitionTo('lists');
    }
});
App.ListsCreateRoute = Ember.Route.extend({
    model         : function ()
    {
        return Em.Object.create({});
    },
    renderTemplate: function ()
    {
        this.render('list.edit', {
            controller: 'listsCreate'
        });
    }
});
App.ListsRoute = Ember.Route.extend({
    model: function ()
    {
        return this.store.find('list');
    }
});
App.ListEditRoute = Ember.Route.extend({
    model          : function ()
    {
        return this.modelFor('list');
    },
    setupController: function (controller, model)
    {
        var data = Ember.Object.create(model.get('data'));

        controller.set('data', data);
        controller.set('model', model);
    }
});
App.ListRoute = Ember.Route.extend({
    model: function (params)
    {
        return this.store.find('list', params.list_id);
    }
});
App.ApplicationAdapter = DS.FixtureAdapter;