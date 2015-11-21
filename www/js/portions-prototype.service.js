(function () {

    'use strict';
    angular
        .module('superscale')
        .service('portionsPrototype', portionsPrototype);

    /* @ngInject */
    function portionsPrototype() {

        this.getCalories = getCalories;
        this.setItem = setItem;
        this.setWeight = setWeight;
        this.getWeight = getWeight;

        function setItem(newItem) {
            this.item = newItem;
        }

        function setWeight(weight) {
            this.weight = weight;
        }

        function getWeight() {
            return this.weight;
        }

        function getCalories() {
            return this.weight * (this.item.calories / 100);
        }

    }

})();
