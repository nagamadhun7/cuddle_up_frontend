// self.addEventListener("install", (event) => {
//     console.log("Service Worker installing...");
//     event.waitUntil(self.skipWaiting()); // Activate service worker immediately
//   });
  
//   self.addEventListener("activate", (event) => {
//     console.log("Service Worker activated");
//   });
  
//   self.addEventListener("fetch", (event) => {
//     console.log("Fetching:", event.request.url);
//   });

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting()); // Activate service worker immediately
});

self.addEventListener("activate", (event) => {
  // No logging
});

self.addEventListener("fetch", (event) => {
  // No logging
});
