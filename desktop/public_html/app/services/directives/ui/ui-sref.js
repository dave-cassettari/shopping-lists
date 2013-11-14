angular.module('app.directives').directive('uiSref', ['$state', function ($state)
{
    /**
     * Taken directly from ui-router's uiSref
     * @param ref
     * @returns {{state: *, paramExpr: (*|null)}}
     */
    var parseStateRef = function (ref)
    {
        var parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);

        if (!parsed || parsed.length !== 4)
        {
            throw new Error("Invalid state ref '" + ref + "'");
        }

        return { state: parsed[1], paramExpr: parsed[3] || null };
    };

    /**
     * For some reason the current implementation os is() and includes() ignore params
     */
    var is = function ($state, stateOrName, params)
    {
        var is = $state.is(stateOrName);

        angular.forEach(params, function (value, key)
        {
            if (!$state.params.hasOwnProperty(key) || $state.params[key] !== value)
            {
                is = false;
            }
        });

        return is;
    };

    var includes = function ($state, stateOrName, params)
    {
        var includes = $state.is(stateOrName);

        angular.forEach(params, function (value, key)
        {
            if (!$state.params.hasOwnProperty(key) || $state.params[key] !== value)
            {
                includes = false;
            }
        });

        return includes;
    };

    return {
        restrict: 'A',
        link    : function ($scope, element, attributes)
        {
            var $element = $(element),
                ref = parseStateRef(attributes.uiSref),
                update = function ()
                {
                    var params = $scope.$eval(ref.paramExpr),
                        active = includes($state, ref.state, params),
                        current = is($state, ref.state, params);

                    $element
                        .toggleClass('is-active', active)
                        .toggleClass('is-current', current);
                };

            $scope.$on('$stateChangeSuccess', update);

            update();
        }
    }
}]);