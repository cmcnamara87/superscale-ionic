(function () {

    'use strict';
    angular
        .module('superscale')
        .factory('bluetooth', bluetooth);

    /* @ngInject */
    function bluetooth($q, $ionicPlatform) {
        var deferred = $q.defer();

        var service = {
            connect: connect,
            read: read
        };

        return service;

        ////////////////

        function read() {
            return deferred.promise;
        }

        function connect(deviceName) {
            console.log('Connecting to device');
            var deferred2 = $q.defer();

            $ionicPlatform.ready(function () {
                if(!window.bluetoothSerial) {
                    return;
                }

                bluetoothSerial.list(function(devices) {
                    console.log(devices);
                    // get device
                    var device = _.find(devices, {name: deviceName});
                    console.log('Bluetooth: Found device', device);

                    bluetoothSerial.connect(device.uuid, function() {
                        deferred2.resolve();
                        console.log('Bluetooth: Connected');
                        bluetoothSerial.subscribe('\n', gotData, failure);
                    }, failure);
                }, failure);
            });
            return deferred2.promise;
        }

        function gotData(data) {
            console.log('Bluetooth Data:', data);
            deferred.notify(parseInt(data));
        }

        function failure(message) {
            console.error('Bluetooth:', message);
        }


    }

})();
