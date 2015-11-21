(function () {

    'use strict';
    angular
        .module('superscale')
        .controller('DashController', DashController);

    /* @ngInject */
    function DashController(scale, scanner, autoupdate, $http, $ionicModal, $scope, portionsFactory) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Dash';
        vm.getNutritionFromGoogle = getNutritionFromGoogle;
        vm.selectItem = selectItem;
        vm.addToMeal = addToMeal;
        vm.meal = [];
        vm.scale = scale;
        vm.portion = null;
        vm.autoupdate = autoupdate;

        activate();

        ////////////////

        function activate() {
            scale.weightUpdated().then(null, null, weightUpdated);
            scanner.barcodeScanned().then(null, null, barcodeScanned);

            $ionicModal.fromTemplateUrl('templates/items.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                vm.modal = modal;
            });
            vm.getNutritionFromGoogle();
        }


        vm.openModal = function() {
            vm.modal.show();
        };
        vm.closeModal = function() {
            vm.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            vm.modal.remove();
        });

        function weightUpdated(weight) {
            if(vm.portion) {
                vm.portion.setWeight(weight);
            }
        }

        function barcodeScanned(barcode) {
            var item = _.find(vm.nutrition, {barcode: barcode});
            if(!item) {
                console.log('Barcode not recognised', barcode);
                return;
            }
            selectItem(item);
        }

        function getNutritionFromGoogle() {
            return $http.get('https://script.googleusercontent.com/macros/echo?user_content_key=Mz9oMnfXcasnEQL1cZmGnsf7EodLxb7rs2_wOpNsve8KOkuRIq5nSW0ydIWnzsFudpvwXUGAMgFNn7B9FKHPcVgGZJWfRPGrOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa1GhPSVukpSQTydEwAEXFXgt_wltjJcH3XHUaaPC1fv5o9XyvOto09QuWI89K6KjOu0SP2F-BdwU4K-6ACMkzAYXyqQugWa-JSsSVo_j15p99MDBn26Q6TrN8uYpFm42KU8tj7zq3GK55y7FLqOV0Tk27B8Rh4QJTQ&lib=MnrE7b2I2PjfH799VodkCPiQjIVyBAxva').then(function(response) {
                console.log(response.data);
                vm.nutrition = response.data.Sheet1;
            });
        }

        function selectItem(item) {
            vm.selectedItem = item;
            vm.portion = portionsFactory();
            vm.portion.setItem(item);
            vm.portion.setWeight(vm.scale.getWeight());
        }

        function addToMeal(portion) {
            vm.meal.unshift(portion);
        }
    }

})();
