(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("passCodeController", function($scope, settingsRepository, $state, $cordovaToast, $window) {

        var savedPassCode =  settingsRepository.getPassCode();
        var passCodeEnteredToBeConfirmed = null;

        $scope.globalData.isSideMenuEnabled = false;
        $scope.data = {};

        resetPassCode();

        $scope.numberClass = function(index)
        {
            var isEntered = $scope.data.numbers[index] !== null;

            return isEntered ? "flaticon-hospital16 daylightFont" : "flaticon-hospital16 greyFont";
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
                        resetPassCodeWithDelay("Pincode incorrect. Please try again.")
                    }
                }
                else
                {
                    if (passCodeEnteredToBeConfirmed === null)
                    {
                        passCodeEnteredToBeConfirmed = keyedNumber;
                        resetPassCodeWithDelay("Please Confirm Pincode");
                    }
                    else
                    {
                        if (keyedNumber === passCodeEnteredToBeConfirmed)
                        {
                            settingsRepository.savePassCode(keyedNumber);
                            enterMainApplication();
                        }
                        else
                        {
                            passCodeEnteredToBeConfirmed = null;
                            resetPassCodeWithDelay("Pincodes do not match. Please try again.");

 /*                           resetPassCode();
                            $cordovaToast.show("Pincodes do not match, please try again.","long", "bottom");*/
                        }
                    }
                }

            }
        };

        function enterMainApplication()
        {
            $window.setTimeout(function(){
                $scope.globalData.isSideMenuEnabled = true;
                $state.go('app.recordDefinitions');
            }, 1);
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

            return passCodeEnteredToBeConfirmed == null ? "Create Pincode" : "Confirm Pincode";

        };


        function getNumber()
        {
            var stringNumber = _($scope.data.numbers).reduce(function(memo, item){return memo + item.toString();},"");
            return parseInt(stringNumber);
        }

        function resetPassCodeWithDelay(message)
        {
            $window.setTimeout(function(){
                resetPassCode();
                $scope.$apply();
                $cordovaToast.show(message,"short", "bottom");
            },200);
        }

        function resetPassCode()
        {
            $scope.data.numbers = [null, null, null, null];
        }


    });

})();

