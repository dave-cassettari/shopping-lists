App.InputView = Ember.View.extend({
    title     : null,
    errorName : null,
    layoutName: 'views/layouts/input',
    error     : function ()
    {
        var error,
            name = this.get('errorName'),
            errors = this.get('controller.model.apiErrors');

        if (!errors || !errors.hasOwnProperty(name))
        {
            return null;
        }

        error = errors[name];

        if (error.hasOwnProperty('length') && error.length > 0)
        {
            return error[0];
        }

        return error;

    }.property('controller.model.apiErrors')
});