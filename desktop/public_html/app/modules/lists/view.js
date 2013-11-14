var ListsViewController = function ($scope, list, items)
{
    console.log(items);
    angular.extend($scope, {
        list : list,
        items: items
//        loading: true,
//        lists  : List.query(function ()
//        {
//            $scope.loading = false;
//        })
    });
};

angular.module('app').controller('ListsViewController', ['$scope', 'list', 'items', ListsViewController]);