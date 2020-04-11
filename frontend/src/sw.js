self.addEventListener('install', event => {
  console.log('Service Worker is now installed');
});

self.addEventListener('activate', event => {
  console.log('Service Worker is now Active');
});

self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.message,
      icon: '',
      data: {
        url: data.url
      }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});
