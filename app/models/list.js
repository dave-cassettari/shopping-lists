(function ()
{
    if (typeof angular == 'undefined')
    {
        return;
    }

    var ListModel = angular.module('ListModel', ['restangular']);

    ListModel.factory('ListRestangular', function (Restangular)
    {
        return Restangular.withConfig(function (RestangularConfigurer)
        {
            RestangularConfigurer.setBaseUrl('http://' + window.location.host + '/data');
            RestangularConfigurer.setRequestSuffix('.json');
            RestangularConfigurer.setRestangularFields({
                id: 'list_id'
            });
        });
    });
})();
