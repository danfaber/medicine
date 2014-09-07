(function() {

    var app = angular.module("medicine");

    app.factory("typeDataService", ['optionGroupDataService','dataType' , function(optionGroupDataService, dataType) {

        var types =
            [
                {
                    typeId: 1,
                    name: "Procedure",
                    sortOrder: 2,
                    fields: [
                        {
                            id: 1,
                            sortOrder: 1,
                            name: "Issue Type",
                            dataType: dataType.dropdown,
                            optionGroupId: 91
                        },
                        {
                            id: 2,
                            sortOrder: 2,
                            name: "Seriousness",
                            dataType: dataType.dropdown,
                            optionGroupId: 92
                        },
                        {
                            id: 3,
                            sortOrder: 3,
                            name: "Text Description",
                            dataType: dataType.freeText
                        },
                        {
                            id: 4,
                            sortOrder: 4,
                            name: "Date Seen",
                            dataType: dataType.date
                        },
                        {
                            id: 5,
                            sortOrder: 5,
                            name: "Auto Complete Field",
                            dataType: dataType.autoComplete,
                            autoCompleteTypeId: 1,
                            history: [
                                {key:"M92.6",count:5},
                                {key:"M94.99",count:2},
                                {key:"N05.4",count:7}]
                        },
                        {
                            id:6,
                            sortOrder: 6,
                            name: "Barcode",
                            dataType: dataType.barcode
                        },
                        {
                            id:7,
                            sortOrder: 7,
                            name: "Flag",
                            dataType: dataType.toggle
                        }
                    ]
                },
                {
                    typeId: 2,
                    name: "Referal",
                    sortOrder: 3,
                    fields: []
                },
                {
                    typeId: 3,
                    name: "Clinic",
                    sortOrder: 1,
                    fields: []
                }
            ];


        var getAllSorted = function()
        {
            var sortedTypes = _(types)
                .sortBy(function(tp) {return tp.sortOrder;});

            return sortedTypes;
        };

        var getAll = function()
        {
            return types;
        };


        var getField = function(typeId, fieldId)
        {
            var type = getType(typeId);
            return getFieldFromType(type, fieldId);
        };

        var getFieldFromType = function(type, fieldId)
        {
            var field = type.fields
                .filter(function(field) {return field.id == fieldId;})
                [0];

            return field;
        };

        var getType = function(typeId)
        {
            return _(types)
                .filter(function(tp) {return tp.typeId == typeId;})
                [0];
        };

        var getTypeWithOptionGroups = function(typeId){
            var type = getType(typeId)

            var typeWithOptionGroups = angular.copy(type);

            var optionGroupFields = _(typeWithOptionGroups.fields)
                .filter(function(field) {return field.optionGroupId;})

            _(optionGroupFields).each(function(field) {
                field.optionGroup = optionGroupDataService.getOptionGroup(field.optionGroupId);
                field.dropdowns = [field.optionGroup];
            });

            return typeWithOptionGroups;
        };

/*
* CHANGE THIS TO USE ANGULAR COPY NOT ACTUAL TYPES!!!
*
* */
        return {
            getTypeWithOptionGroups: getTypeWithOptionGroups,
            getAllSorted: getAllSorted,
            getField: getField,
            getType: getType,
            getFieldFromType: getFieldFromType,
            getAll: getAll
        };
    }])

})();
