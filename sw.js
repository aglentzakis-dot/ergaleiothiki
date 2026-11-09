/*
  Εργαλειοθήκη
  © 2026 Ανδρέας Μ. Γλεντζάκης (Andreas M. Glentzakis). Με την επιφύλαξη παντός δικαιώματος. All rights reserved.
  Απαγορεύεται η αντιγραφή, τροποποίηση και διάθεση, εν όλω ή εν μέρει, χωρίς προηγούμενη γραπτή άδεια του κατόχου.
  Copying, modification and distribution, in whole or in part, without the owner's prior written permission are prohibited.
*/
/* ΚΑΝΟΝΑΣ GlenApps (10/11/2026): η εφαρμογή ανοίγει αμέσως από τη συσκευή· δίκτυο το πολύ 3″ — ΜΗΝ αφαιρεθεί.
   gaNet(δίκτυο, αποθήκη, συμβάν): αν το δίκτυο δεν απαντήσει σε 3″ και υπάρχει αποθηκευμένο αντίγραφο, δίνεται αυτό
   (το δίκτυο συνεχίζει στο παρασκήνιο και ενημερώνει την αποθήκη)· μετά από καθυστέρηση, για 30″ όλα κατευθείαν από τη συσκευή.
   Σφάλμα διακομιστή (5xx) δεν αντικαθιστά το αποθηκευμένο. Οι αναβαθμίσεις έρχονται όπως πριν (νέο όνομα αποθήκης σε κάθε έκδοση). */
var GA_MS=3000,gaSlow=0;
function gaNet(net,fromCache,ev){var p=Promise.resolve(net);try{ev&&ev.waitUntil&&ev.waitUntil(p.catch(function(){}))}catch(x){}
  function fc(){try{return Promise.resolve(fromCache()).catch(function(){})}catch(x){return Promise.resolve()}}
  if(Date.now()<gaSlow)return fc().then(function(c){return c||p});
  return new Promise(function(ok){var done=false,t;function fin(r){if(!done){done=true;clearTimeout(t);ok(r)}}
    t=setTimeout(function(){fc().then(function(c){if(c){gaSlow=Date.now()+30000;fin(c)}})},GA_MS);
    p.then(function(r){if(r&&r.status>=500)fc().then(function(c){fin(c||r)});else fin(r)},function(){fc().then(function(c){fin(c||Response.error())})});});}
const CACHE="ergaleiothiki-1.3.10",SHELL=["./","./index.html","./plaisio.js","./antigrafa.js","./efarmoges-mas.js","./manifest.json","./terms.html","./privacy.html","./icon-192.png","./icon-512.png","./icon-512-maskable.png","./apple-touch-icon.png","./metafora-rythmisi.js","./metafora-lipsi.js"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener("message",e=>{e.data&&e.data.type==="skipWaiting"&&self.skipWaiting()});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin||/\/efarmoges\.json$/.test(u.pathname))return;
 if(r.mode==="navigate"||(r.destination===""&&/\.html?($|\?)/.test(r.url))){const isIdx=/(\/|\/index\.html)$/.test(u.pathname);
  e.respondWith(gaNet(fetch(new Request(r.url,{cache:"reload",credentials:"same-origin"})).then(res=>{if(isIdx){const c=res.clone();caches.open(CACHE).then(x=>x.put("./index.html",c)).catch(()=>{})}return res}),()=>caches.match("./index.html").then(x=>x||caches.match("./")).then(x=>x||Response.error()),e));return}
 e.respondWith(gaNet(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c)).catch(()=>{});return res}),()=>caches.match(r).then(x=>x||caches.match(r,{ignoreSearch:true})),e))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{for(const c of l)if("focus"in c)return c.focus();if(self.clients.openWindow)return self.clients.openWindow("./")}))});
