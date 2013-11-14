angular.module('app.resources').factory('List', ['$resource', function ($resource)
{
    return $resource('List', '/api/lists/:id',
        {
            id: '@id'
        });
}]);