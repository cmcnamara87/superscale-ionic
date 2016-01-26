(function () {

    'use strict';
    angular
        .module('superscale')
        .factory('bluetooth', bluetooth);

    /* @ngInject */
    function bluetooth($q, $ionicPlatform, $interval, bluetoothSerial) {
        var readDeferred = $q.defer();

        var service = {
            connect: connect,
            read: read,
            state: 'NOT_CONNECTED'
        };

        return service;

        ////////////////

        function read() {
            return readDeferred.promise;
        }

        function connect(deviceName) {
            service.state = 'CONNECTING';

            console.log('Connecting to device');
            var connectDeffered = $q.defer();

            $ionicPlatform.ready(function () {
                if(!window.ble) {
                    return;
                }

                var characteristic = '0000ffe0-0000-1000-8000-00805f9b34fb';
                window.ble.scan([characteristic], 5, function(device) {
                    if (device.name === 'SCALE') {
                        // its the scale!
                        console.log(device);
                        console.log('connecting');
                        window.ble.connect(device.id, function(response) {
                            console.log('connected', response);

                            function bytesToString(buffer) {
                                return String.fromCharCode.apply(null, new Uint8Array(buffer));
                            }

                            service.state = 'CONNECTED';
                            connectDeffered.resolve();

                            window.ble.startNotification(device.id, 'ffe0', 'ffe1', function(data) {
                                console.log(data);
                                gotData(bytesToString(data));
                            }, console.log);

                            /*
                             {id: "44940460-9A92-011C-2292-9F3C35B2373B", rssi: -54, advertising: {kCBAdvDataIsConnectable: true, kCBAdvDataServiceUUIDs: ["FFE0"], kCBAdvDataLocalName: "SCALE"}, name: "SCALE"}
                             */
                            /*
                             characteristic: "FFE1"
                             isNotifying: false
                             properties: ["Read", "WriteWithoutResponse", "Write", "Notify"] (4)
                             service: "FFE0"
                             */


                            //var onData = function(buffer) {
                            //    // Decode the ArrayBuffer into a typed Array based on the data you expect
                            //    //var data = new Uint8Array(buffer);
                            //    //alert("Button state changed to ", data);
                            //    console.log(buffer);
                            //    console.log(bytesToString(buffer));
                            //}

                            //window.setInterval(function() {
                            //    ble.read('44940460-9A92-011C-2292-9F3C35B2373B', 'ffe0', 'ffe1', function(response) {
                            //        console.log('bleh', response);
                            //        // ASCII only
                            //        function bytesToString(buffer) {
                            //            return String.fromCharCode.apply(null, new Uint8Array(buffer));
                            //        }
                            //
                            //        console.log('maybe?', bytesToString(response));
                            //    }, function(e) {
                            //        console.log('well read didnt work', e);
                            //    });
                            //}, 1000);


                        }, console.error);



                    }
                }, function (error) {
                    console.error('failed to find devices', error);
                });


                //$interval(function() {
                //    bluetoothSerial.list(function(devices) {
                //        console.log('Devices', devices);
                //    });
                //}, 1000);
                //bluetoothSerial.list(function(devices) {
                //    console.log('Devices', devices);
                //    // get device
                //    var device = _.find(devices, {name: deviceName});
                //    console.log('Bluetooth: Found device', device);
                //
                //    bluetoothSerial.connect(device.uuid, function() {
                //        service.state = 'CONNECTED';
                //        deferred2.resolve();
                //        console.log('Bluetooth: Connected');
                //        bluetoothSerial.subscribe('\n', gotData, failure);
                //    }, failure);
                //}, failure);
            });
            return connectDeffered.promise;
        }

        function gotData(data) {
            console.log('Bluetooth Data:', data);
            readDeferred.notify(data);
        }

        function failure(message) {
            console.error('Bluetooth:', message);
        }


    }

})();
