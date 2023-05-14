'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "7fda5d6a4f4906220dccc4ba4a3d07f5",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/icons/classroom_icon.png": "b18ac610524a4c879c1883236fffd752",
"assets/icons/comment_icon.png": "bb8428d2ba39d9d7ebe8d7e5e22311d9",
"assets/icons/excel_icon.png": "5cc1bab40db952307bdd80ed6411e255",
"assets/icons/notification_icon.png": "cb1ad24d5561c25f42da465866f0f73d",
"assets/icons/pdf_icon.png": "0bca25c5074dbc56556291ded6d3c2f0",
"assets/icons/resources_icon.png": "e8b82a9982938a8faea89619983a5b49",
"assets/icons/student_icon.png": "c8dece310de409de3effae815539c010",
"assets/icons/video_icon.png": "3a973452bcfd024fe10a204bc137c508",
"assets/icons/word_icon.png": "c9ab61bedbf75561836644921ee95571",
"assets/images/add_file.png": "ede3e274789142366b45179726f064f5",
"assets/images/banner_bg1.png": "f3b602037aa4e0aed279349ee8547b3e",
"assets/images/banner_bg2.png": "697b044fea356b847f12e38bbf33060f",
"assets/images/banner_bg3.png": "52b925cf8d1b042ce8eb6f8d83d2914f",
"assets/images/banner_bg4.png": "aac45403263af40df8202811a89eae17",
"assets/images/banner_bg5.png": "f5ebd109646af146c09c16072087bc14",
"assets/images/classroom_bg.png": "fac130b6e9c5fa336da653961298ffd5",
"assets/images/default_avatar.png": "11621610f79ba6c7e8783cc33759da49",
"assets/images/grade_query_bg.png": "c27b606211c32cb6d07fa8f22eb75a96",
"assets/images/imac.png": "3fb700da4584ef68e18c9924926dae64",
"assets/images/item_bg1.png": "6d286394e2065ae99694048921e788c6",
"assets/images/item_bg2.png": "ac9fdc6812f33a9b08c6b873e435f36f",
"assets/images/item_bg3.png": "680fc14f13937e032d22e05f7a4e2824",
"assets/images/item_bg4.png": "3d1df2f878c831be33266236ac959b18",
"assets/images/item_bg5.png": "39e4d73926e4b8482114b1d41d430046",
"assets/images/item_bg6.png": "154c917b439cdde4a58f967ae8eea3f7",
"assets/images/item_bg7.png": "b383fd1c78bf67dcf8fdd260bd677593",
"assets/images/item_bg8.png": "e4458aab6aea76bb1f6b522e1e25b9cb",
"assets/images/many_select_bg.png": "d614740d22087eabbc00fbedbd5bfb46",
"assets/images/single_select_bg.png": "f4ee803459da3e2102a632313554a4c9",
"assets/images/team_select_bg.png": "22a0832fa788721abd091eb45ee43605",
"assets/images/test_image.png": "e5552a71af1b82ebe8bb1ab56e8de998",
"assets/NOTICES": "1ed78d0050468e0d422f072943ce70eb",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "52479edb025a13778f8420be3b57d180",
"/": "52479edb025a13778f8420be3b57d180",
"main.dart.js": "ac4e76fe011a1765158dc3961a37a814",
"manifest.json": "ccd6e025dcf21a4b250d09e86d23a358",
"version.json": "e51ed78ed302bca8de417943ab0cfa5a"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
