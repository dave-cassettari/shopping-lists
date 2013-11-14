var ItemIndexController = function ($scope, $state, list, item, units)
{
    var original = angular.copy(item);

    angular.extend($scope, {
        loading: false,
        list   : list,
        model  : item,
        units  : units,
        save   : function ()
        {
            var self = this;

            self.loading = true;

            this.model.$save(function ()
            {
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
            angular.extend(item, original);

            $state.transitionTo('lists.list', { list_id: list.id });
        }
    });
};

angular.module('app').controller('ItemIndexController', ['$scope', '$state', 'list', 'item', 'units', ItemIndexController]);