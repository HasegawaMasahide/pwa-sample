// キャッシュしているリソースを特定するためのキー
// バージョン管理するといいらしい(キャッシュバスティングみたいな)
// 他サイトとユニークであることを担保しなくていいのか？→ドメインが違うから自サイトでのみユニークならよい
const CACHE_NAME = 'pwa-sample-caches-5';

// キャッシュ対象とするURL
const urlsToCache = [
    '/',
    '/src/styles.css',
    '/src/app.js',
];

// 初回に実行される
self.addEventListener('install', function(event) {
    // waitUntilでラップすることで、キャッシュできないリソースが1つでも存在したらインストールは完遂しない
    // = 次回以降のアクセスのときに再度キャッシュを挑戦する？
    event.waitUntil(
        // 対象リソースをキャッシュする
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// 初回以外で実行される
self.addEventListener('activate', function(event) {  
    event.waitUntil(
      // 古いキャッシュを削除する(ソースコード上でCACHE_NAMEを変更しても、過去に握ったキャッシュは残り続けるため)
      caches.keys().then(function(cache) {
        cache.forEach(function(name) {
          if(CACHE_NAME !== name) caches.delete(name);
        })
      })
    );
  });

// リクエストが発行されたときに実行される
self.addEventListener('fetch', function(event) {
    event.respondWith(
        // event.request.url がキャッシュされていればそれを返す
        caches.match(event.request)
        .then(function(response) {
            return response ? response : fetch(event.request);
        })
    );
});