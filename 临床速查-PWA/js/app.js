/* ==========================================================================
   应用主体：路由 + 渲染
   路由（hash）：
     #/                      首页
     #/calc                  计算器 · 科室列表
     #/calc/<dept>           科室条目列表
     #/calc/<dept>/<id>      计算器详情
     #/guide                 指南 · 科室列表
     #/guide/<dept>          科室大类列表
     #/guide/<dept>/<id>     疾病详情
     #/guide/<dept>/cat/<id> 大类详情（含对比）
     #/pinned                置顶
   ========================================================================== */
(function () {
  'use strict';

  const D = window.DATA;      // 数据层
  const E = window.Engine;

  /* ---------------- localStorage：置顶与主题 ---------------- */
  const LS = {
    get(k, dflt) {
      try { const v = localStorage.getItem(k); return v === null ? dflt : JSON.parse(v); }
      catch (e) { return dflt; }
    },
    set(k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
    }
  };

  const PIN_KEY = 'medkit.pins.v1';
  let pins = LS.get(PIN_KEY, {});   // { 'calc:cardio:map': true }

  function pinId(kind, dept, id) { return kind + ':' + dept + ':' + id; }
  function isPinned(kind, dept, id) { return !!pins[pinId(kind, dept, id)]; }
  function togglePin(kind, dept, id) {
    const k = pinId(kind, dept, id);
    if (pins[k]) delete pins[k]; else pins[k] = true;
    LS.set(PIN_KEY, pins);
    return !!pins[k];
  }
  function allPins(kind) {
    return Object.keys(pins).filter(function (k) { return k.indexOf(kind + ':') === 0; });
  }

  /* 主题 */
  const THEME_KEY = 'medkit.theme';
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', t === 'dark' ? '#0d1314' : '#f4f6f6');
    });
    LS.set(THEME_KEY, t);
  }
  (function initTheme() {
    const saved = LS.get(THEME_KEY, null);
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(saved || sys);
  })();

  /* ---------------- 工具 ---------------- */
  function h(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        const v = attrs[k];
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'text') el.textContent = v;
        else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k === 'dataset') { for (const d in v) el.dataset[d] = v[d]; }
        else el.setAttribute(k, v);
      }
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c === null || c === undefined || c === false) return;
        el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
      });
    }
    return el;
  }

  const ICON = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3z"/></svg>',
    pinFill: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17v5l-1 0v-5H7v-2l3-3-1-6h6l-1 6 3 3v2z"/></svg>',
    calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2.5" width="16" height="19" rx="2.5"/><path d="M8 7h8"/><path d="M8 12h.01M12 12h.01M16 12h.01M8 16.5h.01M12 16.5h.01M16 16.5h.01"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 016.5 3H19v16H6.5A2.5 2.5 0 004 21.5z"/><path d="M4 5.5v16"/><path d="M8 7.5h7"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>',
    chevDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
    compare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M5 7h4v10H5zM15 7h4v10h-4z"/></svg>',
    theme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5l2.6 5.6 6 .8-4.4 4.3 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8z"/></svg>'
  };

  /* ---------------- 顶栏 ---------------- */
  function topbar(title, sub, opts) {
    opts = opts || {};
    const backTo = opts.back;
    const bar = h('div', { class: 'topbar-in' });
    if (backTo) {
      bar.appendChild(h('button', {
        class: 'tb-btn', 'aria-label': '返回', html: ICON.back,
        onclick: function () { history.back(); }
      }));
    } else {
      bar.appendChild(h('div', { class: 'tb-btn', style: 'visibility:hidden' }));
    }
    bar.appendChild(h('div', { class: 'tb-title' }, [
      document.createTextNode(title),
      sub ? h('small', { text: sub }) : null
    ]));
    bar.appendChild(h('button', {
      class: 'tb-btn', 'aria-label': '切换主题', html: ICON.theme,
      onclick: function () {
        const cur = document.documentElement.getAttribute('data-theme');
        applyTheme(cur === 'dark' ? 'light' : 'dark');
      }
    }));
    return h('div', { class: 'topbar' }, bar);
  }

  /* ---------------- 路由表 ---------------- */
  function parseHash() {
    let hash = location.hash.replace(/^#/, '') || '/';
    const parts = hash.split('/').filter(Boolean);
    return parts;
  }

  /* 路由变化时关闭所有弹层 */
  function closeSheets() {
    document.querySelectorAll('.sheet-mask, .sheet').forEach(function (el) {
      el.classList.remove('on');
      el.remove();
    });
  }

  let scrollPositions = {};

  /* ---------------- 渲染入口 ---------------- */
  function render() {
    const app = document.getElementById('app');
    const parts = parseHash();
    let node;
    const key = parts.join('/');
    const fromNav = key !== render._last;
    render._last = key;
    if (fromNav) closeSheets();
    // 无论如何都确保弹层不会残留到新页面
    if (document.querySelector('.sheet')) closeSheets();

    try {
      if (parts.length === 0) node = viewHome();
      else if (parts[0] === 'calc' && parts.length === 1) node = viewDeptList('calc');
      else if (parts[0] === 'calc' && parts.length === 2) node = viewCalcList(parts[1]);
      else if (parts[0] === 'calc' && parts.length === 3) node = viewCalcDetail(parts[1], parts[2]);
      else if (parts[0] === 'guide' && parts.length === 1) node = viewDeptList('guide');
      else if (parts[0] === 'guide' && parts.length === 2) node = viewGuideList(parts[1]);
      else if (parts[0] === 'guide' && parts.length === 3) node = viewDisease(parts[1], parts[2]);
      else if (parts[0] === 'guide' && parts.length === 4 && parts[2] === 'cat') node = viewCategory(parts[1], parts[3]);
      else if (parts[0] === 'pinned') node = viewPinned();
      else node = viewNotFound();
    } catch (err) {
      console.error(err);
      node = h('div', { class: 'page' }, [
        h('div', { class: 'empty' }, '页面加载出错：' + err.message)
      ]);
    }

    app.innerHTML = '';
    app.appendChild(node);

    // 滚动位置
    if (fromNav) window.scrollTo(0, 0);

    // 回到顶部按钮
    updateFab();
  }

  /* ---------------- 数据访问 ---------------- */
  const depts = D.departments;

  function deptById(id) {
    return depts.filter(function (d) { return d.id === id; })[0] || null;
  }
  function orderedDepts() {
    return depts.slice().sort(function (a, b) { return a.order - b.order; });
  }
  function calcItems(deptId) {
    const d = D.calc[deptId];
    if (!d) return [];
    return (d.items || []).slice().sort(function (a, b) { return (a.rank || 99) - (b.rank || 99); });
  }
  function guideCats(deptId) {
    const d = D.guide[deptId];
    if (!d) return [];
    return (d.categories || []).slice().sort(function (a, b) { return (a.rank || 99) - (b.rank || 99); });
  }

  /* ---------------- 视图：首页 ---------------- */
  function viewHome() {
    const page = h('div', { class: 'page' });

    page.appendChild(h('div', { class: 'hero' }, [
      h('h1', { text: '临床速查' }),
      h('p', { text: '医学计算工具 · 疾病诊疗指南 · 离线可用' })
    ]));

    const calcCount = Object.keys(D.calc).reduce(function (n, k) {
      return n + ((D.calc[k].items || []).length);
    }, 0);
    const disCount = Object.keys(D.guide).reduce(function (n, k) {
      return n + (D.guide[k].categories || []).reduce(function (m, c) { return m + (c.diseases || []).length; }, 0);
    }, 0);

    page.appendChild(h('div', { class: 'bigcards' }, [
      bigCard('calc', '医学计算器', '评分量表、风险分层、公式计算，按科室分组',
        [['条目', calcCount + ' 项'], ['科室', Object.keys(D.calc).length + ' 个']], function () {
          location.hash = '#/calc';
        }),
      bigCard('guide', '疾病指南', '常见病与罕见病，诊断标准的与用药剂量',
        [['疾病', disCount + ' 种'], ['科室', Object.keys(D.guide).length + ' 个']], function () {
          location.hash = '#/guide';
        })
    ]));

    const pinnedList = renderPinned();
    if (pinnedList.length) {
      page.appendChild(h('div', { class: 'sec-h' }, [
        h('h2', { text: '我的置顶' }),
        h('a', { href: '#/pinned', style: 'margin-left:auto;font-size:12px;color:var(--accent-ink)', text: '查看全部 ›' })
      ]));
      page.appendChild(h('div', { class: 'list' }, pinnedList.slice(0, 6)));
    }

    page.appendChild(h('div', { class: 'disclaimer', html:
      '<b>使用提示</b><br>本应用内容依据公开指南、共识与药品说明书整理，供临床参考与教学使用，' +
      '<b>不替代指南原文、药品说明书与院内诊疗规范</b>。具体患者的诊疗决策由主管医师判断；' +
      '剂量与禁忌使用前请核对最新版说明书。数据全部保存在本机，不上传服务器。'
    }));

    // 顶栏：首页不显示返回
    const wrap = h('div');
    wrap.appendChild(topbar('临床速查', null, {}));
    wrap.appendChild(page);
    return wrap;
  }

  function bigCard(kind, title, sub, stats, onclick) {
    const ico = kind === 'calc' ? ICON.calc : ICON.book;
    return h('div', { class: 'bigcard', onclick: onclick, role: 'link', tabindex: '0' }, [
      h('div', { class: 'bc-top' }, [
        h('div', { class: 'bc-ico', html: ico }),
        h('div', {}, [h('h3', { text: title })])
      ]),
      h('div', { class: 'bc-sub', text: sub }),
      h('div', { class: 'bc-stat' }, stats.map(function (s) {
        return h('span', { html: s[0] + ' <b>' + s[1] + '</b>' });
      })),
      h('div', { class: 'bc-arrow', text: '›' })
    ]);
  }

  /* ---------------- 视图：科室列表 ---------------- */
  function viewDeptList(kind) {
    const isCalc = kind === 'calc';
    const page = h('div', { class: 'page' });

    page.appendChild(h('div', { class: 'hero', style: 'padding-top:4px' }, [
      h('h1', { text: isCalc ? '医学计算器' : '疾病指南' }),
      h('p', { text: isCalc
        ? '按科室分组，组内按常用性排序。点击右上角图钉可置顶常用条目。'
        : '以国内指南为主，国外指南补充。大类疾病下含小类，可一键对比鉴别。' })
    ]));

    const groups = {};
    orderedDepts().forEach(function (d) {
      const list = isCalc ? calcItems(d.id) : guideCats(d.id);
      if (!list.length) return;
      (groups[d.group] = groups[d.group] || []).push(d);
    });

    ['内科', '平台', '外科'].forEach(function (g) {
      if (!groups[g]) return;
      page.appendChild(h('div', { class: 'grp-h', text: g === '外科' ? '外科系统' : (g === '内科' ? '内科系统' : '平台与急重症') }));
      page.appendChild(h('div', { class: 'dept-grid' }, groups[g].map(function (d) {
        const n = isCalc ? calcItems(d.id).length : guideCats(d.id).length;
        return h('a', { class: 'dept-card', href: '#/' + kind + '/' + d.id }, [
          h('div', { class: 'dc-abbr', text: d.abbr }),
          h('div', { class: 'dc-body' }, [
            h('div', { class: 'dc-name', text: d.short }),
            h('div', { class: 'dc-n', text: n + (isCalc ? ' 项' : ' 类') })
          ])
        ]);
      })));
    });

    const wrap = h('div');
    wrap.appendChild(topbar(isCalc ? '医学计算器' : '疾病指南', null, { back: true }));
    wrap.appendChild(page);
    return wrap;
  }

  /* ---------------- 视图：计算器条目列表 ---------------- */
  function viewCalcList(deptId) {
    const dept = deptById(deptId);
    if (!dept) return viewNotFound();
    const items = calcItems(deptId);

    const page = h('div', { class: 'page' });

    // 搜索栏
    const bar = h('div', { class: 'filterbar' });
    const box = h('div', { class: 'searchbox' }, [
      h('span', { html: ICON.search }),
      h('input', { type: 'search', placeholder: '搜索条目，如 CHA₂DS₂-VASc、血压', id: 'q' }),
      h('button', { class: 'clr', text: '×', 'aria-label': '清除' })
    ]);
    bar.appendChild(box);

    const catRow = h('div', { class: 'cats' });
    bar.appendChild(catRow);
    page.appendChild(bar);

    const listWrap = h('div');
    page.appendChild(listWrap);

    // 分类 chips
    const cats = [];
    items.forEach(function (it) { if (it.cat && cats.indexOf(it.cat) < 0) cats.push(it.cat); });
    let activeCat = null;

    function renderCats() {
      catRow.innerHTML = '';
      if (cats.length < 2) { catRow.classList.add('hide'); return; }
      catRow.classList.remove('hide');
      const mk = function (label, val) {
        return h('button', {
          class: 'chip' + (activeCat === val ? ' on' : ''),
          text: label,
          onclick: function () { activeCat = (activeCat === val ? null : val); renderCats(); renderList(); }
        });
      };
      catRow.appendChild(mk('全部', null));
      cats.forEach(function (c) { catRow.appendChild(mk(c, c)); });
    }

    function renderList() {
      const q = (box.querySelector('input').value || '').trim().toLowerCase();
      box.classList.toggle('has-val', !!q);
      listWrap.innerHTML = '';

      let list = items;
      if (activeCat) list = list.filter(function (it) { return it.cat === activeCat; });
      if (q) {
        list = list.filter(function (it) {
          const hay = [it.name, (it.aka || []).join(' '), it.desc || '', it.cat || '', it.id].join(' ').toLowerCase();
          return hay.indexOf(q) >= 0;
        });
      }

      if (!list.length) {
        listWrap.appendChild(h('div', { class: 'empty', text: '没有匹配的条目' }));
        return;
      }

      // 分组：置顶 / 按分类 / 全部
      const pinned = list.filter(function (it) { return isPinned('calc', deptId, it.id); });
      const rest = list.filter(function (it) { return !isPinned('calc', deptId, it.id); });

      if (pinned.length) {
        const sec = h('div', { class: 'pinned-sec' });
        sec.appendChild(h('div', { class: 'sec-h' }, [h('h2', { text: '置顶' })]));
        sec.appendChild(h('div', { class: 'list' }, pinned.map(calcRow)));
        listWrap.appendChild(sec);
      }

      if (activeCat || q) {
        listWrap.appendChild(h('div', { class: 'list' }, rest.map(calcRow)));
      } else {
        // 按分类分组，但保持 rank 顺序
        const order = [];
        const map = {};
        rest.forEach(function (it) {
          const c = it.cat || '其他';
          if (!map[c]) { map[c] = []; order.push(c); }
          map[c].push(it);
        });
        order.forEach(function (c) {
          listWrap.appendChild(h('div', { class: 'subhead', text: c }));
          listWrap.appendChild(h('div', { class: 'list' }, map[c].map(calcRow)));
        });
      }
    }

    function calcRow(it) {
      const pinnedNow = isPinned('calc', deptId, it.id);
      const row = h('div', { class: 'row' }, [
        h('div', {
          class: 'r-body',
          onclick: function () { location.hash = '#/calc/' + deptId + '/' + it.id; }
        }, [
          h('div', { class: 'r-name', text: it.name }),
          it.desc ? h('div', { class: 'r-sub', text: it.desc }) : null
        ]),
        h('button', {
          class: 'pin-btn' + (pinnedNow ? ' on' : ''),
          'aria-label': pinnedNow ? '取消置顶' : '置顶',
          html: pinnedNow ? ICON.pinFill : ICON.pin,
          onclick: function (ev) {
            ev.stopPropagation();
            const now = togglePin('calc', deptId, it.id);
            toast(now ? '已置顶' : '已取消置顶');
            renderList();
          }
        })
      ]);
      return row;
    }

    box.querySelector('input').addEventListener('input', renderList);
    box.querySelector('.clr').addEventListener('click', function () {
      box.querySelector('input').value = '';
      renderList();
    });

    renderCats();
    renderList();

    const wrap = h('div');
    wrap.appendChild(topbar(dept.name, (D.calc[deptId] ? calcItems(deptId).length + ' 项' : ''), { back: true }));
    wrap.appendChild(page);
    return wrap;
  }

  /* ---------------- 视图：计算器详情 ---------------- */
  function viewCalcDetail(deptId, itemId) {
    const dept = deptById(deptId);
    const item = calcItems(deptId).filter(function (x) { return x.id === itemId; })[0];
    if (!dept || !item) return viewNotFound();

    const page = h('div', { class: 'page' });
    const pinned = isPinned('calc', deptId, itemId);

    const head = h('div', { class: 'detail-h' }, [
      h('h1', { text: item.name }),
      (item.aka && item.aka.length) ? h('div', { class: 'dh-aka', text: item.aka.join(' · ') }) : null,
      item.cat ? h('span', { class: 'dh-cat', text: item.cat }) : null,
      h('div', { style: 'margin-top:12px;display:flex;gap:8px' }, [
        h('button', {
          class: 'seg-btn' + (pinned ? ' on' : ''),
          style: 'flex:0 0 auto;min-width:auto;padding:7px 14px',
          html: (pinned ? ICON.pinFill : ICON.pin).replace('<svg', '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:5px"'),
          onclick: function (ev) {
            const now = togglePin('calc', deptId, itemId);
            const b = ev.currentTarget;
            b.className = 'seg-btn' + (now ? ' on' : '');
            b.innerHTML = (now ? ICON.pinFill : ICON.pin).replace('<svg', '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:5px"');
            b.appendChild(document.createTextNode(now ? '已置顶' : '置顶'));
            toast(now ? '已置顶到首页' : '已取消置顶');
          }
        })
      ])
    ]);
    // 补上按钮文字
    const pinBtn = head.querySelector('button');
    if (pinBtn) pinBtn.appendChild(document.createTextNode(pinned ? '已置顶' : '置顶'));
    page.appendChild(head);

    if (item.desc) {
      page.appendChild(h('div', { class: 'panel' }, [
        h('div', { style: 'font-size:13.5px;line-height:1.6;color:var(--ink2)', text: item.desc })
      ]));
    }

    /* --- 情况一：纯分级量表 --- */
    if ((!item.inputs || !item.inputs.length) && item.levels && item.levels.length) {
      page.appendChild(h('div', { class: 'panel' }, [
        h('div', { class: 'panel-t', text: '分级标准' }),
        h('div', { class: 'levels' }, item.levels.map(function (lv) {
          return h('div', { class: 'lv', dataset: { level: lv.level || 'ok' } }, [
            h('div', { class: 'lv-label', text: lv.label }),
            h('div', { class: 'lv-crit', text: lv.criteria })
          ]);
        }))
      ]));
    } else if (item.inputs && item.inputs.length) {
      /* --- 情况二：带输入的计算器 --- */
      const resultBox = h('div', { class: 'result', style: 'display:none' });
      const inputsRaw = {};
      const fieldEls = {};

      const form = h('div', { class: 'panel' }, [
        h('div', { class: 'panel-t', text: '输入' })
      ]);

      item.inputs.forEach(function (inp) {
        form.appendChild(buildField(inp));
      });

      function buildField(inp) {
        const wrap = h('div', { class: 'field' });
        const lab = h('label', {}, [
          document.createTextNode(inp.label),
          inp.unit ? h('span', { class: 'u', text: inp.unit }) : null,
          inp.hint ? h('span', { class: 'hint', text: inp.hint }) : null
        ]);
        wrap.appendChild(lab);

        if (inp.type === 'select') {
          const sel = h('select', { class: 'inp' });
          (inp.options || []).forEach(function (o) {
            sel.appendChild(h('option', { value: String(o.value), text: o.label }));
          });
          if (inp.default !== undefined) sel.value = String(inp.default);
          sel.addEventListener('change', function () {
            inputsRaw[inp.key] = sel.value;
            recalc();
          });
          inputsRaw[inp.key] = sel.value;
          wrap.appendChild(sel);
          fieldEls[inp.key] = sel;
        } else {
          const seg = inp.type === 'seg';
          if (seg) {
            const row = h('div', { class: 'seg' });
            (inp.options || []).forEach(function (o, i) {
              const b = h('button', {
                class: 'seg-btn' + ((inp.default !== undefined ? String(inp.default) : String((inp.options[0] || {}).value)) === String(o.value) ? ' on' : ''),
                type: 'button', text: o.label,
                onclick: function () {
                  Array.prototype.forEach.call(row.children, function (c) { c.classList.remove('on'); });
                  b.classList.add('on');
                  inputsRaw[inp.key] = o.value;
                  recalc();
                }
              });
              row.appendChild(b);
            });
            if (inp.default === undefined && inp.options && inp.options[0]) {
              inputsRaw[inp.key] = inp.options[0].value;
            }
            wrap.appendChild(row);
            fieldEls[inp.key] = row;
          } else {
            const input = h('input', {
              class: 'inp', type: 'number', inputmode: 'decimal',
              placeholder: inp.placeholder || '',
              value: inp.default !== undefined ? inp.default : ''
            });
            if (inp.min !== undefined) input.setAttribute('min', inp.min);
            if (inp.max !== undefined) input.setAttribute('max', inp.max);
            if (inp.step !== undefined) input.setAttribute('step', inp.step);
            input.addEventListener('input', function () {
              inputsRaw[inp.key] = input.value;
              input.classList.remove('err');
              recalc();
            });
            wrap.appendChild(h('div', { class: 'inp-row' }, [input]));
            fieldEls[inp.key] = input;
          }
        }
        return wrap;
      }

      page.appendChild(form);
      page.appendChild(resultBox);

      function recalc() {
        // 结构化输出型工具（血气分析、SOFA 分解等）
        if (E.hasStruct && E.hasStruct(item.compute)) {
          const sr = E.computeStruct(item, inputsRaw);
          if (!sr.ok) { resultBox.style.display = 'none'; return; }
          resultBox.style.display = '';
          resultBox.dataset.level = sr.level || 'ok';
          resultBox.innerHTML = '';
          resultBox.appendChild(h('div', { class: 'rs-title', text: sr.title }));
          const tbl = h('div', { class: 'rs-rows' });
          (sr.rows || []).forEach(function (r) {
            tbl.appendChild(h('div', { class: 'rs-row' + (r.level ? ' lv-' + r.level : '') }, [
              h('div', { class: 'rr-k', text: r.k }),
              h('div', { class: 'rr-v', text: r.v })
            ]));
          });
          resultBox.appendChild(tbl);
          resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }

        const res = E.compute(item, inputsRaw);
        if (!res.ok) {
          resultBox.style.display = 'none';
          return;
        }
        resultBox.style.display = '';
        resultBox.dataset.level = res.level;
        resultBox.innerHTML = '';

        const unit = (item.inputs[0] && item.inputs[0].type === 'number') ? '' : '';
        resultBox.appendChild(h('div', { class: 'rs-num' }, [
          document.createTextNode(res.valueText),
          item.resultUnit ? h('span', { class: 'rs-unit', text: item.resultUnit }) : null
        ]));
        if (res.label) resultBox.appendChild(h('div', { class: 'rs-label', text: res.label }));
        if (res.text) resultBox.appendChild(h('div', { class: 'rs-text', text: res.text }));

        // 每次变化后滚动到结果
        const rect = resultBox.getBoundingClientRect();
        if (rect.top < 90 || rect.bottom > window.innerHeight) {
          resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    /* --- 公式 --- */
    if (item.formula) {
      page.appendChild(h('div', { class: 'panel' }, [
        h('div', { class: 'panel-t', text: '公式 / 判读规则' }),
        h('div', { class: 'formula', text: item.formula })
      ]));
    }

    /* --- 说明 --- */
    if (item.note) {
      page.appendChild(h('div', { class: 'panel' }, [
        h('div', { class: 'panel-t', text: '临床注意' }),
        h('div', { class: 'note', text: item.note })
      ]));
    }

    /* --- 来源 --- */
    if (item.refs && item.refs.length) {
      page.appendChild(h('div', { class: 'panel' }, [
        h('div', { class: 'panel-t', text: '来源' }),
        h('ul', { class: 'refs' }, item.refs.map(function (r) { return h('li', { text: r }); }))
      ]));
    }

    const wrap = h('div');
    wrap.appendChild(topbar(item.name, dept.short, { back: true }));
    wrap.appendChild(page);
    return wrap;
  }

  /* ---------------- 占位（由 views-guide.js / views-pinned.js 覆写） ---------------- */
  function viewGuideList(d) { return window.APP.viewGuideList ? window.APP.viewGuideList(d) : viewNotFound(); }
  function viewDisease(d, x) { return window.APP.viewDisease ? window.APP.viewDisease(d, x) : viewNotFound(); }
  function viewCategory(d, x) { return window.APP.viewCategory ? window.APP.viewCategory(d, x) : viewNotFound(); }
  function viewPinned() { return window.APP.viewPinned ? window.APP.viewPinned() : viewNotFound(); }
  function renderPinned() { return window.APP.renderPinned ? window.APP.renderPinned() : []; }
  function viewNotFound() {
    const wrap = h('div');
    wrap.appendChild(topbar('未找到', null, { back: true }));
    wrap.appendChild(h('div', { class: 'page' }, [
      h('div', { class: 'empty', text: '页面不存在' })
    ]));
    return wrap;
  }

  /* ---------------- Toast ---------------- */
  let toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = h('div', { class: 'toast' });
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('on'); }, 1600);
  }

  /* ---------------- 回到顶部 ---------------- */
  let fabEl = null;
  function updateFab() {
    if (!fabEl) {
      fabEl = h('button', {
        class: 'fab', 'aria-label': '回到顶部', html: ICON.up,
        onclick: function () { window.scrollTo({ top: 0, behavior: 'smooth' }); }
      });
      document.body.appendChild(fabEl);
    }
    fabEl.classList.toggle('on', window.scrollY > 400);
  }
  window.addEventListener('scroll', function () {
    updateFab();
    const tb = document.querySelector('.topbar');
    if (tb) tb.classList.toggle('scrolled', window.scrollY > 4);
  }, { passive: true });

  /* ---------------- 启动 ---------------- */
  window.addEventListener('hashchange', render);

  // 暴露给后加载的 views-*.js
  window.APP = {
    h: h, ICON: ICON, topbar: topbar, toast: toast,
    deptById: deptById, orderedDepts: orderedDepts,
    calcItems: calcItems, guideCats: guideCats,
    isPinned: isPinned, togglePin: togglePin, allPins: allPins,
    render: render, viewNotFound: viewNotFound, LS: LS
  };

  // 延迟到所有同步脚本执行完（views-*.js 已注册）再首次渲染
  function boot() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', render);
    } else {
      render();
    }
  }
  setTimeout(boot, 0);
})();
