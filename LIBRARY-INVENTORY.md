# 库内疾病总清单（自动导出）

## anes（11）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 围术期 | 术前评估与 ASA 分级 | `an_preop` | Preoperative Assessment、ASA Physical Status、术前访视 |
| 围术期 | 术后恶心呕吐（PONV）与镇痛 | `an_pacu` | PONV、术后镇痛、Postoperative Nausea and Vomiting、PACU 综合征 |
| 麻醉急症 | 恶性高热 | `an_mh` | Malignant Hyperthermia、MH、恶性高热危象 |
| 麻醉急症 | 困难气道 | `an_airway` | Difficult Airway、CICO、不能插管不能氧合 |
| 麻醉急症 | 局麻药全身毒性 | `an_la_tox` | LAST、Local Anesthetic Systemic Toxicity、局麻药中毒 |
| 气道与通气管理 | 快速序贯诱导与反流误吸预防 | `anes_rsI` | RSI、Rapid Sequence Induction、Aspiration Prophylaxis |
| 气道与通气管理 | 单肺通气与低氧处理 | `anes_onelung` | OLV、One-Lung Ventilation、肺隔离 |
| 气道与通气管理 | 椎管内麻醉并发症（穿刺后头痛与硬膜外血肿） | `anes_sa` | PDPH、Epidural Hematoma、Spinal/Epidural Complications |
| 围术期危重症 | 围术期大出血与输血 | `anes_hemorrhage` | Massive Hemorrhage、Massive Transfusion Protocol、MTP |
| 围术期危重症 | 术中过敏休克（围术期过敏反应） | `anes_anaphylaxis` | Perioperative Anaphylaxis、Anaphylactic Shock |
| 围术期危重症 | 术后谵妄与术后认知障碍 | `anes_ponv_refract` | Postoperative Delirium、POD、Postoperative Cognitive Dysfunction、POCD |

## cardio（66）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 心律失常 | 窦房结功能障碍（病态窦房结综合征） | `ar_brady` | 病态窦房结综合征、窦性心动过缓、窦性停搏、窦房阻滞、SSS |
| 心律失常 | 房室传导阻滞 | `ar_avb` | AVB、II 度房室传导阻滞、III 度房室传导阻滞、莫氏 I 型、莫氏 II 型、文氏现象 |
| 心律失常 | 室内传导阻滞 | `ar_bbb` | 束支传导阻滞、完全性右束支阻滞、完全性左束支阻滞、左前分支阻滞、LAFB、LPFB、BBB |
| 心律失常 | 室性期前收缩 | `ar_pvc` | 室性早搏、室早、PVC、室性过早搏动、频发室早 |
| 心律失常 | 心房扑动 | `ar_af_flutter` | 房扑、AFL、典型房扑、非典型房扑、峡部依赖性房扑 |
| 心律失常 | 阵发性室上性心动过速 | `ar_psvt` | PSVT、室上速、AVNRT、AVRT、房室结折返性心动过速、房室折返性心动过速 |
| 心律失常 | 预激综合征（WPW 综合征） | `ar_wpw` | WPW、沃-帕-怀综合征、预激综合征、旁路、δ 波 |
| 心律失常 | 室性心动过速 | `ar_vt` | 室速、VT、单形性室速、多形性室速、尖端扭转型室速、TdP |
| 心律失常 | 心室扑动与心室颤动 / 心脏性猝死 | `ar_vf_scd` | 室扑、室颤、VF、心脏性猝死、SCD、心脏骤停、SCA |
| 心律失常 | 遗传性心律失常（长 QT 综合征与 Brugada 综合征） | `ar_hereditary` | LQTS、长 QT 综合征、Brugada 综合征、BrS、离子通道病、遗传性心律失常 |
| 冠心病 | 稳定型心绞痛（慢性冠脉综合征） | `cad_sap` | 稳定型心绞痛、SAP、稳定性冠心病、CCS |
| 冠心病 | ST 段抬高型心肌梗死 | `cad_stemi` | STEMI、急性 ST 段抬高型心肌梗死 |
| 冠心病 | 非 ST 段抬高型心肌梗死/不稳定型心绞痛 | `cad_nstemi` | NSTEMI、UA、NSTE-ACS |
| 冠心病 | 冠脉痉挛与微血管性心绞痛（非阻塞性冠脉疾病） | `cad_scad` | 冠脉痉挛、变异型心绞痛、微血管性心绞痛、INOCA、MINOCA |
| 右心衰竭 | 右心衰竭 | `hf_right_failure` | Right Heart Failure、RHF、右心功能不全、右心室衰竭 |
| 窦性与交界区心律失常 | 窦性心动过速 | `ar_sinus_tachy` | Sinus Tachycardia、窦速、不适当窦性心动过速、Inappropriate Sinus Tachycardia、IST |
| 窦性与交界区心律失常 | 房室交界区性期前收缩 | `ar_junctional_pac` | Premature Junctional Complex、PJC、交界性早搏、Junctional Premature Beat |
| 窦性与交界区心律失常 | 房室交界区性逸搏心律 | `ar_junctional_escape` | Junctional Escape Rhythm、交界性逸搏心律、交界区逸搏、加速性交界区心律、Accelerated Junctional Rhythm |
| 遗传性心律失常（补充） | 短 QT 综合征 | `ar_sqts` | Short QT Syndrome、SQTS、短 QT 间期综合征 |
| 先天性心脏病（补充） | 法洛四联症 | `chd_tof` | Tetralogy of Fallot、TOF、法乐四联症 |
| 先天性心脏病（补充） | 艾森门格综合征 | `chd_eisenmenger` | Eisenmenger Syndrome、艾森曼格综合征、Eisenmenger 综合征 |
| 多瓣膜病 | 多瓣膜病 | `vhd_multivalve` | Multiple Valvular Heart Disease、Combined Valvular Disease、多瓣膜病变、联合瓣膜病 |
| 房性心律失常 | 房性期前收缩 | `ar_pac` | 房性早搏、Premature Atrial Complex、PAC、房早 |
| 房性心律失常 | 房性心动过速 | `ar_at` | Atrial Tachycardia、AT、房速、房扑样房速 |
| 其他先天性心脏病 | 房室间隔缺损 | `chd_avsd` | Atrioventricular Septal Defect、AVSD、心内膜垫缺损、Endocardial Cushion Defect、原发孔型房间隔缺损合并二尖瓣裂 |
| 其他先天性心脏病 | 主动脉缩窄 | `chd_coarctation` | Coarctation of the Aorta、CoA、主动脉缩窄症 |
| 其他先天性心脏病 | 肺动脉狭窄 | `chd_ps` | Pulmonary Stenosis、PS、肺动脉瓣狭窄、Pulmonary Valve Stenosis、右室流出道梗阻 |
| 其他先天性心脏病 | 大动脉转位 | `chd_tga` | Transposition of the Great Arteries、D-TGA、大动脉转位（D 型）、完全性大动脉转位 |
| 其他先天性心脏病 | Ebstein 畸形 | `chd_ebstein` | Ebstein Anomaly、Ebstein's Anomaly、三尖瓣下移畸形 |
| 冠心病的其他临床类型 | 无症状性心肌缺血 | `cad_silent_ischemia` | Silent Myocardial Ischemia、SMI、隐匿性冠心病、无症状性冠心病 |
| 冠心病的其他临床类型 | 缺血性心肌病 | `cad_ischemic_cmp` | Ischemic Cardiomyopathy、ICM、冠心病性心力衰竭、缺血性心力衰竭 |
| 心力衰竭 | 射血分数降低的心力衰竭 | `hf_hfref` | HFrEF、收缩性心衰 |
| 心力衰竭 | 射血分数轻度降低的心力衰竭 | `hf_hfmref` | HFmrEF、射血分数中间值心衰 |
| 心力衰竭 | 射血分数保留的心力衰竭 | `hf_hfpef` | HFpEF、舒张性心衰 |
| 心力衰竭 | 急性心力衰竭与心源性休克 | `hf_acute` | 急性心衰、ADHF、急性肺水肿、心源性休克 |
| 心房颤动 | 阵发性心房颤动 | `af_parox` | 阵发性房颤、PAF |
| 心房颤动 | 持续性心房颤动 | `af_persist` | 持续性房颤、非阵发性房颤 |
| 心房颤动 | 合并瓣膜病的心房颤动 | `af_valv` | 瓣膜性房颤、风湿性房颤 |
| 高血压 | 原发性高血压 | `htn_primary` | 高血压、高血压病、EH |
| 高血压 | 高血压急症 | `htn_emerg` | 高血压危象、高血压急症（合并靶器官损害）, Hypertensive Emergency |
| 心肌疾病 | 扩张型心肌病 | `cm_dcm` | DCM、Dilated Cardiomyopathy |
| 心肌疾病 | 肥厚型心肌病 | `cm_hcm` | HCM、Hypertrophic Cardiomyopathy、IHSS |
| 心肌疾病 | 限制型心肌病 | `cm_rcm` | RCM、Restrictive Cardiomyopathy |
| 心肌疾病 | 致心律失常性右室心肌病 | `cm_arvc` | ARVC、ARVD/C、Arrhythmogenic Cardiomyopathy |
| 心肌疾病 | 心肌炎 | `cm_myocarditis` | Myocarditis、暴发性心肌炎、Fulminant Myocarditis |
| 心肌疾病 | 围生期心肌病与酒精性心肌病 | `cm_peripartum` | PPCM、Peripartum Cardiomyopathy、ACM、Alcoholic Cardiomyopathy |
| 心包与先天性心脏病 | 房间隔缺损 | `chd_asd` | ASD、Atrial Septal Defect、继发孔型房间隔缺损 |
| 心包与先天性心脏病 | 室间隔缺损 | `chd_vsd` | VSD、Ventricular Septal Defect |
| 心包与先天性心脏病 | 动脉导管未闭 | `chd_pda` | PDA、Patent Ductus Arteriosus |
| 心包与先天性心脏病 | 急性心包炎 | `pc_acute` | Acute Pericarditis、心包炎 |
| 心包与先天性心脏病 | 心包积液与心脏压塞 | `pc_effusion` | Pericardial Effusion、Cardiac Tamponade、心包填塞 |
| 心包与先天性心脏病 | 缩窄性心包炎 | `pc_constrictive` | Constrictive Pericarditis、心包缩窄 |
| 心脏瓣膜病 | 二尖瓣狭窄 | `vhd_ms` | Mitral Stenosis、MS、风湿性二尖瓣狭窄 |
| 心脏瓣膜病 | 二尖瓣关闭不全 | `vhd_mr` | Mitral Regurgitation、MR、二尖瓣反流 |
| 心脏瓣膜病 | 主动脉瓣狭窄 | `vhd_as` | Aortic Stenosis、AS |
| 心脏瓣膜病 | 主动脉瓣关闭不全 | `vhd_ar` | Aortic Regurgitation、AR、主动脉瓣反流 |
| 心脏瓣膜病 | 三尖瓣与肺动脉瓣疾病 | `vhd_tv` | Tricuspid and Pulmonary Valve Disease、三尖瓣反流、肺动脉瓣狭窄 |
| 心脏瓣膜病 | 风湿热与风湿性心脏病 | `vhd_rheumatic` | Acute Rheumatic Fever、Rheumatic Heart Disease、RHD |
| 感染性心内膜炎与主动脉疾病 | 自体瓣膜感染性心内膜炎 | `ie_native` | Infective Endocarditis、IE、自体瓣膜心内膜炎 |
| 感染性心内膜炎与主动脉疾病 | 人工瓣膜心内膜炎 | `ie_prosthetic` | Prosthetic Valve Endocarditis、PVE、早发型 PVE、晚发型 PVE |
| 感染性心内膜炎与主动脉疾病 | 主动脉夹层 | `aorta_dissection` | Aortic Dissection、Stanford A 型、Stanford B 型、主动脉内膜撕裂 |
| 感染性心内膜炎与主动脉疾病 | 多发性大动脉炎 | `takayasu` | Takayasu Arteritis、TA、无脉症、主动脉弓综合征 |
| 肺血管病与心血管其他 | 肺动脉高压（WHO 分类与靶向治疗） | `ph_group` | Pulmonary Hypertension、PH、肺高血压、动脉性肺动脉高压 PAH |
| 肺血管病与心血管其他 | 血脂异常与动脉粥样硬化防治 | `dyslipidemia` | Dyslipidemia、高脂血症、血脂异常 |
| 肺血管病与心血管其他 | 继发性高血压 | `secondary_htn` | Secondary Hypertension、继发性高血压筛查 |
| 肺血管病与心血管其他 | 心脏神经症与双心医学 | `cardiac_neurosis` | Cardiac Neurosis、Da Costa 综合征、焦虑性心脏症状、双心医学 |

