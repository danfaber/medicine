(function(){

    function messageHandler(e) {
        var pickListsJson = e.data;
        var pickLists = JSON.parse(pickListsJson);
        postMessage(pickLists);
    }
    addEventListener('message',messageHandler, false);
})();

