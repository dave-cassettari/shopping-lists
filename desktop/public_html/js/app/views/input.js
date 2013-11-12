App.InputView = Ember.View.extend({
    title     : null,
    value     : null,
    layoutName: 'views/layouts/input',
    error     : function ()
    {
        var error,
            errors = this.get('controller.model.apiErrors');

        if (!errors || !errors.hasOwnProperty(this.value))
        {
            return null;
        }

        error = errors[this.value];

        if (error.hasOwnProperty('length') && error.length > 0)
        {
            return error[0];
        }

        return error;

    }.property('controller.model.apiErrors')
});