## cts（22）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 胸部创伤 | 张力性气胸 | `ct_tension_pnx` | 张力性气胸、Tension Pneumothorax、高压性气胸 |
| 胸部创伤 | 血气胸 | `ct_hemothorax` | 血胸、血气胸、Hemothorax、Hemopneumothorax |
| 胸部创伤 | 连枷胸 | `ct_flail` | 连枷胸、Flail Chest、浮动胸壁 |
| 胸部肿瘤与术后 | 肺癌外科治疗 | `ct_lung_ca` | 肺癌、肺腺癌、非小细胞肺癌、NSCLC、Lung Cancer Surgery |
| 胸部肿瘤与术后 | 食管癌外科治疗 | `ct_esoph` | 食管癌、食管鳞癌、Esophageal Cancer、Esophageal Carcinoma |
| 胸部良性疾病 | 自发性气胸 | `cts_pneumothorax` | 自发性气胸、Spontaneous Pneumothorax、原发性自发性气胸、继发性自发性气胸、PSP、SSP |
| 胸部良性疾病 | 脓胸 | `cts_empyema` | 脓胸、Empyema、胸膜腔感染、化脓性胸膜炎 |
| 胸部良性疾病 | 纵隔肿瘤 | `cts_mediastinum` | 纵隔肿瘤、Mediastinal Tumor、纵隔肿块、胸腺瘤、畸胎瘤、神经源性肿瘤 |
| 胸外科术后管理 | 胸管管理与持续肺漏气 | `cts_airleak` | 持续漏气、Prolonged Air Leak、PAL、胸管管理、肺泡漏气 |
| 胸外科术后管理 | 肺叶切除术后肺部并发症 | `cts_postop_pulm` | 术后肺部并发症、Postoperative Pulmonary Complications、PPC、术后肺不张、术后肺炎、ARISCAT |
| 胸外科术后管理 | 乳糜胸 | `cts_chylothorax` | 乳糜胸、Chylothorax、胸导管损伤、乳糜性胸腔积液 |
| 胸壁与膈肌疾病 | 胸壁肿瘤 | `cts_chest_wall_tumor` | Chest Wall Tumor、肋骨肿瘤、胸壁重建、软骨肉瘤 |
| 胸壁与膈肌疾病 | 膈疝与食管裂孔疝 | `cts_diaphragmatic_hernia` | Hiatal Hernia、滑动型食管裂孔疝、食管旁疝、Diaphragmatic Hernia |
| 胸壁与膈肌疾病 | 贲门失弛缓症 | `cts_achalasia` | Achalasia、鸟嘴征、POEM、Heller 肌切开 |
| 胸壁与膈肌疾病 | 鸡胸与漏斗胸 | `cts_pectus` | 漏斗胸、Pectus Excavatum、鸡胸、Pectus Carinatum、Haller 指数、Nuss 手术 |
| 肺部良性疾病外科 | 肺大疱与自发性气胸外科 | `cts_bulla` | 肺大疱、Bulla、肺大泡切除、胸膜固定、VATS 肺大疱切除 |
| 肺部良性疾病外科 | 支气管扩张外科治疗 | `cts_bronchiectasis_surg` | Bronchiectasis、支气管扩张症、局限型支气管扩张、印戒征 |
| 肺部良性疾病外科 | 肺转移瘤切除指征 | `cts_lung_metastasis` | Pulmonary Metastasis、肺转移瘤切除、转移灶切除、无病间期 |
| 肺部良性疾病外科 | 纵隔感染与食管破裂 | `cts_mediastinitis` | 纵隔炎、Mediastinitis、食管破裂、Boerhaave 综合征、食管穿孔 |
| 罕见肺部疾病的外科（肺隔离症、肺动静脉瘘、食管憩室） | 肺隔离症 | `cts_sequestration` | Pulmonary Sequestration、肺叶内型隔离症、肺叶外型隔离症 |
| 罕见肺部疾病的外科（肺隔离症、肺动静脉瘘、食管憩室） | 肺动静脉瘘 | `cts_pavf` | Pulmonary Arteriovenous Fistula、PAVF、PAVM、肺动静脉畸形 |
| 罕见肺部疾病的外科（肺隔离症、肺动静脉瘘、食管憩室） | 食管憩室 | `cts_esophageal_diverticulum` | Esophageal Diverticulum、Zenker 憩室、咽食管憩室、食管中段憩室 |

## derm（15）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 炎症性皮肤病 | 特应性皮炎 | `de_ad` | Atopic Dermatitis、AD、湿疹 |
| 炎症性皮肤病 | 银屑病 | `de_psoriasis` | Psoriasis、牛皮癣、寻常型银屑病 |
| 皮肤感染 | 带状疱疹与单纯疱疹 | `de_herpes` | Herpes Zoster、Shingles、Herpes Simplex、HSV |
| 皮肤感染 | 皮肤真菌感染 | `de_tinea` | Tinea、Dermatophytosis、体癣、足癣、股癣、头癣、甲癣 |
| 重症药疹与皮肤肿瘤 | 史蒂文斯-约翰逊综合征与中毒性表皮坏死松解症 | `de_sjs` | SJS、TEN、Stevens-Johnson Syndrome、Toxic Epidermal Necrolysis、重症多形红斑 |
| 重症药疹与皮肤肿瘤 | 荨麻疹 | `de_urticaria` | Urticaria、Hives、风疹块 |
| 重症药疹与皮肤肿瘤 | 基底细胞癌 | `de_bcc` | Basal Cell Carcinoma、BCC、基底细胞瘤 |
| 自身免疫性大疱病与痤疮 | 寻常型天疱疮 | `de_pemphigus` | Pemphigus Vulgaris、PV、天疱疮 |
| 自身免疫性大疱病与痤疮 | 大疱性类天疱疮 | `de_bullous_pemphigoid` | Bullous Pemphigoid、BP、类天疱疮 |
| 自身免疫性大疱病与痤疮 | 痤疮 | `de_acne` | Acne Vulgaris、青春痘、寻常痤疮、重度囊肿型痤疮 |
| 自身免疫性大疱病与痤疮 | 玫瑰痤疮与激素依赖性皮炎 | `de_rosacea` | Rosacea、酒渣鼻、激素依赖性皮炎、激素脸 |
| 色素与皮肤附属器病 | 白癜风 | `de_vitiligo` | Vitiligo、白斑病 |
| 色素与皮肤附属器病 | 黄褐斑与色素沉着 | `de_melasma` | Melasma、Chloasma、肝斑、妊娠斑、炎症后色素沉着 |
| 色素与皮肤附属器病 | 雄激素性脱发与斑秃 | `de_alopecia` | Androgenetic Alopecia、AGA、Alopecia Areata、AA、脂溢性脱发、男性型脱发、鬼剃头 |
| 色素与皮肤附属器病 | 疥疮与虫咬皮炎 | `de_scabies` | Scabies、Sarcoptic Mange、疥疮、虫咬性皮炎、丘疹性荨麻疹 |

## emerg（18）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 复苏与休克 | 成人心脏骤停 | `em_cardiac_arrest` | Cardiac Arrest、CA、心搏骤停、SCA |
| 复苏与休克 | 休克分型与液体复苏 | `em_shock` | Shock、循环衰竭、血流动力学不稳定 |
| 危重症 | 急性呼吸窘迫综合征 | `em_ards` | ARDS、急性呼吸窘迫综合征、柏林定义 |
| 危重症 | 急性肾损伤与 CRRT 指征 | `em_aki_crrt` | AKI、Acute Kidney Injury、连续性肾脏替代治疗、CRRT |
| 中毒与环境 | 对乙酰氨基酚中毒 | `em_apap` | Paracetamol Poisoning、醋氨酚中毒、APAP |
| 中毒与环境 | 一氧化碳中毒 | `em_co` | CO Poisoning、煤气中毒、Carbon Monoxide |
| 中毒与环境 | 烧伤面积评估与液体复苏 | `em_burn` | Burn、热烧伤、烧伤休克、Parkland 公式 |
| 中毒与环境 | 高钾血症急症处理 | `em_hyperk` | Hyperkalemia、高血钾、高钾危象 |
| 器官衰竭与电解质危象 | 糖尿病酮症酸中毒与高渗高血糖状态（急诊处置） | `em_dka_emerg` | DKA、HHS |
| 器官衰竭与电解质危象 | 甲状腺危象（急诊处置） | `em_thyroid_storm` | Thyroid Storm、甲亢危象 |
| 器官衰竭与电解质危象 | 肾上腺危象 | `em_adrenal_crisis` | Adrenal Crisis |
| 器官衰竭与电解质危象 | 高钙危象 | `em_hypercalcemia` | Hypercalcemic Crisis |
| 器官衰竭与电解质危象 | 低钠血症急症 | `em_hyponatremia` | Severe Hyponatremia、低钠脑病 |
| 急诊常见急症 | 急性冠脉综合征急诊流程 | `em_acs_emerg` | ACS、急性胸痛流程 |
| 急诊常见急症 | 急性脑梗死急诊流程 | `em_stroke_emerg` | AIS |
| 急诊常见急症 | 脓毒症 1 小时集束化治疗 | `em_sepsis_emerg` | Sepsis Bundle、Sepsis-3 |
| 急诊常见急症 | 急诊气道管理（快速诱导插管与失败处理） | `em_airway_emerg` | RSI、困难气道 |
| 急诊常见急症 | 过敏性休克 | `em_anaphylaxis` | Anaphylaxis、严重过敏反应 |

## endo（31）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 糖尿病 | 2 型糖尿病 | `dm_t2` | T2DM、成人型糖尿病、非胰岛素依赖型糖尿病 |
| 糖尿病 | 1 型糖尿病 | `dm_t1` | T1DM、胰岛素依赖型糖尿病、幼年型糖尿病 |
| 糖尿病 | 糖尿病酮症酸中毒 | `dm_dka` | DKA、酮症酸中毒、糖尿病酮症 |
| 糖尿病 | 糖尿病高渗高血糖综合征 | `dm_hhs` | HHS、高渗性非酮症糖尿病昏迷、HONK、高渗高血糖状态 |
| 甲状腺 | 甲状腺功能亢进症（Graves 病） | `thy_hypER` | 甲亢、Graves 病、毒性弥漫性甲状腺肿、GD、Hyperthyroidism |
| 甲状腺 | 甲状腺危象 | `thy_storm` | 甲亢危象、Thyroid Storm、甲状腺风暴 |
| 甲状腺 | 甲状腺功能减退症 | `thy_hypo` | 甲减、Hypothyroidism、桥本甲状腺炎、Hashimoto、黏液性水肿 |
| 肾上腺与垂体 | 原发性醛固酮增多症 | `ad_pa` | 原醛、PA、Conn 综合征、Primary Aldosteronism |
| 肾上腺与垂体 | 库欣综合征 | `ad_cushing` | Cushing 综合征、皮质醇增多症、Hypercortisolism、库欣病 |
| 肾上腺与垂体 | 嗜铬细胞瘤与副神经节瘤 | `ad_pheo` | 嗜铬细胞瘤、Pheochromocytoma、PPGL、副神经节瘤 |
| 代谢与骨 | 痛风 | `gout` | 痛风性关节炎、Gout、高尿酸血症相关关节炎 |
| 代谢与骨 | 骨质疏松症 | `op` | 骨质疏松、Osteoporosis、OP、原发性骨质疏松症 |
| 内分泌其他 | 甲状腺炎 | `thy_thyroiditis` | 亚急性甲状腺炎、De Quervain 甲状腺炎、桥本甲状腺炎、桥本病、Hashimoto Thyroiditis |
| 内分泌其他 | 甲状腺结节与癌（内分泌视角） | `thy_thyroid_nodule` | 甲状腺结节、甲状腺癌、乳头状甲状腺癌、PTC、TI-RADS |
| 内分泌其他 | 甲状旁腺功能减退症 | `pt_hypopth` | 甲旁减、Hypoparathyroidism |
| 内分泌其他 | 甲状旁腺功能亢进症 | `pt_hyperpth` | 甲旁亢、原发性甲状旁腺功能亢进、PHPT、Hyperparathyroidism |
| 垂体与水盐代谢 | 腺垂体功能减退症 | `pit_hypopit` | 垂体前叶功能减退、席汉综合征、Sheehan 综合征、Hypopituitarism |
| 垂体与水盐代谢 | 肢端肥大症 | `pit_acromegaly` | Acromegaly、生长激素瘤、GH 瘤 |
| 垂体与水盐代谢 | 泌乳素瘤 | `pit_prolactinoma` | 催乳素瘤、Prolactinoma |
| 垂体与水盐代谢 | 尿崩症 | `water_di` | 中枢性尿崩症、肾性尿崩症、Diabetes Insipidus、CDI、NDI |
| 肾上腺其他疾病 | 肾上腺皮质功能减退 | `ad_addison` | Adrenal Insufficiency、Addison 病、原发性肾上腺皮质功能减退、肾上腺危象 |
| 肾上腺其他疾病 | 先天性肾上腺皮质增生症 | `ad_cah` | Congenital Adrenal Hyperplasia、CAH、21-羟化酶缺乏症 |
| 其他代谢性疾病 | 低血糖症 | `met_hypoglycemia` | Hypoglycemia、低血糖、Whipple 三联征 |
| 其他代谢性疾病 | 肥胖症 | `met_obesity` | Obesity、肥胖、代谢综合征相关肥胖 |
| 甲状腺肿 | 单纯性甲状腺肿 | `thy_simple_goiter` | Simple Goiter、Non-toxic Goiter、非毒性弥漫性甲状腺肿、地方性甲状腺肿 |
| 甲状腺肿 | 结节性甲状腺肿 | `thy_nodular_goiter` | Nodular Goiter、Multinodular Goiter、多结节性甲状腺肿、非毒性结节性甲状腺肿 |
| 肾上腺意外瘤 | 肾上腺意外瘤 | `ad_incidentaloma` | Adrenal Incidentaloma、AI、肾上腺偶发瘤、肾上腺意外发现结节 |
| 糖尿病慢性并发症 | 糖尿病足 | `dm_foot` | Diabetic Foot、Diabetic Foot Ulcer、DFU、糖尿病足溃疡、糖尿病足病 |
| 水电解质紊乱 | 高钠血症 | `ele_hypernatremia` | Hypernatremia、高血钠症、高渗性脱水 |
| 水电解质紊乱 | 低钾血症 | `ele_hypokalemia` | Hypokalemia、低血钾、钾缺乏 |
| 水电解质紊乱 | 低钙血症 | `ele_hypocalcemia` | Hypocalcemia、低血钙、低钙性手足搐搦 |

