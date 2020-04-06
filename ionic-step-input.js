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
                  scope.value = !isNaN(parseInt(scope.value)) ? scope.value : 0;
                  return scope.value--;
                };
                scope.increase = function () {
                  scope.value = !isNaN(parseInt(scope.value)) ? scope.value : 0;
                  return scope.value++;
                };
                return scope.$watch('value', function (val) {
                    if (!isNaN(parseInt(scope.value))) {
                        scope.value = Math.min(Math.max(parseInt(val), options.minValue), options.maxValue);
                    }
                    scope.property = angular.copy(options);
                });
            },
            template: 
                "<div class=\"button-bar\">" +
                "<button type=\"button\" class=\"button icon\" ng-click=\"decrease()\" ng-class=\"[property.decrease,{disabled: value == property.minValue}]\"></button>" +
                "<input class=\"button\" ng-model=\"value\" type=\"text\" ng-required=\"required\">" +
                "<button type=\"button\" class=\"button icon\" ng-click=\"increase()\" ng-class=\"[property.increase,{disabled: value == property.maxValue}]\"></button>" +
                "</div>"
        };
    });

}).call(this);
