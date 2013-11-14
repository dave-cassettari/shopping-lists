var ListsAddController = function ($scope, $state, Item, list, items, units)
{
    angular.extend($scope, {
        units  : units,
        loading: false,
        model  : new Item({
            list_id: list.id
        }),
        save   : function ()
        {
            var self = this;

            self.loading = true;

            self.model.$save(function ()
            {
                items.push(self.model);

                self.loading = false;

                $state.transitionTo('lists.list', { list_id: list.id });
            }, function (response)
            {
                response.config.data.errors = response.data.errors;

                self.loading = false;
            });
        },
        cancel : function ()
        {
            $state.transitionTo('lists.list', { list_id: list.id });
        }
    });
};

angular.module('app').controller('ListsAddController', ['$scope', '$state', 'Item', 'list', 'items', 'units', ListsAddController]);