(function(){
    'use strict';

    angular.module("medicine").factory("allFieldTypes", ['barcodeType', 'booleanType', 'date_Type', 'longTextType', 'shortTextType', 'pickListType', 'numberType', allFieldTypes]);

    function allFieldTypes(barcodeType, booleanType, date_Type, longTextType, shortTextType, pickListType, numberType){

        return {
            barcode: barcodeType,
            boolean: booleanType,
            date: date_Type,
            longText: longTextType,
            shortText: shortTextType,
            pickList: pickListType,
            number: numberType
        };
    }
})();

