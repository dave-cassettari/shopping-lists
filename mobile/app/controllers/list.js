var listApp = angular.module('listApp', ['ListModel', 'hmTouchevents']);

listApp.controller('IndexController', function ($scope, ListRestangular)
{
    angular.extend($scope,
        {
            open : function (id)
            {
                var webView = new steroids.views.WebView("/views/list/show.html?id=" + id);

                steroids.layers.push(webView);
            },

            lists: ListRestangular.all('list').getList()
        });

    steroids.view.navigationBar.show('Shopping Lists');
});

listApp.controller('ShowController', function ($scope, $filter, ListRestangular)
{
    ListRestangular.all('list').getList().then(function (lists)
    {
        // Then select the one based on the view's id query parameter
        $scope.list = $filter('filter')(lists, {
            list_id: steroids.view.params['id']
        })[0];
    });

    steroids.view.navigationBar.show('Shopping List: ' + steroids.view.params.id);
});
