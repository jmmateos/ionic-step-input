(function () {
  var module;

  module = angular.module('ionicStepInput', []);

  module.directive('ionicStepInput', function ($interpolate, $sce) {
      return {
          restrict: 'AE',
          replace: true,
        require:'ngModel',
          scope: {
              user_options: '&stepInputOptions',
              value: '=ngModel',
            required: '=ngRequired',
            pattern: '=ngPattern'
          },
          link: function (scope, elem, attrs) {
              var options;
              options = {
                  decrease: 'ion-chevron-left',
                  increase: 'ion-chevron-right',
                  minValue: 0,
                maxValue: 999,
                allowDecimals: false
            };
            var isInteger = function(value) { return !Number.isNaN(value) && Number.isFinite(value) && Number.isInteger(value); };
            var isFloat = function(value) { return Number(value) == value && value % 1 !== 0; };
            var myParseValue = function(value) {
              if (options.allowDecimals) {
                if (isInteger || isFloat(value)) { return parseFloat(value); }
                else { return value; }
              } else {
                if (isInteger(value)) { return parseInt(value); }
                else { return value; }
              }
              };
              scope.$watch(scope.user_options, function (val) {
                  return angular.extend(options, scope.user_options(scope));
              }, true);
            scope.value = !isNaN(myParseValue(scope.value)) ? scope.value : 0;
              scope.decrease = function () {
                scope.value = !isNaN(parseInt(scope.value)) ? scope.value : 0;
                return scope.value--;
              };
              scope.increase = function () {
                scope.value = !isNaN(parseInt(scope.value)) ? scope.value : 0;
                return scope.value++;
              };
            return scope.$watch('value', function (val, oldval) {
                  scope.property = angular.copy(options);
                if (!val) { return; }
                if (scope.pattern && !scope.pattern.test(val)) {
                  scope.invalid = true;
                  console.log(elem);
                  return;
                }
                if (!isNaN(myParseValue(scope.value))) {
                    scope.value = Math.min(Math.max(myParseValue(val), options.minValue), options.maxValue);
                } else {
                    scope.value = oldval? oldval: options.minValue;
                }
                scope.invalid = false;

              });
          },
          template:
              "<div class=\"button-bar\">" +
              "<button type=\"button\" class=\"button icon\" ng-click=\"decrease()\" ng-class=\"[property.decrease,{disabled: value == property.minValue}]\"></button>" +
            "<input class=\"button\" ng-model=\"value\" type=\"text\" ng-required=\"required\" ng-pattern=\"pattern\">" +
              "<button type=\"button\" class=\"button icon\" ng-click=\"increase()\" ng-class=\"[property.increase,{disabled: value == property.maxValue}]\"></button>" +
              "</div>"
      };
  });

}).call(this);
