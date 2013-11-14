var TripsIndexController = function ($scope, lists)
{
    angular.extend($scope, {
        loading: false,
        lists  : lists
    });
};

angular.module('app').controller('TripsIndexController', ['$scope', 'lists', TripsIndexController]);