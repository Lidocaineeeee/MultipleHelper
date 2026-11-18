/* ==========================================================================
   数据层：把各科室 JSON 装配成全局 DATA
   DATA = {
     departments: [...],
     calc:  { deptId: { items: [...] } },
     guide: { deptId: { categories: [...] } }
   }
   ========================================================================== */
window.DATA = {
  departments: window.__DEPARTMENTS__ || [],
  calc: window.__CALC__ || {},
  guide: window.__GUIDE__ || {}
};
