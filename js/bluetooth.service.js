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
            read: read,
            state: 'NOT_CONNECTED'
        };

        return service;

        ////////////////

        function read() {
            return deferred.promise;
        }

        function connect(deviceName) {
            service.state = 'CONNECTING';

            console.log('Connecting to device');
            var deferred2 = $q.defer();

            $ionicPlatform.ready(function () {
                if(!window.bluetoothSerial) {
                    return;
                }

                bluetoothSerial.list(function(devices) {
                    console.log('Devices', devices);
                    // get device
                    var device = _.find(devices, {name: deviceName});
                    console.log('Bluetooth: Found device', device);

                    bluetoothSerial.connect(device.uuid, function() {
                        service.state = 'CONNECTED';
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
            deferred.notify(data);
        }

        function failure(message) {
            console.error('Bluetooth:', message);
        }


    }

})();
