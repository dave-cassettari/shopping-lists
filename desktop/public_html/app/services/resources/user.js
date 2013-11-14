angular.module('app.resources').factory('User', ['$resource', function ($resource)
{
    return $resource('/api/items/:id',
        {
            id: '@id'
        });
}]);