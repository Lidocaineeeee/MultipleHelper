/* ==========================================================================
   置顶页：聚合计算器与指南两个板块的置顶项
   ========================================================================== */
(function () {
  'use strict';
  const A = window.APP;
  if (!A) return;
  const h = A.h, ICON = A.ICON;

  function lookupCalc(deptId, id) {
    return A.calcItems(deptId).filter(function (x) { return x.id === id; })[0] || null;
  }

  function lookupDisease(deptId, key) {
    // key = catId/diseaseId
    const parts = key.split('/');
    const cat = A.guideCats(deptId).filter(function (c) { return c.id === parts[0]; })[0];
    if (!cat) return null;
    if (!parts[1]) return { cat: cat, dis: null };
    const dis = (cat.diseases || []).filter(function (d) { return d.id === parts[1]; })[0];
    return { cat: cat, dis: dis || null };
  }

  /* 收集置顶项 → [{kind, dept, id, title, sub, href}] */
  function collect() {
    const out = [];

    A.allPins('calc').forEach(function (k) {
      const seg = k.split(':'); // calc : dept : id
      const deptId = seg[1], id = seg[2];
      const it = lookupCalc(deptId, id);
      const dept = A.deptById(deptId);
      if (!it || !dept) return;
      out.push({
        kind: 'calc', deptId: deptId, id: id,
        title: it.name, sub: dept.short + ' · ' + (it.cat || '计算器'),
        href: '#/calc/' + deptId + '/' + id,
        pinKey: k
      });
    });

    A.allPins('guide').forEach(function (k) {
      const seg = k.split(':'); // guide : dept : catId
      const deptId = seg[1], catId = seg[2];
      const r = lookupDisease(deptId, catId);
      const dept = A.deptById(deptId);
      if (!r || !dept) return;
      out.push({
        kind: 'guide', deptId: deptId, id: catId,
        title: r.cat.name, sub: dept.short + ' · 大类 · ' + (r.cat.diseases || []).length + ' 个亚型',
        href: '#/guide/' + deptId + '/cat/' + catId,
        pinKey: k
      });
    });

    A.allPins('disease').forEach(function (k) {
      const seg = k.split(':'); // disease : dept : catId/diseaseId
      const deptId = seg[1], key = seg.slice(2).join(':');
      const r = lookupDisease(deptId, key);
      const dept = A.deptById(deptId);
      if (!r || !r.dis || !dept) return;
      out.push({
        kind: 'disease', deptId: deptId, id: key,
        title: r.dis.name, sub: dept.short + ' · ' + r.cat.name,
        href: '#/guide/' + deptId + '/' + r.dis.id,
        pinKey: k
      });
    });

    return out;
  }

  A.viewPinned = function () {
    const page = h('div', { class: 'page' });
    const items = collect();

    page.appendChild(h('div', { class: 'hero', style: 'padding-top:4px' }, [
      h('h1', { text: '我的置顶' }),
      h('p', { text: items.length ? '共 ' + items.length + ' 项，点击图钉取消置顶' : '还没有置顶内容' })
    ]));

    if (!items.length) {
      page.appendChild(h('div', { class: 'empty', html:
        '在计算器或指南列表中点击右侧 <b>图钉</b> 图标<br>即可把常用条目固定到这里' }));
    } else {
      const groups = { calc: [], disease: [], guide: [] };
      items.forEach(function (it) { groups[it.kind].push(it); });
      const labels = { calc: '计算器', disease: '疾病', guide: '疾病大类' };
      ['calc', 'disease', 'guide'].forEach(function (kind) {
        if (!groups[kind].length) return;
        page.appendChild(h('div', { class: 'subhead', text: labels[kind] }));
        const listEl = h('div', { class: 'list' });
        groups[kind].forEach(function (it) {
          listEl.appendChild(h('div', { class: 'row' }, [
            h('div', {
              class: 'r-body',
              onclick: function () { location.hash = it.href; }
            }, [
              h('div', { class: 'r-name', text: it.title }),
              h('div', { class: 'r-sub', text: it.sub })
            ]),
            h('button', {
              class: 'pin-btn on', html: ICON.pinFill, 'aria-label': '取消置顶',
              onclick: function (ev) {
                ev.stopPropagation();
                // 直接删键
                const pins = A.LS.get('medkit.pins.v1', {});
                delete pins[it.pinKey];
                A.LS.set('medkit.pins.v1', pins);
                // 重新读取
                location.reload();
              }
            })
          ]));
        });
        page.appendChild(listEl);
      });
    }

    const w = h('div');
    w.appendChild(A.topbar('我的置顶', null, { back: true }));
    w.appendChild(page);
    return w;
  };

  /* 首页的置顶摘要 */
  A.renderPinned = function () {
    return collect().map(function (it) {
      return h('div', { class: 'row' }, [
        h('div', { class: 'r-body', onclick: function () { location.hash = it.href; } }, [
          h('div', { class: 'r-name', text: it.title }),
          h('div', { class: 'r-sub', text: it.sub })
        ]),
        h('div', { style: 'color:var(--ink4);font-size:16px', text: '›' })
      ]);
    });
  };
})();
