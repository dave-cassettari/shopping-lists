'use strict';

var isLoading = function ()
{
    return this.get('store.isLoading');
}.property('store.isLoading');

window.App = Ember.Application.create({
    currentPath: ''
});

Ember.TextField.reopen({
    focusOut: function ()
    {
        this.sendAction('focusOutAction', this.get('value'));
    }
});

Ember.ObjectController.reopen({
    isLoading: isLoading
});

Ember.ArrayController.reopen({
    isLoading: isLoading
});