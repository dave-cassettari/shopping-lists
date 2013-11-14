var ListIndexController = function ($scope, list, items, units)
{
    angular.extend($scope, {
        list     : list,
        items    : items,
        save     : function ()
        {
            this.list.$save();
        },
        getAmount: function (item)
        {
            var quantity = item.quantity,
                unit = units.find(item.unit_id);

            if (unit.id != unit.canonical_id)
            {
                quantity = quantity * unit.multiplier;

                unit = units.find(unit.canonical_id);
            }

            return quantity + unit.symbol;
        }
    });
};

angular.module('app').controller('ListIndexController', ['$scope', 'list', 'items', 'units', ListIndexController]);