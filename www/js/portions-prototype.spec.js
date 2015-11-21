// JavaScript
describe('Service: portionsPrototype', function () {
    var portionsPrototype, httpBackend, mockData;

    // Use to inject the code under test
    function _inject() {
        inject(function (_portionsPrototype_, $httpBackend) {
            portionsPrototype = _portionsPrototype_;
            httpBackend = $httpBackend;
        });
    }

    // Call this before each test, except where you are testing for errors
    function _setup() {
        // Inject the code under test
        _inject();
    }

    beforeEach(function () {
        // Load the service's module
        module('superscale');
    });

    // Disable UI-Router
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));

    beforeEach(module(function($ionicConfigProvider) {
        $ionicConfigProvider.templates.maxPrefetch(0);
    }));
    beforeEach(module(function($provide) {
        $provide.value('$ionicTemplateCache', function(){} );
    }));


    // make sure no expectations were missed in your tests.
    // (e.g. expectGET or expectPOST)
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('the service api', function () {
        beforeEach(function () {
            // Inject with expected values
            _setup();
        });

        it('should exist', function () {
            expect(!!portionsPrototype).toBe(true);
        });

        it('should provide a setItem function', function () {
            expect(typeof portionsPrototype.setItem).toBe('function');
        });
        it('setItem should return expected value', function () {
            var item = {
                name: 'Candy',
                calories: 100,
                servingSize: 10
            };
            portionsPrototype.setItem(item);
            expect(portionsPrototype.item).toEqual(item);
        });

        it('should provide a setWeight function', function () {
            expect(typeof portionsPrototype.setWeight).toBe('function');
        });
        it('setWeight should return expected value', function () {
            var result = portionsPrototype.setWeight(100);
            expect(portionsPrototype.weight).toBe(100);
        });

        it('should provide a getCalories function', function () {
            expect(typeof portionsPrototype.getCalories).toBe('function');
        });
        it('getCalories should return expected value', function () {
            var item = {
                name: 'Candy',
                calories: 100,
                servingSize: 10
            };
            portionsPrototype.setItem(item);
            portionsPrototype.setWeight(10);

            var result = portionsPrototype.getCalories();
            expect(result).toBe(10);
        });
        
    });
});
