angular.module('app.directives').directive('appFocus', function ()
{
    return {
        restrict: 'A',
        link    : function ($scope, element, attributes)
        {
            $scope.$watch(attributes.appFocus, function (value)
            {
                if (value)
                {
                    element[0].focus();
                }
            });
        }
    }
});