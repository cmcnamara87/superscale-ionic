(function () {

    console.log('did it get there?');

    'use strict';
    angular
        .module('superscale')
        .factory('autoupdate', autoupdate);

    /* @ngInject */
    function autoupdate($q) {

        var service = {
            state: 'UP_TO_DATE',
            check: check
        };

        var isCordova = typeof cordova !== 'undefined',
        // CordovaPromiseFS
            fs,
        // CordovaFileLoader
            loader,
        // script-tag...
            script,
        // ...that contains the serverRoot
            serverRoot;

        // Get serverRoot from script tag.
        script = document.querySelector('script[server]');
        if (script) serverRoot = script.getAttribute('server');
        if (!serverRoot) {
            throw new Error('Add a "server" attribute to the bootstrap.js script!');
        }

        // Initialize filesystem and loader
        fs = new CordovaPromiseFS({
            persistent: isCordova, // Chrome should use temporary storage.
            Promise: $q
        });

        loader = new CordovaAppLoader({
            fs: fs,
            localRoot: 'app',
            serverRoot: serverRoot,
            mode: 'mirror',
            cacheBuster: true
        });

        // 1. On launch
        check();

        // 2. Cordova: On resume
        fs.deviceready.then(function () {
            document.addEventListener('resume', check);
        });

        // 3. Chrome: On page becomes visible again
        function handleVisibilityChange() {
            if (!document.webkitHidden) {
                check();
            }
        }

        document.addEventListener("webkitvisibilitychange", handleVisibilityChange, false);

        return service;

        ////////////////


        // Check > Download > Update
        function check() {
            console.log('Autoupdate: Checking...');
            service.state = 'CHECKING';
            loader.check()
                .then(function (updateAvailable) {
                    if(updateAvailable) {
                        console.log('downloading new version');
                        service.state = 'DOWNLOADING';
                    } else {
                        console.log('its up to date');
                        service.state = 'UP_TO_DATE';
                    }
                    console.log('Autoupdate: Downloading', updateAvailable);
                    return loader.download(onprogress);
                })
                .then(function(manifest){
                    console.log('Autoupdate: Updating', manifest);
                    return loader.update();
                }, function (err) {
                    service.state = 'ERROR ' + err;
                    console.error('Auto-update error:', err);
                }).then(function() {
                    console.log('update applied');
                });
        }

        function onprogress(info) {
            console.log('progress', info);
        }
    }

})
();
