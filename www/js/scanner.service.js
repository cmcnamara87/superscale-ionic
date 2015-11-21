(function () {

    'use strict';
    angular
        .module('superscale')
        .factory('scanner', scanner);

    /* @ngInject */
    function scanner(bluetooth, $q) {
        var deferred = $q.defer();
        bluetooth.read().then(null, null, gotMessage);

        var service = {
            barcodeScanned: barcodeScanned
        };

        return service;

        ////////////////

        function gotMessage(message) {
            var data = JSON.parse(message);
            if(data.B) {
                deferred.notify(data.B);
            }
        }

        function barcodeScanned() {
            return deferred.promise;
        }
    }

})();
