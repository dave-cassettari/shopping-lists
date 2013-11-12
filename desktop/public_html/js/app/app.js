'use strict';

window.App = Ember.Application.create();

Ember.TextField.reopen({
    focusOut: function ()
    {
        this.sendAction('focusOutAction', this.get('value'));
    }
});