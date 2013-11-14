'use strict';

var app = angular.module('lists', ['ngResource']);

app.factory('$relationalResource', ['$resource', '$injector', function ($resource, $injector)
{
    var cache = {},
        models = {};

    return function (name, url, paramDefaults, actions)
    {
        var id = 'id',
            Resource = $resource(url, paramDefaults, actions);

        Resource.prototype.hasMany = { };
        Resource.prototype.belongsTo = { };

        cache[name] = {};
        models[name] = Resource;

        Resource.prototype.toJSON = function()
        {
            var key,
                name,
                relation,
                attributes = this;

            for (name in Resource.belongsTo)
            {
                if (!Resource.belongsTo.hasOwnProperty(name))
                {
                    continue;
                }

                relation = Resource.belongsTo[name];

                if (angular.isObject(attributes[name]))
                {
                    attributes[name] = attributes[name]['id'];
                }
            }

            for (name in Resource.hasMany)
            {
                if (!Resource.hasMany.hasOwnProperty(name))
                {
                    continue;
                }

                relation = Resource.hasMany[name];
                key = relation.key;

                if (angular.isObject(attributes[name]))
                {
                    attributes[name] = attributes[name]['id'];
                }
            }

            return attributes;
        };

        var superGet = Resource.get;
        var superQuery = Resource.query;

        var addToCache = function (object)
        {
            var id = object['id'];

            cache[name][id] = object;
        };

        Resource.get = function (params, success, error)
        {
            var id;

            if (params.hasOwnProperty('id'))
            {
                id = params['id'];

                if (cache[name].hasOwnProperty(id))
                {
                    return cache[name][id];
                }
            }

            return superGet(params, function (response)
            {
                addToCache(response);

                if (success)
                {
                    success(response);
                }
            }, error);
        };

        Resource.query = function (params, success, error)
        {
            // TODO: used cached

            return superQuery(params, function (response)
            {
                angular.forEach(response, function (object)
                {
                    addToCache(object);
                });

                if (success)
                {
                    success(response);
                }
            }, error);
        };

        Resource.init = function ()
        {
            var name;

            for (name in Resource.belongsTo)
            {
                if (!Resource.belongsTo.hasOwnProperty(name))
                {
                    continue;
                }

                (function ()
                {
                    var getter = name;

                    Resource.prototype.__defineGetter__(getter, function ()
                    {
                        var cacheKey = '__' + getter,
                            relation = Resource.belongsTo[getter],
                            foreignKey = relation.key,
                            related = models[relation.resource];

                        if (this.hasOwnProperty(cacheKey))
                        {
                            return this[cacheKey];
                        }

                        if (!this.hasOwnProperty(foreignKey))
                        {
                            return null;
                        }

                        return this[cacheKey] = related.get({
                            id: this[foreignKey]
                        });
                    });

                    Resource.prototype.__defineSetter__(getter, function (value)
                    {
                        var cacheKey = '__' + getter;

                        this[cacheKey] = value;
                    });
                })();
            }

            for (name in Resource.hasMany)
            {
                if (!Resource.hasMany.hasOwnProperty(name))
                {
                    continue;
                }

                (function ()
                {
                    var getter = name;

                    Resource.prototype.__defineGetter__(getter, function ()
                    {
                        var cacheKey = '__' + getter,
                            relation = Resource.hasMany[getter],
                            foreignKey = relation.key,
                            related = models[relation.resource];

                        if (this.hasOwnProperty(cacheKey))
                        {
                            return this[cacheKey];
                        }

                        if (!this.hasOwnProperty('id'))
                        {
                            return null;
                        }

                        var name = foreignKey,
                            value = this['id'],
                            params = {};

                        if (angular.isArray(value))
                        {
                            name = name + '[]';
                        }

                        params[name] = value;

                        return this[cacheKey] = related.query(params);
                    });

                    Resource.prototype.__defineSetter__(getter, function (value)
                    {
                        var cacheKey = '__' + getter;

                        this[cacheKey] = value;
                    });
                })();
            }

            return Resource;
        };

        return Resource;
    };
}]);

app.factory('User', ['$relationalResource', function ($relationalResource)
{
    var User = $relationalResource('User', '/api/items/:id',
        {
            id     : '@id',
            list_id: '@list_id'
        });

    User.hasMany =
    {
        list_ids: 'List'
    };

    return User.init();
}]);

app.factory('Item', ['$relationalResource', function ($relationalResource)
{
    var Item = $relationalResource('Item', '/api/items/:id',
        {
            id     : '@id',
            list_id: '@list_id'
        });

    Item.belongsTo =
    {
        list: {
            resource: 'List',
            key     : 'list_id'
        }
    };

    return Item.init();
}]);

app.factory('List', ['$relationalResource', function ($relationalResource)
{
    var List = $relationalResource('List', '/api/lists/:id',
        {
            id: '@id'
        });

//    List.belongsTo =
//    {
//        user_id: 'Item'
//    };

    List.hasMany =
    {
        items: {
            resource: 'Item',
            key     : 'list_id'
        }
    };

    return List.init();
}]);

var ListsController = function ($scope, List, Item)
{
    angular.extend($scope, {
        lists: List.query({}, function (lists)
        {
            var oldList = lists[0],
                newList = new List({
                    'name': 'New List 1'
                });

            oldList.items.$promise.then(function (items)
            {
                var newItem = new Item({
                    name: 'test item 1'
                });

                $scope.lists.push(newList);

                console.log(newList.items);

                newList.items = [];

                console.log(newList.items);

                newList.items.push(newItem);

                console.log(newList.items);

                newItem.list = newList;

                newList.$save(function (response)
                {
                    console.log(response);
                });
            });
        })
    });
};

app.controller('ListsController', ['$scope', 'List', 'Item', ListsController]);