angular.module('app.directives').directive('inline', function ()
{
    return {
        scope      : {
            inlineEdit : '@',
            inlineModel: '=',
            inlineSave : '&'
        },
        restrict   : 'A',
        templateUrl: '/app/services/directives/inline.htm'
    }
});