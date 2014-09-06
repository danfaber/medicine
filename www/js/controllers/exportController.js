(function(){
    var app = angular.module("medicine");

    var currentDateTime;
    var applicationName = "Log Book";
    var gFileSystem;
    var gFileEntry;


    app.controller("exportController", function($scope) {

        function getFileName()
        {
            return applicationName + " " + currentDateTime+".html";
        }

        $scope.exportData = function()
        {


         //   alert(cordova.file.dataDirectory);


           window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);


            function gotFS(fileSystem) {
                fileSystem.root.getFile("bob.txt", {create: true, exclusive: false}, gotFileEntry, fail);
            }

            function gotFileEntry(fileEntry) {
                fileEntry.createWriter(gotFileWriter, fail);
            }

            function gotFileWriter(writer) {
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
                writer.write("dan text here");
            }

            function fail(error) {
                alert(error.code);
            }
        };

        $scope.readData = function()
        {

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

            function gotFS(fileSystem) {
                fileSystem.root.getFile("bob.txt", null, gotFileEntry, fail);
            }

            function gotFileEntry(fileEntry) {
                fileEntry.file(gotFile, fail);
                emailFile(fileEntry.toURL());
            }

            function gotFile(file){
                readDataUrl(file);
                readAsText(file);
                emailFile(file);
            }

            function readDataUrl(file) {
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    alert("Read as data URL");
                    alert(evt.target.result);
                };
                reader.readAsDataURL(file);
            }

            function readAsText(file) {
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    alert("Read as text");
                    alert(evt.target.result);
                };
                reader.readAsText(file);
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
