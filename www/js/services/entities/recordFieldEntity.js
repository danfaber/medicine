(function(){

    angular.module("medicine").factory("recordFieldEntity", ["dataType" ,recordFieldEntity]);

    function recordFieldEntity(dataType){

        function RecordField(fieldDefinition)
        {
            this.fieldDefinition = fieldDefinition;

            var defaultValue = null;

            this.data = {
                isChecked: false,
                values: [defaultValue]
            }
        }

        return {
            RecordField: RecordField
        };
    }
})();

