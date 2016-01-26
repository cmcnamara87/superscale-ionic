(function () {

    'use strict';
    angular
        .module('superscale')
        .controller('AccountController', AccountController);

    /* @ngInject */
    function AccountController($scope, autoupdate) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Account';

        activate();

        $scope.$on('$ionicView.enter', function(e) {
            autoupdate.check();
        });
        vm.autoupdate = autoupdate;

        ////////////////

        function activate() {
        }
    }

})();
