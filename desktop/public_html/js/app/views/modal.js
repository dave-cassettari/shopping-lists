App.ModalView = Ember.View.extend(Ember.TargetActionSupport, {
    cancelAction    : 'cancel',
    layoutName      : 'views/layouts/modal',
    didInsertElement: function ()
    {
        var $modal = this.$().find('.modal');

        $modal.css('height', 'auto');
        $modal.css('margin-top', -$modal.height() / 2);
    },
    click           : function (event)
    {
        if ($(event.toElement).hasClass('modal-wrapper'))
        {
            this.triggerAction({
                action: this.get('cancelAction'),
                target: this.get('controller')
            });
        }
    }
});