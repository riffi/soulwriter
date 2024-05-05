importScripts('sw-toolbox.js');

toolbox.precache(["index.html","/assets/*"]);
toolbox.router.get('/icon/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.networkFirst, { networkTimeoutSeconds: 5});
