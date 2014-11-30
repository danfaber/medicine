(function(){
    'use strict';

    angular.module("medicine").factory("barcodeType", [barcodeType]);

    function barcodeType(){

        var name = "barcode";

        function defaultValue()
        {
            return "";
        }

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();

