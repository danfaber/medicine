(function(){
    'use strict';

    angular.module("medicine").factory("fieldDefinitionEntity", [fieldDefinitionEntity]);

    function fieldDefinitionEntity(){

        function FieldDefinition(id, name, sortOrder, isToggled, isMultiSelect, fieldType ,pickListId, autoComplete)
        {
            this.id = id;
            this.name = name;
            this.sortOrder = sortOrder;
            this.isToggled = isToggled;
            this.isMultiSelect = isMultiSelect;
            this.fieldType = fieldType;
            this.pickListId = pickListId;
            this.autoComplete = autoComplete;
        }

        return {
            FieldDefinition: FieldDefinition
        };
    }
})();
