/* ==========================================================================
   计算引擎
   - 把 inputs 的输入值收集成 values
   - 按 compute 指定的函数（或 algorithm 伪代码对应的预置实现）算出结果
   - 按 interpret 的 when 表达式逐条匹配，返回第一条命中的解读
   ========================================================================== */
(function (global) {
  'use strict';

  /* ---------- 安全求值：只允许数字、变量、运算符与 Math.* ---------- */
  const SAFE_RX = /^[\d\s.+\-*/%()<>=!&|,]*(?:[a-zA-Z_$][\w$]*\.?)*[\d\s.+\-*/%()<>=!&|,]*$/;

  function evalExpr(expr, scope) {
    if (typeof expr === 'number') return expr;
    if (typeof expr !== 'string') return NaN;
    const src = expr.trim();
    if (!src) return NaN;
    // 白名单校验：词法上剔除已知变量与 Math 后的字符必须在允许集内
    const names = Object.keys(scope);
    let probe = src;
    names.forEach(function (n) {
      probe = probe.split(n).join('');
    });
    probe = probe.split('Math.').join('');
    if (/[^0-9\s.+\-*/%()<>=!&|,]/.test(probe)) {
      // 允许残留的标识符（例如 true/false）
      if (/[a-zA-Z_$]/.test(probe)) return NaN;
    }
    try {
      const keys = Object.keys(scope);
      const vals = keys.map(function (k) { return scope[k]; });
      // eslint-disable-next-line no-new-func
      const fn = new Function('Math', ...keys, '"use strict"; return (' + src + ');');
      return fn(Math, ...vals);
    } catch (e) {
      return NaN;
    }
  }

  /* ---------- 取数 ---------- */
  function collect(item, raw) {
    const scope = {};
    const missing = [];
    (item.inputs || []).forEach(function (inp) {
      let val = raw[inp.key];
      if (inp.type === 'select') {
        scope[inp.key] = (val === undefined || val === '' || val === null) ? (inp.required === false ? 0 : NaN) : Number(val);
      } else {
        val = (val === undefined || val === null || val === '') ? NaN : Number(val);
        scope[inp.key] = val;
      }
      if (inp.required !== false && isNaN(scope[inp.key])) missing.push(inp.label || inp.key);
    });
    return { scope: scope, missing: missing };
  }

  /* ---------- 内置计算函数 ---------- */
  const COMPUTE = {
    /* 通用求和：所有 number/select 输入相加 */
    sum: function (item, s) {
      let v = 0;
      (item.inputs || []).forEach(function (inp) {
        const x = s[inp.key];
        if (typeof x === 'number' && !isNaN(x)) v += x * (inp.weight === undefined ? 1 : inp.weight);
      });
      return v;
    },

    formula_only: function () { return NaN; },

    map: function (item, s) {
      if (isNaN(s.sbp) || isNaN(s.dbp)) return NaN;
      return s.dbp + (s.sbp - s.dbp) / 3;
    },

    pulse_pressure: function (item, s) {
      if (isNaN(s.sbp) || isNaN(s.dbp)) return NaN;
      return s.sbp - s.dbp;
    },

    shock_index: function (item, s) {
      if (isNaN(s.hr) || isNaN(s.sbp) || s.sbp === 0) return NaN;
      return s.hr / s.sbp;
    },

    bmi: function (item, s) {
      if (isNaN(s.weight_kg) || isNaN(s.height_cm) || s.height_cm <= 0) return NaN;
      const m = s.height_cm / 100;
      return s.weight_kg / (m * m);
    },

    bsa_mosteller: function (item, s) {
      if (isNaN(s.weight_kg) || isNaN(s.height_cm)) return NaN;
      return Math.sqrt((s.height_cm * s.weight_kg) / 3600);
    },

    bsa_dubois: function (item, s) {
      if (isNaN(s.weight_kg) || isNaN(s.height_cm)) return NaN;
      return 0.007184 * Math.pow(s.height_cm, 0.725) * Math.pow(s.weight_kg, 0.425);
    },

    ibw: function (item, s) {
      // Devine: 男性 50 + 2.3×(身高英寸−60)；女性 45.5 + 2.3×(...)
      if (isNaN(s.height_cm)) return NaN;
      const inch = s.height_cm / 2.54;
      const base = Number(s.sex) === 1 ? 50 : 45.5;
      return base + 2.3 * (inch - 60);
    },

    hr_from_rr: function (item, s) {
      if (isNaN(s.rr_ms) || s.rr_ms <= 0) return NaN;
      return 60000 / s.rr_ms;
    },

    rr_from_hr: function (item, s) {
      if (isNaN(s.hr) || s.hr <= 0) return NaN;
      return 60000 / s.hr;
    },

    qtc_bazett: function (item, s) {
      if (isNaN(s.qt_ms) || isNaN(s.hr) || s.hr <= 0) return NaN;
      return s.qt_ms / Math.sqrt(60 / s.hr);
    },

    qtc_fridericia: function (item, s) {
      if (isNaN(s.qt_ms) || isNaN(s.hr) || s.hr <= 0) return NaN;
      return s.qt_ms / Math.cbrt(60 / s.hr);
    },

    qtc_framingham: function (item, s) {
      if (isNaN(s.qt_ms) || isNaN(s.hr)) return NaN;
      return s.qt_ms + 154 * (1 - 60 / s.hr);
    },

    qtc_hodges: function (item, s) {
      if (isNaN(s.qt_ms) || isNaN(s.hr)) return NaN;
      return s.qt_ms + 1.75 * (s.hr - 60);
    },

    aa_gradient: function (item, s) {
      if (isNaN(s.pao2) || isNaN(s.paco2) || isNaN(s.fio2)) return NaN;
      const fio2 = s.fio2 > 1 ? s.fio2 / 100 : s.fio2;
      const paO2_alv = fio2 * (760 - 47) - s.paco2 / 0.8;
      return paO2_alv - s.pao2;
    },

    pf_ratio: function (item, s) {
      if (isNaN(s.pao2) || isNaN(s.fio2)) return NaN;
      const fio2 = s.fio2 > 1 ? s.fio2 / 100 : s.fio2;
      return s.pao2 / fio2;
    },

    anion_gap: function (item, s) {
      if (isNaN(s.na) || isNaN(s.cl) || isNaN(s.hco3)) return NaN;
      let ag = s.na - s.cl - s.hco3;
      // 白蛋白单位 g/L（生理范围 35–50）：校正项 2.5 针对 g/dL，故除 10
      if (!isNaN(s.albumin) && s.albumin) ag += 2.5 * (40 - s.albumin) / 10;
      if (!isNaN(s.alb) && s.alb) ag += 2.5 * (40 - s.alb) / 10;
      return ag;
    },

    osmolality: function (item, s) {
      if (isNaN(s.na) || isNaN(s.glucose) || isNaN(s.bun)) return NaN;
      return 2 * s.na + s.glucose / 18 + s.bun / 2.8;
    },

    corrected_calcium: function (item, s) {
      if (isNaN(s.calcium) || isNaN(s.albumin)) return NaN;
      return s.calcium + 0.8 * (4.0 - s.albumin);
    },

    egfr_ckdepi2021: function (item, s) {
      if (isNaN(s.crea) || s.crea <= 0) return NaN;
      const female = Number(s.sex) === 2;
      const k = female ? 0.7 : 0.9;
      const a = female ? -0.241 : -0.302;
      const r = s.crea / k;
      return 142 * Math.pow(Math.min(r, 1), a) * Math.pow(Math.max(r, 1), -1.2) * Math.pow(0.9938, s.age) * (female ? 1.012 : 1);
    },

    crcl_cg: function (item, s) {
      if (isNaN(s.age) || isNaN(s.weight_kg) || isNaN(s.crea) || s.crea <= 0) return NaN;
      const female = Number(s.sex) === 2;
      return ((140 - s.age) * s.weight_kg) / (72 * s.crea) * (female ? 0.85 : 1);
    },

    cockcroft_cg: function (item, s) { return COMPUTE.crcl_cg(item, s); },

    friedewald_ldl: function (item, s) {
      if (isNaN(s.tc) || isNaN(s.hdl) || isNaN(s.tg)) return NaN;
      return s.tc - s.hdl - s.tg / 5;
    },

    martin_ldl: function (item, s) {
      if (isNaN(s.tc) || isNaN(s.hdl) || isNaN(s.tg)) return NaN;
      const tg = s.tg;
      let div;
      if (tg < 100) div = 3.5;
      else if (tg < 200) div = 3.4;
      else if (tg < 300) div = 3.3;
      else if (tg < 400) div = 3.2;
      else div = 3.1;
      return s.tc - s.hdl - tg / div;
    },

    hba1c_to_eag: function (item, s) {
      if (isNaN(s.hba1c)) return NaN;
      return 28.7 * s.hba1c - 46.7;
    },

    eag_to_hba1c: function (item, s) {
      if (isNaN(s.eag)) return NaN;
      return (s.eag + 46.7) / 28.7;
    },

    homa_ir: function (item, s) {
      if (isNaN(s.glucose) || isNaN(s.insulin)) return NaN;
      return (s.glucose * s.insulin) / 22.5;
    },

    ldl_target: function (item, s) {
      return NaN;
    },

    /* 加权求和后再做非线性映射的通用函数 */
    na_corrected_glucose: function (item, s) {
      if (isNaN(s.na) || isNaN(s.glucose)) return NaN;
      return s.na + 0.016 * (s.glucose - 100);
    },

    correct_na: function (item, s) { return COMPUTE.na_corrected_glucose(item, s); },

    /* MELD / Child-Pugh 等在同一名字下做兜底，具体实现见 ALGO */
  };

  /* ---------- 专用算法（伪代码落地） ---------- */
  const ALGO = {
    /* child_pugh 已移至 algo-extra.js（按原始检验值分档实现） */

    meld_na: function (item, s) {
      var bili = Math.max(1, s.bili || 0);
      var inr = Math.max(1, s.inr || 0);
      var crea = Math.min(4, Math.max(1, s.crea || 0));
      var na = Math.min(137, Math.max(125, s.na || 0));
      var meld = 3.78 * Math.log(bili) + 11.2 * Math.log(inr) + 9.57 * Math.log(crea) + 6.43;
      var v = meld + 1.32 * (137 - na) - (0.033 * meld * (137 - na)) - 0.96 * 0;
      return Math.max(6, Math.min(40, Math.round(v)));
    },

    meld: function (item, s) {
      var bili = Math.max(1, s.bili || 0);
      var inr = Math.max(1, s.inr || 0);
      var crea = Math.min(4, Math.max(1, s.crea || 0));
      var meld = 3.78 * Math.log(bili) + 11.2 * Math.log(inr) + 9.57 * Math.log(crea) + 6.43;
      return Math.max(6, Math.min(40, Math.round(meld)));
    },

    r_value: function (item, s) {
      if (!s.alt || !s.alp || !s.alt_uln || !s.alp_uln) return NaN;
      return (s.alt / s.alt_uln) / (s.alp / s.alp_uln);
    },

    saag: function (item, s) {
      if (isNaN(s.ascites_alb) || isNaN(s.serum_alb)) return NaN;
      return s.serum_alb - s.ascites_alb;
    },

    fenNa: function (item, s) {
      if (isNaN(s.urine_na) || isNaN(s.serum_na) || isNaN(s.urine_cr) || isNaN(s.serum_cr)) return NaN;
      return (s.urine_na * s.serum_cr) / (s.serum_na * s.urine_cr) * 100;
    },

    feurea: function (item, s) {
      if (isNaN(s.urine_urea) || isNaN(s.serum_urea) || isNaN(s.urine_cr) || isNaN(s.serum_cr)) return NaN;
      return (s.urine_urea * s.serum_cr) / (s.serum_urea * s.urine_cr) * 100;
    },

    aa_ratio: function (item, s) {
      if (isNaN(s.urine_alb) || isNaN(s.urine_cr)) return NaN;
      return s.urine_alb / s.urine_cr;
    },

    winter: function (item, s) {
      if (isNaN(s.paco2)) return NaN;
      return 1.5 * s.paco2 + 8;
    },

    delta_delta: function (item, s) {
      if (isNaN(s.na) || isNaN(s.cl) || isNaN(s.hco3)) return NaN;
      var ag = s.na - s.cl - s.hco3;
      var gap = ag - 12;
      return gap === 0 || s.hco3 - 24 === 0 ? NaN : gap / (24 - s.hco3);
    },

    correct_qt: function (item, s) { return COMPUTE.qtc_bazett(item, s); },

    ppo_fev1: function (item, s) {
      if (isNaN(s.fev1) || isNaN(s.vent) || isNaN(s.ppo)) return NaN;
      return s.fev1 * (1 - s.vent / 100);
    },

    parkland: function (item, s) {
      if (isNaN(s.weight_kg) || isNaN(s.tbsa)) return NaN;
      return 4 * s.weight_kg * s.tbsa;
    },

    holliday_segar: function (item, s) {
      var w = s.weight_kg;
      if (isNaN(w)) return NaN;
      if (w <= 10) return 100 * w;
      if (w <= 20) return 1000 + 50 * (w - 10);
      return 1500 + 20 * (w - 20);
    },

    na_deficit: function (item, s) {
      if (isNaN(s.weight_kg) || isNaN(s.na) || isNaN(s.target_na)) return NaN;
      return 0.6 * s.weight_kg * (s.target_na - s.na);
    },

    a_gradient: function (item, s) { return COMPUTE.aa_gradient(item, s); },

    pack_year: function (item, s) {
      if (isNaN(s.cigs) || isNaN(s.years)) return NaN;
      return (s.cigs / 20) * s.years;
    },

    map_cyp: function (item, s) { return COMPUTE.map(item, s); }
  };

  /* ---------- 主入口 ---------- */

  /* 单位换算：根据 input.unit 把肌酐统一成 mg/dL，其余按原值 */
  function normalizeScope(item, s) {
    const units = {};
    (item.inputs || []).forEach(function (i) { units[i.key] = (i.unit || '').toLowerCase(); });
    const out = Object.assign({}, s);
    // 肌酐：μmol/L → mg/dL
    ['scr', 'crea', 'creatinine'].forEach(function (k) {
      if (typeof out[k] === 'number' && !isNaN(out[k])) {
        const u = units[k] || '';
        if (u.indexOf('mol') >= 0 && u.indexOf('mg') < 0) out[k] = out[k] / 88.4;
      }
    });
    // 胆红素
    ['bili', 'bilirubin'].forEach(function (k) {
      if (typeof out[k] === 'number' && !isNaN(out[k])) {
        const u = units[k] || '';
        const orig = out[k];
        if (u.indexOf('mol') >= 0) {
          out[k + '__umol'] = orig;   // 保留原始 μmol/L
          out[k] = orig / 17.1;       // 同时提供 mg/dL
        }
      }
    });
    // 白蛋白
    ['alb', 'albumin'].forEach(function (k) {
      if (typeof out[k] === 'number' && !isNaN(out[k])) {
        const u = (units[k] || '').replace(/\s/g, '');
        if (u === 'g/l') out[k + '__gl'] = out[k] / 10;
        else if (u === 'g/dl') out[k + '__gl'] = out[k];
      }
    });
    return out;
  }

  function compute(item, raw) {
    const c = collect(item, raw);
    if (c.missing.length) {
      return { ok: false, reason: 'missing', missing: c.missing };
    }
    const s = normalizeScope(item, c.scope);
    let v = NaN;
    const fnName = item.compute || 'sum';
    const fn = (window.__ALGO__ && window.__ALGO__[fnName]) || ALGO[fnName] || COMPUTE[fnName] || null;

    if (typeof fn === 'function') {
      // 两种签名：fn(item, scope) 或 fn(scope)
      v = fn.length >= 2 ? fn(item, s) : fn(s);
    } else if (fnName === 'sum') {
      v = COMPUTE.sum(item, s);
    }

    let hit = null;
    const interp = item.interpret || [];
    for (let i = 0; i < interp.length; i++) {
      const rule = interp[i];
      let matched;
      if (rule.when === undefined || rule.when === null || rule.when === '' || rule.when === 'default') {
        matched = true;
      } else {
        const scope = Object.assign({ v: v }, s);
        const r = evalExpr(rule.when, scope);
        matched = r === true || (typeof r === 'number' && !isNaN(r) && r !== 0);
      }
      if (matched) { hit = rule; break; }
    }

    return {
      ok: true,
      value: v,
      valueText: isFinite(v) ? formatNum(v) : '—',
      level: hit ? (hit.level || 'ok') : 'ok',
      text: hit ? hit.text : '',
      label: hit ? hit.label : '',
      scope: s
    };
  }

  /* ---------- 结构化输出型工具（血气、SOFA 分解等） ----------
     这类工具的 compute 返回一个对象：{ primary, rows:[{k,v,level}], summary }
     引擎不走数值 + interpret，直接把对象交给界面渲染多行结果。
     --------------------------------------------------------- */
  const STRUCT = {
    /* 血气分析全自动解读 */
    abg_readout: function (s) {
      const ph = s.ph, pco2 = s.pco2, hco3 = s.hco3;
      if (isNaN(ph) || isNaN(pco2) || isNaN(hco3)) return null;

      const na = s.na, cl = s.cl, alb = s.alb;
      const lac = s.lac, fio2 = s.fio2, pao2 = s.pao2, be = s.be;

      // 阴离子间隙（白蛋白校正）
      let ag = NaN, agCorr = NaN;
      if (!isNaN(na) && !isNaN(cl)) {
        ag = na - cl - hco3;
        // 白蛋白输入单位为 g/L：校正项 2.5 g/dL → 除以 10 换算
        agCorr = (!isNaN(alb) && alb > 0) ? ag + 2.5 * (40 - alb) / 10 : ag;
      }

      const findings = [];
      const primary = [];
      const mixed = [];

      /* 1. 原发失衡 */
      const acido = ph < 7.35 || (ph <= 7.40 && pco2 > 45);
      const alkal = ph > 7.45 || (ph >= 7.40 && pco2 < 35);

      if (ph < 7.35) {
        if (pco2 > 45) primary.push('呼吸性酸中毒');
        if (hco3 < 22) primary.push('代谢性酸中毒');
        if (!primary.length) primary.push('酸血症（原发项待定，建议复核时相）');
      } else if (ph > 7.45) {
        if (pco2 < 35) primary.push('呼吸性碱中毒');
        if (hco3 > 26) primary.push('代谢性碱中毒');
        if (!primary.length) primary.push('碱血症（原发项待定，建议复核时相）');
      } else {
        // pH 正常，看谁偏离为主
        const dCo2 = pco2 - 40, dBic = hco3 - 24;
        if (Math.abs(dCo2) / 40 > Math.abs(dBic) / 24 && dCo2 > 5) primary.push('代偿性呼吸性酸中毒');
        else if (Math.abs(dCo2) / 40 > Math.abs(dBic) / 24 && dCo2 < -5) primary.push('代偿性呼吸性碱中毒');
        else if (dBic < -2) primary.push('代偿性代谢性酸中毒');
        else if (dBic > 2) primary.push('代偿性代谢性碱中毒');
        else primary.push('酸碱状态基本正常');
      }

      /* 2. 代偿判断 */
      let comp = '';
      if (primary.indexOf('代谢性酸中毒') >= 0) {
        const exp = 1.5 * hco3 + 8;
        const dev = pco2 - exp;
        comp = 'Winter 公式预期 PaCO₂ = 1.5×HCO₃⁻ + 8 = ' + exp.toFixed(1) +
               ' mmHg，实测 ' + pco2 + ' mmHg';
        if (dev > 2) { comp += ' → 高于预期，合并呼吸性酸中毒'; mixed.push('合并呼吸性酸中毒'); }
        else if (dev < -2) { comp += ' → 低于预期，合并呼吸性碱中毒'; mixed.push('合并呼吸性碱中毒'); }
        else comp += ' → 代偿适当';
      } else if (primary.indexOf('代谢性碱中毒') >= 0 || primary.indexOf('代偿性代谢性碱中毒') >= 0) {
        const exp = 0.7 * (hco3 - 24) + 40;
        const dev = pco2 - exp;
        comp = '预期 PaCO₂ = 0.7×(HCO₃⁻−24) + 40 = ' + exp.toFixed(1) +
               ' mmHg，实测 ' + pco2 + ' mmHg';
        if (dev > 2) { comp += ' → 合并呼吸性酸中毒'; mixed.push('合并呼吸性酸中毒'); }
        else if (dev < -2) { comp += ' → 合并呼吸性碱中毒'; mixed.push('合并呼吸性碱中毒'); }
        else comp += ' → 代偿适当';
      } else if (primary.indexOf('呼吸性酸中毒') >= 0 || primary.indexOf('代偿性呼吸性酸中毒') >= 0) {
        const expA = 24 + 0.1 * (pco2 - 40);
        const expC = 24 + 0.35 * (pco2 - 40);
        comp = '急性预期 HCO₃⁻ ≈ ' + expA.toFixed(1) + '，慢性 ≈ ' + expC.toFixed(1) +
               ' mmol/L；实测 ' + hco3;
        if (hco3 < expA - 2) { comp += ' → 低于急性预期，合并代谢性酸中毒'; mixed.push('合并代谢性酸中毒'); }
        else if (hco3 > expC + 2) { comp += ' → 高于慢性预期，合并代谢性碱中毒'; mixed.push('合并代谢性碱中毒'); }
        else if (Math.abs(hco3 - expA) <= 2) comp += ' → 符合急性呼吸性酸中毒';
        else comp += ' → 符合慢性（代偿性）呼吸性酸中毒';
      } else if (primary.indexOf('呼吸性碱中毒') >= 0 || primary.indexOf('代偿性呼吸性碱中毒') >= 0) {
        const expA = 24 - 0.2 * (40 - pco2);
        const expC = 24 - 0.4 * (40 - pco2);
        comp = '急性预期 HCO₃⁻ ≈ ' + expA.toFixed(1) + '，慢性 ≈ ' + expC.toFixed(1) +
               ' mmol/L；实测 ' + hco3;
        if (Math.abs(hco3 - expA) <= 2) comp += ' → 符合急性呼吸性碱中毒';
        else if (Math.abs(hco3 - expC) <= 2.5) comp += ' → 符合慢性（代偿性）呼吸性碱中毒';
        else comp += ' → 代偿不典型，注意合并其他失衡';
      }

      /* 3. 高 AG 与 delta-delta */
      let agNote = '';
      if (!isNaN(agCorr)) {
        if (agCorr > 12) {
          agNote = '白蛋白校正 AG = ' + agCorr.toFixed(1) + ' mmol/L（升高，提示高 AG 型代谢性酸中毒）';
          if (Math.abs(ag - agCorr) > 0.5) agNote += '；未校正 AG = ' + ag.toFixed(1);
          agNote += '。常见病因：乳酸酸中毒、酮症酸中毒、尿毒症、中毒（甲醇/乙二醇/水杨酸）。';
          if (!isNaN(be)) {
            const dd = (agCorr - 12) / (24 - hco3);
            if (isFinite(dd) && dd > 0) {
              if (dd < 1) agNote += ' Δ-Δ = ' + dd.toFixed(2) + ' <1，提示合并正常 AG 型（高氯性）代谢性酸中毒。';
              else if (dd > 2) agNote += ' Δ-Δ = ' + dd.toFixed(2) + ' >2，提示合并代谢性碱中毒。';
              else agNote += ' Δ-Δ = ' + dd.toFixed(2) + '，在 1–2 之间，纯高 AG 型代谢性酸中毒。';
            }
          }
        } else {
          agNote = '白蛋白校正 AG = ' + agCorr.toFixed(1) + ' mmol/L（正常范围），如需排除正常 AG 型酸中毒请结合 HCO₃⁻ 与 Cl⁻。';
        }
      }

      /* 4. 氧合 */
      let oxy = '';
      if (!isNaN(pao2)) {
        if (!isNaN(fio2)) {
          const f = fio2 > 1 ? fio2 / 100 : fio2;
          const pf = pao2 / f;
          let pfLevel = 'ok';
          let pfText = '正常';
          if (pf < 100) { pfLevel = 'crit'; pfText = '重度氧合障碍（符合 ARDS 重度）'; }
          else if (pf < 200) { pfLevel = 'high'; pfText = '中度氧合障碍（符合 ARDS 中度）'; }
          else if (pf < 300) { pfLevel = 'warn'; pfText = '轻度氧合障碍（符合 ARDS 轻度）'; }
          else if (pf < 400) { pfLevel = 'warn'; pfText = '氧合轻度下降'; }
          oxy = '氧合指数 P/F = ' + pf.toFixed(0) + ' mmHg（' + pfText + '）';

          const paO2alv = f * (760 - 47) - pco2 / 0.8;
          const aa = paO2alv - pao2;
          const aaPred = (!isNaN(s.age) ? s.age / 4 + 4 : NaN);
          oxy += '；肺泡氧分压 PAO₂ ≈ ' + paO2alv.toFixed(0) + ' mmHg，A-a 梯度 = ' + aa.toFixed(0) + ' mmHg';
          if (!isNaN(s.age)) {
            oxy += '（年龄预计值 ≈ ' + aaPred.toFixed(0) + ' mmHg' +
              (aa > aaPred + 10 ? '，明显升高提示分流或弥散障碍' : '，在预计范围内') + '）';
          }
        } else {
          oxy = 'PaO₂ = ' + pao2 + ' mmHg；未填 FiO₂，无法计算氧合指数。';
        }
      }

      /* 5. 乳酸与其他 */
      let extra = '';
      if (!isNaN(lac) && lac >= 2) {
        extra += '乳酸 ' + lac + ' mmol/L' + (lac >= 4 ? '（显著升高，警惕组织低灌注/脓毒性休克）' : '（轻度升高，需动态观察）') + '。';
      }
      if (!isNaN(be) && !isNaN(hco3)) {
        extra += '碱剩余 BE = ' + be + ' mmol/L；';
        if (be < -4) extra += '明显负值提示代谢性酸中毒成分。';
        else if (be > 4) extra += '明显正值提示代谢性碱中毒成分。';
      }

      const rows = [];
      rows.push({ k: 'pΗ / PaCO₂ / HCO₃⁻', v: ph + ' / ' + pco2 + ' mmHg / ' + hco3 + ' mmol/L' });
      if (primary.length) rows.push({ k: '原发失衡', v: primary.join(' + ') });
      if (comp) rows.push({ k: '代偿判断', v: comp });
      if (mixed.length) rows.push({ k: '混合失衡', v: mixed.join(' / '), level: 'high' });
      if (agNote) rows.push({ k: '阴离子间隙', v: agNote, level: (!isNaN(agCorr) && agCorr > 12) ? 'high' : null });
      if (oxy) rows.push({ k: '氧合', v: oxy });
      if (extra) rows.push({ k: '其他', v: extra });

      let level = 'ok';
      if (ph < 7.20 || ph > 7.55) level = 'crit';
      else if (ph < 7.35 || ph > 7.45 || mixed.length) level = 'high';

      return {
        struct: true,
        title: primary.length ? primary.join(' + ') : '酸碱状态基本正常',
        level: level,
        rows: rows
      };
    },

    /* SOFA 分解 */
    sofa_detail: function (s) {
      const parts = [];
      if (!isNaN(s.resp)) parts.push(['呼吸', s.resp]);
      if (!isNaN(s.coag)) parts.push(['凝血', s.coag]);
      if (!isNaN(s.liver)) parts.push(['肝', s.liver]);
      if (!isNaN(s.circul)) parts.push(['循环', s.circul]);
      if (!isNaN(s.cns)) parts.push(['中枢', s.cns]);
      if (!isNaN(s.renal)) parts.push(['肾', s.renal]);
      let v = 0;
      parts.forEach(function (p) { v += Number(p[1]) || 0; });
      return {
        struct: true,
        title: 'SOFA 总分 ' + v,
        level: v >= 11 ? 'crit' : (v >= 6 ? 'high' : (v >= 2 ? 'warn' : 'ok')),
        rows: parts.map(function (p) { return { k: p[0], v: String(p[1]) + ' 分' }; }),
        value: v
      };
    }
  };

  /* 带结构化输出的调用入口 */
  function computeStruct(item, raw) {
    const c = collect(item, raw);
    if (c.missing.length) return { ok: false, reason: 'missing', missing: c.missing };
    const fn = STRUCT[item.compute];
    if (typeof fn !== 'function') return { ok: false, reason: 'no_struct' };
    const out = fn(c.scope);
    if (!out) return { ok: false, reason: 'incomplete' };
    out.ok = true;
    return out;
  }

  function formatNum(v) {
    if (!isFinite(v)) return '—';
    if (Number.isInteger(v)) return String(v);
    const a = Math.abs(v);
    if (a >= 100) return v.toFixed(0);
    if (a >= 10) return v.toFixed(1);
    if (a >= 1) return v.toFixed(2);
    return v.toFixed(3);
  }

  /* ---------- 无输入量表：按选择返回档位 ---------- */
  function levelByIndex(item, idx) {
    const lv = (item.levels || [])[idx];
    return lv || null;
  }

  global.Engine = {
    compute: compute,
    computeStruct: computeStruct,
    hasStruct: function (name) { return typeof STRUCT[name] === 'function'; },
    formatNum: formatNum,
    levelByIndex: levelByIndex,
    _eval: evalExpr,
    _algos: Object.keys(ALGO),
    _structs: Object.keys(STRUCT)
  };
})(window);
