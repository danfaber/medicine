(function(){

    var app = angular.module("medicine");

    var barcodeScannerKey = "barcodeScanner";

    app.factory("settingsDataService",['$window', function($window){

        var setBarcodeScannerEnabled = function(isEnabled){
            $window.localStorage.setItem(barcodeScannerKey, isEnabled.toString());
        };

        var getBarcodeScannerEnabled = function()
        {
            var isEnabled = $window.localStorage.getItem(barcodeScannerKey);
            return isEnabled != undefined && isEnabled.toLowerCase() === "true";
        };

        return {
            setBarcodeScannerEnabled: setBarcodeScannerEnabled,
            getBarcodeScannerEnabled: getBarcodeScannerEnabled
        }
    }]);

})();