## ent（15）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 感染与炎性 | 急性中耳炎 | `en_otitis` | AOM、Acute Otitis Media、中耳炎、急性化脓性中耳炎 |
| 感染与炎性 | 鼻窦炎 | `en_sinusitis` | 急慢性鼻-鼻窦炎、CRS、Acute Rhinosinusitis、鼻窦感染 |
| 感染与炎性 | 咽扁桃体炎 | `en_tonsillitis` | 急性扁桃体炎、咽炎、Acute Pharyngotonsillitis、链球菌性咽炎 |
| 眩晕与听力 | 良性阵发性位置性眩晕 | `en_bppv` | BPPV、耳石症、Benign Paroxysmal Positional Vertigo、位置性眩晕 |
| 眩晕与听力 | 梅尼埃病 | `en_md` | Ménière's Disease、美尼尔病、内淋巴积水 |
| 眩晕与听力 | 突发性聋 | `en_snhl` | SSNHL、Sudden Sensorineural Hearing Loss、特发性突聋、突发性听力损失 |
| 头颈肿瘤 | 鼻咽癌 | `en_npc` | NPC、Nasopharyngeal Carcinoma、鼻咽恶性肿瘤 |
| 头颈肿瘤 | 喉癌 | `en_larynx_ca` | Laryngeal Cancer、Laryngeal Carcinoma、声带癌 |
| 头颈肿瘤 | 颈部肿块鉴别 | `en_thyroid_neck` | Neck Mass、颈部包块、甲状腺结节、颈部淋巴结肿大、腮腺/颌下腺肿瘤 |
| 头颈肿瘤 | 阻塞性睡眠呼吸暂停 (外科视角) | `en_osahs_surg` | OSAHS、OSA、鼾症、UPPP |
| 气道与鼻部其他 | 鼻衄 | `en_epistaxis` | Epistaxis、Nosebleed、鼻出血 |
| 气道与鼻部其他 | 声带息肉与声带白斑、喉肉芽肿 | `en_dysphonia` | Dysphonia、声嘶、声带息肉、声带白斑、喉接触性肉芽肿 |
| 气道与鼻部其他 | 气管支气管异物 | `en_airway_foreign` | Tracheobronchial Foreign Body、气道异物、气管异物 |
| 气道与鼻部其他 | 耳硬化症 | `en_otosclerosis` | Otosclerosis、耳硬化、镫骨固定、传导性耳聋 |
| 气道与鼻部其他 | 面神经麻痹 (贝尔麻痹与 Hunt 综合征) | `en_facial_nerve` | Bell's Palsy、特发性面神经麻痹、周围性面瘫、Ramsay Hunt 综合征 |

## eye（15）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 青光眼与白内障 | 白内障 | `ey_cataract` | Cataract、年龄相关性白内障、老年性白内障 |
| 青光眼与白内障 | 急性闭角型青光眼 | `ey_aacg` | AACG、急性房角关闭、急性青光眼发作 |
| 青光眼与白内障 | 原发性开角型青光眼 | `ey_oag` | POAG、开角型青光眼、OAG |
| 眼底病 | 糖尿病视网膜病变 | `ey_dr` | DR、Diabetic Retinopathy、糖网 |
| 眼底病 | 年龄相关性黄斑变性 | `ey_amd` | AMD、Age-related Macular Degeneration、黄斑变性 |
| 眼底病 | 视网膜脱离 | `ey_rd` | Retinal Detachment、RRD、孔源性视网膜脱离 |
| 角膜与眼表外病 | 角膜炎 | `ey_keratitis` | Keratitis、感染性角膜炎、角膜溃疡、细菌性角膜炎、真菌性角膜炎、单纯疱疹病毒性角膜炎 |
| 角膜与眼表外病 | 干眼症 | `ey_dry_eye` | Dry Eye Disease、DED、干眼、角结膜干燥症 |
| 角膜与眼表外病 | 圆锥角膜 | `ey_keratoconus` | Keratoconus、KC、角膜圆锥 |
| 角膜与眼表外病 | 眼内炎 | `ey_endophthalmitis` | Endophthalmitis、术后眼内炎、内源性眼内炎、感染性眼内炎 |
| 眼外伤与屈光斜视 | 眼球穿通伤与眼内异物 | `ey_trauma` | Open Globe Injury、Penetrating Ocular Trauma、眼球破裂伤 |
| 眼外伤与屈光斜视 | 眼化学烧伤 | `ey_chem_burn` | Chemical Ocular Burn、眼化学伤、碱烧伤、酸烧伤 |
| 眼外伤与屈光斜视 | 斜视与弱视 | `ey_strabismus_amblyopia` | Strabismus、Amblyopia、斜视、弱视、懒惰眼 |
| 眼外伤与屈光斜视 | 屈光不正 | `ey_refractive` | Refractive Error、近视、远视、散光、Myopia、Hyperopia、Astigmatism |
| 眼外伤与屈光斜视 | 眶周与眶内感染 | `ey_orbital_cellulitis` | Orbital Cellulitis、Preseptal Cellulitis、眶蜂窝织炎、眶隔前蜂窝织炎 |

## gen_surg（38）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 急腹症 | 急性阑尾炎 | `gs_append` | Appendicitis、Acute appendicitis |
| 急腹症 | 急性胆囊炎 | `gs_chole` | Acute cholecystitis、Acute calculous cholecystitis |
| 急腹症 | 肠梗阻 | `gs_bowel_obst` | Small bowel obstruction、Mechanical bowel obstruction、肠栖阻 |
| 消化道肿瘤 | 结直肠癌 | `gs_crc` | Colorectal cancer、CRC |
| 消化道肿瘤 | 胃癌 | `gs_gastric` | Gastric cancer、GC |
| 消化道肿瘤 | 肝细胞癌 | `gs_hcc` | Hepatocellular carcinoma、HCC、原发性肝癌 |
| 乳腺与甲状腺 | 乳腺癌 | `gs_breast_ca` | Breast cancer、Breast carcinoma |
| 乳腺与甲状腺 | 甲状腺结节与分化型甲状腺癌 | `gs_thyroid_nodule` | Thyroid nodule、Differentiated thyroid carcinoma、DTC |
| 乳腺与甲状腺 | 甲状旁腺功能亢进 | `gs_hyperpth` | Primary hyperparathyroidism、PHPT、甲旁亢 |
| 疝与肛肠 | 腹股沟疝 | `gs_inguinal` | Inguinal hernia、Groin hernia |
| 疝与肛肠 | 痔疾 | `gs_hemorrhoid` | Hemorrhoids、痔疮 |
| 疝与肛肠 | 肛周脓肿与肛瘘 | `gs_perianal_abscess` | Perianal abscess and fistula、Anorectal abscess / fistula-in-ano |
| 门静脉高压与脾脏 | 门静脉高压症 | `gs_portal_htn` | Portal hypertension、PHT、肝硬化门脉高压 |
| 门静脉高压与脾脏 | 脾破裂与脾切除适应证 | `gs_splenectomy` | Splenic rupture、Splenectomy、OPSI |
| 门静脉高压与脾脏 | 肝脓肿（细菌性与阿米巴性） | `gs_liver_abscess` | Hepatic abscess、Pyogenic liver abscess、Amoebic liver abscess |
| 胆道与腹壁其他 | 胆囊结石与胆囊息肉 | `gs_cholelithiasis` | Cholelithiasis、Gallbladder polyp、胆囊息肉样病变 |
| 胆道与腹壁其他 | 急性梗阻性化脓性胆管炎 | `gs_aosc` | Acute obstructive suppurative cholangitis、AOSC、急性重症胆管炎 ACST |
| 胆道与腹壁其他 | 胆管癌与胆囊癌 | `gs_cholangioca` | Cholangiocarcinoma、Gallbladder carcinoma、Cholangiocarcinoma perihilar |
| 胆道与腹壁其他 | 股疝与切口疝 | `gs_ventral_hernia` | Femoral hernia、Ventral hernia、Incisional hernia、腹壁疝 |
| 胆道与腹壁其他 | 外科感染（痈、丹毒、脓毒症） | `gs_surgical_infection` | Surgical infection、Carbuncle、Erysipelas、Surgical sepsis |
| 外科感染与特定感染 | 破伤风 | `gs_tetanus` | Tetanus、破伤风梭菌感染 |
| 外科感染与特定感染 | 气性坏疽 | `gs_gas_gangrene` | Gas gangrene、梭菌性肌坏死、Clostridial myonecrosis |
| 外科感染与特定感染 | 咬伤（狂犬病暴露与蛇咬伤） | `gs_bite` | Animal bite、Rabies exposure、Snakebite、狂犬病暴露、毒蛇咬伤 |
| 乳腺良性疾病与肠道其他 | 急性乳腺炎与乳腺脓肿 | `gs_breast_inflam` | Acute mastitis、Lactational mastitis、Breast abscess、急性化脓性乳腺炎 |
| 乳腺良性疾病与肠道其他 | 乳腺囊性增生 | `gs_breast_hyperplasia` | Cystic hyperplasia of breast、Fibrocystic change、乳腺囊性增生病、乳腺病 |
| 乳腺良性疾病与肠道其他 | 乳腺纤维腺瘤 | `gs_fibroadenoma` | Fibroadenoma、纤维腺瘤、乳腺纤维腺瘤 |
| 乳腺良性疾病与肠道其他 | 急性腹膜炎 | `gs_peritonitis` | Acute peritonitis、继发性腹膜炎、自发性细菌性腹膜炎（SBP） |
| 乳腺良性疾病与肠道其他 | 小肠肿瘤（腺癌/间质瘤/淋巴瘤/类癌） | `gs_small_bowel_tumor` | Small bowel tumor、小肠恶性肿瘤、Small intestinal malignancy |
| 乳腺良性疾病与肠道其他 | 肛裂 | `gs_anal_fissure` | Anal fissure、肛管溃疡、裂肛 |
| 乳腺良性疾病与肠道其他 | 直肠脱垂 | `gs_rectal_prolapse` | Rectal prolapse、脱肛、完全性直肠脱垂 |
| 乳腺良性疾病与肠道其他 | 肝囊肿与肝血管瘤 | `gs_liver_cyst_hemangioma` | Hepatic cyst、Hepatic hemangioma、肝海绵状血管瘤、多囊肝 |
| 乳腺良性疾病与肠道其他 | 胰腺内分泌肿瘤 | `gs_pancreatic_net` | Pancreatic neuroendocrine tumor、pNET、功能性胰腺神经内分泌肿瘤 |
| 甲状腺外科（补充） | 甲状腺功能亢进的外科治疗 | `gs_hyperthyroid_surg` | Surgical treatment of hyperthyroidism、Graves 病外科治疗、甲状腺次全切除术 |
| 腹外疝（补充） | 脐疝 | `gs_umbilical_hernia` | Umbilical hernia、成人脐疝、婴幼儿脐疝 |
| 腹外疝（补充） | 白线疝 | `gs_linea_alba` | Epigastric hernia、上腹疝、腹直肌间疝 |
| 腹部损伤 | 腹部损伤（肝脾胰肠） | `gs_abd_trauma` | Abdominal trauma、腹部创伤、肝脾破裂、外伤性肠破裂 |
| 结直肠息肉 | 结直肠息肉 | `gs_colorectal_polyp` | Colorectal polyp、结直肠腺瘤、大肠息肉 |
| 器官移植 | 器官移植（肾移植与排斥反应） | `gs_transplant` | Renal transplantation、同种异体肾移植、移植肾排斥反应 |

