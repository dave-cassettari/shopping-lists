'use strict';

window.App = Ember.Application.create();
App.ListsCreateController = Ember.ObjectController.extend({
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('lists');
        },
        save  : function ()
        {
            var list = this.store.createRecord('list', this.get('model'));

            list.save();

            this.transitionToRoute('list', list);
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
App.ListDeleteController = Ember.ObjectController.extend({
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('list', this.get('model'));
        },
        save  : function ()
        {
            this.get('model').deleteRecord();
            this.get('model').save();

            this.transitionToRoute('lists');
        }
    }
});
App.ListEditController = Ember.ObjectController.extend({
    data   : null,
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('list', this.get('model'));
        },
        save  : function ()
        {
            var name,
                data = this.get('data'),
                model = this.get('model');

            for (name in data)
            {
                if (!data.hasOwnProperty(name))
                {
                    continue;
                }

                model.set(name, data[name]);
            }

            model.save();

            this.transitionToRoute('list', model);
        }
    }
});
App.ListController = Ember.ObjectController.extend({
    actions   : {
//        cancel: function ()
//        {
//            this.set('confirm', false)
//        },
//        delete: function ()
//        {
//            if (!this.get('confirm'))
//            {
//                this.set('confirm', true);
//
//                return;
//            }
//
//            this.set('confirm', false);
//            this.get('model').deleteRecord();
//            this.get('model').save();
//
//            this.transitionToRoute('lists');
//        }
    }
});
Ember.Handlebars.helper('label-input', App.InputView);
App.Item = DS.Model.extend(Ember.Copyable, {
    name    : DS.attr(),
    quantity: DS.attr(),
    list    : DS.belongsTo('list'),
    unit    : DS.belongsTo('unit'),
    amount  : function ()
    {
        var multiplier = this.get('unit.multiplier'),
            canonical = this.get('unit.canonical'),
            quantity = this.get('quantity'),
            symbol = this.get('unit.canonical.symbol'),
            amount = quantity * multiplier;

        return amount + symbol;
    }.property('quantity', 'unit.multiplier', 'unit.canonical', 'unit.canonical.symbol')
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
App.List = DS.Model.extend(Ember.Copyable, {
    name      : DS.attr(),
    items     : DS.hasMany('item', { async: true }),
    itemsCount: function ()
    {
        return this.get('items.length');
    }.property('items.@each')
});

App.List.FIXTURES = [
    {
        id        : 1,
        name      : 'Sausage and Mash',
        created_on: '2013-11-11 12:10:00',
        created_by: 1,
        items     : [1, 2, 3]
    },
    {
        id        : 2,
        name      : 'Weekly Essentials',
        created_on: '2013-11-11 11:45:00',
        created_by: 2,
        items     : []
    }
];
App.Trip = DS.Model.extend(Ember.Copyable, {
    name : DS.attr(),
    lists: DS.attr()
});

App.Trip.FIXTURES = [];
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
        multiplier: 1000,
        canonical : 1
    },
    {
        id        : 3,
        group     : 'Weight',
        name      : 'Milligrams',
        symbol    : 'mg',
        multiplier: 0.001,
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
        multiplier: 1000,
        canonical : 4
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
            this.route('delete');
        });
        this.route('create');
    });

    this.resource('trips', function ()
    {
        this.resource('trip', { path: '/:trip_id' }, function ()
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
        return Ember.Object.create();
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
        var route = this;

        return this.store.find('list').then(function(lists)
        {
            if (lists.get('length') == 0)
            {
                route.transitionTo('lists.create');
            }

            return lists;
        });
    }
});
App.ListDeleteRoute = Ember.Route.extend({
    model: function ()
    {
        return this.modelFor('list');
    }
});
App.ListEditRoute = Ember.Route.extend({
    model          : function ()
    {
        return this.modelFor('list');
    },
    setupController: function (controller, model)
    {
        controller.set('model', model);
        controller.set('data', model.get('data'));
    }
});
App.ListRoute = Ember.Route.extend({
    model: function (params)
    {
        return this.store.find('list', params.list_id);
    }
});
App.TripsRoute = Ember.Route.extend({
    model: function ()
    {
        return this.store.find('trip');
    }
});
App.LSAdapter = DS.LSAdapter.extend({
    namespace: 'lists'
});

App.ApplicationAdapter = DS.LSAdapter;
//App.ApplicationAdapter = DS.FixtureAdapter;
App.InputView = Ember.View.extend({
    title     : null,
    layoutName: 'layouts/input'
});
App.ModalView = Ember.View.extend(Ember.TargetActionSupport, {
    cancelAction    : 'cancel',
    layoutName      : 'layouts/modal',
    didInsertElement: function ()
    {
        var $modal = this.$().find('.modal');

        $modal.css('height', 'auto');
        $modal.css('margin-top', -$modal.height() / 2);
    },
    click           : function (event)
    {
        if ($(event.toElement).hasClass('modal-wrapper'))
        {
            this.triggerAction({
                action: this.get('cancelAction'),
                target: this.get('controller')
            });
        }
    }
});