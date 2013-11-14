'use strict';

angular.module('app.directives', []);
angular.module('app.resources', ['ngResource']);

var app = angular.module('app', ['ui.router', 'app.resources', 'app.directives']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider)
{
    $locationProvider.html5Mode(true);

//    $urlRouterProvider
////        .when('/l?id', '/lists/:id')
////        .when('/t?id', '/trips/:id')
//        .when('/lists', 'home.lists')
//        .otherwise('/');

    $stateProvider
        .state('home', {
            url        : '/',
            controller : 'IndexController',
            templateUrl: '/app/modules/index.htm'
        })
//        .state('home.lists', {
//            abstract: true,
//            url     : 'lists',
//            template: '<div data-ui-view />'
//        })
        .state('home.lists', {
            url        : 'lists',
            controller : 'ListsIndexController',
            templateUrl: '/app/modules/lists/index.htm'
        })
        .state('home.lists.create', {
            url        : '/create',
            controller : 'ListsCreateController',
            templateUrl: '/app/modules/lists/create.htm'
        })
//        .state('home.lists.items', {
//            abstract: true,
//            url     : '/:item_id',
//            template: '<div data-ui-view />'
//        })
        .state('home.lists.view', {
            resolve    : {
                list : function ($stateParams, List)
                {
                    return List.get({
                        id: $stateParams.list_id
                    });
                },
                items: function ($stateParams, Item)
                {
                    return Item.query({
                        list_id: $stateParams.list_id
                    });
                }
            },
            url        : '/:list_id',
            controller : 'ListsViewController',
            templateUrl: '/app/modules/lists/view.htm'
        });
//        .state('home.lists.items.create', {
//            url        : '/create',
//            controller : 'ItemsCreateController',
//            templateUrl: '/app/modules/lists/items/create.htm'
//        });
}]);

//app.run(['$rootScope', function ($rootScope)
//{
//    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams)
//    {
//        console.log(unfoundState.to);
//        console.log(unfoundState.toParams);
//        console.log(unfoundState.options);
//    });
//}]);