'use strict';

angular.module('app.directives', []);
angular.module('app.resources', ['ngResource']);

var app = angular.module('app', ['ui.router', 'app.resources', 'app.directives']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider)
{
    var findIn = function (array, id, param)
    {
        var i, length = array.length;

        param = param || 'id';

        for (i = 0; i < length; i++)
        {
            if (array[i][param] == id)
            {
                return array[i];
            }
        }

        return null;
    };

    $locationProvider.html5Mode(true);

//    $urlRouterProvider
////        .when('/l?id', '/lists/:id')
////        .when('/t?id', '/trips/:id')
//        .when('/lists', 'home.lists')
//        .otherwise('/');

    $stateProvider
        .state('index', {
            url        : '/',
            controller : 'IndexController',
            templateUrl: '/app/modules/index.htm'
        })
        .state('lists', {
            parent     : 'index',
            url        : 'lists',
            controller : 'ListsIndexController',
            templateUrl: '/app/modules/lists/index.htm',
            resolve    : {
                lists: function ($stateParams, List)
                {
                    return List.query().$promise;
                },
                units: function ($stateParams, Unit)
                {
                    return Unit.query().$promise;
                }
            }
        })
        .state('lists.list', {
            resolve    : {
                list : function ($stateParams, lists)
                {
                    return findIn(lists, $stateParams.list_id);
                },
                items: function ($stateParams, Item)
                {
                    return Item.query({
                        list_id: $stateParams.list_id
                    }).$promise;
                }
            },
            url        : '/{list_id:[0-9]{1,}}',
            controller : 'ListIndexController',
            templateUrl: '/app/modules/lists/list/index.htm'
        })
        .state('lists.create', {
            url        : '/create',
            controller : 'ListsCreateController',
            templateUrl: '/app/modules/lists/create.htm'
        })
        .state('lists.list.add', {
            url        : '/add',
            controller : 'ListsAddController',
            templateUrl: '/app/modules/lists/list/add.htm'
        })
        .state('lists.list.item', {
            abstract: true,
            resolve : {
                item: function ($stateParams, items)
                {
                    return findIn(lists, $stateParams.item_id);
                }
            },
            url     : '/:item_id',
            template: '<div data-ui-view />'
        })
        .state('lists.list.item.index', {
            url        : '',
            controller : 'ItemIndexController',
            templateUrl: '/app/modules/lists/list/item/index.htm'
        })
        .state('lists.list.item.delete', {
            url        : '',
            controller : 'ItemDeleteController',
            templateUrl: '/app/modules/lists/list/item/delete.htm'
        });
}]);

app.run(function ($rootScope)
{
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams)
        {
//            console.log('Going To: ' + toState.name);
        });

    $rootScope.$on('$stateNotFound',
        function (event, unfoundState, fromState, fromParams)
        {
            console.log('NOT FOUND');
            console.log(unfoundState);
        });

    $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error)
        {
            console.log('ERROR');
            console.log(error);
            console.log(toState.name);
        });

    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams)
        {
//            console.log('Success: ' + toState.name);
        });
});