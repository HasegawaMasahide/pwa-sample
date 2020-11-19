// キャッシュしているリソースを特定するためのキー
// バージョン管理するといいらしい(キャッシュバスティングみたいな)
// 他サイトとユニークであることを担保しなくていいのか？→ドメインが違うから自サイトでのみユニークならよい
const CACHE_NAME = 'pwa-sample-caches-v5';

// キャッシュ対象とするURL
const urlsToCache = [
    '/',
    '/styles.css',
    '/app.js',
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