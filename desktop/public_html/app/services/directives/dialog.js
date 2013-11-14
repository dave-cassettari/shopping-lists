angular.module('app.directives').directive('appDialog', function ()
{
    return {
        restrict: 'A',
        scope      : {
            saveText    : '@',
            saveClass   : '@',
            saveAction  : '&',
            cancelAction: '&'
        },
        templateUrl: '/app/services/directives/dialog.htm'
    }
});