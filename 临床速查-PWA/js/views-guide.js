/* ==========================================================================
   指南板块渲染（由 app.js 调用）
   覆盖：科室大类列表 / 大类详情（含鉴别对比）/ 疾病详情
   ========================================================================== */
(function () {
  'use strict';

  const A = window.APP;
  if (!A) return;
  const h = A.h, ICON = A.ICON;

  /* ---------------- 工具 ---------------- */
  function list(arr) {
    if (!arr || !arr.length) return null;
    return h('ul', { class: 'bullets' }, arr.map(function (x) { return h('li', { text: x }); }));
  }

  function section(num, title, body) {
    if (!body) return null;
    return h('div', { class: 'gd-sec' }, [
      h('div', { class: 'gs-h' }, [
        h('span', { class: 'gs-n', text: num }),
        h('span', { text: title })
      ]),
      body
    ]);
  }

  function kv(k, v) {
    if (!v) return null;
    return h('div', { class: 'kv' }, [
      h('div', { class: 'k', text: k }),
      h('div', { class: 'v', text: v })
    ]);
  }

  /* ---------------- 科室：大类列表 ---------------- */
  A.viewGuideList = function (deptId) {
    const dept = A.deptById(deptId);
    if (!dept) return A.viewNotFound();
    const cats = A.guideCats(deptId);

    const page = h('div', { class: 'page' });

    if (!cats.length) {
      page.appendChild(h('div', { class: 'empty', text: '该科室内容正在整理中' }));
      const w = h('div');
      w.appendChild(A.topbar(dept.name, null, { back: true }));
      w.appendChild(page);
      return w;
    }

    // 搜索
    const bar = h('div', { class: 'filterbar' });
    const box = h('div', { class: 'searchbox' }, [
      h('span', { html: ICON.search }),
      h('input', { type: 'search', placeholder: '搜索疾病名称，如 心梗、脑卒中' }),
      h('button', { class: 'clr', text: '×', 'aria-label': '清除' })
    ]);
    bar.appendChild(box);
    page.appendChild(bar);

    const listWrap = h('div');
    page.appendChild(listWrap);

    function renderList() {
      const q = (box.querySelector('input').value || '').trim().toLowerCase();
      box.classList.toggle('has-val', !!q);
      listWrap.innerHTML = '';

      let shown = cats;
      if (q) {
        // 多关键词模糊匹配：名称 / 别名 / 定义 / 大类名
        const terms = q.split(/\s+/).filter(Boolean);
        const hitTerm = function (hay) {
          return terms.every(function (t) { return hay.indexOf(t) >= 0; });
        };
        // 常见简称/俗称映射，提升中文检索命中率
        const ALIAS = {
          '心梗': '心肌梗死', '心挭': '心房颤动', '房颠': '心房颤动', '拑死': '心肌梗死',
          '高血压': '高血压', '糖尿病': '糖尿病', '脑梗': '脑梗死', '脑出血': '脑出血',
          '肺栓': '肺栓塞', '慢性阻': 'COPD', '炎': '炎', '瘤': '瘤'
        };
        const expand = function (t) {
          const out = [t];
          for (const k in ALIAS) {
            if (t.indexOf(k) >= 0) out.push(ALIAS[k]);
            if (ALIAS[k].indexOf(t) >= 0) out.push(k);
          }
          return out;
        };
        const allTerms = [];
        terms.forEach(function (t) { expand(t).forEach(function (x) { allTerms.push(x); }); });

        shown = cats.map(function (c) {
          const catHit = hitTerm(c.name.toLowerCase());
          const hits = (c.diseases || []).filter(function (d) {
            const hay = [
              d.name, (d.aka || []).join(' '),
              (d.basic && d.basic.define) || '', d.id || ''
            ].join(' ').toLowerCase();
            return allTerms.some(function (t) { return hay.indexOf(t) >= 0; });
          });
          return { cat: c, hits: catHit ? (c.diseases || []) : hits };
        }).filter(function (x) { return x.hits.length; });

        shown.forEach(function (x) { listWrap.appendChild(catCard(x.cat, x.hits, true)); });
        if (!shown.length) listWrap.appendChild(h('div', { class: 'empty', text: '没有匹配的疾病' }));
        return;
      }

      shown.forEach(function (c) { listWrap.appendChild(catCard(c, c.diseases || [], false)); });
    }

    function catCard(cat, diseases, forceOpen) {
      const pinnedCat = A.isPinned('guide', deptId, cat.id);
      const card = h('div', { class: 'cat-card' + (forceOpen ? ' open' : '') });

      const head = h('div', { class: 'cat-head', onclick: function () {
        card.classList.toggle('open');
      } }, [
        h('div', { class: 'ch-body' }, [
          h('div', { class: 'ch-name', text: cat.name }),
          h('div', { class: 'ch-sub', text: (diseases.length || (cat.diseases || []).length) + ' 个疾病' + (cat.summary ? ' · ' + cat.summary.slice(0, 22) + (cat.summary.length > 22 ? '…' : '') : '') })
        ]),
        h('button', {
          class: 'pin-btn' + (pinnedCat ? ' on' : ''),
          'aria-label': '置顶',
          html: pinnedCat ? ICON.pinFill : ICON.pin,
          onclick: function (ev) {
            ev.stopPropagation();
            const now = A.togglePin('guide', deptId, cat.id);
            A.toast(now ? '已置顶' : '已取消置顶');
            ev.currentTarget.className = 'pin-btn' + (now ? ' on' : '');
            ev.currentTarget.innerHTML = now ? ICON.pinFill : ICON.pin;
          }
        }),
        h('div', { class: 'ch-toggle', html: ICON.chevDown })
      ]);
      card.appendChild(head);

      const body = h('div', { class: 'cat-body' });

      if (cat.compare && cat.compare.length >= 2) {
        body.appendChild(h('button', {
          class: 'cmp-btn',
          onclick: function (ev) {
            ev.stopPropagation();
            openCompare(deptId, cat);
          }
        }, [
          h('span', { html: ICON.compare }),
          document.createTextNode('对比鉴别：' + cat.name + ' 旗下 ' + cat.compare.length + ' 种')
        ]));
      }

      if (cat.summary) {
        body.appendChild(h('div', {
          style: 'font-size:12.5px;line-height:1.6;color:var(--ink3);padding:0 2px 10px',
          text: cat.summary
        }));
      }

      (diseases || []).forEach(function (d) {
        body.appendChild(h('div', {
          class: 'dis-row',
          onclick: function () { location.hash = '#/guide/' + deptId + '/' + d.id; }
        }, [
          h('div', { class: 'dr-name' }, [
            document.createTextNode(d.name),
            (d.aka && d.aka.length) ? h('span', { class: 'dr-aka', text: d.aka[0] }) : null
          ]),
          h('span', { style: 'color:var(--ink4);font-size:16px', text: '›' })
        ]));
      });

      body.appendChild(h('a', {
        href: '#/guide/' + deptId + '/cat/' + cat.id,
        style: 'display:block;text-align:center;font-size:12.5px;color:var(--accent-ink);padding:9px 0 2px',
        text: '查看大类总览 ›'
      }));

      card.appendChild(body);
      return card;
    }

    box.querySelector('input').addEventListener('input', renderList);
    box.querySelector('.clr').addEventListener('click', function () {
      box.querySelector('input').value = '';
      renderList();
    });

    renderList();

    const w = h('div');
    w.appendChild(A.topbar(dept.name, cats.length + ' 个大类', { back: true }));
    w.appendChild(page);
    return w;
  };

  /* ---------------- 对比表弹层 ---------------- */
  function openCompare(deptId, cat) {
    const rows = cat.compare || [];
    const dm = {};
    (cat.diseases || []).forEach(function (d) { dm[d.id] = d; });

    const mask = h('div', { class: 'sheet-mask' });
    const sheet = h('div', { class: 'sheet' });
    function close() {
      mask.classList.remove('on');
      sheet.classList.remove('on');
      setTimeout(function () { mask.remove(); sheet.remove(); }, 320);
    }
    mask.addEventListener('click', close);

    sheet.appendChild(h('div', { class: 'sheet-grab' }));
    sheet.appendChild(h('div', { class: 'sheet-h' }, [
      h('h3', { text: cat.name + ' · 鉴别对比' }),
      h('button', { class: 'sheet-close', text: '×', onclick: close })
    ]));

    const tbl = h('table', { class: 'cmp-table' });
    const thead = h('tr', {}, [
      h('th', { text: '疾病' }),
      h('th', { text: '诊断要点' }),
      h('th', { text: '鉴别关键' })
    ]);
    tbl.appendChild(h('thead', {}, thead));
    const tbody = h('tbody');
    rows.forEach(function (r) {
      const d = dm[r.diseaseId];
      tbody.appendChild(h('tr', {}, [
        h('td', { text: d ? d.name : r.diseaseId }),
        h('td', { text: r.dx || '' }),
        h('td', { text: r.key || '' })
      ]));
    });
    tbl.appendChild(tbody);

    sheet.appendChild(h('div', { class: 'sheet-b' }, [
      h('div', { class: 'cmp-wrap' }, tbl),
      h('div', { style: 'margin-top:12px;font-size:11.5px;color:var(--ink3);line-height:1.6;text-align:center',
        text: '本表为要点提炼，完整诊断标准请进入各疾病详情查看' })
    ]));

    document.body.appendChild(mask);
    document.body.appendChild(sheet);
    requestAnimationFrame(function () {
      mask.classList.add('on');
      sheet.classList.add('on');
    });
  }

  /* ---------------- 大类总览页 ---------------- */
  A.viewCategory = function (deptId, catId) {
    const dept = A.deptById(deptId);
    const cat = A.guideCats(deptId).filter(function (c) { return c.id === catId; })[0];
    if (!dept || !cat) return A.viewNotFound();

    const page = h('div', { class: 'page' });
    page.appendChild(h('div', { class: 'detail-h' }, [
      h('h1', { text: cat.name }),
      h('div', { class: 'dh-aka', text: (cat.diseases || []).length + ' 个亚型' }),
      cat.summary ? h('div', { style: 'margin-top:10px;font-size:13.5px;line-height:1.6;color:var(--ink2)', text: cat.summary }) : null
    ]));

    if (cat.compare && cat.compare.length >= 2) {
      const p = h('div', { class: 'panel' }, [
        h('div', { class: 'panel-t', text: '鉴别对比' })
      ]);
      p.appendChild(h('button', {
        class: 'cmp-btn',
        style: 'margin-bottom:0',
        onclick: function () { openCompare(deptId, cat); }
      }, [
        h('span', { html: ICON.compare }),
        document.createTextNode('打开 ' + cat.compare.length + ' 种疾病的对比表')
      ]));
      page.appendChild(p);
    }

    page.appendChild(h('div', { class: 'subhead', text: '亚型' }));
    const listEl = h('div', { class: 'list' });
    (cat.diseases || []).forEach(function (d) {
      const pinned = A.isPinned('disease', deptId, cat.id + '/' + d.id);
      listEl.appendChild(h('div', { class: 'row' }, [
        h('div', {
          class: 'r-body',
          onclick: function () { location.hash = '#/guide/' + deptId + '/' + d.id; }
        }, [
          h('div', { class: 'r-name', text: d.name }),
          h('div', { class: 'r-sub', text: (d.aka || []).join(' · ') || (d.basic && d.basic.define) || '' })
        ]),
        h('button', {
          class: 'pin-btn' + (pinned ? ' on' : ''),
          html: pinned ? ICON.pinFill : ICON.pin,
          'aria-label': '置顶',
          onclick: function (ev) {
            ev.stopPropagation();
            const now = A.togglePin('disease', deptId, cat.id + '/' + d.id);
            A.toast(now ? '已置顶' : '已取消置顶');
            ev.currentTarget.className = 'pin-btn' + (now ? ' on' : '');
            ev.currentTarget.innerHTML = now ? ICON.pinFill : ICON.pin;
          }
        })
      ]));
    });
    page.appendChild(listEl);

    const w = h('div');
    w.appendChild(A.topbar(cat.name, dept.short, { back: true }));
    w.appendChild(page);
    return w;
  };

  /* ---------------- 疾病详情 ---------------- */
  A.viewDisease = function (deptId, diseaseId) {
    const dept = A.deptById(deptId);
    if (!dept) return A.viewNotFound();

    let cat = null, dis = null;
    A.guideCats(deptId).forEach(function (c) {
      (c.diseases || []).forEach(function (d) {
        if (d.id === diseaseId) { cat = c; dis = d; }
      });
    });
    if (!dis) return A.viewNotFound();

    const page = h('div', { class: 'page' });
    const pinned = A.isPinned('disease', deptId, cat.id + '/' + diseaseId);

    page.appendChild(h('div', { class: 'detail-h' }, [
      h('a', { href: '#/guide/' + deptId + '/cat/' + cat.id, style: 'font-size:12px;color:var(--accent-ink)', text: '← ' + cat.name }),
      h('h1', { text: dis.name, style: 'margin-top:6px' }),
      (dis.aka && dis.aka.length) ? h('div', { class: 'dh-aka', text: dis.aka.join(' · ') }) : null,
      h('div', { style: 'margin-top:12px' }, [
        (function () {
          const b = h('button', {
            class: 'seg-btn' + (pinned ? ' on' : ''),
            style: 'flex:0 0 auto;min-width:auto;padding:7px 14px',
            onclick: function (ev) {
              const now = A.togglePin('disease', deptId, cat.id + '/' + diseaseId);
              ev.currentTarget.className = 'seg-btn' + (now ? ' on' : '');
              ev.currentTarget.innerHTML = (now ? ICON.pinFill : ICON.pin).replace('<svg', '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:5px"');
              ev.currentTarget.appendChild(document.createTextNode(now ? '已置顶' : '置顶'));
              A.toast(now ? '已置顶到首页' : '已取消置顶');
            }
          });
          b.innerHTML = (pinned ? ICON.pinFill : ICON.pin).replace('<svg', '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:5px"');
          b.appendChild(document.createTextNode(pinned ? '已置顶' : '置顶'));
          return b;
        })()
      ])
    ]));

    /* 1 基础知识 */
    if (dis.basic) {
      const b = h('div');
      b.appendChild(kv('定义', dis.basic.define));
      if (dis.basic.risk && dis.basic.risk.length) {
        b.appendChild(h('div', { class: 'kv' }, [
          h('div', { class: 'k', text: '危险因素' }),
          list(dis.basic.risk)
        ]));
      }
      b.appendChild(kv('流行病学', dis.basic.epi));
      const s = section('1', '基础知识', b);
      if (s) page.appendChild(h('div', { class: 'panel' }, [s]));
    }

    /* 2 病理生理 */
    if (dis.patho) {
      page.appendChild(h('div', { class: 'panel' }, [
        section('2', '病理生理', h('div', { style: 'font-size:13.5px;line-height:1.62;color:var(--ink2)', text: dis.patho }))
      ]));
    }

    /* 3 诊断标准 */
    if (dis.dx) {
      const b = h('div');
      if (dis.dx.criteria && dis.dx.criteria.length) {
        b.appendChild(h('div', { class: 'kv' }, [
          h('div', { class: 'k', text: '诊断标准' }),
          list(dis.dx.criteria)
        ]));
      }
      if (dis.dx.workup && dis.dx.workup.length) {
        b.appendChild(h('div', { class: 'kv' }, [
          h('div', { class: 'k', text: '必要检查与判读' }),
          list(dis.dx.workup)
        ]));
      }
      b.appendChild(kv('分型 / 分级', dis.dx.grading));
      page.appendChild(h('div', { class: 'panel' }, [section('3', '诊断标准', b)]));
    }

    /* 4 鉴别诊断 —— 强调同大类内的鉴别 */
    if (dis.ddx && dis.ddx.length) {
      const catNames = (cat.diseases || []).map(function (d) { return d.name; });
      const catIds = (cat.diseases || []).map(function (d) { return d.id; });
      const isSameCat = function (x) {
        const nm = x.name || '';
        return catNames.some(function (n) {
          if (!n) return false;
          return nm === n || nm.indexOf(n) >= 0 || n.indexOf(nm) >= 0;
        }) || catIds.some(function (id) { return id && nm.indexOf('(' + id + ')') >= 0; });
      };
      // 去重（按 name）
      const seenName = {};
      const uniqDdx = dis.ddx.filter(function (x) {
        if (seenName[x.name]) return false;
        seenName[x.name] = true;
        return true;
      });

      const sameCatItems = uniqDdx.filter(isSameCat);
      const otherItems = uniqDdx.filter(function (x) { return !isSameCat(x); });
      const b = h('div');

      if (cat.compare && cat.compare.length >= 2 && sameCatItems.length) {
        b.appendChild(h('div', { class: 'ddx-warn' }, [
          h('div', { class: 'dw-h', text: '★ 与同大类（' + cat.name + '）其他亚型的鉴别' }),
          h('ul', {}, sameCatItems.map(function (x) {
            let point = x.point || '';
            // 把正文里出现的内部 id（如 cirr_sbp）换回中文病名
            (cat.diseases || []).forEach(function (d) {
              if (d.id) {
                point = point.split(d.id).join(d.name);
              }
            });
            const shown = x.name.replace(/\s*[（(][a-z0-9_]+[）)]\s*$/i, '');
            return h('li', {}, [h('b', { text: shown + '：' }), document.createTextNode(point)]);
          }))
        ]));
        b.appendChild(h('button', {
          class: 'cmp-btn',
          style: 'margin:4px 0 10px',
          onclick: function () { openCompare(deptId, cat); }
        }, [
          h('span', { html: ICON.compare }),
          document.createTextNode('打开 ' + cat.name + ' 鉴别对比表')
        ]));
      }

      if (otherItems.length) {
        if (sameCatItems.length) {
          b.appendChild(h('div', { class: 'k', style: 'margin:2px 0 6px', text: '其他需鉴别疾病' }));
        }
        b.appendChild(h('ul', { class: 'bullets' }, otherItems.map(function (x) {
          let point = x.point || '';
          (cat.diseases || []).forEach(function (d) {
            if (d.id) point = point.split(d.id).join(d.name);
          });
          const shown = (x.name || '').replace(/\s*[（(][a-z0-9_]+[）)]\s*$/i, '');
          return h('li', {}, [h('b', { text: shown + '：' }), document.createTextNode(point)]);
        })));
      }
      page.appendChild(h('div', { class: 'panel' }, [section('4', '鉴别诊断', b)]));
    }

    /* 5 治疗 */
    if (dis.tx) {
      const b = h('div');

      if (dis.tx.drug && dis.tx.drug.length) {
        b.appendChild(h('div', { class: 'k', style: 'margin-bottom:8px', text: '药物治疗' }));
        dis.tx.drug.forEach(function (dr) {
          const dd = h('div', { class: 'drug' });
          dd.appendChild(h('div', { class: 'drug-h' }, [
            h('span', { class: 'dn', text: dr.name }),
            h('span', { class: 'dd', text: dr.dose || '' })
          ]));
          const body = h('div', { class: 'drug-b' });
          const addLine = function (label, val, cls) {
            if (!val) return;
            body.appendChild(h('dl', { class: 'dl' + (cls ? ' ' + cls : '') }, [
              h('dt', { text: label }),
              h('dd', { text: val })
            ]));
          };
          addLine('注意', dr.note, 'warn');
          addLine('肾功', dr.renal);
          addLine('肝功', dr.hepatic);
          addLine('相互作用', dr.interact, 'danger');
          dd.appendChild(body);
          b.appendChild(dd);
        });
      }

      if (dis.tx.nonDrug && dis.tx.nonDrug.length) {
        b.appendChild(h('div', { class: 'k', style: 'margin:12px 0 4px', text: '非药物治疗' }));
        b.appendChild(list(dis.tx.nonDrug));
      }

      if (dis.tx.life && dis.tx.life.length) {
        b.appendChild(h('div', { class: 'k', style: 'margin:12px 0 4px', text: '生活方式与随访' }));
        b.appendChild(list(dis.tx.life));
      }

      page.appendChild(h('div', { class: 'panel' }, [section('5', '治疗', b)]));
    }

    /* 6 预后 */
    if (dis.prog) {
      page.appendChild(h('div', { class: 'panel' }, [
        section('6', '预后', h('div', { style: 'font-size:13.5px;line-height:1.62;color:var(--ink2)', text: dis.prog }))
      ]));
    }

    /* 来源 */
    if (dis.refs && dis.refs.length) {
      page.appendChild(h('div', { class: 'panel' }, [
        h('div', { class: 'panel-t', text: '来源' }),
        h('ul', { class: 'refs' }, dis.refs.map(function (r) { return h('li', { text: r }); }))
      ]));
    }

    page.appendChild(h('div', { class: 'disclaimer', text:
      '以上内容为指南要点整理，供临床参考。具体用药前请核对最新版药品说明书与院内规范；' +
      '信息不全或与本院实践不一致时，以指南原文与上级医师意见为准。' }));

    const w = h('div');
    w.appendChild(A.topbar(dis.name, dept.short, { back: true }));
    w.appendChild(page);
    return w;
  };
})();
