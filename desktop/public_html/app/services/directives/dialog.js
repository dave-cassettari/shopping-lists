angular.module('app.directives').directive('appDialog', function ()
{
    return {
        scope      : {
            loading     : '=',
            saveText    : '@',
            saveClass   : '@',
            saveAction  : '&',
            cancelAction: '&'
        },
        restrict   : 'A',
        templateUrl: '/app/services/directives/dialog.htm'
    }
});