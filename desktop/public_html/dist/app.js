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
        .state('home.lists', {
            url        : 'lists',
            controller : 'ListsIndexController',
            templateUrl: '/app/modules/lists/index.htm',
            resolve    : {
                lists: function ($stateParams, List)
                {
                    return List.query();
                }
            }
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
var ListsCreateController = function ($scope, $state, List, lists)
{
    angular.extend($scope, {
        loading: false,
        model  : {
            name: null
        },
        save   : function ()
        {
            var self = this,
                list = new List(this.model);

            self.loading = true;

            list.$save(function ()
            {
                $scope.model = {};

                lists.push(list);

                self.loading = false;

                $state.transitionTo('home.lists');
            });
        },
        cancel : function ()
        {
            $state.transitionTo('home.lists');
        }
    });
};

angular.module('app').controller('ListsCreateController', ['$scope', '$state', 'List', 'lists', ListsCreateController]);
var ListsIndexController = function ($scope, lists)
{
    angular.extend($scope, {
        loading: false,
        lists  : lists
    });
};

angular.module('app').controller('ListsIndexController', ['$scope', 'lists', ListsIndexController]);
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