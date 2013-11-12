App.EditableView = Ember.View.extend({
    text             : null,
    editing          : false,
    templateName     : 'views/templates/editable',
    actions          : {
        edit: function ()
        {
            console.log('edit');

            this.set('edit', true);
        },
        save: function ()
        {
            console.log('save');

            this.set('edit', false);
        }
    }
});