angular.module('app.directives').directive('appModal', function ()
{
    return {
        scope      : {
            cancelAction: '&'
        },
        restrict   : 'A',
        replace    : true,
        transclude : true,
        templateUrl: '/app/services/directives/modal.htm',
        link       : function ($scope, element)
        {
            var $window = $(element).find('.modal');

            $window.css('height', 'auto');
            $window.css('margin-top', -$window.height() / 2);
            $window.click(function (event)
            {
                event.stopPropagation();
            });
        }
    }
});