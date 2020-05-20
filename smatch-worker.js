importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
//importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('Workbox successfully loaded');

} else {
    console.log(`Workbox failed to loaded`);
}
/* WORKBOX SCRIPT STARTED */
workbox.precaching.precacheAndRoute([
	{ url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/match.html', revision: '1' },
    { url: '/player.html', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/components/nav.html', revision: '1' },
    { url: '/components/pages/home.html', revision: '1' },
    { url: '/components/pages/statistic.html', revision: '1' },
    { url: '/components/pages/saved.html', revision: '1' },
    { url: '/components/pages/about.html', revision: '1' },
    { url: '/assets/css/styles.css', revision: '1' },
    { url: '/assets/css/materialize.min.css', revision: '1' },
    { url: '/assets/css/materialdesignicons.min.css', revision: '1' },
    { url: '/assets/js/materialize.min.js', revision: '1' },
    { url: '/assets/js/jquery-3.1.1.min.js', revision: '1' },
    { url: '/assets/js/idb.js', revision: '1' },
    { url: '/assets/js/main.js', revision: '1' },
    { url: '/assets/js/nav.js', revision: '1' },
    { url: '/assets/js/dom.js', revision: '1' },
    { url: '/assets/js/api.js', revision: '1' },
    { url: '/assets/js/team.js', revision: '1' },
    { url: '/assets/js/match.js', revision: '1' },
    { url: '/assets/js/player.js', revision: '1' },
    { url: '/assets/js/db.js', revision: '1' },
    { url: '/assets/fonts/materialdesignicons-webfont.woff', revision: '1' },
    { url: '/assets/fonts/materialdesignicons-webfont.woff2', revision: '1' },
    { url: '/assets/images/icon-512.png', revision: '1' },
    { url: '/assets/images/icon-384.png', revision: '1' },
    { url: '/assets/images/icon-256.png', revision: '1' },
    { url: '/assets/images/icon-192.png', revision: '1' },
    { url: '/assets/images/icon-152.png', revision: '1' },
    { url: '/assets/images/icon-144.png', revision: '1' },
    { url: '/assets/images/icon-128.png', revision: '1' },
    { url: '/assets/images/icon-96.png', revision: '1' },
    { url: '/assets/images/icon-72.png', revision: '1' },
    { url: '/assets/images/icon-apple.jpg', revision: '1' },
    { url: '/assets/images/sidebar.png', revision: '1' },
    { url: '/assets/images/player.png', revision: '1' },
    { url: '/assets/images/match.png', revision: '1' },
    { url: '/assets/images/luminix-teal.jpg', revision: '1' },
    { url: '/assets/images/mine.jpg', revision: '1' },
]);


// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'football-api',
  })
)

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
     new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30days
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('/.*\\.js'),
    new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/components/'),
    new workbox.strategies.CacheFirst()
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'img/icon-apple.jpg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
