/* ==========================================================================
   补充算法：各科室 JSON 里 compute 指定的专用函数
   统一挂到 window.__ALGO__，由 engine.js 在启动时合并
   ========================================================================== */
window.__ALGO__ = {

  /* ---------- 肾功能 ---------- */
  egfr_ckdepi: function (s) {
    var crea = s.crea, age = s.age;
    if (isNaN(crea) || isNaN(age) || crea <= 0) return NaN;
    var female = Number(s.sex) === 2;
    var k = female ? 0.7 : 0.9;
    var a = female ? -0.241 : -0.302;
    var r = crea / k;
    return 142 * Math.pow(Math.min(r, 1), a) * Math.pow(Math.max(r, 1), -1.2) *
      Math.pow(0.9938, age) * (female ? 1.012 : 1);
  },

  crcl_cockcroft: function (s) {
    var age = s.age, w = s.weight_kg, crea = s.crea;
    if (isNaN(age) || isNaN(w) || isNaN(crea) || crea <= 0) return NaN;
    var female = Number(s.sex) === 2;
    return ((140 - age) * w) / (72 * crea) * (female ? 0.85 : 1);
  },

  bsa: function (s) {
    var w = s.weight_kg, ht = s.height_cm;
    if (isNaN(w) || isNaN(ht)) return NaN;
    return Math.sqrt((ht * w) / 3600);
  },

  /* ---------- 肝病 ---------- */
  meld3: function (s) {
    var bili = Math.max(1, s.bili || 0);
    var inr = Math.max(1, s.inr || 0);
    var crea = Math.max(1, Math.min(4, s.crea || 0));
    var female = Number(s.sex) === 2;
    var alb = s.albumin;
    var na = Math.max(125, Math.min(137, s.na || 137));
    var logit = 0.21674 * Math.log(bili) + 0.41959 * Math.log(inr) +
      0.10375 * Math.log(crea) + 0.10139 * Math.log(na) -
      (alb ? 0.31191 * Math.log(Math.max(1, alb)) : 0) + (female ? 0.34188 : 0);
    var meld = 6.43 + 6 * logit;
    return Math.max(6, Math.min(40, Math.round(meld)));
  },

  maddrey: function (s) {
    // Maddrey DF = 4.6 × (患者 PT − 对照 PT, 秒) + 胆红素 mg/dL
    var bili = s.bili;  // normalizeScope 已转为 mg/dL
    if (isNaN(bili)) return NaN;
    if (!isNaN(s.pt_patient) && !isNaN(s.pt_control)) {
      return 4.6 * (s.pt_patient - s.pt_control) + bili;
    }
    if (!isNaN(s.pt) && !isNaN(s.pt_ctrl)) return 4.6 * (s.pt - s.pt_ctrl) + bili;
    return NaN;
  },

  albi: function (s) {
    // ALBI = (log10 胆红素 μmol/L × 0.66) + (白蛋白 g/L × −0.085)
    var bili = s.bili__umol !== undefined ? s.bili__umol : (s.bili !== undefined ? s.bili * 17.1 : NaN);
    var alb = s.alb__gl !== undefined ? s.alb__gl * 10 : s.albumin;
    if (isNaN(bili) || isNaN(alb)) return NaN;
    return (Math.log10(bili) * 0.66) + (alb * -0.085);
  },

  fib4: function (s) {
    if (isNaN(s.age) || isNaN(s.ast) || isNaN(s.plt) || isNaN(s.alt) || s.alt === 0 || s.plt === 0) return NaN;
    return (s.age * s.ast) / (s.plt * Math.sqrt(s.alt));
  },

  apri: function (s) {
    if (isNaN(s.ast) || isNaN(s.plt) || s.plt === 0) return NaN;
    var uln = s.ast_uln || 40;
    return (s.ast / uln) * 100 / s.plt;
  },

  ast_alt_ratio: function (s) {
    if (isNaN(s.ast) || isNaN(s.alt) || s.alt === 0) return NaN;
    return s.ast / s.alt;
  },

  nfs_nafld: function (s) {
    // NFS = -1.675 + 0.037×age + 0.094×BMI + 1.13×IFG/糖尿病 + 0.99×AST/ALT - 0.013×PLT - 0.66×白蛋白(g/dL)
    if (isNaN(s.age) || isNaN(s.bmi) || isNaN(s.ast) || isNaN(s.alt) || isNaN(s.plt)) return NaN;
    var dm = Number(s.dm !== undefined ? s.dm : s.ifg) || 0;
    var alb = s.alb__gl !== undefined ? s.alb__gl :
      (s.albumin !== undefined ? (s.albumin > 20 ? s.albumin / 10 : s.albumin) : 4.0);
    return -1.675 + 0.037 * s.age + 0.094 * s.bmi + 1.13 * dm +
      0.99 * (s.ast / s.alt) - 0.013 * s.plt - 0.66 * alb;
  },

  dili_r: function (s) {
    if (!s.alt || !s.alp || !s.alt_uln || !s.alp_uln) return NaN;
    return (s.alt / s.alt_uln) / (s.alp / s.alp_uln);
  },

  icg_r15: function (s) {
    return NaN;
  },

  /* ---------- 肝硬化分级 ---------- */
  child_pugh: function (item, s) {
    // 输入为原始检验值，需按阈值分档（1/2/3 分）后再求总分
    var bili = s.bili__umol !== undefined ? s.bili__umol : (s.bili !== undefined ? s.bili * 17.1 : NaN);
    var alb = s.alb__gl !== undefined ? s.alb__gl : (s.alb !== undefined ? s.alb / 10 : NaN);
    var inr = s.inr;
    var asc = Number(s.ascites);
    var enc = Number(s.enceph !== undefined ? s.enceph : s.encephalopathy);

    var pB, pA, pI;
    // 胆红素 μmol/L：<34=1，34–51=2，>51=3
    if (isNaN(bili)) return NaN;
    pB = bili < 34 ? 1 : (bili <= 51 ? 2 : 3);
    // 白蛋白 g/dL：>3.5=1，2.8–3.5=2，<2.8=3
    if (isNaN(alb)) return NaN;
    pA = alb > 3.5 ? 1 : (alb >= 2.8 ? 2 : 3);
    // INR：<1.7=1，1.7–2.3=2，>2.3=3
    if (isNaN(inr)) return NaN;
    pI = inr < 1.7 ? 1 : (inr <= 2.3 ? 2 : 3);
    if (isNaN(asc) || isNaN(enc)) return NaN;

    return pB + pA + pI + asc + enc;
  },

  child_pugh_score: function (s) { return window.__ALGO__.child_pugh(s); },

  /* ---------- 炎症性肠病 ---------- */
  cdai: function (s) {
    // CDAI = 2×排便次数 + 5×腹痛 + 7×全身状态 + 每项并发症×20 + 腹部包块 + 红细胞压积 + 体重
    if (isNaN(s.stools)) return NaN;
    var v = 0;
    v += 2 * (s.stools || 0);
    v += 5 * (s.pain || 0);
    v += 7 * (s.wellbeing || 0);
    v += 20 * (s.complication || 0);
    if (s.mass === 2) v += 10; else if (s.mass === 3) v += 20; else if (s.mass === 4) v += 30; else v += 1;
    if (!isNaN(s.hct)) {
      var male = Number(s.sex) === 1;
      var target = male ? 47 : 42;
      v += 6 * (1 - s.hct / target);
    }
    if (!isNaN(s.weight)) v += 100 * (1 - s.weight / (s.weight_ideal || s.weight));
    return v;
  },

  truelove_witts: function (s) {
    // 按排便次数 + 血便 + 全身症状分度：输入已编码
    var n = s.stools_day || 0, blood = s.blood || 0, sys = s.systemic || 0;
    if (n >= 6 && blood === 1) return 3;        // 重度
    if (n >= 4 && blood === 1) return 2;        // 中度
    if (sys >= 2) return 3;
    return 1;                                    // 轻度
  },

  harvey_bradshaw: function (s) {
    var v = 0;
    v += 1 * (s.wellbeing || 0) + 1 * (s.pain || 0) + 1 * (s.abdomen || 0) +
      (s.complication || 0) + (s.mass || 0) + 1 * (s.stools || 0);
    return v;
  },

  /* ---------- HCC / 肝脏手术 ---------- */
  hcc_up_to_seven: function (s) {
    var n = s.nodules || 0, size = s.size_cm || 0, afp = s.afp || 0;
    if (n >= 7) return 1;
    if (size >= 7) return 1;
    if (afp >= 400) return 1;
    return 0;
  },

  liver_vol_remnant: function (s) {
    if (isNaN(s.tbv) || isNaN(s.rem) || isNaN(s.weight_kg)) return NaN;
    return (s.tbv * s.rem / 100) / (s.weight_kg * 0.0155) * 100;
  },

  asge_bile: function (s) {
    var v = 0;
    if (s.age > 55) v += 1;
    if (s.bili > 1.8) v += 2;
    if (s.cbd > 6) v += 5;
    return v;
  },

  /* ---------- 重症 ---------- */
  sofa: function (s) {
    return ['resp', 'coag', 'liver', 'circul', 'cns', 'renal'].reduce(function (a, k) {
      var x = Number(s[k]);
      return a + (isNaN(x) ? 0 : x);
    }, 0);
  },

  apache2: function (s) {
    var ap = s.acute || 0, age = s.age_pts || 0, ch = s.chronic || 0;
    return ap + age + ch;
  },

  /* ---------- 呼吸 ---------- */
  gold_grade: function (s) {
    if (isNaN(s.fev1pp)) return NaN;
    var ratio = s.ratio;
    if (!isNaN(ratio) && ratio >= 0.70) return 0;
    var v = s.fev1pp;
    return v >= 80 ? 1 : v >= 50 ? 2 : v >= 30 ? 3 : 4;
  },

  gold_abe: function (s) {
    var exac = s.exac || 0, sym = s.symptom_high;
    if (exac > 1) return 11;
    if (Number(sym) === 1) return 2;
    return 1;
  },

  fev1_fvc: function (s) {
    return s.fev1pp !== undefined ? s.fev1pp : NaN;
  },

  dlco_grade: function (s) {
    return s.dlcopp !== undefined ? s.dlcopp : NaN;
  },

  asthma_control: function (s) {
    var n = (s.daytime || 0) + (s.night || 0) + (s.saba || 0) + (s.limit || 0);
    return n;
  },

  smwt: function (s) {
    return s.dist !== undefined ? s.dist : NaN;
  },

  mayo_nodule: function (s) {
    if (isNaN(s.age) || isNaN(s.diameter)) return NaN;
    var x = 0.0391 * s.age + 0.7917 * (s.smoke_years || 0) + 0.1274 * s.diameter +
      1.0407 * (Number(s.upper) || 0) + 0.7838 * (Number(s.spiculation) || 0) - 6.8272;
    return Math.round((1 / (1 + Math.exp(-x))) * 1000) / 10;
  },

  brock_model: function (s) {
    if (isNaN(s.age) || isNaN(s.size)) return NaN;
    var x = -6.7891 + 0.0287 * s.age + 0.6011 * (Number(s.female) || 0) +
      0.2963 * (Number(s.family) || 0) + 0.2953 * (Number(s.emphysema) || 0) +
      0.0824 * s.size + 0.6581 * (Number(s.type) === 1 ? 1 : 0) -
      0.2769 * (Number(s.type) === 2 ? 1 : 0) +
      0.3775 * (Number(s.upper) || 0) + 0.3251 * (s.count || 0) +
      0.8129 * (Number(s.spiculation) || 0);
    return Math.round((1 / (1 + Math.exp(-x))) * 1000) / 10;
  },

  he_simple: function (s) {
    return s.grade !== undefined ? s.grade : NaN;
  },

  /* ---------- 通用：加权求和 ---------- */
  weighted_sum: function (item, s) {
    var v = 0;
    (item.inputs || []).forEach(function (inp) {
      var x = s[inp.key];
      if (typeof x === 'number' && !isNaN(x)) v += x * (inp.weight === undefined ? 1 : inp.weight);
    });
    return v;
  },

  /* ---------- 通用线性预测 ---------- */
  linear: function (s) {
    return NaN;
  }
};
