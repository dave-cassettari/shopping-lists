var AbstractEditController = function ($scope, $state, model)
{
    var original = angular.copy(model);

    angular.extend($scope, {
        loading       : false,
        model         : model,
        completeRoute : function (model)
        {
            return 'index'
        },
        completeParams: function (model)
        {
            return {};
        },
        saveRoute     : function (model)
        {
            return this.completeRoute(model);
        },
        saveParams    : function (model)
        {
            return this.completeParams(model);
        },
        cancelRoute   : function (model)
        {
            return this.completeRoute(model);
        },
        cancelParams  : function (model)
        {
            return this.completeParams(model);
        },
        onSave        : function (model)
        {

        },
        onCancel      : function (model)
        {

        },
        save          : function ()
        {
            var self = this;

            this.loading = true;

            this.model.$save(function ()
            {
                self.loading = false;

                self.onSave(self.model);

                $state.transitionTo(self.saveRoute(self.model), self.saveParams(self.model));
            }, function (response)
            {
                response.config.data.errors = response.data.errors;

                self.loading = false;
            });
        },
        cancel        : function ()
        {
            angular.extend(this.model, original);

            this.onCancel(this.model);

            $state.transitionTo(this.cancelRoute(this.model), this.cancelParams(this.model));
        }
    });
};