## geriatric（12）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 老年综合征 | 老年衰弱与肌少症 | `ge_frailty` | Frailty、Sarcopenia、衰弱综合征 |
| 老年综合征 | 老年跌倒 | `ge_falls` | Falls、跌倒与跌倒风险评估 |
| 老年综合征 | 老年谵妄 | `ge_delirium` | Delirium、急性意识障碍、老年谵妄 |
| 老年慢病与用药 | 老年高血压 | `ge_htn` | Elderly Hypertension、老年高血压 |
| 老年慢病与用药 | 多重用药与潜在不适当用药 | `ge_polypharmacy` | Polypharmacy、Beers 标准、PIM、多重用药、去处方 |
| 老年慢病与用药 | 终末期疾病与舒缓医疗 | `ge_palliative` | Palliative Care、安宁疗护、临终关怀、Hospice |
| 老年脏器疾病 | 老年射血分数保留心衰 | `ge_hfpef` | HFpEF、射血分数保留型心力衰竭、舒张性心衰、Diastolic Heart Failure |
| 老年脏器疾病 | 老年慢性肾病（eGFR 计算与用药调整） | `ge_ckd` | CKD、慢性肾脏病、eGFR、CKD-EPI 2021、老年肾功能不全 |
| 老年脏器疾病 | 老年骨质疏松与脆弱骨折 | `ge_osteoporosis` | Osteoporosis、骨质疏松症、脆弱骨折、Fragility Fracture、FRAX |
| 功能与营养 | 肌少症（AWGS 诊断与阻力训练/蛋白补充） | `ge_sarcopenia` | Sarcopenia、骨骼肌减少症、AWGS 2019、老年肌少症 |
| 功能与营养 | 老年营养不良（MNA-SF 与 ONS） | `ge_nutrition` | Malnutrition、营养不良、蛋白-能量营养不良、MNA-SF、ONS、口服营养补充 |
| 功能与营养 | 老年尿失禁与便秘 | `ge_incontinence` | Urinary Incontinence、Constipation、尿失禁、便秘、膀胱过度活动症 |

## gi（31）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 上消化道出血 | 食管胃底静脉曲张破裂出血 | `ugib_variceal` | EGVB、variceal bleeding、静脉曲张性上消化道出血 |
| 上消化道出血 | 消化性溃疡出血 | `ugib_peptic` | peptic ulcer bleeding、PUD bleeding、胃十二指肠溃疡出血 |
| 肝硬化及其并发症 | 肝硬化腹水 | `cirr_ascites` | 腹水、ascites、肝性腹水 |
| 肝硬化及其并发症 | 肝性脑病 | `cirr_he` | HE、hepatic encephalopathy、肝性昏迷 |
| 肝硬化及其并发症 | 自发性细菌性腹膜炎 | `cirr_sbp` | SBP、spontaneous bacterial peritonitis、自发性腹膜炎 |
| 胰腺疾病 | 急性胰腺炎 | `ap_acute` | AP、acute pancreatitis、急性胰腺炎症 |
| 胰腺疾病 | 高甘油三酯性胰腺炎 | `ap_htg` | HTG-AP、hypertriglyceridemia pancreatitis、高脂血症性胰腺炎 |
| 炎症性肠病 | 溃疡性结肠炎 | `uc` | UC、ulcerative colitis、慢性非特异性溃疡性结肠炎 |
| 炎症性肠病 | 克罗恩病 | `cd` | CD、Crohn's disease、节段性肠炎 |
| 其他肝病 | 药物性肝损伤 | `dili` | DILI、drug-induced liver injury、药物性肝炎 |
| 其他肝病 | 慢性乙型肝炎 | `hbv` | CHB、chronic hepatitis B、慢乙肝 |
| 上消化道与功能性肠病 | 胃食管反流病 | `gi_gerd` | GERD、Gastroesophageal reflux disease、反流性食管炎 |
| 上消化道与功能性肠病 | 慢性胃炎 | `gi_gastritis` | Chronic gastritis、慢性萎缩性胃炎、CAG |
| 上消化道与功能性肠病 | 幽门螺杆菌感染 | `gi_hp` | Hp 感染、Helicobacter pylori infection、幽门螺杆菌 |
| 上消化道与功能性肠病 | 消化性溃疡（非出血） | `gi_pud` | Peptic ulcer disease、PUD、胃溃疡、十二指肠溃疡 |
| 上消化道与功能性肠病 | 功能性消化不良 | `gi_fd` | Functional dyspepsia、FD、非溃疡性消化不良 |
| 上消化道与功能性肠病 | 肠易激综合征 | `gi_ibs` | Irritable bowel syndrome、IBS、肠易激综合征 |
| 自身免疫性肝病与病毒性肝炎（丙型） | 自身免疫性肝病（AIH/PBC/PSC） | `gi_aih_pbc` | Autoimmune liver disease、AIH、PBC、PSC、自身免疫性肝炎、原发性胆汁性胆管炎 |
| 自身免疫性肝病与病毒性肝炎（丙型） | 丙型病毒性肝炎 | `gi_hcv` | Hepatitis C、HCV、丙型肝炎、丙肝 |
| 代谢与酒精性肝病及肝衰竭 | 代谢相关脂肪性肝病 | `gi_nafld` | MASLD、MAFLD、NAFLD、非酒精性脂肪性肝病、脂肪肝 |
| 代谢与酒精性肝病及肝衰竭 | 酒精性肝病 | `gi_ald` | Alcoholic liver disease、ALD、酒精性肝炎、酒精性肝硬化 |
| 代谢与酒精性肝病及肝衰竭 | 肝衰竭 | `gi_hepatic_failure` | Liver failure、急性肝衰竭、慢加急性肝衰竭、ACLF、ALF |
| 肠道其他疾病（肠结核、缺血性肠病、吸收不良） | 肠结核与结核性腹膜炎 | `gi_intestinal_tb` | Intestinal tuberculosis、Tuberculous peritonitis、肠痨、腹膜结核 |
| 肠道其他疾病（肠结核、缺血性肠病、吸收不良） | 缺血性肠病 | `gi_ischemic_bowel` | Ischemic bowel disease、Intestinal ischemia、结肠缺血、缺血性结肠炎、肠系膜缺血 |
| 肠道其他疾病（肠结核、缺血性肠病、吸收不良） | 吸收不良综合征（含乳糜泻） | `gi_malabsorption` | Malabsorption syndrome、Celiac disease、Coeliac disease、乳糜泻、麸质敏感性肠病、吸收不良 |
| 慢性胰腺炎与遗传性息肉病 | 慢性胰腺炎 | `gi_chronic_pancreatitis` | Chronic pancreatitis、CP、慢性复发性胰腺炎、胰腺慢性炎症 |
| 慢性胰腺炎与遗传性息肉病 | 家族性腺瘤性息肉病 | `gi_fap` | FAP、Familial adenomatous polyposis、家族性结肠息肉病、腺瘤性息肉病 |
| 急性胃炎 | 急性胃炎 | `gi_acute_gastritis` | Acute gastritis、Acute gastric mucosal lesion、AGML、急性胃黏膜病变、应激性溃疡、Stress-related mucosal disease |
| 其他病毒性肝炎 | 甲型病毒性肝炎 | `gi_hav` | Hepatitis A、甲肝、HAV 感染、传染性肝炎 |
| 其他病毒性肝炎 | 丁型病毒性肝炎 | `gi_hdv` | Hepatitis D、丁肝、HDV 感染、Delta hepatitis、Hepatitis delta virus |
| 其他病毒性肝炎 | 戊型病毒性肝炎 | `gi_hev` | Hepatitis E、戊肝、HEV 感染、肠道传播的非甲非乙型肝炎 |

## heme（26）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 贫血 | 缺铁性贫血 | `ida` | IDA、Iron Deficiency Anemia |
| 贫血 | 巨幼细胞性贫血 | `ma` | Megaloblastic Anemia、维生素B12/叶酸缺乏性贫血 |
| 贫血 | 再生障碍性贫血 | `aa` | AA、再障、Aplastic Anemia |
| 血液肿瘤 | 急性髓系白血病 | `aml` | AML、急髓、Acute Myeloid Leukemia |
| 血液肿瘤 | 慢性髓性白血病 | `cml` | CML、慢粒、Chronic Myeloid Leukemia |
| 血液肿瘤 | 多发性骨髓瘤 | `mm` | MM、骨髓瘤、Multiple Myeloma |
| 血液肿瘤 | 淋巴瘤 | `lymphoma` | Lymphoma、霍奇金淋巴瘤、非霍奇金淋巴瘤、HL、NHL |
| 止血与血栓 | 免疫性血小板减少症 | `itp` | ITP、特发性血小板减少性紫癜、Immune Thrombocytopenia |
| 止血与血栓 | 弥散性血管内凝血 | `dic` | DIC、弥漫性血管内凝血、Disseminated Intravascular Coagulation |
| 止血与血栓 | 血栓性微血管病（含 TTP） | `ttp` | TMA、TTP、血栓性血小板减少性紫癜、Thrombotic Thrombocytopenic Purpura、HUS |
| 其他贫血 | 溶血性贫血（总论） | `he_hemolytic` | Hemolytic Anemia、溶血性贫血、HA |
| 其他贫血 | G6PD 缺乏症与遗传性球形红细胞增多症 | `he_hs` | G6PD Deficiency、Hereditary Spherocytosis、蚕豆病、HS |
| 其他贫血 | 自身免疫性溶血性贫血 | `he_aiha` | AIHA、Autoimmune Hemolytic Anemia、温抗体型自身免疫性溶血性贫血 |
| 其他贫血 | 地中海贫血 | `he_thal` | Thalassemia、珠蛋白生成障碍性贫血、海洋性贫血、地贫 |
| 骨髓增殖与淋巴 | 骨髓增生异常综合征 | `he_mds` | MDS、Myelodysplastic Syndromes、骨髓增生异常综合征 |
| 骨髓增殖与淋巴 | 急性淋巴细胞白血病 | `he_all` | ALL、Acute Lymphoblastic Leukemia、急性淋巴细胞性白血病 |
| 骨髓增殖与淋巴 | 霍奇金淋巴瘤 | `he_hl` | Hodgkin Lymphoma、HL、霍奇金病 |
| 骨髓增殖与淋巴 | 真性红细胞增多症与原发性血小板增多症 | `he_mpn` | Polycythemia Vera、Essential Thrombocythemia、PV、ET、骨髓增殖性肿瘤 |
| 白血病与骨髓衰竭 | 急性早幼粒细胞白血病 | `he_apl` | Acute Promyelocytic Leukemia、APL、M3 型白血病、PML-RARA |
| 白血病与骨髓衰竭 | 慢性淋巴细胞白血病 | `he_cll` | Chronic Lymphocytic Leukemia、CLL、慢性淋巴细胞白血病/小淋巴细胞淋巴瘤 |
| 白血病与骨髓衰竭 | 阵发性睡眠性血红蛋白尿 | `he_pnh` | Paroxysmal Nocturnal Hemoglobinuria、PNH、阵发性睡眠性血红蛋白尿症 |
| 遗传性凝血病与粒细胞疾病 | 血友病 | `he_hemophilia` | Hemophilia、血友病 A、血友病 B、因子 VIII 缺乏、因子 IX 缺乏 |
| 遗传性凝血病与粒细胞疾病 | 血管性血友病 | `he_vwd` | von Willebrand Disease、vWD、血管性血友病因子缺乏 |
| 遗传性凝血病与粒细胞疾病 | 粒细胞缺乏症 | `he_agranulocytosis` | Agranulocytosis、中性粒细胞缺乏症、Febrile Neutropenia、粒缺伴发热 |
| 骨髓增殖性肿瘤（补充） | 原发性骨髓纤维化 | `he_pmf` | Primary myelofibrosis、PMF、骨髓纤维化、原发性骨髓纤维化症、Myelofibrosis |
| 输血与输血反应 | 输血与输血反应 | `he_transfusion` | Blood transfusion、Transfusion reaction、成分输血、输血不良反应、Transfusion medicine |

## id（12）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 脓毒症与感染 | 脓毒症与脓毒性休克 | `id_sepsis` | Sepsis、Septic shock、脓毒血症、感染性休克 |
| 脓毒症与感染 | 发热待查（不明原因发热 FUO） | `id_fuo` | FUO、Fever of Unknown Origin、不明原因发热 |
| 病毒与耐药菌 | 慢性乙型肝炎 | `id_hbv` | CHB、Chronic Hepatitis B、慢乙肝 |
| 病毒与耐药菌 | 流行性感冒与新型冠状病毒感染 | `id_flu` | Influenza、流感、COVID-19、新冠感染、SARS-CoV-2 |
| 病毒与耐药菌 | 肺结核 | `id_tb` | Tuberculosis、TB、肺痨 |
| 病毒与耐药菌 | 碳青霉烯耐药菌感染 | `id_crab` | CRE、CRAB、CRPA、碳青霉烯耐药肠杆菌目细菌、耐碳青霉烯类肺炎克雷伯菌 |
| 中枢与皮肤软组织感染 | 细菌性脑膜炎 | `id_meningitis` | Bacterial meningitis、化脓性脑膜炎、急性细菌性脑膜炎 |
| 中枢与皮肤软组织感染 | 病毒性脑炎 | `id_encephalitis` | Viral encephalitis、单纯疱疹病毒性脑炎、HSV encephalitis、乙型脑炎 |
| 中枢与皮肤软组织感染 | 皮肤软组织感染与坏死性筋膜炎 | `id_ssti` | SSTI、Skin and soft tissue infection、蜂窝织炎、坏死性筋膜炎、Necrotizing fasciitis |
| 人畜共患与地方性感染 | 恙虫病（丛林斑疹伤寒） | `id_scrub` | Scrub typhus、Tsutsugamushi disease、丛林斑疹伤寒 |
| 人畜共患与地方性感染 | 布氏杆菌病（布鲁菌病） | `id_brucella` | Brucellosis、波状热、马尔他热、波浪热 |
| 人畜共患与地方性感染 | 钩端螺旋体病 | `id_lepto` | Leptospirosis、钩体病、Weil 病、稻田热 |

