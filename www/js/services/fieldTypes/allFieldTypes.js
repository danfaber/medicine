(function(){

    angular.module("medicine").factory("allFieldTypes", ['barcodeType', 'booleanType', 'date_Type', 'longTextType', 'shortTextType', 'pickListType', allFieldTypes]);

    function allFieldTypes(barcodeType, booleanType, date_Type, longTextType, shortTextType, pickListType){

        return {
            barcode: barcodeType,
            boolean: booleanType,
            date: date_Type,
            longText: longTextType,
            shortText: shortTextType,
            pickList: pickListType
        };
    }
})();

