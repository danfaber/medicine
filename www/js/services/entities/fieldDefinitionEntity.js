(function(){

    angular.module("medicine").factory("fieldDefinitionEntity", [fieldDefinitionEntity]);

    function fieldDefinitionEntity(){

        function FieldDefinition(id, name, sortOrder, isToggled, isMultiSelect, dataType ,pickList, autoComplete)
        {
            this.id = id;
            this.name = name;
            this.sortOrder = sortOrder;
            this.isToggled = isToggled;
            this.isMultiSelect = isMultiSelect;
            this.dataType = dataType;
            this.pickList = pickList;
            this.autoComplete = autoComplete;
        }

        FieldDefinition.prototype = function(){

            function createRecordField()
            {

            }


            return {

            }


        }();



        return {
            FieldDefinition: FieldDefinition

        };
    }
})();
