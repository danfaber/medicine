(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("reportsController", function($scope, $filter, recordSearchService, reportService, $http, settingsRepository, fileService, earliestDate, $ionicPopup) {

        $scope.globalData.currentRecordDefinition = null;

        $scope.data = {
            fromDate:null,
            toDate: $filter('date')(new Date().setHours(0,0,0,0),'yyyy-MM-dd'),
            userName: settingsRepository.getUserName(),
            emailAddress : settingsRepository.getUserEmailAddress()
        };


        $scope.saveUserName = function()
        {
            settingsRepository.setUserName($scope.data.userName);
        };

        $scope.saveEmailAddress = function()
        {
            settingsRepository.setUserEmailAddress($scope.data.emailAddress);
        };

        $scope.generateReport = function()
        {
            if (!$scope.data.fromDate)
            {
                $scope.data.fromDate = earliestDate;
            }

            if (moment($scope.data.toDate).isBefore(moment($scope.data.fromDate)))
            {
                var popup = $ionicPopup.alert({
                    title: 'Incorrect Date Range',
                    template: 'Please make sure the <strong>To Date</strong> is after the <strong>To Date</strong>'
                });
                popup.then(function(res) {
                });
            }
            else
            {
                var searchDefinition = new recordSearchService.SearchDefinition( $scope.data.fromDate, $scope.data.toDate, []);

                var viewModel = reportService.generateReport(searchDefinition);

                $http.get("templates/reportTemplate.html").success(function(template){

                    $http.get("templates/bootstrapAsText.txt").success(function(bootstrap){

                        $http.get("templates/jqueryAsText.txt").success(function(jquery){

                            var compiledTemplate = Handlebars.compile(template);

                            var reportHtml = compiledTemplate(viewModel);

                            var htmlWithStylesAndJavascript = bootstrap + reportHtml + jquery;

                            var reportName = $scope.data.userName + " Log Book";

                            fileService.generateFile(reportName, true, "html", htmlWithStylesAndJavascript, emailReport, onError);
                        })
                    });

                });
            }
        };

        function emailReport(attachmentUrl)
        {
            window.plugins.socialsharing.shareViaEmail(
                'Please find attached your log book report.', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
                "Medical Log Book Report",   // subject
                [$scope.data.emailAddress], // TO: must be null or an array
                null, // CC: must be null or an array
                null, // BCC: must be null or an array
                attachmentUrl, // FILES: can be null, a string, or an array
                onSuccess, // called when sharing worked, but also when the user cancelled sharing via email (I've found no way to detect the difference)
                onError // called when sh*t hits the fan
            );
        }

        function onSuccess() {}
        function onError() {}

    });

})();

