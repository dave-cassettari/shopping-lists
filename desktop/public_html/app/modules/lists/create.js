var ListsCreateController = function ($scope, $state, List, lists)
{
    AbstractEditController.call(this, $scope, $state, new List());

    angular.extend($scope, {
        cancelRoute: function ()
        {
            return 'lists';
        },
        saveRoute  : function ()
        {
            return 'lists.list';
        },
        saveParams : function (model)
        {
            return { list_id: model.id };
        },
        onSave     : function (model)
        {
            lists.push(model);
        }
    });
};

angular.module('app').controller('ListsCreateController', ['$scope', '$state', 'List', 'lists', ListsCreateController]);