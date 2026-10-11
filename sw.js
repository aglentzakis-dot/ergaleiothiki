/*
  Εργαλειοθήκη
  © 2026 Ανδρέας Μ. Γλεντζάκης (Andreas M. Glentzakis). Με την επιφύλαξη παντός δικαιώματος. All rights reserved.
  Απαγορεύεται η αντιγραφή, τροποποίηση και διάθεση, εν όλω ή εν μέρει, χωρίς προηγούμενη γραπτή άδεια του κατόχου.
  Copying, modification and distribution, in whole or in part, without the owner's prior written permission are prohibited.
*/
const CACHE="ergaleiothiki-1.2.0",SHELL=["./","./index.html","./antigrafa.js","./efarmoges-mas.js","./manifest.json","./icon-192.png","./icon-512.png","./icon-512-maskable.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener("message",e=>{e.data&&e.data.type==="skipWaiting"&&self.skipWaiting()});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin||/\/efarmoges\.json$/.test(u.pathname))return;
 if(r.mode==="navigate"||(r.destination===""&&/\.html?($|\?)/.test(r.url))){const isIdx=/(\/|\/index\.html)$/.test(u.pathname);
  e.respondWith(fetch(new Request(r.url,{cache:"reload",credentials:"same-origin"})).then(res=>{if(isIdx){const c=res.clone();caches.open(CACHE).then(x=>x.put("./index.html",c)).catch(()=>{})}return res}).catch(()=>caches.match("./index.html").then(x=>x||caches.match("./")).then(x=>x||Response.error())));return}
 e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c)).catch(()=>{});return res}).catch(()=>caches.match(r)))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{for(const c of l)if("focus"in c)return c.focus();if(self.clients.openWindow)return self.clients.openWindow("./")}))});
