var ListsIndexController = function ($scope, List)
{
    angular.extend($scope, {
        loading: true,
        lists  : List.query(function ()
        {
            $scope.loading = false;
        })
    });
};

angular.module('app').controller('ListsIndexController', ['$scope', 'List', ListsIndexController]);