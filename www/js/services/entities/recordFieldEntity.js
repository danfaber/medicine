(function(){

    angular.module("medicine").factory("recordFieldEntity", ["dataType" ,recordFieldEntity]);

    function recordFieldEntity(dataType){

        function RecordField(fieldDefinition)
        {
            this.fieldDefinition = fieldDefinition;

            this.data = {
                isChecked: false,
                values: [{value:null}]
            }
        }

        return {
            RecordField: RecordField
        };
    }
})();

