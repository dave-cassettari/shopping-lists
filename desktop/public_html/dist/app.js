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
var IndexController = function ($scope)
{
    angular.extend($scope, {
        name: 'test'
    });
};

angular.module('app').controller('IndexController', ['$scope', IndexController]);
var ListsCreateController = function ($scope, $state, List)
{
    angular.extend($scope, {
        model : {
            name: 'test list'
        },
        save  : function ()
        {
            console.log('save');
        },
        cancel: function ()
        {
            $state.transitionTo('home.lists');
        }
    });
};

angular.module('app').controller('ListsCreateController', ['$scope', '$state', 'List', ListsCreateController]);
var ListsIndexController = function ($scope, List)
{
    angular.extend($scope, {
        loading: true,
        lists  : List.query(function ()
        {
            $scope.loading = false;
        })
    });
};

angular.module('app').controller('ListsIndexController', ['$scope', 'List', ListsIndexController]);
var ListsViewController = function ($scope, list, items)
{
    console.log(items);
    angular.extend($scope, {
        list : list,
        items: items
//        loading: true,
//        lists  : List.query(function ()
//        {
//            $scope.loading = false;
//        })
    });
};

angular.module('app').controller('ListsViewController', ['$scope', 'list', 'items', ListsViewController]);
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
angular.module('app.resources').factory('Item', ['$resource', function ($resource)
{
    return $resource('/api/items/:id',
        {
            id: '@id'
        });
}]);
angular.module('app.resources').factory('List', ['$resource', function ($resource)
{
    return $resource('/api/lists/:id',
        {
            id: '@id'
        });
}]);
angular.module('app.resources').factory('User', ['$resource', function ($resource)
{
    return $resource('/api/items/:id',
        {
            id: '@id'
        });
}]);