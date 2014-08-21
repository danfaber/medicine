(function(){
    var app = angular.module("medicine");

    app.value('dataType',
      {
        "freeText": 1,
        "date": 2,
        "dropdown": 3,
        "autoComplete": 4
      });

})();
