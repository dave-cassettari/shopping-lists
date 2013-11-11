App.ModalView = Em.View.extend(Ember.TargetActionSupport, {
    cancelAction: 'cancel',
    layoutName  : 'layouts/modal',

    actions: {
        hideModal: function ()
        {
            this.get('controller').set('modalVisible', false);
        }
    },

    click: function (event)
    {
        if ($(event.toElement).hasClass('modal-wrapper'))
        {
            this.triggerAction({
                action: this.get('cancelAction'),
                target: this.get('controller')
            });

            return;
        }
    }
});