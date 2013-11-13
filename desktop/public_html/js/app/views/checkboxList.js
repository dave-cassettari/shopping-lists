App.CheckboxListView = Ember.CollectionView.extend({
//    templateName : 'views/templates/checkboxList',
    tagName      : 'ul',
    itemViewClass: Ember.View.extend({
        templateName: 'views/templates/checkboxListItem'
    }),
    emptyView: Ember.View.extend({
        templateName: 'views/templates/checkboxListEmpty'
    })
});