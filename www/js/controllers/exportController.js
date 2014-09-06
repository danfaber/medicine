(function(){
    var app = angular.module("medicine");

    var currentDateTime;
    var applicationName = "Log Book";
    var gFileSystem;
    var gFileEntry;


    function padToTwoDigits(number)
    {
        var numberString = number.toString();
        return (numberString.length === 1) ? "0"+numberString : numberString;
    }


    app.controller("exportController", function($scope) {

        function getFileName()
        {
            return applicationName + " "
                + padToTwoDigits(currentDateTime.getDay()) + "-"
                + padToTwoDigits(currentDateTime.getMonth()) + "-"
                + currentDateTime.getFullYear().toString() + " "
                + padToTwoDigits(currentDateTime.getHours()) + "."
                + padToTwoDigits(currentDateTime.getMinutes())
                +".html";
        }

        $scope.exportData = function()
        {
           window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

            currentDateTime = new Date();

            function gotFS(fileSystem) {
                gFileSystem = fileSystem;
                gFileSystem.root.getFile(getFileName(), {create: true, exclusive: false}, gotFileEntry, fail);
            }

            function gotFileEntry(fileEntry) {
                gFileEntry = fileEntry;
                gFileEntry.createWriter(gotFileWriter, fail);
            }

            function gotFileWriter(writer) {
                writer.onwriteend = function(evt) {
                    emailFile(gFileEntry.toURL());
                };

/*                writer.onwriteend = function(evt) {
                    alert("contents of file now 'some sample text'");
                    writer.truncate(11);
                    writer.onwriteend = function(evt) {
                        alert("contents of file now 'some sample'");
                        writer.seek(4);
                        writer.write(" different text");
                        writer.onwriteend = function(evt){
                            alert("contents of file now 'some different text'");
                        }
                    };
                };*/
                writer.write("<h1>Heading</h1><div>Maybe this will work</div>");
            }

            function fail(error) {
                alert(error.code);
            }
        };

        $scope.readData = function()
        {

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

            function gotFS(fileSystem) {
                fileSystem.root.getFile(getFileName(), null, gotFileEntry, fail);
            }

            function gotFileEntry(fileEntry) {
                fileEntry.file(gotFile, fail);
                emailFile(fileEntry.toURL());
            }

            function gotFile(file){
                emailFile(file);
            }

            function fail(evt) {
                alert(evt.target.error.code);
            }
        };


        function emailFile(url)
        {
            alert(url);

            window.plugins.socialsharing.shareViaEmail(
                'Message goes here...', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
                'Subject Dan',
                ['danielguyfaber@gmail.com'], // TO: must be null or an array
                null, // CC: must be null or an array
                null, // BCC: must be null or an array
                url, // FILES: can be null, a string, or an array
                onSuccess, // called when sharing worked, but also when the user cancelled sharing via email (I've found no way to detect the difference)
                onError // called when sh*t hits the fan
            );

            function onSuccess(){
                alert("worked!");
            }

            function onError()
            {
                alert("failed!");
            }
        }

    });
})();
