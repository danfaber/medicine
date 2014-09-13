(function(){

    angular.module("medicine").factory("recordDefinitionEntity", [recordDefinitionEntity]);

    function recordDefinitionEntity(){

        function RecordDefinition(id, name, sortOrder, fieldDefinitions)
        {
            this.id = id;
            this.name = name;
            this.sortOrder = sortOrder;
            this.fieldDefinitions = fieldDefinitions;
        }

        RecordDefinition.prototype = function()
        {
            function createRecord()
            {

            }

            return {

            };
        }();



        return {
            RecordDefinition: RecordDefinition

        };
    }
})();

