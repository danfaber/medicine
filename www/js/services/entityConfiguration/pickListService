(function(){

    angular.module("medicine").factory("pickListService", ["pickListEntity", "pickListRepository", pickListService]);

    function pickListService(pickListEntity, pickListRepository){

        var pickLists = [];
        
        function getDefaultPickLists()
        {
            return [
                addPickList(1,'Symptoms',true, true,[
                    withCategory(1, 'Heart', ['Upper Heart','Middle Heart', 'Lower Heart','Related Cardiac']),
                    withCategory(2, 'Lung', ['Left Lung', 'Right Lung', 'Top Lung'])]),

                addPickList(2, 'Location', [
                    withCategory(3, 'All', ['London', 'Manchester', 'Liverpool', 'Loughborough'])
                ])
            ];
        }

        function addPickList(id, name, isAbleToAddNewValues, showCategoriesAsTabs, categories)
        {
            return new pickListEntity.PickList(id, name, isAbleToAddNewValues, showCategoriesAsTabs, categories);
        }

        function withCategory(id, name, values)
        {
            var pickValues = _(values).map(function(value) {return new pickListEntity.PickValue(value, 0); });
            return new pickListEntity.Category(id, name, pickValues);
        }

        function loadPickLists()
        {
            pickLists = pickListRepository.getAll();

            if (pickLists.length === 0)
            {
                pickLists = getDefaultPickLists();
            }
        }
        
        function persistPickLists()
        {
            pickListRepository.saveAll(pickLists);
        }
        
        function getById(pickListId)
        {
            return _(pickLists).find(function(list) {return list.id == pickListId;});
        }

        return {
            loadPickLists: loadPickLists,
            persistPickLists: persistPickLists,
            getById: getById
        };
    }
})();