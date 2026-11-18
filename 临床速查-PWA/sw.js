/* ============================================================
 * 临床速查 PWA Service Worker
 * 策略：页面导航 → 网络优先（内容常新）；静态资源 → 缓存优先（秒开）
 * 改内容后：把 VERSION 改一位
 * ============================================================ */

const VERSION = 'v1';
const CACHE = 'medkit-' + VERSION;

/* 本地调试开关：仅当 URL 带 ?nosw=1 时完全绕过缓存（便于开发验证） */
const IS_DEV = (self.location.search || '').indexOf('nosw=1') >= 0;

/* 预缓存清单（相对路径，兼容 GitHub Pages 子目录部署） */
const CORE = [
  './',
  './index.html',
  './css/app.css',
  './js/data.bundle.js',
  './js/data.js',
  './js/algo-extra.js',
  './js/engine.js',
  './js/app.js',
  './js/views-guide.js',
  './js/views-pinned.js',
  './pwa.js',
  './sw.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  if (IS_DEV) return;   // 开发环境不预缓存
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(CORE.map(async (url) => {
      try {
        await cache.add(new Request(url, { cache: 'reload' }));
      } catch (err) {
        console.warn('[SW] 预缓存跳过:', url, err.message);
      }
    }));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // 开发环境完全直连，不走缓存
  if (IS_DEV) return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    req.mode === 'navigate' ? networkFirst(req) : staleWhileRevalidate(req)
  );
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch (err) {
    const hit = await cache.match(req);
    if (hit) return hit;
    const fallback = await cache.match('./index.html');
    if (fallback) return fallback;
    return new Response('离线且无缓存', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const network = fetch(req)
    .then((res) => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);
  return hit || (await network) || new Response('', { status: 504 });
}

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
