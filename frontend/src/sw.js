self.addEventListener('install', (event) => {
  console.log('Service Worker is now installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker is now Active');
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const { message, url } = data.message;
  const options = {
    body: message,
    icon: '',
    data: {
      url,
    },
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (e) => {
  // Close the notification popout
  e.notification.close();
  // Get all the Window clients
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientsArr) => {
      // If a Window tab matching the targeted URL already exists, focus that;
      const hadWindowToFocus = clientsArr.some((windowClient) =>
        windowClient.url === e.notification.data.url
          ? (windowClient.focus(), true)
          : false
      );
      // Otherwise, open a new tab to the applicable URL and focus it.
      const { url } = e.notification.data;
      if (!hadWindowToFocus)
        clients
          .openWindow(self.location.origin + url)
          .then((windowClient) => (windowClient ? windowClient.focus() : null));
    })
  );
});
