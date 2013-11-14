angular.module('app.directives').directive('appModal', function ()
{
    return {
        scope      : {
            cancelAction: '&'
        },
        restrict   : 'A',
        replace    : true,
        transclude : true,
        templateUrl: '/app/services/directives/modal.htm'
    }
});