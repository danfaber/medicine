(function(){
    var app = angular.module("medicine");

    var currentDateTime;
    var applicationName = "Log Book";

    app.controller("exportController", function($scope) {

        $scope.exportData = function()
        {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

            var fileSystem;
            var fileEntry;

            currentDateTime = new Date();

            function gotFS(fs) {
                fileSystem = fs;
                fileSystem.root.getFile(getFileName(), {create: true, exclusive: false}, gotFileEntry, fail);
            }

            function gotFileEntry(fe) {
                fileEntry = fe;
                fileEntry.createWriter(gotFileWriter, fail);
            }

            function gotFileWriter(writer) {
                writer.onwriteend = function(evt) {
                    emailFile(fileEntry.toURL());
                };

                writer.write("<h1>Hello Louit!</h1><div>Just need to put data from the system in here which shouldn't be too hard :)</div><div>Gonna try to get that done tomorrow.</div><div>D</div>");
            }

            function fail(error) {}
        };

        function emailFile(url)
        {
            window.plugins.socialsharing.shareViaEmail(
                'Good news pal.  This message has been automatically sent by our app.  Check out the attachment...', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
                getFileName(),
                ['danielguyfaber@gmail.com'], // TO: must be null or an array
                null, // CC: must be null or an array
                null, // BCC: must be null or an array
                url, // FILES: can be null, a string, or an array
                onSuccess, // called when sharing worked, but also when the user cancelled sharing via email (I've found no way to detect the difference)
                onError // called when sh*t hits the fan
            );

            function onSuccess(){}

            function onError(){}
        }

        function padToTwoDigits(number)
        {
            var numberString = number.toString();
            return (numberString.length === 1) ? "0"+numberString : numberString;
        }


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

    });
})();
