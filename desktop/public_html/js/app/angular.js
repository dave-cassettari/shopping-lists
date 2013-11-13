'use strict';

var app = angular.module('lists', ['ngResource']);

app.factory('$relationalResource', ['$resource', '$injector', function ($resource, $injector)
{
    return function (url, paramDefaults, actions)
    {
        var Resource = $resource(url, paramDefaults, actions);

        Resource.hasMany = { };
        Resource.belongsTo = { };

        Resource.init = function ()
        {
            var name;

            for (name in Resource.belongsTo)
            {
                if (!Resource.belongsTo.hasOwnProperty(name))
                {
                    continue;
                }

                (function (name)
                {
                    var cached = null,
                        relation = Resource.belongsTo[name],
                        resource = relation.resource,
                        foreignKey = relation.key,
                        related = $injector.get(resource);

                    Resource.prototype.__defineGetter__(name, function ()
                    {
                        if (cached !== null)
                        {
                            return cached;
                        }

                        var name = foreignKey,
                            value = this['id'],
                            params = {};

                        if (angular.isArray(value))
                        {
                            name = name + '[]';
                        }

                        params[name] = value;

                        return cached = related.query(params);
                    });
                })(name);
            }

            for (name in Resource.hasMany)
            {
                if (!Resource.hasMany.hasOwnProperty(name))
                {
                    continue;
                }

                (function (name)
                {
                    var cached = null,
                        relation = Resource.hasMany[name],
                        resource = relation.resource,
                        foreignKey = relation.key,
                        related = $injector.get(resource);

                    Resource.prototype.__defineGetter__(name, function ()
                    {
                        if (cached !== null)
                        {
                            return cached;
                        }

                        var name = foreignKey,
                            value = this['id'],
                            params = {};

                        if (angular.isArray(value))
                        {
                            name = name + '[]';
                        }

                        params[name] = value;

                        return cached = related.query(params);
                    });
                })(name);
            }

            return Resource;
        };

        return Resource;
    };
}]);

app.factory('User', ['$relationalResource', function ($relationalResource)
{
    var User = $relationalResource('/api/items/:id',
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
    var Item = $relationalResource('/api/items/:id',
        {
            id     : '@id',
            list_id: '@list_id'
        });

    Item.prototype.belongsTo =
    {
        list_id: 'List'
    };

    return Item.init();
}]);

app.factory('List', ['$relationalResource', function ($relationalResource)
{
    var List = $relationalResource('/api/lists/:id',
        {
            id: '@id'
        });

    List.belongsTo =
    {
        user_id: 'Item'
    };

    List.hasMany =
    {
        items: {
            resource: 'Item',
            key     : 'list_id'
        }
    };

    return List.init();
}]);

/*app.factory('List', ['$resource', '$injector', function ($resource, $injector)
{
    var List = $resource('/api/lists/:id',
        {
            id: '@id'
        });

    List.belongsTo =
    {
        user_id: 'Item'
    };

    List.hasMany =
    {
        items: {
            resource: 'Item',
            key     : 'list_id'
        }
    };

    for (var name in List.hasMany)
    {
        if (!List.hasMany.hasOwnProperty(name))
        {
            continue;
        }

        (function (name)
        {
            var cached = null,
                relation = List.hasMany[name],
                resource = relation.resource,
                foreignKey = relation.key,
                related = $injector.get(resource);

            List.prototype.__defineGetter__(name, function ()
            {
                if (cached !== null)
                {
                    return cached;
                }

                var name = foreignKey,
                    value = this['id'],
                    params = {};

                if (angular.isArray(value))
                {
                    name = name + '[]';
                }

                params[name] = value;

                return cached = related.query(params);
            });
        })(name);
    }

    return List;
}]);*/

var ListsController = function ($scope, List, Item)
{
    angular.extend($scope, {
        lists: List.query()
    });
};

app.controller('ListsController', ['$scope', 'List', 'Item', ListsController]);