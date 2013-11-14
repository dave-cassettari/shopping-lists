angular.module('app.directives').directive('label', function ()
{
    return {
        scope      : {
            labelTitle : '@',
            labelErrors: '='
        },
        restrict   : 'A',
        replace    : true,
        transclude : true,
        templateUrl: '/app/services/directives/label.htm'
    }
});