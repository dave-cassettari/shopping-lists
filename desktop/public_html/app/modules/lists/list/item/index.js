var ItemIndexController = function ($scope, $state, list, item, units)
{
    AbstractEditController.call(this, $scope, $state, item);

    angular.extend($scope, {
        list          : list,
        units         : units,
        completeRoute : function ()
        {
            return 'lists.list';
        },
        completeParams: function ()
        {
            return { list_id: list.id };
        }
    });
};

angular.module('app').controller('ItemIndexController', ['$scope', '$state', 'list', 'item', 'units', ItemIndexController]);