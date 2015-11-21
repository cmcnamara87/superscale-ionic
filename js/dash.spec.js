describe('Controller: DashController', function () {
    var DashController, scope, vm, scale, $httpBackend;

    beforeEach(module('superscale'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    // Initialize the controller and scope
    beforeEach(function () {
        // Inject in angular constructs otherwise,
        //  you would need to inject these into each test
        inject(function ($controller, $rootScope, $q, _$httpBackend_) {
            scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            scale = {
                connect: jasmine.createSpy('connect').and.returnValue($q.when()),
                getWeight: jasmine.createSpy('getWeight').and.returnValue($q.when(100))
            };
            //mySvc = _mySvc_;
            vm = $controller('DashController as vm', {
                $scope: scope,
                scale: scale
            });

            $httpBackend.when('GET', 'templates/tab-account.html').respond(200, '');
            $httpBackend.when('GET', 'templates/chat-detail.html').respond(200, '');
            $httpBackend.when('GET', 'templates/tab-chats.html').respond(200, '');
            $httpBackend.when('GET', 'templates/tab-dash.html').respond(200, '');
        });

    });

    it('should exist', function () {
        expect(!!vm).toBe(true);
    });

    it('should provide a getNutritionFromGoogle function', function () {
        expect(typeof vm.getNutritionFromGoogle).toBe('function');
    });
    //it('getNutritionFromGoogle should return expected value', function () {
    //    $httpBackend.expectGET('https://script.googleusercontent.com/macros/echo?user_content_key=Mz9oMnfXcasnEQL1cZmGnsf7EodLxb7rs2_wOpNsve8KOkuRIq5nSW0ydIWnzsFudpvwXUGAMgFNn7B9FKHPcVgGZJWfRPGrOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa1GhPSVukpSQTydEwAEXFXgt_wltjJcH3XHUaaPC1fv5o9XyvOto09QuWI89K6KjOu0SP2F-BdwU4K-6ACMkzAYXyqQugWa-JSsSVo_j15p99MDBn26Q6TrN8uYpFm42KU8tj7zq3GK55y7FLqOV0Tk27B8Rh4QJTQ&lib=MnrE7b2I2PjfH799VodkCPiQjIVyBAxva').respond(200, []);
    //    var result = vm.getNutritionFromGoogle();
    //    result.then(function() {
    //        expect(vm.nutrition).toEqual([]);
    //    });
    //    $httpBackend.flush();
    //});

    it('should provide a selectItem function', function () {
        expect(typeof vm.selectItem).toBe('function');
    });
    it('selectItem should return expected value', function () {
        var item = {}
        var result = vm.selectItem(item);
        expect(vm.selectedItem).toEqual(item);
        expect(vm.portion.item).toEqual(item);

    });


    it('should provide a addToMeal function', function () {
        expect(typeof vm.addToMeal).toBe('function');
    });
    it('addToMeal should return expected value', function () {
        expect(vm.meal).toEqual([]);
        var item = {
            name: 'Candy',
            calories: 100,
            servingSize: 10
        };
        var result = vm.addToMeal(item);
        expect(vm.meal[0]).toEqual(item);
    });

    describe('when destroyed', function () {
        // Add specs
    });
});
