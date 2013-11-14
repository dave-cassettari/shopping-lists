var ListsIndexController = function ($scope, lists)
{
    angular.extend($scope, {
        loading: false,
        lists  : lists
    });
};

angular.module('app').controller('ListsIndexController', ['$scope', 'lists', ListsIndexController]);