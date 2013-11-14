angular.module('app').run(['$templateCache', function($templateCache) {

  $templateCache.put('/app/modules/index.htm',
    "<nav class=sidebar><h1 class=title>Shopping Lists</h1><a href=/lists>Lists</a><a href=/trips>Trips</a></nav><div class=content-wrapper data-ui-view=\"\"><div class=content><p>Choose Lists or Trips</p><p>{{name}}</p></div></div>"
  );


  $templateCache.put('/app/modules/lists/create.htm',
    "<div data-ng-submit=save data-app-modal=\"\" data-cancel-action=cancel()><form class=edit><label><span class=title>Name</span><span class=input-container><input data-ng-model=model.name autofocus></span><span class=error data-ng-show=model.errors data-ng-bind=model.errors></span></label><div class=button-group data-app-dialog=\"\" data-loading=loading data-save-text=Save data-save-class=action-save data-save-action=save() data-cancel-action=cancel()></div></form></div>"
  );


  $templateCache.put('/app/modules/lists/index.htm',
    "<div class=\"content col-2\"><div class=content-header><div class=\"button-group right\"><a href=/lists/create class=\"button action-create\">Create New List</a></div><h2><span class=total data-ng-bind=lists.length></span> Lists</h2></div><ul class=\"items content-scrollable\" data-ng-class=\"{ 'is-loading' : loading }\"><li data-ng-repeat=\"list in lists\"><a href=/lists/{{list.id}} class=item-title data-ng-bind=list.name></a></li></ul></div><div class=\"content col-2\" data-ui-view=\"\"><p>Choose a List to play with</p></div>"
  );


  $templateCache.put('/app/modules/lists/view.htm',
    "<section><div class=\"button-group right\"><a href=/list/{{list.id}}/create class=\"button action-create\">Add Item</a></div><h3><span class=total data-ng-bind=items.length></span><span class=title data-ng-bind=list.name></span></h3><ul class=items><li data-ng-repeat=\"item in items\"><span class=list-wrapper><span class=button-group><a href=/list/{{list.id}}/{{item.id}}/edit class=action-edit>Edit</a> <a href=/list/{{list.id}}/{{item.id}}/delete class=action-delete>Delete</a></span> <span class=item-quantity data-ng-bind=item.amount></span> <span class=item-title data-ng-bind=item.name></span></span></li><li class=empty data-ng-show=\"items.length == 0\">No Items</li></ul><div data-ui-view=\"\"></div></section>"
  );


  $templateCache.put('/app/services/directives/dialog.htm',
    "<button class=\"action-cancel left\" type=reset data-ng-click=cancelAction() data-ng-disabled=loading>Cancel</button><button class=right type=submit data-ng-class=saveClass data-ng-bind=saveText data-ng-click=saveAction() data-ng-disabled=loading></button>"
  );


  $templateCache.put('/app/services/directives/modal.htm',
    "<div class=modal-wrapper data-ng-click=cancelAction()><div class=modal data-ng-transclude=\"\"></div></div>"
  );

}]);
