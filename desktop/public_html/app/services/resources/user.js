angular.module('app.resources').factory('User', ['$resource', function ($resource)
{
    return $resource('User', '/api/items/:id',
        {
            id: '@id'
        });
}]);