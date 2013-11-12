'use strict';

window.App = Ember.Application.create();

Ember.TextField.reopen({
    focusOut: function ()
    {
        this.sendAction('focusOutAction', this.get('value'));
    }
});
Ember.TextField.reopen({
    attributeBindings: ['autofocus']
});
App.ListsCreateController = Ember.ObjectController.extend({
    actions: {
        cancel: function ()
        {
            this.get('model').deleteRecord();

            this.transitionToRoute('lists');
        },
        save  : function ()
        {
            var self = this,
                list = this.get('model');

            var promise = list.save();

            promise.then(function (list)
            {
                self.transitionToRoute('list', list);
            });
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
App.ListAddController = Ember.ObjectController.extend({
    units  : null,
    needs  : 'list',
    list   : Ember.computed.alias('controllers.list.model'),
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('list', this.get('list'));
        },
        save  : function ()
        {
            var item,
                self = this,
                list = this.get('list'),
                data = this.get('model');

            data.set('list', list);

            item = this.store.createRecord('item', data);

            item.save().then(function (saved)
            {
                console.log(saved);

                list.get('items').pushObject(item);
                list.save();

                self.transitionToRoute('list', list);
            });
        }
    }
});
App.ListDeleteController = Ember.ObjectController.extend({
    actions: {
        cancel: function ()
        {
            this.transitionToRoute('list', this.get('model'));
        },
        delete: function ()
        {
            this.get('model').deleteRecord();
            this.get('model').save();

            this.transitionToRoute('lists');
        }
    }
});
App.ListEditController = Ember.ObjectController.extend({
    base   : null,
    actions: {
        cancel: function ()
        {
            var name,
                base = this.get('base'),
                model = this.get('model');

            for (name in base)
            {
                if (!base.hasOwnProperty(name))
                {
                    continue;
                }

                model.set(name, base[name]);
            }

            this.transitionToRoute('list', model);
        },
        save  : function ()
        {
            var model = this.get('model');

            model.save();

            this.transitionToRoute('list', model);
        }
    }
});
App.ListController = Ember.ObjectController.extend({
    actions: {

    }
});
App.ItemController = Ember.ObjectController.extend({
    needs  : 'list',
    list   : Ember.computed.alias('controllers.list.model'),
    actions: {
        cancel: function ()
        {
//            var name,
//                base = this.get('base'),
//                model = this.get('model');
//
//            console.log(this.get('model.name'));
//
//            for (name in base)
//            {
//                if (!base.hasOwnProperty(name))
//                {
//                    continue;
//                }
//
//                model.set(name, base[name]);
//            }

            this.transitionToRoute('list', this.get('list'));
        },
        save  : function ()
        {
            var self = this,
                model = this.get('model');

            console.log(this.get('model.unit.id'));

            this.store.find('unit', this.get('model.unit')).then(function (unit)
            {
                console.log(unit);
                console.log(model);

                model.set('unit', unit);
                model.save().then(function()
                {
                    self.transitionToRoute('list', self.get('list'));
                });
            });
        }
    }
});
App.Item = DS.Model.extend(Ember.Copyable, {
    name    : DS.attr(),
    quantity: DS.attr(),
    list    : DS.belongsTo('list', { async: true }),
    unit    : DS.belongsTo('unit', { async: true }),
    amount  : function ()
    {
        var multiplier = this.get('unit.multiplier'),
            canonical = this.get('unit.canonical'),
            quantity = this.get('quantity'),
            symbol = this.get('unit.canonical.symbol'),
            amount = quantity * multiplier;

        console.log(quantity);

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
    user_id   : DS.attr(),
    created_on: DS.attr(),
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
    name        : DS.attr(),
    group       : DS.attr(),
    symbol      : DS.attr(),
    multiplier  : DS.attr(),
    items       : DS.hasMany('item', { async: true }),
    canonical   : DS.belongsTo('unit', { inverse: 'alternatives', async: true }),
    alternatives: DS.hasMany('unit', { inverse: 'canonical', async: true })
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
            this.route('add');
            this.route('edit');
            this.route('delete');

            this.resource('item', { path: '/:item_id' }, function ()
            {
                this.route('edit');
                this.route('delete');
            });
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
        return this.get('store').createRecord('list');
//        return Ember.Object.create();
    },
    renderTemplate: function ()
    {
        this.render('list.edit', {
            controller: 'listsCreate'
        });
    },
    actions       : {
        error: function (reason)
        {
            alert(reason);
        }
    }
});
App.ListsRoute = Ember.Route.extend({
    model     : function ()
    {
        var route = this;

//        for (var i = 0; i < App.Unit.FIXTURES.length; i++)
//        {
//            var data = App.Unit.FIXTURES[i],
//                unit = this.store.createRecord('unit', data);
//
//            unit.save();
//
////            this.store.find('unit', data.id).then(function(found)
////            {
////                console.log(found);
////            });
//        }

        return this.store.find('list');

//        .then(function (lists)
//        {
//            if (lists.get('length') == 0)
//            {
//                route.transitionTo('lists.create');
//            }
//
//            return lists;
//        });
    },
    afterModel: function (lists)
    {
        var length = lists.get('length');

        if (length === 0)
        {
            this.transitionTo('lists.create');
        }
//        else if (length === 1)
//        {
//            this.transitionTo('list', lists.get('firstObject'));
//        }
    }
});
App.ListAddRoute = Ember.Route.extend({
    model          : function ()
    {
        return Ember.Object.create();
    },
    renderTemplate : function ()
    {
        this.render('item', {
            controller: 'listAdd'
        });
    },
    setupController: function (controller, model)
    {
        controller.set('model', model);
        controller.set('units', controller.store.find('unit'));
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
        controller.set('base', model.get('data'));
    }
});
App.ListRoute = Ember.Route.extend({
    model: function (params)
    {
        return this.store.find('list', params.list_id);
    }
});
App.ItemRoute = Ember.Route.extend({
    model          : function (params)
    {
        var list = this.modelFor('list');

        return this.store.find('item', {
            id     : params.item_id,
            list_id: list.get('id')
        });
    },
    setupController: function (controller, model)
    {
        controller.set('model', model);
        controller.set('units', controller.store.find('unit'));
    }
});
App.TripsRoute = Ember.Route.extend({
    model: function ()
    {
        return this.store.find('trip');
    }
});
//App.LSAdapter = DS.LSAdapter.extend({
//    namespace: 'app.key.1'
//});
//
//DS.JSONSerializer.reopen({
//    serializeHasMany: function (record, json, relationship)
//    {
//        var key = relationship.key;
//
//        var relationshipType = DS.RelationshipChange.determineRelationshipType(
//            record.constructor, relationship);
//
//        if (relationshipType === 'manyToNone'
//                || relationshipType === 'manyToMany'
//            || relationshipType === 'manyToOne')
//        {
//            json[key] = Ember.get(record, key).mapBy('id');
//        }
//    }
//});
//App.ApplicationAdapter = DS.LSAdapter;

//App.ApplicationAdapter = DS.FixtureAdapter;

DS.Model.reopen({
    apiErrors: null
});

DS.RESTAdapter.reopen({
    namespace   : 'api',
    createRecord: function (store, type, record)
    {
        var promise = this._super(store, type, record);

        promise.then(null, function (response)
        {
            var json = response.responseJSON;

            if (json && json.hasOwnProperty('apiErrors'))
            {
                record.set('apiErrors', json.apiErrors);
            }
        });

        return promise;
    },
    updateRecord: function (store, type, record)
    {
        var promise = this._super(store, type, record);

        promise.then(null, function (response)
        {
            var json = response.responseJSON;

            if (json && json.hasOwnProperty('apiErrors'))
            {
                record.set('apiErrors', json.apiErrors);
            }
        });

        return promise;
    }
});

App.ApplicationAdapter = DS.RESTAdapter;
App.EditableView = Ember.View.extend({
    text             : null,
    editing          : false,
    templateName     : 'views/templates/editable',
    actions          : {
        edit: function ()
        {
            console.log('edit');

            this.set('edit', true);
        },
        save: function ()
        {
            console.log('save');

            this.set('edit', false);
        }
    }
});
App.InputView = Ember.View.extend({
    title     : null,
    value     : null,
    layoutName: 'views/layouts/input',
    error     : function ()
    {
        var error,
            errors = this.get('controller.model.apiErrors');

        if (!errors || !errors.hasOwnProperty(this.value))
        {
            return null;
        }

        error = errors[this.value];

        if (error.hasOwnProperty('length') && error.length > 0)
        {
            return error[0];
        }

        return error;

    }.property('controller.model.apiErrors')
});
App.ModalView = Ember.View.extend(Ember.TargetActionSupport, {
    cancelAction    : 'cancel',
    layoutName      : 'views/layouts/modal',
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