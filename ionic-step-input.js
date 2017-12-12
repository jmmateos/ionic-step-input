(function () {
    var module;

    module = angular.module('ionicStepInput', []);

    module.directive('ionicStepInput', function ($interpolate, $sce) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                user_options: '&stepInputOptions',
                value: '=ngModel',
                required: '=ngRequired'
            },
            link: function (scope, elem, attrs) {
                var options;
                options = {
                    decrease: 'ion-chevron-left',
                    increase: 'ion-chevron-right',
                    minValue: 0,
                    maxValue: 999
                };
                scope.$watch(scope.user_options, function (val) {
                    return angular.extend(options, scope.user_options(scope));
                }, true);
                scope.value = !isNaN(parseInt(scope.value)) ? scope.value : 0;
                scope.decrease = function () {
                    return scope.value = scope.value - 1;
                };
                scope.increase = function () {
                    return scope.value = scope.value + 1;
                };
                return scope.$watch('value', function (val, oldval) {
                    var overrides;
                    if (!isNaN(parseInt(scope.value))) {
                        scope.value = Math.min(Math.max(parseInt(val), options.minValue), options.maxValue);
                    } else {
                        scope.value = oldval;
                    }
                    scope.property = angular.copy(options);
                });
            },
            template: 
                "<div class=\"button-bar\">" +
                "<button class=\"button icon\" ng-click=\"decrease()\" ng-class=\"property.decrease\" ng-class=\"{disabled: value == property.min_value}\"></button>" +
                "<input class=\"button\" ng-model=\"value\" type=\"text\" ng-required=\"required\">" +
                "<button class=\"button icon\" ng-click=\"increase()\" ng-class=\"property.increase\" ng-class=\"{disabled: value == property.max_value}\"></button>" +
                "</div>"
        };
    });

}).call(this);