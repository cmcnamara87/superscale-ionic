(function () {

    'use strict';
    angular
        .module('superscale')
        .factory('scale', scale);

    /* @ngInject */
    function scale($q, $ionicPlatform, bluetooth) {

        var deferred = $q.defer();

        var scale = {
            _weight: 0,
            _tareValue: 0,
            state: 'NOT_FOUND',
            connect: connect,
            getWeight: getWeight,
            isTared: isTared,
            tare: tare,
            weightUpdated: weightUpdated
        };
        return scale;

        function connect() {
            console.log('Connecting to bluetooth scale');
            scale.state = 'CONNECTING';
            bluetooth.connect('UART').then(function() {
                scale.state = 'CONNECTED';
            });
            bluetooth.read().then(null, null, gotReading);
        }

        function weightUpdated() {
            return deferred.promise;
        }

        function gotReading(newWeight) {
            console.log('scale got reading', newWeight);
            scale._weight = newWeight;
            console.log('set sacle weogt', scale._weight);
            deferred.notify(scale.getWeight());
        }

        function getWeight() {
            return scale._weight - scale._tareValue;
        }

        function tare() {
            scale._tareValue = scale._weight;
            deferred.notify(scale.getWeight());
        }

        function isTared() {
            return scale._tareValue !== 0;
        }

    }

})();
