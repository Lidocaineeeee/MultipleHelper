# 医学 PWA 数据规范（子任务必读）

所有数据为**纯 JSON 文件**，UTF-8 无 BOM，2 空格缩进。不要写 JSON 注释（`_comment` 除外）。
不要生成 HTML/JS，只产出 JSON 数据文件。

---

## 一、计算器条目 schema（板块 1）

文件：`medkit/data/calc/<科室id>.json`

```json
{
  "dept": "cardio",
  "items": [
    {
      "id": "map",
      "name": "平均动脉压（MAP）",
      "aka": ["Mean Arterial Pressure"],
      "cat": "血流动力学",
      "rank": 1,
      "desc": "由收缩压与舒张压估算平均动脉压。",
      "inputs": [
        { "key": "sbp", "label": "收缩压 SBP", "unit": "mmHg", "type": "number", "min": 20, "max": 300, "step": 1, "required": true },
        { "key": "dbp", "label": "舒张压 DBP", "unit": "mmHg", "type": "number", "min": 10, "max": 200, "step": 1, "required": true }
      ],
      "formula": "MAP = DBP + (SBP − DBP) / 3",
      "compute": "map",
      "interpret": [
        { "when": "v < 65", "level": "low",  "text": "MAP < 65 mmHg：器官灌注不足风险，见休克/低血压流程" },
        { "when": "v >= 65 && v <= 100", "level": "ok", "text": "MAP 65–100 mmHg：多数成人目标区间" },
        { "when": "v > 100", "level": "high", "text": "MAP > 100 mmHg：高血压急症/颅高压等需结合临床" }
      ],
      "note": "无创血压为基础，危重症以有创动脉压为准。",
      "refs": ["2021 ESC 心血管疾病预防指南（血压部分）"]
    }
  ]
}
```

### 字段说明

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | ✅ | 全库唯一，小写字母+下划线，如 `cha2ds2_vasc` |
| `name` | ✅ | 中文名，含常用英文缩写 |
| `aka` | | 别名/英文名数组，用于搜索 |
| `cat` | ✅ | 科室内分组名（如「血流动力学」「风险评分」「分级标准」），同一科室尽量复用少量分类 |
| `rank` | ✅ | 常用性排序，1 最常用。同科室内部连续编号 |
| `desc` | ✅ | 一句话说明用途 |
| `inputs` | ✅ | 输入项数组；纯分级量表（无输入）用 `[]` |
| `formula` | | 公式文字说明 |
| `compute` | ✅ | 计算函数名，见下文「计算引擎约定」 |
| `interpret` | ✅ | 结果解读规则数组，**按顺序匹配，第一个命中即返回** |
| `levels` | | 分级量表专用：分级档位数组（无输入时使用） |
| `note` | | 临床注意点（1–3 句） |
| `refs` | ✅ | 来源，字符串数组。写指南名+年份 |

### inputs 字段

`key`（唯一键）、`label`、`unit`、`type`、`min`、`max`、`step`、`options`、`required`、`hint`

`type` 取值：`number` | `select` | `bmi`

- `select` 必须带 `options: [{ "value": 1, "label": "..." }]`
- `bmi` 类型输入 key 固定为 `weight_kg` 与 `height_cm`，引擎自动算 BMI
- 体重单位固定 kg，身高固定 cm

### compute 计算引擎约定

`compute` 是一个字符串，指向渲染层里预置的函数。**你只负责给出名字，不要实现它**。
可用函数（其余情况一律用 `"formula_only"`，即只显示公式与解读、不做自动计算）：

- `sum` —— 把 `inputs` 里所有 number/select 的 value 求和，结果存 `v`
- `map` —— MAP = DBP + (SBP−DBP)/3
- `bmi` —— 由 weight_kg 与 height_cm 算 BMI
- `bsa` —— Mosteller: √(height×weight/3600)
- `egfr_ckdepi` —— CKD-EPI 2021（性別 crea）
- `crcl_cockcroft` —— Cockcroft-Gault
- `aa_gradient` —— A-a 梯度 = PAO2 − PaO2，PAO2 = FiO2×(760−47) − PaCO2/0.8
- `wfns` … 等专用函数：**如果你需要专用算法，把算法用一段伪代码写进 `algorithm` 字段**，渲染层加实现；否则用 `formula_only`

