(function () {

    'use strict';
    angular
        .module('superscale')
        .factory('portionsFactory', portionsFactory);

    /* @ngInject */
    function portionsFactory(portionsPrototype) {

        return function(data) {
            var item = null;
            console.log('creating portion');
            return _.assign(_.create(portionsPrototype), data);
        };

        /////

    }

})();
