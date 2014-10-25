(function(){
    'use strict';

    angular.module("medicine").factory("barcodeType", [barcodeType]);

    function barcodeType(){

        var defaultValue = "";
        var name = "barcode";

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();

