(function() {
    'use strict';

    angular.module("medicine")
        .controller("recordDefinitionsController", recordDefinitionsController);

    function recordDefinitionsController($scope, recordDefinitions)
    {
        $scope.recordDefinitions = recordDefinitions.all();

        $scope.globalData.currentRecordDefinition = null;

        var iterations = 1000000;


        $scope.asJs = function()
        {
            var array = [];
            var start = new Date().getTime();

            for(var i = 0; i<iterations; i++)
            {
                array.push({
                    value:i
                });
            }

            var end= new Date().getTime();

            alert(end - start);

        };

        $scope.asJson = function()
        {
            var array = [];
            var start = new Date().getTime();

            var json = JSON.stringify({value: 0});

            for (var i = 0; i<iterations; i++)
            {
                array.push(JSON.parse(json));
            }

            var end = new Date().getTime();

            alert(end - start);
        }
    }

})();

