(function(){

    angular.module("medicine").factory("pickListService", ['pickListRepository','pickListEntityService', pickListService]);

    function pickListService(pickListRepository, pickListEntityService){

        var pickLists = [];

        function getPickList(id)
        {
            var pickList = _(pickLists).find(function(list) {return list.id == id;});

            if (pickList) {return pickList;}

            var loadedPickList = loadPickList(id);
            pickLists.push(loadedPickList);
            return loadedPickList;
        }

        function loadPickList(id)
        {
            var savedPickList = pickListRepository.getSavedPickList(id);

            return (savedPickList)
                ? savedPickList
                : pickListEntityService.defaultPickLists
                .find(function(pickList) {return pickList.id === id;});
        }

        return {
            getPickList: getPickList
        };

    }

})();
