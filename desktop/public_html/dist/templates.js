angular.module('app').run(['$templateCache', function($templateCache) {

  $templateCache.put('/app/modules/lists/index.htm',
    "<ul class=items><li data-ng-repeat=\"list in list\"><div class=button-group></div><span class=item-title data-ng-bind=list.name></span></li></ul>"
  );

}]);
