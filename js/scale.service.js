(function () {

    'use strict';
    angular
        .module('superscale')
        .factory('scale', scale);

    /* @ngInject */
    function scale($q, bluetooth) {

        var deferred = $q.defer();
        bluetooth.read().then(null, null, gotMessage);

        var scale = {
            _weight: 0,
            _tareValue: 0,
            getWeight: getWeight,
            isTared: isTared,
            tare: tare,
            weightUpdated: weightUpdated
        };
        return scale;

        /////////////

        function gotMessage(message) {
            console.log('bluetooth got reading', message);
            var data = JSON.parse(message);
            console.log('message json', data);
            if(data.W) {
                scale._weight = data.W;
                console.log('set sacle weogt', scale._weight);
                deferred.notify(scale.getWeight());
            }
        }

        function weightUpdated() {
            return deferred.promise;
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
