(function(){

    angular.module("medicine").factory("recordFieldEntity", ["dataType" ,recordFieldEntity]);

    function recordFieldEntity(dataType){

        function RecordField(fieldDefinition)
        {
            this.fieldDefinition = fieldDefinition;
            this.fieldDefinitionId = fieldDefinition.id;

            var isCheckboxField = (fieldDefinition.isToggled || fieldDefinition.fieldType.name == "boolean");

            if (isCheckboxField)
            {
                this.data = {
                    isChecked: false,
                    values:[]
                };
            }
            else
            {
                var defaultValue = _.isFunction(fieldDefinition.fieldType.defaultValue)
                    ? fieldDefinition.fieldType.defaultValue()
                    : fieldDefinition.fieldType.defaultValue;

                this.data = {
                    values: [
                        {
                            value: defaultValue,
                            index: 0
                        }
                    ]
                };
            }
        }

/*        function isCheckboxField(fieldDefinition)
        {
            return (fieldDefinition.isToggled || fieldDefinition.fieldType.name == "boolean");
        }

        function isDisplayedInSummaryView(recordField)
        {
            if (isCheckboxField(recordField.fieldDefinition)) {return true;}

            var isDisplayed = _(recordField.data.values)
                .some(function(value) {return !!value.value;})

            return isDisplayed;
        }*/





/*        RecordField.prototype = function() {

            function isDisplayedInSummaryView()
            {
                if (isCheckboxField(this.fieldDefinition)) {return true;}

                return _(this.data.values).some(function(value) {return !!value.value;})

*//*                switch (this.fieldDefinition.fieldType.name)
                {
                    case "shortText":
                        break;
                    case "longText":
                        break;
                    case "barcode":
                        break;
                    case "boolean":
                        break;
                    case "date":
                        break;
                }*//*
            }

            return {
                isDisplayedInSummaryView: isDisplayedInSummaryView

            };
        }();*/

        return {
            RecordField: RecordField
        };
    }
})();