## neuro（36）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 脑血管病 | 急性脑梗死 | `stk_ischemic` | 急性缺血性卒中、AIS、脑梗死、缺血性脑卒中 |
| 脑血管病 | 脑出血 | `stk_ich` | 自发性脑出血、ICH、脑溢血、Intracerebral Hemorrhage |
| 脑血管病 | 蛛网膜下腔出血 | `stk_sah` | SAH、Subarachnoid Hemorrhage、原发性蛛网膜下腔出血 |
| 脑血管病 | 短暂性脑缺血发作 | `stk_tia` | TIA、Transient Ischemic Attack、一过性脑缺血发作 |
| 癫痫 | 全面强直阵挛发作 | `epi_general` | GTCS、大发作、Generalized Tonic-Clonic Seizure |
| 癫痫 | 癫痫持续状态 | `epi_se` | Status Epilepticus、SE、惊厥性癫痫持续状态 |
| 神经变性病 | 帕金森病 | `pd` | PD、Parkinson's Disease、震颤麻痹 |
| 神经变性病 | 阿尔茨海默病 | `ad` | AD、Alzheimer's Disease、老年性痴呆 |
| 其他神经免疫与神经肌病 | 吉兰-巴雷综合征 | `gb` | GBS、Guillain-Barré Syndrome、格林-巴利综合征、急性炎症性脱髓鞘性多神经病 |
| 其他神经免疫与神经肌病 | 重症肌无力 | `mg` | MG、Myasthenia Gravis、重症肌无力 |
| 其他神经免疫与神经肌病 | 多发性硬化 | `ms` | MS、Multiple Sclerosis、多发性硬化症 |
| 头痛与痴呆 | 偏头痛 | `ne_migraine` | Migraine、有先兆偏头痛、无先兆偏头痛 |
| 头痛与痴呆 | 紧张型头痛与丛集性头痛 | `ne_tension_cluster` | Tension-type Headache、TTH、Cluster Headache、CH |
| 头痛与痴呆 | 血管性痴呆与额颞叶痴呆 | `ne_vad` | Vascular Dementia、VaD、Frontotemporal Dementia、FTD |
| 头痛与痴呆 | 路易体痴呆 | `ne_dlb` | Dementia with Lewy Bodies、DLB |
| 中枢感染与脊髓疾病 | 病毒性脑炎（含单纯疱疹病毒脑炎） | `ne_viral_enceph` | Viral Encephalitis、Herpes Simplex Encephalitis、HSE、HSV 脑炎 |
| 中枢感染与脊髓疾病 | 结核性脑膜炎 | `ne_tb_meningitis` | Tuberculous Meningitis、TBM、结脑 |
| 中枢感染与脊髓疾病 | 隐球菌脑膜炎 | `ne_cryptococcal` | Cryptococcal Meningitis、CM、新型隐球菌脑膜炎 |
| 中枢感染与脊髓疾病 | 脊髓炎与脊髓压迫症 | `ne_myelitis` | Myelitis、Transverse Myelitis、Spinal Cord Compression、脊髓压迫症 |
| 中枢感染与脊髓疾病 | 视神经脊髓炎谱系疾病 | `ne_nmosd` | Neuromyelitis Optica Spectrum Disorder、NMOSD、NMO、Devic 病 |
| 神经变性与遗传病 | 帕金森叠加综合征（MSA/PSP/CBD） | `ne_parkinson_plus` | Parkinson-plus、多系统萎缩、MSA、进行性核上性麻痹、PSP、皮质基底节变性、CBD |
| 神经变性与遗传病 | 运动神经元病（肌萎缩侧索硬化） | `ne_als` | ALS、运动神经元病、渐冻症、Motor Neuron Disease |
| 神经变性与遗传病 | 亨廷顿病 | `ne_huntington` | Huntington disease、HD、亨廷顿舞蹈病、大舞蹈病 |
| 神经变性与遗传病 | 肝豆状核变性（Wilson 病） | `ne_wilson` | Wilson disease、WD、肝豆状核变性、Wilson 病、铜代谢障碍 |
| 神经变性与遗传病 | 遗传性共济失调 | `ne_ataxia` | Hereditary ataxia、脊髓小脑性共济失调、SCA、Friedreich 共济失调、FRDA |
| 免疫周围神经与肌病 | 急性播散性脑脊髓炎 | `ne_adem` | ADEM、Acute Disseminated Encephalomyelitis、感染后脑脊髓炎 |
| 免疫周围神经与肌病 | 慢性炎性脱髓鞘性多发性神经病 | `ne_cidp` | CIDP、Chronic Inflammatory Demyelinating Polyneuropathy、慢性吉兰-巴雷综合征 |
| 免疫周围神经与肌病 | 糖尿病性周围神经病 | `ne_dpn` | DPN、Diabetic Peripheral Neuropathy、糖尿病周围神经病变、痛性糖尿病神经病 |
| 免疫周围神经与肌病 | 周期性瘫痪（低钾型/正常钾型） | `ne_periodic_paralysis` | Periodic paralysis、低钾性周期性瘫痪、正常血钾型周期性瘫痪、家族性周期性麻痹 |
| 免疫周围神经与肌病 | 自主神经疾病（体位性低血压） | `ne_dysautonomia` | Autonomic neuropathy、体位性低血压、Orthostatic hypotension、自主神经功能不全 |
| 脑血管病（补充） | 颅内静脉窦血栓 | `stk_cvst` | CVST、Cerebral Venous Sinus Thrombosis、颅内静脉窦血栓形成、脑静脉窦血栓、颅内静脉系统血栓形成 |
| 继发性头痛 | 药物过度使用性头痛 | `ne_moh` | MOH、Medication Overuse Headache、药物过度使用性头痛、止痛药反跳性头痛、药物滥用性头痛 |
| 中枢神经系统感染（补充） | 神经梅毒 | `ne_neurosyphilis` | Neurosyphilis、麻痹性痴呆、脊髓痨、General paresis、Tabes dorsalis |
| 中枢神经系统感染（补充） | 朊蛋白病 | `ne_prion` | Prion disease、Creutzfeldt-Jakob disease、CJD、克雅氏病、克-雅病、皮质-纹状体-脊髓变性 |
| 脊髓疾病（补充） | 亚急性联合变性 | `ne_scd` | Subacute Combined Degeneration、SCD、脊髓亚急性联合变性、维生素 B12 缺乏性脊髓病、亚急性脊髓联合变性 |
| 肌病 | 进行性肌营养不良 | `ne_muscular_dystrophy` | Duchenne muscular dystrophy、DMD、Becker muscular dystrophy、BMD、杜氏肌营养不良、假肥大型肌营养不良、进行性假肥大性肌营养不良 |

## nsurg（23）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 颅脑创伤 | 急性硬膜外血肿 | `ns_edh` | 急性硬脑膜外血肿、Epidural Hematoma、EDH、AEDH |
| 颅脑创伤 | 慢性硬膜下血肿 | `ns_sdh` | 慢性硬脑膜下血肿、CSDH、Chronic Subdural Hematoma |
| 颅脑创伤 | 重型颅脑损伤 | `ns_tbi` | 重型创伤性脑损伤、Severe TBI、sTBI、重度颅脑损伤 |
| 脑血管与肿瘤 | 颅内动脉瘤与蛛网膜下腔出血 | `ns_aneurysm` | 颅内动脉瘤破裂、蛛网膜下腔出血、SAH、aSAH、Intracranial Aneurysm |
| 脑血管与肿瘤 | 脑胶质瘤 | `ns_glioma` | 胶质瘤、神经胶质瘤、Glioma、高级别胶质瘤、GBM |
| 脑血管与肿瘤 | 脑膜瘤 | `ns_meningioma` | Meningioma、良性脑膜瘤、脑膜瘤（WHO 1 级） |
| 脊柱神经外科 | 脊髓损伤 | `ns_sci` | Spinal Cord Injury、SCI、创伤性脊髓损伤、脊髓损伤（ASIA 分级） |
| 脊柱神经外科 | 颈神经根病与脊髓型颈椎病 | `ns_csm` | Cervical Radiculopathy、Cervical Spondylotic Myelopathy、CSM、颈神经根病、脊髓型颈椎病 |
| 脊柱神经外科 | 脊髓空洞与枕大孔畸形 | `ns_syrinx` | 脊髓空洞症、Syringomyelia、Chiari 畸形、小脑扁桃体下疝畸形、枕大孔区畸形 |
| 其他神经外科疾病 | 脑积水 | `ns_hydrocephalus` | Hydrocephalus、梗阻性脑积水、交通性脑积水、正常压力脑积水、NPH |
| 其他神经外科疾病 | 三叉神经痛 | `ns_trigeminal` | 原发性三叉神经痛、Trigeminal Neuralgia、TN、痛性抽搐 |
| 其他神经外科疾病 | 慢性硬膜下血肿复发处理 | `ns_chiari` | 复发性慢性硬膜下血肿、Recurrent Chronic Subdural Hematoma、rCSDH、CSDH 复发 |
| 颅内肿瘤（垂体、听神经、颅咽管、转移瘤） | 垂体腺瘤 | `ns_pituitary` | Pituitary Adenoma、垂体瘤、泌乳素瘤 Prolactinoma、生长激素瘤 GH Adenoma、ACTH 瘤 |
| 颅内肿瘤（垂体、听神经、颅咽管、转移瘤） | 听神经瘤（前庭神经鞘瘤） | `ns_acoustic` | Vestibular Schwannoma、Acoustic Neuroma、前庭神经鞘瘤 |
| 颅内肿瘤（垂体、听神经、颅咽管、转移瘤） | 颅咽管瘤 | `ns_craniopharyngioma` | Craniopharyngioma、牙釉质型颅咽管瘤、乳头型颅咽管瘤 |
| 颅内肿瘤（垂体、听神经、颅咽管、转移瘤） | 脑转移瘤 | `ns_brain_met` | Brain Metastases、BM、颅内转移瘤 |
| 脑血管与感染（海绵状血管瘤、烟雾病、脑脓肿、面肌痉挛） | 海绵状血管瘤 | `ns_cavernoma` | Cavernous Malformation、Cavernoma、海绵状血管畸形、CCM |
| 脑血管与感染（海绵状血管瘤、烟雾病、脑脓肿、面肌痉挛） | 烟雾病 | `ns_moyamoya` | Moyamoya Disease、MMD、Willis 环自发性闭塞 |
| 脑血管与感染（海绵状血管瘤、烟雾病、脑脓肿、面肌痉挛） | 脑脓肿 | `ns_brain_abscess` | Brain Abscess、化脓性脑脓肿、颅内脓肿 |
| 脑血管与感染（海绵状血管瘤、烟雾病、脑脓肿、面肌痉挛） | 面肌痉挛 | `ns_hemifacial` | Hemifacial Spasm、HFS、半面痉挛 |
| 脑血管畸形 | 脑动静脉畸形 | `ns_avm` | AVM、Brain arteriovenous malformation、脑血管畸形、脑动静脉畸形 |
| 颅内压增高与脑疝 | 颅内压增高与脑疝 | `ns_ich_herniation` | Intracranial hypertension、Increased ICP、Brain herniation、颅内高压、小脑幕切迹疝、枕大孔疝、颞叶钩回疝 |
| 先天性畸形 | 颅裂与脊柱裂 | `ns_neural_tube` | Neural tube defects、NTD、Spina bifida、脊髓脊膜膨出、Myelomeningocele、颅裂、脑膜膨出、Encephalocele |

## obgyn（18）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 产科急症 | 产后出血 | `ob_pph` | PPH、Postpartum Hemorrhage |
| 产科急症 | 子痫前期与子痫 | `ob_preecl` | Preeclampsia、Eclampsia、妊娠期高血压疾病 |
| 产科急症 | 胎盘早剥 | `ob_abruption` | Placental Abruption、Abruptio Placentae |
| 妊娠常见合并症与异常 | 妊娠期糖尿病 | `ob_gdm` | GDM、Gestational Diabetes Mellitus |
| 妊娠常见合并症与异常 | 异位妊娠 | `ob_ectopic` | Ectopic Pregnancy、宫外孕 |
| 妇科肿瘤 | 子宫颈癌 | `ob_cervical` | Cervical Cancer、宫颈癌 |
| 妇科肿瘤 | 子宫内膜癌 | `ob_endo_ca` | Endometrial Cancer、子宫内膜样腺癌 |
| 妇科肿瘤 | 卵巢肿瘤 | `ob_ovarian` | Ovarian Tumor、Ovarian Cancer、卵巢癌 |
| 妇科良性疾病 | 子宫肌瘤 | `ob_fibroid` | Uterine Fibroid、Leiomyoma、子宫平滑肌瘤 |
| 妇科良性疾病 | 子宫内膜异位症 | `ob_endo` | Endometriosis、内异症、巧克力囊肿 |
| 妊娠期高血压疾病与产科其他 | 妊娠期高血压与慢性高血压 | `ob_gh` | Gestational Hypertension、Chronic Hypertension in Pregnancy |
| 妊娠期高血压疾病与产科其他 | 妊娠期肝内胆汁淤积症 | `ob_icp` | ICP、Intrahepatic Cholestasis of Pregnancy |
| 妊娠期高血压疾病与产科其他 | 胎膜早破与早产 | `ob_prom` | PROM、PPROM、Preterm Labor |
| 妊娠期高血压疾病与产科其他 | 晚期产后出血与胎盘植入 | `ob_pph_late` | Late Postpartum Hemorrhage、Placenta Accreta Spectrum、PAS |
| 妇科其他 | 异常子宫出血 | `ob_aub` | AUB、Abnormal Uterine Bleeding、PALM-COEIN |
| 妇科其他 | 盆腔炎性疾病 | `ob_pid` | PID、Pelvic Inflammatory Disease、急性盆腔炎 |
| 妇科其他 | 宫颈上皮内瘤变与 HPV 感染 | `ob_cin` | CIN、Cervical Intraepithelial Neoplasia、宫颈癌前病变 |
| 妇科内分泌与代谢 | 多囊卵巢综合征 | `ob_pcos` | PCOS、Polycystic ovary syndrome、多囊卵巢、Stein-Leventhal 综合征 |

