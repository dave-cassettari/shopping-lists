var ListsController = function ($scope, List, Item)
{
    angular.extend($scope, {
        lists: List.query({}, function (lists)
        {
            var oldList = lists[0],
                newList = new List({
                    'name': 'New List 1'
                });

            oldList.items.$promise.then(function (items)
            {
                var newItem = new Item({
                    name: 'test item 1'
                });

                $scope.lists.push(newList);

                console.log(newList.items);

                newList.items = [];

                console.log(newList.items);

                newList.items.push(newItem);

                console.log(newList.items);

                newItem.list = newList;

                newList.$save(function (response)
                {
                    console.log(response);
                });
            });
        })
    });
};

angular.module('app').controller('ListsController', ['$scope', 'List', 'Item', ListsController]);