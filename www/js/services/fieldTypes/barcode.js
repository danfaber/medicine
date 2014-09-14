(function(){

    angular.module("medicine").factory("barcodeType", [barcodeType]);

    function barcodeType(){

        var defaultValue = false;
        var name = "barcode";

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();

