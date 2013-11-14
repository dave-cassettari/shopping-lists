angular.module('app.resources').factory('Unit', ['$resource', function ($resource)
{
    return $resource('/api/units/:id',
        {
            id: '@id'
        });
}]);