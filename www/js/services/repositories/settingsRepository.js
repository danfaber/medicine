(function(){
    'use strict';

    angular.module("medicine").factory("settingsRepository",['$window', settingsRepository]);

    function settingsRepository($window){

        var userNameKey = "DoctorName";

        return {
            getUserName: getUserName,
            setUserName: setUserName
        };

        function getUserName()
        {
            return $window.localStorage.getItem(userNameKey);
        }

        function setUserName(name)
        {
            $window.localStorage.setItem(userNameKey, name);
        }
    }

})();


