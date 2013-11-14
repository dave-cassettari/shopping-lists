angular.module('app.resources').factory('Item', ['$resource', function ($resource)
{
    return $resource('Item', '/api/items/:id',
        {
            id: '@id'
        });
}]);