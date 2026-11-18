/* ============================================================
 * pwa-kit 运行时增强脚本
 * 1. 注册 Service Worker（离线可用）
 * 2. 检测是否以「独立窗口」运行
 * 3. iOS Safari 底部引导条：教用户「添加到主屏幕」
 * 4. 断网状态提示
 * 5. 版本更新提示
 *
 * 用法：在页面 </head> 前加 <script src="./pwa.js" defer></script>
 * ============================================================ */

(function () {
  'use strict';

  /* ---------------- 环境探测 ---------------- */
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isIOSSafari = isIOS && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);

  const isStandalone =
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches;

  document.documentElement.classList.add(isStandalone ? 'pwakit-standalone' : 'pwakit-browser');
  if (isIOS) document.documentElement.classList.add('pwakit-ios');

  /* ---------------- 样式注入 ---------------- */
  const CSS = `
  .pwakit-bar{
    position:fixed; left:10px; right:10px;
    bottom:calc(10px + env(safe-area-inset-bottom, 0px));
    z-index:2147483000;
    display:flex; align-items:flex-start; gap:12px;
    padding:14px 14px 14px 16px;
    border-radius:14px;
    background:rgba(255,255,255,.96);
    color:#12181a;
    border:1px solid rgba(12,95,87,.18);
    box-shadow:0 2px 6px rgba(0,0,0,.06), 0 18px 44px -20px rgba(0,0,0,.42);
    backdrop-filter:saturate(180%) blur(16px);
    -webkit-backdrop-filter:saturate(180%) blur(16px);
    font:14px/1.55 -apple-system,"PingFang SC","Noto Sans SC",sans-serif;
    transform:translateY(140%);
    transition:transform .45s cubic-bezier(.2,.8,.2,1), opacity .3s;
    opacity:0;
  }
  .pwakit-bar.pwakit-in{ transform:translateY(0); opacity:1; }
  .pwakit-bar-icon{
    flex:0 0 auto; width:38px; height:38px; margin-top:1px;
    display:grid; place-items:center; border-radius:9px;
    background:#0c5f57; color:#fff;
  }
  .pwakit-bar-icon svg{ width:20px; height:20px; display:block; }
  .pwakit-bar-body{ flex:1 1 auto; min-width:0; }
  .pwakit-bar-title{ font-weight:650; letter-spacing:-.01em; }
  .pwakit-bar-desc{ margin-top:3px; font-size:13px; color:#4a585b; }
  .pwakit-bar-desc b{ color:#0c5f57; font-weight:650; }
  .pwakit-bar-desc .pwakit-share{
    display:inline-block; width:15px; height:15px; vertical-align:-3px;
    margin:0 1px;
  }
  .pwakit-bar-close{
    flex:0 0 auto; width:28px; height:28px; margin:-4px -4px 0 0;
    border:0; border-radius:999px; background:transparent; color:#8b9a97;
    font-size:19px; line-height:1; cursor:pointer; padding:0;
  }
  .pwakit-bar-close:active{ background:rgba(0,0,0,.06); }
  @media (prefers-color-scheme: dark){
    .pwakit-bar{
      background:rgba(21,29,30,.96); color:#e8eeec;
      border-color:rgba(99,195,182,.24);
    }
    .pwakit-bar-desc{ color:#b6c3c0; }
    .pwakit-bar-desc b{ color:#63c3b6; }
    .pwakit-bar-icon{ background:#16292a; color:#63c3b6; }
    .pwakit-bar-close{ color:#8b9a97; }
    .pwakit-bar-close:active{ background:rgba(255,255,255,.08); }
  }
  @media (prefers-reduced-motion: reduce){
    .pwakit-bar{ transition:none; }
  }

  /* 离线角标 */
  .pwakit-offline{
    position:fixed; top:calc(8px + env(safe-area-inset-top, 0px)); left:50%;
    transform:translateX(-50%) translateY(-160%);
    z-index:2147483001;
    padding:6px 14px; border-radius:999px;
    background:#7f5c10; color:#fff;
    font:12px/1 -apple-system,"PingFang SC",sans-serif; letter-spacing:.02em;
    box-shadow:0 4px 14px -4px rgba(0,0,0,.4);
    transition:transform .3s;
  }
  .pwakit-offline.pwakit-in{ transform:translateX(-50%) translateY(0); }
  `;

  const style = document.createElement('style');
  style.textContent = CSS;
  (document.head || document.documentElement).appendChild(style);

  /* ---------------- 引导条 ---------------- */
  const DISMISS_KEY = 'pwakit-ios-hint-dismissed-at';
  const DISMISS_TTL = 7 * 24 * 60 * 60 * 1000; // 7 天内不再打扰

  function dismissedRecently() {
    try {
      const t = Number(localStorage.getItem(DISMISS_KEY) || 0);
      return t && Date.now() - t < DISMISS_TTL;
    } catch (e) {
      return false;
    }
  }

  const SHARE_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/>' +
    '<path d="M8 7l4-4 4 4"/><path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/></svg>';

  function mountHint() {
    if (!isIOS || isStandalone || dismissedRecently()) return;

    const bar = document.createElement('div');
    bar.className = 'pwakit-bar';
    bar.setAttribute('role', 'note');

    const icon = document.createElement('div');
    icon.className = 'pwakit-bar-icon';
    icon.innerHTML = SHARE_SVG;

    const body = document.createElement('div');
    body.className = 'pwakit-bar-body';
    body.innerHTML = isIOSSafari
      ? '<div class="pwakit-bar-title">把它装到主屏幕</div>' +
        '<div class="pwakit-bar-desc">点底部 <b>分享按钮</b>' +
        '<svg class="pwakit-share" viewBox="0 0 24 24" fill="none" stroke="#0c5f57" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M12 3v12"/><path d="M8 7l4-4 4 4"/>' +
        '<path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/></svg>' +
        '，下滑选「添加到主屏幕」——之后断网也能查</div>'
      : '<div class="pwakit-bar-title">请用 Safari 打开</div>' +
        '<div class="pwakit-bar-desc">只有 Safari 能把它添加到主屏幕，' +
        '其他浏览器不行</div>';

    const close = document.createElement('button');
    close.className = 'pwakit-bar-close';
    close.type = 'button';
    close.setAttribute('aria-label', '关闭提示');
    close.textContent = '×';
    close.addEventListener('click', () => {
      bar.classList.remove('pwakit-in');
      setTimeout(() => bar.remove(), 420);
      try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch (e) {}
    });

    bar.append(icon, body, close);
    document.body.appendChild(bar);
    requestAnimationFrame(() => setTimeout(() => bar.classList.add('pwakit-in'), 900));
  }

  /* ---------------- 离线提示 ---------------- */
  let offlineEl = null;
  function syncOnline() {
    const off = navigator.onLine === false;
    if (off && !offlineEl) {
      offlineEl = document.createElement('div');
      offlineEl.className = 'pwakit-offline';
      offlineEl.textContent = '离线模式 · 使用本地缓存';
      document.body.appendChild(offlineEl);
      requestAnimationFrame(() => setTimeout(() => offlineEl.classList.add('pwakit-in'), 40));
    } else if (!off && offlineEl) {
      offlineEl.classList.remove('pwakit-in');
      const el = offlineEl;
      offlineEl = null;
      setTimeout(() => el.remove(), 320);
    }
  }

  /* ---------------- Service Worker ---------------- */
  const sw = {
    registration: null,
    ready: false,
    error: null
  };

  async function registerSW() {
    if (!('serviceWorker' in navigator)) {
      sw.error = '浏览器不支持 Service Worker';
      return;
    }
    // 本地 file:// 打开时无法注册，直接跳过
    if (location.protocol === 'file:') {
      sw.error = '需通过 http(s) 访问才能离线';
      return;
    }
    try {
      const reg = await navigator.serviceWorker.register('./sw.js', { scope: './' });
      sw.registration = reg;
      sw.ready = true;

      // 首次安装完成后提示
      reg.addEventListener('updatefound', () => {
        const worker = reg.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            notifyUpdate(reg);
          }
        });
      });
    } catch (err) {
      sw.error = err.message;
      console.warn('[pwa] SW 注册失败:', err);
    }
  }

  function notifyUpdate(reg) {
    if (document.querySelector('.pwakit-bar[data-kind="update"]')) return;
    const bar = document.createElement('div');
    bar.className = 'pwakit-bar';
    bar.dataset.kind = 'update';
    bar.innerHTML =
      '<div class="pwakit-bar-body">' +
      '<div class="pwakit-bar-title">内容有更新</div>' +
      '<div class="pwakit-bar-desc">点右侧刷新载入最新版本</div></div>';
    const btn = document.createElement('button');
    btn.className = 'pwakit-bar-close';
    btn.type = 'button';
    btn.setAttribute('aria-label', '刷新');
    btn.style.cssText = 'width:auto;padding:0 12px;height:30px;font-size:13px;' +
      'background:#0c5f57;color:#fff;border-radius:8px;font-weight:600;';
    btn.textContent = '刷新';
    btn.addEventListener('click', () => {
      if (reg.waiting) reg.waiting.postMessage('SKIP_WAITING');
      setTimeout(() => location.reload(), 120);
    });
    bar.appendChild(btn);
    document.body.appendChild(bar);
    requestAnimationFrame(() => setTimeout(() => bar.classList.add('pwakit-in'), 60));
  }

  /* ---------------- 对外接口 ---------------- */
  window.pwaKit = {
    get isIOS() { return isIOS; },
    get isStandalone() { return isStandalone; },
    get swStatus() { return sw; },
    async checkUpdate() {
      if (!sw.registration) return false;
      await sw.registration.update();
      return !!sw.registration.waiting;
    },
    /* 环境体检：把结果打出来，方便你判断这台设备的能力边界 */
    async diagnose() {
      const out = {
        运行模式: isStandalone ? 'standalone（已装到主屏幕）' : '浏览器标签页',
        设备: isIOS ? 'iOS' : '非 iOS',
        浏览器: isIOSSafari ? 'iOS Safari' : ua,
        ServiceWorker: sw.ready ? '已注册' : (sw.error || '未注册'),
        在线状态: navigator.onLine ? '在线' : '离线',
        屏幕: window.innerWidth + '×' + window.innerHeight,
        像素比: window.devicePixelRatio,
        深色模式: window.matchMedia('(prefers-color-scheme: dark)').matches ? '是' : '否',
        安全区: getComputedStyle(document.documentElement)
          .getPropertyValue('--pwakit-safe-top') || '见 env(safe-area-inset-top)',
        通知API: 'Notification' in window ? '支持' : '不支持',
        IndexedDB: 'indexedDB' in window ? '支持' : '不支持',
        剪贴板: navigator.clipboard ? '支持' : '不支持',
        持久化存储: navigator.storage && navigator.storage.persist ? 'API 存在' : '不支持'
      };
      try {
        if (navigator.storage && navigator.storage.estimate) {
          const est = await navigator.storage.estimate();
          out.存储用量 = (est.usage / 1048576).toFixed(1) + ' MB / ' +
            (est.quota / 1048576).toFixed(0) + ' MB 配额';
        }
      } catch (e) {}
      if (console.table) console.table(out);
      return out;
    }
  };

  /* ---------------- 启动 ---------------- */
  function boot() {
    registerSW();
    mountHint();
    syncOnline();
  }

  window.addEventListener('online', syncOnline);
  window.addEventListener('offline', syncOnline);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
