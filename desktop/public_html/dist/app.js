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
        model  : new List(),
        save   : function ()
        {
            var self = this;

            self.loading = true;

            self.model.$save(function ()
            {
                lists.push(self.model);

                self.loading = false;

                $state.transitionTo('lists.list', { list_id: self.model.id });
            }, function (response)
            {
                response.config.data.errors = response.data.errors;

                self.loading = false;
            });
        },
        cancel : function ()
        {
            $state.transitionTo('lists');
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
var ListsAddController = function ($scope, $state, Item, list, items, units)
{
    angular.extend($scope, {
        units  : units,
        loading: false,
        model  : new Item({
            list_id: list.id
        }),
        save   : function ()
        {
            var self = this;

            self.loading = true;

            self.model.$save(function ()
            {
                items.push(self.model);

                self.loading = false;

                $state.transitionTo('lists.list', { list_id: list.id });
            }, function (response)
            {
                response.config.data.errors = response.data.errors;

                self.loading = false;
            });
        },
        cancel : function ()
        {
            $state.transitionTo('lists.list', { list_id: list.id });
        }
    });
};

angular.module('app').controller('ListsAddController', ['$scope', '$state', 'Item', 'list', 'items', 'units', ListsAddController]);
var ListIndexController = function ($scope, list, items)
{

    angular.extend($scope, {
        list : list,
        items: items,
        save : function ()
        {
            this.list.$save();
        }
    });
};

angular.module('app').controller('ListIndexController', ['$scope', 'list', 'items', ListIndexController]);
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
angular.module('app.directives').directive('appFocus', function ()
{
    return {
        restrict: 'A',
        link    : function ($scope, element, attributes)
        {
            $scope.$watch(attributes.appFocus, function (value)
            {
                if (value)
                {
                    element[0].focus();
                }
            });
        }
    }
});
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
angular.module('app.directives').directive('label', function ()
{
    return {
        scope      : {
            labelTitle : '@',
            labelErrors: '='
        },
        restrict   : 'A',
        replace    : true,
        transclude : true,
        templateUrl: '/app/services/directives/label.htm'
    }
});
angular.module('app.directives').directive('modal', function ()
{
    return {
        scope      : {
            modalCancelAction: '&'
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

//    Item.prototype.unit = null;
//
////    $scope.$watch()
////
////    Item.prototype.amount = function ()
////    {
//////        var unit_id = this.unit_id,
//////            amount = this.amount,
//////            unit = Unit.get(unit_id);
//////
//////
//////        console.log(unit);
////
////    };
//
//    return Item;
}]);
angular.module('app.resources').factory('List', ['$resource', function ($resource)
{
    return $resource('/api/lists/:id',
        {
            id: '@id'
        });
}]);
angular.module('app.resources').factory('Unit', ['$resource', function ($resource)
{
    return $resource('/api/units/:id',
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