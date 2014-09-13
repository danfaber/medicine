(function(){

    angular.module("medicine").factory("recordDefinitionEntity", [recordDefinitionEntity]);

    function recordDefinitionEntity(){

        function RecordDefinition(id, name, sortOrder, fields)
        {
            this.id = id;
            this.name = name;
            this.sortOrder = sortOrder;
            this.fields = fields;
        }



        return {
            RecordDefinition: RecordDefinition

        };
    }
})();

