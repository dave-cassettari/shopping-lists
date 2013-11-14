var ListIndexController = function ($scope, list, items)
{
    angular.extend($scope, {
        list : list,
        items: items,
        save : function ()
        {
            this.list.$save();
        }
    });
};

angular.module('app').controller('ListIndexController', ['$scope', 'list', 'items', ListIndexController]);