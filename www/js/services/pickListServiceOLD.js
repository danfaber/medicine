/*
(function(){

    angular.module("medicine").factory("pickListService", ['pickListRepository','pickListEntity', pickListService]);

    function pickListService(pickListRepository, pickListEntityService){

        var pickLists = [];

        function getPickList(id)
        {
            return _(pickLists).find(function(list) {return list.id == id;});

*/
/*            if (pickList) {return pickList;}

            var loadedPickList = loadPickList(id);
            pickLists.push(loadedPickList);
            return loadedPickList;*//*

        }

*/
/*        function loadPickList(id)
        {
            var savedPickList = pickListRepository.getSavedPickList(id);

            return (savedPickList)
                ? savedPickList
                : _(pickListEntityService.defaultPickLists)
                .find(function(pickList) {return pickList.id === id;});
        }*//*


*/
/*        function setPickLists(lists)
        {
            pickLists = lists;
        }

        function getAll()
        {
            return pickLists;
        }

        return {
            getPickList: getPickList,
            setPickLists: setPickLists,
            getAll: getAll
        };*//*


    }

})();
*/
