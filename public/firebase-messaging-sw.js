// Firebase Cloud Messaging Service Worker for WOMENE Care Network
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

const firebaseConfig = {
  projectId: "studio-6989353372-64cd3",
  appId: "1:366648669779:web:2d087f960dd7f01fecb8a6",
  apiKey: "AIzaSyCGKRa6QfqVNn82k_dJNCx4QYsVTgGLU1s",
  authDomain: "studio-6989353372-64cd3.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-womenepeoplenear-df1f2517-18a3-44e6-90a8-494efbfb1833",
  storageBucket: "studio-6989353372-64cd3.firebasestorage.app",
  messagingSenderId: "366648669779"
};

try {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[FCM SW] Received background message:', payload);
    const notificationTitle = payload.notification?.title || payload.data?.title || '🚨 WOMENE Emergency Alert';
    const notificationOptions = {
      body: payload.notification?.body || payload.data?.body || 'Urgent update received from WOMENE Network.',
      icon: '/assets/womene_hero_banner_1789580680850.jpg',
      badge: '/assets/womene_login_cover_1789580704790.jpg',
      vibrate: [300, 100, 300, 100, 400],
      tag: payload.data?.tag || 'womene-emergency-alert',
      renotify: true,
      requireInteraction: payload.data?.severity === 'critical',
      data: payload.data || {}
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (e) {
  console.warn('[FCM SW] Firebase compat initialization notice:', e);
}

// Push event fallback for standard web push
self.addEventListener('push', (event) => {
  if (event.data) {
    try {
      const data = event.data.json();
      const title = data.title || data.notification?.title || '🚨 WOMENE Emergency Update';
      const options = {
        body: data.body || data.notification?.body || 'Important emergency or community update.',
        icon: '/assets/womene_hero_banner_1789580680850.jpg',
        badge: '/assets/womene_login_cover_1789580704790.jpg',
        vibrate: [300, 100, 300],
        tag: data.tag || 'womene-push-alert',
        data: data
      };
      event.waitUntil(self.registration.showNotification(title, options));
    } catch {
      event.waitUntil(
        self.registration.showNotification('🚨 WOMENE Alert', {
          body: event.data.text(),
          vibrate: [200, 100, 200]
        })
      );
    }
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
