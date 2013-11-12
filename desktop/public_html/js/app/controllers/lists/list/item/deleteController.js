App.ItemDeleteController = Ember.ObjectController.extend({
    needs  : ['list'],
    list   : Ember.computed.alias('controllers.list.model'),
    init   : function ()
    {
        this._super();

        console.log('delete');
    },
    actions: {
        cancel : function ()
        {
            this.transitionToRoute('list', this.get('list'));
        },
        confirm: function ()
        {
            this.get('model').deleteRecord();
            this.get('model').save();

            this.transitionToRoute('list', this.get('list'));
        }
    }
});