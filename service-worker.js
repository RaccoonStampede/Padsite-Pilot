self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('job-walkthrough-cache').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/flare.html',
        '/bottoms_pump.html',
        '/air_compressor.html',
        '/salt_water_pump.html',
        '/burner_management.html',
        '/battery_charger.html',
        '/light_poles.html',
        '/fuel_skid.html',
        '/manifest.json',
        '/service-worker.js',
        '/styles.css' // Add any CSS/JS files your app uses
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