## onco（18）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 胸部肿瘤 | 非小细胞肺癌 | `on_lung_nsclc` | NSCLC、肺癌、肺腺癌、肺鳞癌、驱动基因阳性肺癌 |
| 胸部肿瘤 | 小细胞肺癌 | `on_lung_sclc` | SCLC、小细胞癌、局限期小细胞肺癌、广泛期小细胞肺癌 |
| 胸部肿瘤 | 食管癌 | `on_esoph` | 食管鳞癌、ESCC、食管腺癌、食道癌 |
| 消化肿瘤 | 胃癌 | `on_gastric` | 胃腺癌、胃部恶性肿瘤、印戒细胞癌 |
| 消化肿瘤 | 结直肠癌 | `on_crc` | CRC、大肠癌、结肠癌、直肠癌 |
| 消化肿瘤 | 肝细胞癌 | `on_hcc` | HCC、原发性肝癌、肝癌 |
| 肿瘤急症与支持 | 肿瘤溶解综合征 | `on_tls` | TLS、Tumor Lysis Syndrome、急性肿瘤溶解综合征 |
| 肿瘤急症与支持 | 上腔静脉综合征 | `on_svc` | SVCS、Superior Vena Cava Syndrome、上腔静脉压迫综合征 |
| 肿瘤急症与支持 | 癌性疼痛（癌痛规范化治疗） | `on_pain` | 癌痛、Cancer Pain、肿瘤疼痛规范化诊疗 |
| 其他常见实体瘤 | 乳腺癌 | `on_breast_ca` | Breast Cancer、乳腺恶性肿瘤、Luminal 型乳腺癌、三阴性乳腺癌、HER2 阳性乳腺癌 |
| 其他常见实体瘤 | 胰腺癌 | `on_pancreatic` | Pancreatic Cancer、胰腺导管腺癌、PDAC |
| 其他常见实体瘤 | 前列腺癌 | `on_prostate` | Prostate Cancer、前列腺腺癌、转移性前列腺癌、去势抵抗性前列腺癌、CRPC |
| 其他常见实体瘤 | 卵巢癌 | `on_ovarian` | Ovarian Cancer、上皮性卵巢癌、输卵管癌、原发性腹膜癌 |
| 其他常见实体瘤 | 子宫颈癌 | `on_cervical` | Cervical Cancer、宫颈癌、宫颈鳞癌、宫颈癌前病变 |
| 肿瘤支持与并发症 | 粒细胞缺乏伴发热 | `on_neutropenic_fever` | FN、Febrile Neutropenia、粒缺伴发热、中性粒细胞减少性发热 |
| 肿瘤支持与并发症 | 恶性胸腔积液与腹水 | `on_malig_effusion` | Malignant Pleural Effusion、Malignant Ascites、MPE、恶性胸水、癌性腹水 |
| 肿瘤支持与并发症 | 骨转移与骨相关事件 | `on_bone_met` | Bone Metastasis、SREs、骨转移、骨相关事件、骨改良药物 |
| 肿瘤支持与并发症 | 免疫相关不良反应 | `on_immunotherapy_tox` | irAE、Immune-Related Adverse Events、免疫检查点抑制剂不良反应、免疫性甲状腺炎、免疫性肺炎、免疫性结肠炎、免疫性心肌炎 |

## ortho（46）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 骨折 | 股骨颈骨折 | `or_femur_neck` | Femoral Neck Fracture、FNF、股骨头下骨折、髋部骨折 |
| 骨折 | 股骨转子间骨折 | `or_intertroch` | Intertrochanteric Fracture、ITF、转子间骨折、股骨粗隆间骨折 |
| 骨折 | 胫腓骨骨折 | `or_tibial` | 胫骨干骨折、Tibial Shaft Fracture、胫骨骨折、开放性胫腓骨骨折 |
| 脊柱 | 腰椎间盘突出症 | `or_ldh` | Lumbar Disc Herniation、LDH、腰椎间盘突出、腰突症 |
| 脊柱 | 腰椎管狭窄症 | `or_stenosis` | 腰椎椎管狭窄、Lumbar Spinal Stenosis、LSS、退变性椎管狭窄 |
| 脊柱 | 骨质疏松性椎体压缩骨折 | `or_ovcf` | OVCF、Osteoporotic Vertebral Compression Fracture、椎体压缩骨折、脆性骨折 |
| 关节 | 膝骨关节炎（膝关节骨性关节炎） | `or_knee_oa` | Knee Osteoarthritis、KOA、膝关节骨关节炎、退行性膝关节病 |
| 关节 | 化脓性关节炎 | `or_septic_arthritis` | Suppurative Arthritis、Septic Arthritis、细菌性关节炎、感染性关节炎 |
| 运动与感染 | 前交叉韧带损伤（ACL 损伤） | `or_acl` | ACL Tear、Anterior Cruciate Ligament Injury、前交叉韧带断裂、膝关节不稳定 |
| 运动与感染 | 骨髓炎 | `or_osteomyelitis` | Osteomyelitis、急性血源性骨髓炎、慢性骨髓炎、骨感染 |
| 运动与感染 | 骨筋膜室综合征 | `or_compartment` | Compartment Syndrome、ACS、急性骨筋膜室综合征、筋膜间隙综合征 |
| 其他部位骨折与脱位 | 桡骨远端骨折 | `or_distal_radius` | Colles 骨折、Smith 骨折、Barton 骨折、Distal Radius Fracture、DRF |
| 其他部位骨折与脱位 | 肱骨近端与肱骨干骨折 | `or_humerus` | Proximal Humerus Fracture、Humeral Shaft Fracture、肱骨外科颈骨折、Holstein-Lewis 骨折 |
| 其他部位骨折与脱位 | 踝部骨折 | `or_ankle` | 踝关节骨折、Ankle Fracture、Lauge-Hansen 分型、Danis-Weber 分型 |
| 其他部位骨折与脱位 | 骨盆与髋臼骨折 | `or_pelvis` | Pelvic Fracture、Acetabular Fracture、骨盆环骨折、Tile 分型、Judet-Letournel 分型 |
| 其他部位骨折与脱位 | 关节脱位 | `or_dislocation` | 肩关节脱位、肘关节脱位、髋关节脱位、Joint Dislocation、Shoulder Dislocation |
| 骨病与骨肿瘤 | 股骨头坏死 | `or_onfh` | ONFH、Osteonecrosis of the Femoral Head、股骨头缺血性坏死、AVN |
| 骨病与骨肿瘤 | 骨肿瘤总论与骨肉瘤 | `or_bone_tumor` | Osteosarcoma、骨肉瘤、Enneking 分期、Bone Tumor、原发性恶性骨肿瘤 |
| 骨病与骨肿瘤 | 骨质疏松性骨折综合管理 | `or_osteoporosis_fx` | 脆性骨折、Osteoporotic Fracture、FLS、骨折联络服务、髋部脆性骨折 |
| 骨病与骨肿瘤 | 发育性髋关节发育不良 | `or_ddh` | DDH、Developmental Dysplasia of the Hip、先天性髋关节脱位、CDH |
| 上肢骨折与脱位 | 锁骨骨折 | `or_clavicle` | Clavicle Fracture、锁骨中段骨折 |
| 上肢骨折与脱位 | 肱骨近端骨折 | `or_humeral_proximal` | Proximal Humerus Fracture、PHF、Neer 分型 |
| 上肢骨折与脱位 | 肱骨干骨折 | `or_humeral_shaft` | Humeral Shaft Fracture、桡神经损伤相关骨折 |
| 上肢骨折与脱位 | 肱骨髁上骨折 | `or_supracondylar` | Supracondylar Fracture、Gartland 分型、儿童肘部骨折 |
| 上肢骨折与脱位 | 尺桡骨干骨折（含孟氏与盖氏损伤） | `or_forearm_fx` | Forearm Fracture、Monteggia Fracture、Galeazzi Fracture、孟氏骨折、盖氏损伤 |
| 上肢骨折与脱位 | 腕舟骨骨折 | `or_scaphoid` | Scaphoid Fracture、舟状骨骨折、腕骨骨折 |
| 下肢与骨盆骨折 | 股骨干骨折 | `or_femur_shaft` | Femoral Shaft Fracture、股骨干骨折 |
| 下肢与骨盆骨折 | 髌骨骨折 | `or_patella` | Patella Fracture、膝盖骨骨折 |
| 下肢与骨盆骨折 | 胫骨平台骨折 | `or_tibial_plateau` | Tibial Plateau Fracture、Schatzker 分型 |
| 下肢与骨盆骨折 | 踝部骨折 | `or_ankle_fx` | Ankle Fracture、踝关节骨折、Lauge-Hansen 分型、Danis-Weber 分型 |
| 下肢与骨盆骨折 | 跟骨骨折 | `or_calcaneus` | Calcaneus Fracture、跟骨骨折、Böhler 角 |
| 下肢与骨盆骨折 | 骨盆骨折 | `or_pelvic_fx` | Pelvic Fracture、骨盆环骨折、Tile 分型、血流动力学不稳定骨盆骨折 |
| 手外、软组织与骨肿瘤 | 手外伤与断指再植 | `or_hand_injury` | Hand Injury、Finger Replantation、断指再植、手部开放性损伤 |
| 手外、软组织与骨肿瘤 | 周围神经损伤 | `or_periph_nerve_inj` | Peripheral Nerve Injury、Seddon 分级、神经损伤 |
| 手外、软组织与骨肿瘤 | 腰椎滑脱 | `or_lumbar_spondylolisthesis` | Lumbar Spondylolisthesis、腰椎滑脱症、Meyerding 分度 |
| 手外、软组织与骨肿瘤 | 类风湿关节炎的外科治疗 | `or_ra_surgery` | Rheumatoid Arthritis Surgery、RA 外科治疗、滑膜切除术 |
| 手外、软组织与骨肿瘤 | 骨与关节结核 | `or_bone_tb` | Skeletal Tuberculosis、骨关节结核、脊柱结核、Pott 病 |
| 手外、软组织与骨肿瘤 | 骨巨细胞瘤 | `or_giant_cell_tumor` | Giant Cell Tumor of Bone、GCTB、骨巨细胞瘤、Campanacci 分级 |
| 手外、软组织与骨肿瘤 | 尤文肉瘤 | `or_ewing` | Ewing Sarcoma、ES、尤文氏肉瘤、小圆蓝细胞肿瘤 |
| 手外、软组织与骨肿瘤 | 半月板损伤 | `or_meniscus` | Meniscus Tear、Meniscal Injury、半月板撕裂 |
| 手外、软组织与骨肿瘤 | 肩袖损伤 | `or_rotator_cuff` | Rotator Cuff Tear、肩袖撕裂、肩袖损伤 |
| 脊柱骨折 | 脊柱骨折 | `or_spine_fx` | Spinal Fracture、Vertebral Fracture、Thoracolumbar Fracture、胸腰椎骨折、脊柱骨折脱位 |
| 脊柱与四肢畸形 | 脊柱侧凸 | `or_scoliosis` | Scoliosis、Adolescent Idiopathic Scoliosis、AIS、青少年特发性脊柱侧凸 |
| 脊柱与四肢畸形 | 先天性肌性斜颈 | `or_torticollis` | Congenital Muscular Torticollis、CMT、斜颈、胸锁乳突肌挛缩 |
| 脊柱与四肢畸形 | 先天性马蹄内翻足 | `or_clubfoot` | Congenital Talipes Equinovarus、CTEV、Clubfoot、马蹄足 |
| 良性骨肿瘤 | 骨软骨瘤 | `or_osteochondroma` | Osteochondroma、Exostosis、外生骨疣、遗传性多发性骨软骨瘤 |

