// JavaScript
describe('Service: portionsFactory', function () {
    var portionsFactory, httpBackend, mockData;

    // Use to inject the code under test
    function _inject() {
        inject(function (_portionsFactory_, $httpBackend) {
            portionsFactory = _portionsFactory_;
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
            expect(!!portionsFactory).toBe(true);
        });

        it('should make portions', function() {
            var portion = portionsFactory();
            expect(portion instanceof Object).toBe(true);
        })
    });
});
