(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("helpController", function($scope, $cordovaToast) {

        $scope.globalData.currentRecordDefinition = null;

        $scope.emailSupport = function() {

            window.plugins.socialsharing.shareViaEmail(
                '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
                "Medical Log Book Support Issue",   // subject
                ['danielguyfaber@gmail.com'], // TO: must be null or an array
                null, // CC: must be null or an array
                null, // BCC: must be null or an array
                null, // FILES: can be null, a string, or an array
                onSuccess, // called when sharing worked, but also when the user cancelled sharing via email (I've found no way to detect the difference)
                onError // called when sh*t hits the fan
            );
        };

        function onSuccess(){}

        function onError(){}


    });

})();

