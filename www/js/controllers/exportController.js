(function(){
    var app = angular.module("medicine");

    app.controller("exportController", function($scope) {

        $scope.exportData = function()
        {

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);


            function gotFS(fileSystem)
            {
                fileSystem.root.getFile("dan.txt", null, gotFileEntry, fail);
            }


            function gotFileEntry(fileEntry)
            {
                alert("got something");
            }

            function fail(evt)
            {
                alert("failed ");
                alert(evt);
            }

        }
    });
})();
