(function(){

    angular.module("medicine").factory("recordFieldEntity", ["dataType" ,recordFieldEntity]);

    function recordFieldEntity(dataType){

        function RecordField(fieldDefinition)
        {
            this.fieldDefinition = fieldDefinition;

            var values = (fieldDefinition.isToggled)
                ? []
                : [{value: fieldDefinition.fieldType.defaultValue, index:0}];

            this.data = {
                isChecked: false,
                values: values
            }
        }

        return {
            RecordField: RecordField
        };
    }
})();

