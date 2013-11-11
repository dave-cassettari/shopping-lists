App.ModalView = Em.View.extend({
    cancelRoute : 'index',
    layoutName: 'layouts/modal',
    tagName   : 'div',
    classNames: ['modal'],
    //classNameBindings: ['controller.modalVisible:shown:hidden'],

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
            this.get('controller').transitionToRoute(this.get('cancelRoute'));
        }
    }
});