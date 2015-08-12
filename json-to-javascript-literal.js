(function (angular, _) {
    'use strict';

    angular.module('jsonToJSLiteral', [])
        .controller('Main', function ($scope, $window, converter) {

            $scope.convert = function () {
                var entity;
                $scope.invalidJson = false;
                $scope.internalError = false;
                try {
                    entity = angular.fromJson($scope.input);
                } catch (exception) {
                    $scope.invalidJson = true;
                    return;
                }

                try {
                    $scope.input = converter.convertToLiteral(entity);
                } catch (exception) {
                    $window.console.log(exception);
                    $scope.internalError = true;
                }
            };

        })
        .factory('converter', function () {

            var INDENT = 4;

            function padding(size) {
                return new Array(size + 1).join(' ');
            }

            function arrayToLiteral(array, offset) {
                var output, i;

                if (array.length === 0) {
                    return '[]';
                }

                output = '[';
                for (i = 0; i < array.length; i++) {
                    output += '\n';
                    output += padding(offset + INDENT);
                    output += convertToLiteral(array[i], offset + INDENT);
                    if (i < array.length - 1) {
                        output += ','
                    }
                }
                output += '\n';
                output += padding(offset);
                output += ']';
                return output;
            }

            function objectToLiteral(object, offset) {
                var output, i,
                    keys = Object.keys(object);

                if (keys.length === 0) {
                    return '{}';
                }

                output = '{';
                for (i = 0; i < keys.length; i++) {
                    output += '\n';
                    output += padding(offset + INDENT);
                    output += keys[i];
                    output += ': ';
                    output += convertToLiteral(object[keys[i]], offset + INDENT);
                    if (i < keys.length - 1) {
                        output += ','
                    }
                }
                output += '\n';
                output += padding(offset);
                output += '}';
                return output;
            }

            function convertToLiteral(entity, offset) {
                offset = offset || 0;

                if (_.isPlainObject(entity)) {
                    return objectToLiteral(entity, offset);
                } else if (_.isArray(entity)) {
                    return arrayToLiteral(entity, offset);
                } else if (_.isString(entity)) {
                    entity = entity.replace(/'/g, '\\\'');
                    return '\'' + entity + '\'';
                } else if (_.isNull(entity)) {
                    return 'null'
                } else { // Number, Boolean
                    return entity.toString();
                }
            }

            return {
                convertToLiteral: convertToLiteral
            };
        });

}(angular, _));
