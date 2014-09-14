(function(){

    angular.module("medicine").factory("allFieldTypes", ['barcodeType', 'booleanType', 'date_Type', 'longTextType', 'shortTextType', allFieldTypes]);

    function allFieldTypes(barcodeType, booleanType, date_Type, longTextType, shortTextType){

        return {
            barcode: barcodeType,
            boolean: booleanType,
            date: date_Type,
            longText: longTextType,
            shortText: shortTextType
        };
    }
})();

