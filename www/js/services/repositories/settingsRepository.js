(function(){
    'use strict';

    angular.module("medicine").factory("settingsRepository",['$window', settingsRepository]);

    function settingsRepository($window){

        var userNameKey = "DoctorName";
        var passCodeKey = "PassCode";
        var barcodeScannerKey = "barcodeScanner";
        var userEmailAddressKey = "UserEmailAddress";
        var termsAndConditionsKey = "TermsAndConditions";


        return {
            getUserName: getUserName,
            setUserName: setUserName,
            getPassCode: getPassCode,
            savePassCode: savePassCode,
            setBarcodeScannerEnabled: setBarcodeScannerEnabled,
            getBarcodeScannerEnabled: getBarcodeScannerEnabled,
            getUserEmailAddress: getUserEmailAddress,
            setUserEmailAddress: setUserEmailAddress,
            isTermsAndConditionsAccepted: isTermsAndConditionsAccepted,
            acceptTermsAndConditions: acceptTermsAndConditions
        };

        function getUserName()
        {
            return getValue(userNameKey);
        }

        function setUserName(name)
        {
            setValue(userNameKey, name);
        }

        function getUserEmailAddress()
        {
            return getValue(userEmailAddressKey);
        }

        function setUserEmailAddress(email)
        {
            setValue(userEmailAddressKey, email);
        }


        function getValue(key)
        {
            var value =  $window.localStorage.getItem(key);
            return value ? value : "";
        }

        function setValue(key, value)
        {
            if (value === null || value === undefined) {
                value = "";
            }

            $window.localStorage.setItem(key, value);
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

        function isTermsAndConditionsAccepted()
        {
            var isAccepted = $window.localStorage.getItem(termsAndConditionsKey);
            return !!isAccepted;
        }

        function acceptTermsAndConditions()
        {
            $window.localStorage.setItem(termsAndConditionsKey, "true");
        }

    }

})();


