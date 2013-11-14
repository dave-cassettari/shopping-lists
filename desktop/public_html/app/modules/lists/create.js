var ListsCreateController = function ($scope, $state, List)
{
    angular.extend($scope, {
        model : {
            name: 'test list'
        },
        save  : function ()
        {
            console.log('save');
        },
        cancel: function ()
        {
            $state.transitionTo('home.lists');
        }
    });
};

angular.module('app').controller('ListsCreateController', ['$scope', '$state', 'List', ListsCreateController]);