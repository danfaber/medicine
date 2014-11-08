(function(){
    'use strict';

    angular.module("medicine").factory("settingsRepository",['$window', settingsRepository]);

    function settingsRepository($window){

        var userNameKey = "DoctorName";
        var passCodeKey = "PassCode";
        var barcodeScannerKey = "barcodeScanner";


        return {
            getUserName: getUserName,
            setUserName: setUserName,
            getPassCode: getPassCode,
            savePassCode: savePassCode,
            setBarcodeScannerEnabled: setBarcodeScannerEnabled,
            getBarcodeScannerEnabled: getBarcodeScannerEnabled
        };

        function getUserName()
        {
            return $window.localStorage.getItem(userNameKey);
        }

        function setUserName(name)
        {
            $window.localStorage.setItem(userNameKey, name);
        }

        function getPassCode()
        {
            var code = $window.localStorage.getItem(passCodeKey);
            return code === undefined || code === null ? null : parseInt(code);
        }

        function savePassCode(passCode)
        {
            $window.localStorage.setItem(passCodeKey, passCode.toString());
        }

        function setBarcodeScannerEnabled(isEnabled){
            $window.localStorage.setItem(barcodeScannerKey, isEnabled.toString());
        }

        function getBarcodeScannerEnabled()
        {
            var isEnabled = $window.localStorage.getItem(barcodeScannerKey);
            return isEnabled == undefined || isEnabled == null || isEnabled.toLowerCase() === "true";
        }

    }

})();


