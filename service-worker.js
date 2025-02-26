// service-worker.js
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('padsite-pilot-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/saved-jobs.html',
                'https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js',
                'https://www.gstatic.com/firebasejs/7.24.0/firebase-firestore.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Return cached response or fetch from network
            return response || fetch(event.request).then(function(networkResponse) {
                // Cache the network response but set Cache-Control
                const clonedResponse = networkResponse.clone();
                caches.open('padsite-pilot-cache').then(function(cache) {
                    cache.put(event.request, clonedResponse);
                });
                return networkResponse;
            });
        })
    );
});
