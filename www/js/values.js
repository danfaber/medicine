(function(){
    var app = angular.module("medicine");

    app.value('dataType',
      {
        "freeText": 1,
        "date": 2,
        "dropdown": 3,
        "autoComplete": 4,
        "barcode": 5,
        "toggle": 6,
        "autoCompleteMultiSelect": 7,
        "pickList": 8
      });

    app.value('currentRecordPrefix','C');

})();
