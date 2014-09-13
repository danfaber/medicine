(function(){

    angular.module("medicine").factory("fieldDefinitionEntity", [fieldDefinitionEntity]);

    function fieldDefinitionEntity(){

        function FieldDefinition(id, name, sortOrder, pickList, isToggled, isMultiSelect)
        {
            this.id = id;
            this.name = name;
            this.sortOrder = sortOrder;
            this.pickList = pickList;
            this.isToggled = isToggled;
            this.isMultiSelect = isMultiSelect;
        }



        return {
            RecordDefinition: RecordDefinition

        };
    }
})();