> **重要**：绝大多数评分用 `sum` 即可（各项加权求和）。需要复杂逻辑的（如 Child-Pugh 用 A/B/C 分档、MELD 用对数公式），在 `algorithm` 字段写成清晰的伪代码，我会实现。

### interpret 规则语法

`when` 是一个表达式字符串，变量：
- `v` —— 计算结果（number）
- 各 input 的 `key`（number 或 select 值）
- 可用的安全函数：`Math.log`、`Math.round`、`Math.min`、`Math.max`

支持运算符：`< <= > >= == != && ||` 与 `Math.*`。
`level` 取值：`low` | `ok` | `warn` | `high` | `crit`（决定颜色）。
`text` 是给医生看的中文解读，**要具体到临床动作**，不要只写「偏高」。

### levels（分级量表专用，无输入时使用）

```json
"levels": [
  { "label": "Ⅰ级", "criteria": "体力活动不受限，日常活动无症状", "level": "ok" }
]
```

---

## 二、疾病指南条目 schema（板块 2）

文件：`medkit/data/guide/<科室id>.json`

```json
{
  "dept": "cardio",
  "categories": [
    {
      "id": "acs",
      "name": "急性冠脉综合征",
      "rank": 1,
      "summary": "一句话概括这类疾病的共性处置原则。",
      "compare": [
        { "diseaseId": "stemi",  "dx": "STEMI 诊断要点简短一句", "key": "最具鉴别价值的一条" },
        { "diseaseId": "nstemi", "dx": "...", "key": "..." }
      ],
      "diseases": [
        {
          "id": "stemi",
          "name": "ST 段抬高型心肌梗死",
          "aka": ["STEMI"],
          "rank": 1,
          "basic": {
            "define": "定义（1–2 句）",
            "risk": ["危险因素，短句数组"],
            "epi": "流行病学（1–2 句，尽量给数字）"
          },
          "patho": "病理生理，2–4 句",
          "dx": {
            "criteria": ["诊断标准条目，尽量给具体数值/阈值"],
            "workup": ["需要的检查及判读要点"],
            "grading": "分型/分级，没有就空字符串"
          },
          "ddx": [
            { "name": "主动脉夹层", "point": "鉴别要点" }
          ],
          "tx": {
            "drug": [
              {
                "name": "阿司匹林",
                "dose": "负荷 300 mg 嚼服，维持 100 mg qd",
                "note": "注意点",
                "renal": "肾功能不全调整",
                "hepatic": "肝功能不全调整",
                "interact": "主要药物相互作用"
              }
            ],
            "nonDrug": ["非药物治疗：介入/手术/器械，给适应证"],
            "life": ["生活方式与随访"]
          },
          "prog": "预后，2–3 句",
          "refs": ["指南名+年份"]
        }
      ]
    }
  ]
}
```

### 关键要求

1. **`categories` 是大类**，`diseases` 是小类。大类必须有 `compare` 数组（≥2 项），用于「鉴别对比」按钮。
2. 小类疾病的 `ddx` **第一条必须是同大类内的其他疾病**，并在 `point` 写明「与本类中 XX 的鉴别点」。
3. `tx.drug` 每条必须有 `dose`。`renal`/`hepatic`/`interact` 没有明确资料时写「遵说明书」，**不要编造具体数字**。
4. 只有单一疾病的「大类」也要写 `compare`（可以是空数组 `[]`，但此时不显示对比按钮）。
5. `refs` 以国内指南为主（中华医学会/中国医师协会/国家卫健委），国外指南补充。

---

## 三、纪律

- **不确定的剂量绝不编造**。宁可写「遵说明书」「按体重滴定」，也不给一个看起来精确的假数字。
- 数值必须来自指南/共识/说明书。写到 `refs`。
- 中文表述，专业术语首次出现可附英文。
- 每个文件必须是**合法 JSON**，能通过 `python -c "import json;json.load(open(...))"`。
- 写完自查：id 全局唯一、rank 连续、JSON 无尾逗号、无 JS 注释。
