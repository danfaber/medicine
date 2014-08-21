(function(){

    var app = angular.module("medicine");

    function getId()
    {
        var nextRecordId = window.localStorage.getItem("nextRecordId");
        var id = (!nextRecordId) ? 1 : parseInt(nextRecordId);
        window.localStorage.setItem("nextRecordId",(id+1).toString());
        return id;
    }

    function saveRecord(record)
    {
        var toSave = {
            id: getId(),
            type: record.typeId,
            fields:[]
        };
    }

    app.factory("recordDataService", function(){
        return {
            saveRecord:saveRecord
        };
    });


})();
