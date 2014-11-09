(function(){
    'use strict';

    angular.module("medicine").factory("fileService",[fileService]);

    function fileService(){

        return {
            generateFile: generateFile
        };

        function generateFile(fileName, appendDateTime, fileType, fileBody, successCallBack, failCallBack)
        {
            if (appendDateTime)
            {
                fileName += " " + getCurrentDateTimeString();
            }
            fileName += "." + fileType;


            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failCallBack);

            var fileSystem;
            var fileEntry;

            function gotFS(fs) {
                fileSystem = fs;
                fileSystem.root.getFile(fileName, {create: true, exclusive: false}, gotFileEntry, failCallBack);
            }

            function gotFileEntry(fe) {
                fileEntry = fe;
                fileEntry.createWriter(gotFileWriter, failCallBack);
            }

            function gotFileWriter(writer) {
                writer.onwriteend = function(evt) {
                    successCallBack(fileEntry.toURL());
                };

                writer.write(fileBody);
            }
        }

        function getCurrentDateTimeString()
        {
            var now = moment();
            return now.format("YYYY-MM-DD HH.mm");
        }
    }

})();
