(function(){
    'use strict';

    angular.module("medicine").factory("settingsRepository",['$window', settingsRepository]);

    function settingsRepository($window){

        var userNameKey = "DoctorName";
        var passCodeKey = "PassCode";

        return {
            getUserName: getUserName,
            setUserName: setUserName,
            getPassCode: getPassCode,
            savePassCode: savePassCode
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

    }

})();


