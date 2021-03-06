(function(){
    'use strict';

    angular.module("medicine").factory("recordDefinitionEntity", ["recordEntity", recordDefinitionEntity]);

    function recordDefinitionEntity(recordEntity){

        function RecordDefinition(id, name, sortOrder, colour, fieldDefinitions)
        {
            this.id = id;
            this.name = name;
            this.sortOrder = sortOrder;
            this.colour = colour;
            this.fieldDefinitions = fieldDefinitions;
        }

/*        RecordDefinition.prototype = function(){

            function getCurrentRecord()
            {
                return (this.currentRecord)
                    ? this.currentRecord
                    : new recordEntity.Record(this);
            }

            return {
                getCurrentRecord: getCurrentRecord
            };
        }();*/

        return {
            RecordDefinition: RecordDefinition

        };
    }
})();

