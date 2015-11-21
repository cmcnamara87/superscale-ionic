// JavaScript
describe('Service: scale', function () {
    var scale, httpBackend, mockData;

    // Use to inject the code under test
    function _inject() {
        inject(function (_scale_, $httpBackend) {
            scale = _scale_;
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
            expect(!!scale).toBe(true);
        });
        //
        //describe('when created', function () {
        //    it('should connect to scale', function() {
        //        expect(scale.connect).toHaveBeenCalled();
        //    });
        //    it('should get the weight', function() {
        //        expect(scale.getWeight).toHaveBeenCalled();
        //    });
        //});

        it('should provide a getWeight function', function () {
            expect(typeof scale.getWeight).toBe('function');
        });
        it('getWeight should the weight', function () {
            scale._weight = 100;
            var result = scale.getWeight();
            expect(result).toBe(100);
        });

        it('should provide a tare function', function () {
            expect(typeof scale.tare).toBe('function');
        });
        it('tare should return expected value', function () {
            scale._weight = 100;
            var result = scale.tare();
            expect(scale._tareValue).toBe(100);
        });

        it('should change weight after taring', function() {
            scale._weight = 100;
            expect(scale.getWeight()).toBe(100);
            scale.tare();
            expect(scale.getWeight()).toBe(0);
        });

        it('should provide a isTared function', function () {
            expect(typeof scale.isTared).toBe('function');
        });
        it('isTared should return expected value', function () {
            scale._weight = 100;
            var result = scale.isTared();
            expect(result).toBe(false);
            scale.tare();
            var result = scale.isTared();
            expect(result).toBe(true);
        });
        
    });
});