## peds（19）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 感染与发热 | 儿童发热 | `ped_fever` | Fever in Children、发热待查 |
| 感染与发热 | 儿童肺炎 | `ped_pneumonia` | Pediatric Pneumonia、肺炎 |
| 感染与发热 | 手足口病 | `ped_hfmd` | HFMD、Hand-Foot-Mouth Disease、肠道病毒感染 |
| 消化与补液 | 儿童腹泻与口服补液 | `ped_diarrhea` | Acute Diarrhea、小儿腹泻病、急性胃肠炎 |
| 消化与补液 | 肠套叠 | `ped_intuss` | Intussusception、回结肠套叠 |
| 神经与新生儿 | 热性惊厥 | `ped_febrile_seizure` | Febrile Seizure、热性惊厥、高热惊厥 |
| 神经与新生儿 | 新生儿黄疸 | `ped_jaundice` | Neonatal Jaundice、Neonatal Hyperbilirubinemia、新生儿高胆红素血症 |
| 呼吸与其他 | 毛细支气管炎 | `ped_bronchiolitis` | Bronchiolitis、RSV 毛细支气管炎 |
| 呼吸与其他 | 儿童哮喘 | `ped_asthma` | Childhood Asthma、支气管哮喘 |
| 呼吸与其他 | 川崎病 | `ped_kawasaki` | Kawasaki Disease、KD、皮肤黏膜淋巴结综合征 |
| 新生儿疾病 | 新生儿呼吸窘迫综合征 | `ped_nrds` | Neonatal Respiratory Distress Syndrome、NRDS、肺透明膜病、HMD |
| 新生儿疾病 | 新生儿窒息与缺氧缺血性脑病 | `ped_asphyxia` | Neonatal Asphyxia、Hypoxic-Ischemic Encephalopathy、HIE |
| 新生儿疾病 | 新生儿溶血病与新生儿贫血 | `ped_nnj_hemo` | Hemolytic Disease of the Newborn、HDN、新生儿高胆红素血症 |
| 新生儿疾病 | 新生儿败血症 | `ped_sepsis_neonatal` | Neonatal Sepsis、早发型败血症、EOS、晚发型败血症、LOS |
| 营养与生长疾病 | 营养性缺铁性贫血 | `ped_ida` | Nutritional Iron Deficiency Anemia、IDA |
| 营养与生长疾病 | 维生素 D 缺乏性佝偻病与手足搐搦症 | `ped_rickets` | Rickets、Vitamin D Deficiency Rickets、维生素 D 缺乏性手足搐搦症 |
| 营养与生长疾病 | 儿童营养不良与生长迟缓 | `ped_malnutrition` | Protein-Energy Malnutrition、PEM、消瘦型、水肿型、kwashiorkor、marasmus |
| 营养与生长疾病 | 矮小症与性早熟 | `ped_short_stature` | Short Stature、Growth Hormone Deficiency、Precocious Puberty、中枢性性早熟 |
| 营养与生长疾病 | 过敏性紫癜（IgA 血管炎） | `ped_hsp` | Henoch-Schönlein Purpura、HSP、IgA Vasculitis、IgAV |

## psych（18）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 心境障碍 | 抑郁障碍 | `ps_depression` | Major Depressive Disorder、MDD、重性抑郁障碍 |
| 心境障碍 | 双相障碍 | `ps_bipolar` | Bipolar Disorder、双相情感障碍、躁郁症 |
| 精神病性与焦虑障碍 | 精神分裂症 | `ps_schizo` | Schizophrenia、精神分裂症 |
| 精神病性与焦虑障碍 | 广泛性焦虑障碍 | `ps_gad` | Generalized Anxiety Disorder、GAD、广泛性焦虑 |
| 精神科急症 | 谵妄 | `ps_delirium` | Delirium、急性意识模糊状态、谵妄状态 |
| 精神科急症 | 酒精戒断综合征 | `ps_withdrawal` | Alcohol Withdrawal Syndrome、AWS、震颤谵妄 |
| 焦虑与应激相关障碍 | 强迫症 | `ps_ocd` | OCD、Obsessive-Compulsive Disorder、强迫性障碍 |
| 焦虑与应激相关障碍 | 创伤后应激障碍 | `ps_ptsd` | PTSD、Post-Traumatic Stress Disorder、创伤后应激 |
| 焦虑与应激相关障碍 | 惊恐障碍 | `ps_panic` | Panic Disorder、Panic Attack、惊恐发作、广场恐怖 |
| 焦虑与应激相关障碍 | 社交焦虑障碍与特定恐怖症 | `ps_social_anxiety` | Social Anxiety Disorder、SAD、社交焦虑症、Specific Phobia、特定恐怖症 |
| 焦虑与应激相关障碍 | 躯体形式障碍与疾病焦虑 | `ps_somatic` | Somatic Symptom Disorder、Illness Anxiety Disorder、Hypochondriasis、躯体症状障碍、疑病症 |
| 其他精神障碍 | 人格障碍(A/B/C 组与边缘型人格障碍) | `ps_personality` | Personality Disorder、边缘型人格障碍、BPD、Borderline Personality Disorder |
| 其他精神障碍 | 进食障碍(神经性厌食与神经性贪食) | `ps_eating` | Eating Disorders、神经性厌食、Anorexia Nervosa、AN、神经性贪食、Bulimia Nervosa、BN |
| 其他精神障碍 | 产后抑郁与产褥期精神病 | `ps_postpartum` | Postpartum Depression、PPD、产后抑郁、Postpartum Psychosis、产褥期精神病 |
| 其他精神障碍 | 注意力缺陷多动障碍(成人) | `ps_adhd` | ADHD、Adult ADHD、成人多动症、注意缺陷多动障碍 |
| 其他精神障碍 | 失眠障碍 | `ps_insomnia` | Insomnia Disorder、慢性失眠、失眠症 |
| 发育与分离障碍 | 精神发育迟滞与智力障碍 | `ps_mr` | Mental Retardation、Intellectual Disability、智力障碍、智能发育障碍 |
| 发育与分离障碍 | 分离（转换）性障碍 | `ps_dissociative` | Dissociative and Conversion Disorder、歇斯底里、癔症、Hysteria、转换障碍 |

## renal（22）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 慢性肾脏病 | 慢性肾脏病（诊断与分期管理） | `ckd_stage` | CKD、慢性肾衰竭、Chronic Kidney Disease |
| 慢性肾脏病 | 糖尿病肾病 | `ckd_dkd` | DKD、Diabetic Kidney Disease、糖尿病肾脏病 |
| 急性肾损伤 | 急性肾损伤 | `aki_aki` | AKI、急性肾衰竭、Acute Kidney Injury |
| 急性肾损伤 | 肝肾综合征 | `aki_hrs` | HRS、Hepatorenal Syndrome |
| 肾小球疾病 | IgA 肾病 | `gn_iga` | IgAN、Berger 病、IgA Nephropathy |
| 肾小球疾病 | 膜性肾病 | `gn_mn` | MN、Membranous Nephropathy |
| 肾小球疾病 | 微小病变型肾病 | `gn_mcd` | MCD、Minimal Change Disease、微小病变、脂性肾病 |
| 肾小球疾病 | 肾病综合征 | `gn_ns` | NS、Nephrotic Syndrome |
| 其他肾小球病 | 急性链球菌感染后肾小球肾炎 | `gn_agn` | 急性肾小球肾炎、APSGN、Acute Post-streptococcal Glomerulonephritis |
| 其他肾小球病 | 急进性肾小球肾炎 | `gn_rpgn` | 新月体性肾小球肾炎、RPíndice、RPGN、Rapidly Progressive Glomerulonephritis |
| 其他肾小球病 | 局灶节段性肾小球硬化 | `gn_fsgs` | FSGS、Focal Segmental Glomerulosclerosis |
| 其他肾小球病 | 膜增生性肾小球肾炎 | `gn_mpgn` | MPGN、系膜毛细血管性肾小球肾炎、膜性增生性肾小球肾炎、Membranoproliferative Glomerulonephritis |
| 肾其他疾病 | 常染色体显性多囊肾病 | `renal_pkd` | ADPKD、多囊肾、Autosomal Dominant Polycystic Kidney Disease |
| 肾其他疾病 | 尿路感染 | `renal_uti` | 急性肾盂肾炎、膀胱炎、UTI、Urinary Tract Infection、Acute Pyelonephritis |
| 肾其他疾病 | 肾小管酸中毒 | `renal_rta` | RTA、Renal Tubular Acidosis、远端肾小管酸中毒、近端肾小管酸中毒 |
| 肾其他疾病 | 梗阻性肾病与肾后性 AKI | `renal_obstruct` | 梗阻性肾病、肾后性急性肾损伤、Post-renal AKI、Obstructive Nephropathy |
| 继发性肾小球疾病 | 狼疮性肾炎 | `gn_lupus` | Lupus Nephritis、LN、狼疮肾炎 |
| 继发性肾小球疾病 | 紫癜性肾炎 | `gn_hspn` | Henoch-Schönlein Purpura Nephritis、HSPN、IgA 血管炎肾损害 |
| 继发性肾小球疾病 | 系膜增生性肾小球肾炎 | `gn_mesangial` | Mesangial Proliferative Glomerulonephritis、MsPGN、系膜增生性肾炎 |
| 肾小管间质与血管性肾病 | 慢性间质性肾炎 | `renal_ain` | Chronic Interstitial Nephritis、CIN、慢性肾小管间质性肾炎、药物性肾损害 |
| 肾小管间质与血管性肾病 | 高血压肾损害 | `renal_htn_nephrosclerosis` | Hypertensive Nephrosclerosis、良性小动脉性肾硬化、高血压肾病、Hypertensive Nephropathy |
| 血液净化 | 血液净化（血液透析与腹膜透析） | `renal_dialysis` | Hemodialysis、Peritoneal dialysis、HD、PD、血液透析、腹膜透析、维持性透析、肾脏替代治疗 |

## resp（41）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 肺栓塞 | 急性肺栓塞 | `pe_acute` | Acute PE、APE、肺血栓栓塞症 PTE |
| 肺栓塞 | 慢性血栓栓塞性肺动脉高压 | `pe_chronic` | CTEPH、慢性血栓栓塞性肺高血压 |
| 慢性气道疾病 | COPD 急性加重 | `copd_ae` | AECOPD、慢性阻塞性肺疾病急性加重 |
| 慢性气道疾病 | COPD 稳定期 | `copd_stable` | COPD、慢阻肺、慢性阻塞性肺疾病 |
| 慢性气道疾病 | 哮喘急性发作 | `asthma_ae` | Asthma exacerbation、哮喘急性加重 |
| 慢性气道疾病 | 哮喘长期管理 | `asthma_ctrl` | Asthma long-term management、慢性持续期哮喘、控制期哮喘 |
| 肺炎 | 社区获得性肺炎 | `cap_comm` | CAP、Community-acquired pneumonia |
| 肺炎 | 医院获得性肺炎 | `hap` | HAP、Hospital-acquired pneumonia、VAP（呼吸机相关肺炎） |
| 呼吸衰竭与 ARDS | I 型呼吸衰竭 | `arf_type1` | Type I respiratory failure、低氧性呼吸衰竭 |
| 呼吸衰竭与 ARDS | 急性呼吸窘迫综合征 | `ards` | ARDS、Acute Respiratory Distress Syndrome |
| 呼吸衰竭与 ARDS | 阻塞性睡眠呼吸暂停低通气综合征 | `osahs` | OSAHS、阻塞性睡眠呼吸暂停、OSA |
| 气道与感染性疾病 | 支气管扩张症 | `resp_bronchiectasis` | Bronchiectasis、支扩、支气管扩张 |
| 气道与感染性疾病 | 肺脓肿 | `resp_lung_abscess` | Lung Abscess、原发性肺脓肿 |
| 气道与感染性疾病 | 肺结核 | `resp_tb` | Pulmonary Tuberculosis、PTB、肺结核病 |
| 气道与感染性疾病 | 非结核分枝杆菌肺病 | `resp_ntm` | Nontuberculous Mycobacterial Lung Disease、NTM-PD、鸟-胞内分枝杆菌复合群肺病（MAC） |
| 气道与感染性疾病 | 肺真菌病（肺曲霉病与肺隐球菌病） | `resp_fungal` | Pulmonary Fungal Infection、肺曲霉病、肺隐球菌病、Invasive Pulmonary Aspergillosis |
| 间质性肺病与其他 | 特发性肺纤维化 | `ild_ipf` | Idiopathic Pulmonary Fibrosis、IPF、特发性间质性肺炎（IIP）之一 |
| 间质性肺病与其他 | 胸腔积液 | `ild_pleural_effusion` | Pleural Effusion、胸水、胸腔积液鉴别诊断 |
| 间质性肺病与其他 | 自发性气胸（内科处理视角） | `ild_pneumothorax_med` | Spontaneous Pneumothorax、气胸、原发性自发性气胸（PSP） |
| 间质性肺病与其他 | 结节病 | `ild_sarcoid` | Sarcoidosis、肺结节病 |
| 间质性肺病与其他 | 过敏性肺炎 | `ild_hypersensitivity` | Hypersensitivity Pneumonitis、HP、外源性过敏性肺泡炎（EAA） |
| 上呼吸道感染与职业性肺病 | 急性上呼吸道感染 | `resp_uri` | Acute Upper Respiratory Tract Infection、URI、普通感冒 |
| 上呼吸道感染与职业性肺病 | 急性气管支气管炎 | `resp_acute_bronchitis` | Acute Bronchitis、急性支气管炎 |
| 上呼吸道感染与职业性肺病 | 尘肺病（矽肺与煤工尘肺） | `resp_pneumoconiosis` | Pneumoconiosis、Silicosis、Coal Workers' Pneumoconiosis、矽肺、煤工尘肺 |
| 上呼吸道感染与职业性肺病 | 石棉肺 | `resp_asbestosis` | Asbestosis、石棉沉着病 |
| 肺炎的病原学类型 | 肺炎链球菌肺炎 | `resp_pneumococcus` | Pneumococcal pneumonia、大叶性肺炎、肺炎球菌肺炎 |
| 肺炎的病原学类型 | 葡萄球菌肺炎 | `resp_staph_pneumonia` | Staphylococcal pneumonia、金黄色葡萄球菌肺炎、MRSA 肺炎 |
| 肺炎的病原学类型 | 肺炎克雷伯菌肺炎 | `resp_klebsiella` | Klebsiella pneumoniae pneumonia、克雷伯菌肺炎、弗里德兰德杆菌肺炎 |
| 肺炎的病原学类型 | 肺炎支原体肺炎 | `resp_mycoplasma` | Mycoplasma pneumoniae pneumonia、MPP、原发性非典型肺炎 |
| 肺炎的病原学类型 | 病毒性肺炎 | `resp_viral_pneumonia` | Viral pneumonia、流感病毒肺炎、RSV 肺炎、CMV 肺炎 |
| 其他呼吸疾病 | 结核性胸膜炎 | `resp_tb_pleurisy` | Tuberculous pleurisy、结核性渗出性胸膜炎 |
| 其他呼吸疾病 | 慢性肺源性心脏病 | `resp_cor_pulmonale` | Chronic cor pulmonale、肺心病 |
| 其他呼吸疾病 | 呼吸调节异常与肥胖低通气 | `resp_hypoventilation` | Obesity hypoventilation syndrome、OHS、肥胖低通气综合征、肺泡低通气 |
| 非典型病原体肺炎 | 衣原体肺炎 | `resp_chlamydia` | Chlamydia pneumoniae Pneumonia、Psittacosis、鹦鹉热、肺炎衣原体肺炎 |
| 非典型病原体肺炎 | 军团菌肺炎 | `resp_legionella` | Legionnaires Disease、Legionella Pneumonia、军团病、嗜肺军团菌肺炎 |
| 特殊宿主与真菌肺炎 | 肺念珠菌病 | `resp_candida` | Pulmonary Candidiasis、念珠菌肺炎、侵袭性肺念珠菌病 |
| 特殊宿主与真菌肺炎 | 肺孢子菌肺炎 | `resp_pcp` | Pneumocystis Pneumonia、PCP、PJP、耶氏肺孢子菌肺炎 |
| 特殊宿主与真菌肺炎 | 免疫缺陷者肺炎 | `resp_immunodef_pneu` | Pneumonia in the Immunocompromised Host、免疫抑制宿主肺炎、粒缺伴肺炎 |
| 特殊宿主与真菌肺炎 | 肺寄生虫病 | `resp_parasitic` | Pulmonary Parasitosis、肺阿米巴病、肺血吸虫病、肺包虫病、肺吸虫病 |
| 其他间质性肺疾病 | 肺泡蛋白沉积症 | `ild_pap` | Pulmonary Alveolar Proteinosis、PAP、aPAP、肺泡蛋白沉积 |
| 胸膜肿瘤 | 胸膜间皮瘤 | `resp_mesothelioma` | Malignant Pleural Mesothelioma、MPM、恶性胸膜间皮瘤、Diffuse Malignant Pleural Mesothelioma |

