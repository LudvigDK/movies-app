(() => {
  if (window.__myInjectedV2) return; window.__myInjectedV2 = true;

  const onceKey = () => `__myInit_${location.origin}${location.pathname}${location.search}`;
  let t = 0;
  const debounce = (fn, ms=50) => (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };

  const init = () => {
    const key = onceKey();
    if (document[key]) return;
    document[key] = true;

    setInterval(() => {
      // Remove all scripts from 68s8.com
      document.querySelectorAll('script[src*="//68s8.com/"]').forEach(el => el.remove());
document.querySelector('script[id="adstag"]').remove();

      // Remove all divs with z-index > 1000
      document.querySelectorAll('div').forEach(el => {
        const style = window.getComputedStyle(el);
        const z = parseInt(style.zIndex, 10);
        if (!isNaN(z) && z > 1000) {
          el.remove();
        }
      });
    }, 100);
  };

  const rerun = debounce(init, 50);

  init();
  const ps = history.pushState, rs = history.replaceState;
  history.pushState = function(...a){ const r = ps.apply(this,a); dispatchEvent(new Event('pushstate')); return r; };
  history.replaceState = function(...a){ const r = rs.apply(this,a); dispatchEvent(new Event('replacestate')); return r; };
  addEventListener('popstate', rerun);
  addEventListener('pushstate', rerun);
  addEventListener('replacestate', rerun);
  new MutationObserver(() => rerun()).observe(document.documentElement, {childList:true, subtree:true});
})();
