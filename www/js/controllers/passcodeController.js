(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("passCodeController", function($scope, settingsRepository, $state) {

        var savedPassCode =  settingsRepository.getPassCode();

        $scope.globalData.isSideMenuEnabled = false;
        $scope.data = {
            passCodeEnteredToBeConfirmed: null
        };

        resetPassCode();

        $scope.numberClass = function(index)
        {
            var isEntered = $scope.data.numbers[index] !== null;

            return isEntered ? "icon ion-record balanced" : "icon ion-ios7-circle-outline";
        };

        $scope.pressedNumber = function(number)
        {
            for(var i = 0; i < $scope.data.numbers.length; i++)
            {
                if ($scope.data.numbers[i] !== null) {continue;}

                $scope.data.numbers[i] = number;
                break;
            }

            var isAllNumbersEntered = $scope.data.numbers[$scope.data.numbers.length - 1] !== null;

            if (isAllNumbersEntered)
            {
                var keyedNumber = getNumber();

                if (savedPassCode !== null)
                {
                    if (savedPassCode === keyedNumber)
                    {
                       enterMainApplication();
                    }
                    else
                    {
                        resetPassCode();
                    }
                }
                else
                {
                    if ($scope.data.passCodeEnteredToBeConfirmed === null)
                    {
                        $scope.data.passCodeEnteredToBeConfirmed = keyedNumber;
                        resetPassCode();
                    }
                    else
                    {
                        if (keyedNumber === $scope.data.passCodeEnteredToBeConfirmed)
                        {
                            settingsRepository.savePassCode(keyedNumber);
                            enterMainApplication();
                        }
                        else
                        {
                            $scope.data.passCodeEnteredToBeConfirmed = null;
                            resetPassCode();
                        }
                    }
                }

            }
        };

        function enterMainApplication()
        {
            $scope.globalData.isSideMenuEnabled = true;
            $state.go('app.recordDefinitions');
        }

        $scope.back = function()
        {
            for(var i = $scope.data.numbers.length -1; i >=0 ; i--)
            {
                if ($scope.data.numbers[i] === null) {continue;}

                $scope.data.numbers[i] = null;
                break;
            }
        };

        $scope.getTitle = function()
        {
            if (savedPassCode !== null) {return "Enter Your Pincode";}

            return "Create Pincode";
        };


        function getNumber()
        {
            var stringNumber = _($scope.data.numbers).reduce(function(memo, item){return memo + item.toString();},"");
            return parseInt(stringNumber);
        }

        function resetPassCode()
        {
            $scope.data.numbers = [null, null, null, null];
        }


    });

})();