## rheum（19）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 关节炎 | 类风湿关节炎 | `rh_ra` | Rheumatoid Arthritis、RA、类风关 |
| 关节炎 | 强直性脊柱炎 | `rh_as` | Ankylosing Spondylitis、AS、放射学阳性中轴型脊柱关节炎 |
| 结缔组织病 | 系统性红斑狼疮 | `rh_sle` | Systemic Lupus Erythematosus、SLE、红斑狼疮 |
| 结缔组织病 | 干燥综合征 | `rh_ss` | Sjögren's Syndrome、SS、舍格伦综合征 |
| 血管炎与肌病 | ANCA 相关血管炎 | `rh_anca` | ANCA-associated vasculitis、AAV、肉芽肿性多血管炎、GPA、显微镜下多血管炎、MPA、嗜酸性肉芽肿性多血管炎、EGPA |
| 血管炎与肌病 | 巨细胞动脉炎 | `rh_gca` | Giant Cell Arteritis、GCA、颞动脉炎、Temporal Arteritis |
| 血管炎与肌病 | 皮肌炎/多发性肌炎 | `rh_dm` | Dermatomyositis、Polymyositis、DM、PM、特发性炎性肌病、IIM |
| 血管炎与肌病 | 系统性硬化 | `rh_ssc` | Systemic Sclerosis、SSc、硬皮病、Scleroderma |
| 脊柱关节病与退行性关病 | 骨关节炎 | `rh_oa` | OA、Osteoarthritis、退行性关节病、骨性关节炎 |
| 脊柱关节病与退行性关病 | 银屑病关节炎 | `rh_psa` | PsA、Psoriatic Arthritis、银屑病性关节炎 |
| 脊柱关节病与退行性关病 | 反应性关节炎 | `rh_rea` | ReA、Reactive Arthritis、赖特综合征、Reiter 综合征 |
| 脊柱关节病与退行性关病 | 纤维肌痛 | `rh_fm` | Fibromyalgia、纤维肌痛综合征、FM |
| 其他结缔组织病与血管炎 | 混合性结缔组织病 | `rh_mctd` | MCTD、Mixed Connective Tissue Disease、Sharp 综合征 |
| 其他结缔组织病与血管炎 | 抗磷脂综合征 | `rh_aps` | APS、Antiphospholipid Syndrome、抗磷脂抗体综合征 |
| 其他结缔组织病与血管炎 | 白塞病 | `rh_behcet` | Behçet Disease、Behçet 综合征、贝赫切特病、BD |
| 其他结缔组织病与血管炎 | IgG4 相关性疾病 | `rh_igg4` | IgG4-RD、IgG4-Related Disease、IgG4 相关疾病 |
| 其他血管炎与自身炎症性疾病 | 结节性多动脉炎（PAN） | `rh_pan` | PAN、Polyarteritis nodosa、结节性动脉周围炎、经典结节性多动脉炎 |
| 其他血管炎与自身炎症性疾病 | 成人斯蒂尔病（AOSD） | `rh_aosd` | AOSD、Adult-onset Still disease、成人 Still 病、成人起病 Still 病、变应性亚败血症 |
| 复发性多软骨炎 | 复发性多软骨炎 | `rh_rp` | Relapsing polychondritis、RP、复发性多发性软骨炎、复发性软骨炎 |

## uro（19）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 结石与急症 | 尿路结石（肾/输尿管结石） | `ur_stone` | 泌尿系结石、肾结石、输尿管结石、Urolithiasis、肾绞痛 |
| 结石与急症 | 尿源性脓毒症 | `ur_sepsis` | 梗阻性肾盂肾炎、感染性肾积水、Urosepsis、梗阻性化脓性肾盂肾炎 |
| 前列腺疾病 | 良性前列腺增生 | `ur_bph` | BPH、前列腺增生、前列腺肥大、Benign Prostatic Hyperplasia、LUTS |
| 前列腺疾病 | 前列腺癌 | `ur_pca` | 前列腺腺癌、Prostate Cancer、PCa、Gleason 评分、ISUP 分级分组 |
| 泌尿肿瘤与感染 | 肾细胞癌 | `ur_rcc` | RCC、肾癌、肾透明细胞癌、Renal Cell Carcinoma |
| 泌尿肿瘤与感染 | 膀胱癌 | `ur_bca` | 膀胱尿路上皮癌、Bladder Cancer、Urothelial Carcinoma、非肌层浸润性膀胱癌 |
| 泌尿肿瘤与感染 | 复杂尿路感染 | `ur_uti` | 复杂性尿路感染、cUTI、复杂性尿感、导管相关尿路感染、Complicated UTI |
| 泌尿系感染与结核 | 肾结核（泌尿系结核） | `ur_renal_tb` | 泌尿系结核、肾结核、Renal Tuberculosis |
| 泌尿系感染与结核 | 附睾炎与睾丸炎 | `ur_epididymitis` | 急性附睾炎、附睾睾丸炎、Epididymitis、Orchitis |
| 泌尿系感染与结核 | 慢性前列腺炎与前列腺脓肿 | `ur_prostatitis` | 慢性前列腺炎、CP/CPPS、NIH-CPSI、前列腺脓肿 |
| 先天与功能泌尿 | 隐睾（睾丸未降） | `ur_cryptorchidism` | 隐睾、睾丸未降、Cryptorchidism、Undescended Testis |
| 先天与功能泌尿 | 尿道下裂与隐匿性阴茎 | `ur_hypospadias` | 尿道下裂、隐匿性阴茎、Hypospadias、Concealed Penis |
| 先天与功能泌尿 | 精索静脉曲张 | `ur_varicocele` | 精索静脉曲张、Varicocele |
| 先天与功能泌尿 | 睾丸肿瘤 | `ur_testis_tumor` | 睾丸生殖细胞肿瘤、Testicular Germ Cell Tumor、TGCT、精原细胞瘤 |
| 先天与功能泌尿 | 女性压力性尿失禁 | `ur_sui` | 压力性尿失禁、SUI、Stress Urinary Incontinence、TVT、TOT |
| 泌尿系统损伤与男性性功能 | 泌尿系统损伤（肾/输尿管/膀胱/尿道） | `ur_uro_trauma` | Renal trauma、Ureteral injury、Bladder rupture、Urethral injury、肾外伤、膀胱破裂、尿道断裂、后尿道损伤 |
| 泌尿系统损伤与男性性功能 | 男性性功能障碍与勃起功能障碍 | `ur_ed` | ED、Erectile dysfunction、勃起功能障碍、阴茎勃起障碍、PE、早泄 |
| 泌尿系畸形（补充） | 包茎 | `ur_phimosis` | Phimosis、包皮过长、嵌顿包茎、Paraphimosis、干燥性闭塞性龟头炎、BXO |
| 排尿功能障碍 | 神经源性膀胱 | `ur_neurogenic_bladder` | Neurogenic bladder、NB、神经源性下尿路功能障碍、逼尿肌括约肌协同失调、DSD |

## vascular（16）

| 大类 | 疾病 | id | 别名 |
|---|---|---|---|
| 主动脉疾病 | 腹主动脉瘤（AAA） | `vs_aaa` | Abdominal Aortic Aneurysm、AAA、腹主动脉瘤 |
| 主动脉疾病 | 主动脉夹层 | `vs_dissection` | Aortic Dissection、AD |
| 周围动脉与静脉 | 下肢动脉硬化闭塞症（ASO） | `vs_aso` | ASO、Peripheral Arterial Disease、PAD、LEAD、下肢 PAD |
| 周围动脉与静脉 | 急性肢体缺血 | `vs_ali` | Acute Limb Ischemia、ALI、急性下肢缺血、动脉栓塞/血栓形成 |
| 周围动脉与静脉 | 血栓后综合征 | `vs_dvt_chronic` | Post-Thrombotic Syndrome、PTS、深静脉血栓后遗症 |
| 颈动脉与静脉疾病 | 颈动脉狭窄 | `vas_carotid` | Carotid Artery Stenosis、CAS、颈动脉粥样硬化性狭窄 |
| 颈动脉与静脉疾病 | 下肢静脉曲张与慢性静脉功能不全（CVI） | `vas_varicose` | Varicose Veins、CVI、静脉曲张 |
| 颈动脉与静脉疾病 | 深静脉血栓（DVT） | `vas_tv` | Deep Vein Thrombosis、DVT、下肢深静脉血栓形成 |
| 通路与罕见血管病 | 血液透析通路建立与拥塞 | `vas_avf` | Arteriovenous Fistula、AVF、动静脉内瘘、透析通路功能障碍 |
| 通路与罕见血管病 | 血栓闭塞性脉管炎（Buerger 病） | `vas_tao` | Buerger Disease、Thromboangiitis Obliterans、TAO |
| 通路与罕见血管病 | 雷诺综合征与血管痉挛 | `vas_raynaud` | Raynaud's Phenomenon、Raynaud 现象、雷诺病 |
| 上肢、肠系膜与血管畸形 | 锁骨下动脉狭窄与上肢动脉闭塞 | `vas_subclavian` | Subclavian Artery Stenosis、Upper Limb Ischemia、锁骨下动脉盗血综合征 |
| 上肢、肠系膜与血管畸形 | 胸廓出口综合征 | `vas_tos` | Thoracic Outlet Syndrome、TOS、胸出口综合征、颈肋综合征 |
| 上肢、肠系膜与血管畸形 | 急性肠系膜缺血 | `vas_ami` | Acute Mesenteric Ischemia、AMI、肠系膜上动脉栓塞、急性肠系膜血管闭塞 |
| 上肢、肠系膜与血管畸形 | 血管瘤与血管畸形 | `vas_malformation` | Vascular Anomaly、Hemangioma、Vascular Malformation、ISSVA 分类 |
| 淋巴系统疾病 | 淋巴水肿 | `vas_lymphedema` | Lymphedema、原发性淋巴水肿、继发性淋巴水肿、Milroy 病、淋巴回流障碍 |

**合计 607 种**