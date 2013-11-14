var ListsCreateController = function ($scope, $state, List, lists)
{
    angular.extend($scope, {
        loading: false,
        model  : {
            name: null
        },
        save   : function ()
        {
            var self = this,
                list = new List(this.model);

            self.loading = true;

            list.$save(function ()
            {
                $scope.model = {};

                lists.push(list);

                self.loading = false;

                $state.transitionTo('home.lists');
            });
        },
        cancel : function ()
        {
            $state.transitionTo('home.lists');
        }
    });
};

angular.module('app').controller('ListsCreateController', ['$scope', '$state', 'List', 'lists', ListsCreateController]);