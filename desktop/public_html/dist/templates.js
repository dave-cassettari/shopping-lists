angular.module('app').run(['$templateCache', function($templateCache) {

  $templateCache.put('/app/modules/index.htm',
    "<nav class=sidebar><h1 class=title>Shopping Lists</h1><a data-ui-sref=lists>Lists</a><a data-ui-sref=trips>Trips</a></nav><div class=content-wrapper data-ui-view=\"\"><div class=content><p>Choose Lists or Trips</p><p>{{name}}</p></div></div>"
  );


  $templateCache.put('/app/modules/lists/create.htm',
    "<div data-modal=\"\" data-modal-cancel-action=cancel()><form class=edit data-ng-submit=save><label data-label=\"\" data-label-title=Name data-label-errors=model.errors.name><input data-ng-model=model.name data-ng-focus=true></label><div class=button-group data-app-dialog=\"\" data-loading=loading data-save-text=Save data-save-class=action-save data-save-action=save() data-cancel-action=cancel()></div></form></div>"
  );


  $templateCache.put('/app/modules/lists/index.htm',
    "<div class=\"content col-2\"><div class=content-header><div class=\"button-group right\"><a class=\"button action-create\" data-ui-sref=lists.create>Create New List</a></div><h2><span class=total data-ng-bind=lists.length></span> Lists</h2></div><ul class=\"items content-scrollable\" data-ng-class=\"{ 'is-loading' : loading }\"><li data-ng-repeat=\"list in lists\"><a class=item-title data-ui-sref=\"lists.list({ list_id: list.id })\" data-ng-bind=list.name></a></li></ul></div><div class=\"content col-2\" data-ui-view=\"\"><p>Choose a List to play with</p></div>"
  );


  $templateCache.put('/app/modules/lists/list/add.htm',
    "<div data-modal=\"\" data-modal-cancel-action=cancel()><form class=edit data-ng-submit=save><label data-label=\"\" data-label-title=Name data-label-errors=model.errors.name><input data-ng-model=model.name data-ng-focus=true></label><label data-label=\"\" data-label-title=Quantity data-label-errors=model.errors.quantity><input data-ng-model=model.quantity></label><label data-label=\"\" data-label-title=Unit data-label-errors=model.errors.unit_id><select data-ng-model=model.unit_id data-ng-options=\"unit.id as unit.name group by unit.group for unit in units\"></select></label><div class=button-group data-app-dialog=\"\" data-loading=loading data-save-text=Save data-save-class=action-save data-save-action=save() data-cancel-action=cancel()></div></form></div>"
  );


  $templateCache.put('/app/modules/lists/list/index.htm',
    "<section><div class=\"button-group right\"><a class=\"button action-create\" data-ui-sref=\"lists.list.add({ list_id: list.id })\">Add Item</a></div><h3><span class=total data-ng-bind=items.length></span><span class=inline data-inline=\"\" data-inline-model=list.name data-inline-save=save()></span></h3><ul class=items><li data-ng-repeat=\"item in items\"><span class=list-wrapper><span class=button-group><a class=action-edit data-ui-sref=\"lists.list.item.index({ list_id: list.id, item_id: item.id })\">Edit</a> <a class=action-delete data-ui-sref=\"lists.list.item.delete({ list_id: list.id, item_id: item.id })\">Delete</a></span> <span class=item-quantity data-ng-bind=item.name></span> <span class=item-title data-ng-bind=item.name></span></span></li><li class=empty data-ng-show=\"items.length == 0\">No Items</li></ul><div data-ui-view=\"\"></div></section>"
  );


  $templateCache.put('/app/services/directives/dialog.htm',
    "<button class=\"action-cancel left\" type=reset data-ng-click=cancelAction() data-ng-disabled=loading>Cancel</button><button class=right type=submit data-ng-class=saveClass data-ng-bind=saveText data-ng-click=saveAction() data-ng-disabled=loading></button>"
  );


  $templateCache.put('/app/services/directives/inline.htm',
    "<span class=\"title editable\" data-ng-bind=inlineModel data-ng-show=!inlineEdit data-ng-click=\"inlineEdit = true\"></span><input class=inline data-ng-model=inlineModel data-ng-show=inlineEdit data-ng-blur=\"inlineEdit = false; inlineSave()\" data-app-focus=inlineEdit>"
  );


  $templateCache.put('/app/services/directives/label.htm',
    "<label><span class=title data-ng-bind=labelTitle></span><span class=input-container data-ng-transclude=\"\"></span><span class=error data-ng-show=labelErrors data-ng-bind=labelErrors></span></label>"
  );


  $templateCache.put('/app/services/directives/modal.htm',
    "<div class=modal-wrapper data-ng-click=modalCancelAction()><div class=modal data-ng-transclude=\"\"></div></div>"
  );

}]);
