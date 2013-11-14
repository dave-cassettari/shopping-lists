angular.module('app.resources').factory('Item', ['$resource', function ($resource)
{
    return $resource('/api/items/:id',
        {
            id: '@id'
        });

//    Item.prototype.unit = null;
//
////    $scope.$watch()
////
////    Item.prototype.amount = function ()
////    {
//////        var unit_id = this.unit_id,
//////            amount = this.amount,
//////            unit = Unit.get(unit_id);
//////
//////
//////        console.log(unit);
////
////    };
//
//    return Item;
}]);