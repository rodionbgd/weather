const CACHE_NAME="cache-v1",OFFLINE_URL="404.html";window.self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&window.self.skipWaiting()})),window.self.addEventListener("install",(e=>{e.waitUntil((async()=>{const e=await caches.open("cache-v1");await e.add(new Request("404.html",{cache:"reload"}))})()),window.self.skipWaiting()})),window.self.addEventListener("activate",(e=>{e.waitUntil((async()=>{"navigationPreload"in window.self.registration&&await window.self.registration.navigationPreload.enable()})()),window.self.clients.claim()})),window.self.addEventListener("fetch",(e=>{"navigate"===e.request.mode&&e.respondWith((async()=>{try{return await e.preloadResponse||await fetch(e.request)}catch(e){return(await caches.open("cache-v1")).match("404.html")}})())}));