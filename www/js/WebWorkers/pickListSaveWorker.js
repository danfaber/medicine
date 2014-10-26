(function(){

    function messageHandler(e) {
        var pickLists = e.data;
        var pickListJson = JSON.stringify(pickLists);
        postMessage(pickListJson);
    }
    addEventListener('message',messageHandler, false);
})();


