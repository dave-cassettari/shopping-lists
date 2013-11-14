var ListsCreateController = function ($scope, $state, List, lists)
{
    angular.extend($scope, {
        loading: false,
        model  : new List(),
        save   : function ()
        {
            var self = this;

            self.loading = true;

            self.model.$save(function ()
            {
                lists.push(self.model);

                self.loading = false;

                $state.transitionTo('lists.list', { list_id: self.model.id });
            }, function (response)
            {
                response.config.data.errors = response.data.errors;

                self.loading = false;
            });
        },
        cancel : function ()
        {
            $state.transitionTo('lists');
        }
    });
};

angular.module('app').controller('ListsCreateController', ['$scope', '$state', 'List', 'lists', ListsCreateController]);