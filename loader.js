/* חלונית הסבר "קיצור דרך למסך הבית" שנפתחת מעל דף הקורסים באתר talkwithkids.co.il.
   נטענת כקוד מותאם בוויקס. פועלת רק בדף /account/programs כשיש בכתובת shortcut=1 (הלחצן בשיעורים מוביל אליו).
   בנוסף מחליפה את האייקון והשם של הקיצור ללוגו של חן ול"התוכניות שלי", כדי שהקיצור יהיה של האתר ולא של דף ההסבר. */
(function () {
  try {
    if (window.top !== window.self) return;
    if (!/\/account\/programs/.test(location.pathname)) return;
    if (!/[?&]shortcut=1(&|$)/.test(location.search)) return;
    var BASE = 'https://hen-kalimian.github.io/talkwithkids-programs-shortcut/';
    var head = document.head || document.getElementsByTagName('head')[0];

    // האייקון והשם של הקיצור שיישמר במסך הבית
    var olds = document.querySelectorAll('link[rel="apple-touch-icon"],link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon-precomposed"]');
    for (var i = 0; i < olds.length; i++) olds[i].parentNode.removeChild(olds[i]);
    function link(rel, href, sizes) { var l = document.createElement('link'); l.rel = rel; l.href = href; if (sizes) l.setAttribute('sizes', sizes); head.appendChild(l); }
    link('apple-touch-icon', BASE + 'apple-touch-icon.png?v=3', '180x180');
    link('icon', BASE + 'icon-192.png?v=3', '192x192');
    function meta(name, content) { var m = document.querySelector('meta[name="' + name + '"]'); if (!m) { m = document.createElement('meta'); m.name = name; head.appendChild(m); } m.content = content; }
    meta('apple-mobile-web-app-title', 'התוכניות שלי');
    meta('application-name', 'התוכניות שלי');
    meta('apple-mobile-web-app-capable', 'yes');
    document.title = 'התוכניות שלי';

    // כדי שהקיצור יישמר ככתובת הנקייה של הדף (בלי ?shortcut=1)
    try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {}

    // החלונית
    var wrap = document.createElement('div');
    wrap.setAttribute('dir', 'rtl');
    wrap.style.cssText = 'position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483000;background:rgba(30,42,49,.55);display:flex;align-items:center;justify-content:center;padding:14px;box-sizing:border-box;font-family:Rubik,Arial,sans-serif;';
    var card = document.createElement('div');
    card.style.cssText = 'background:#fff;border-radius:22px;width:100%;max-width:480px;max-height:92vh;overflow:auto;box-shadow:0 14px 40px rgba(0,0,0,.28);padding:10px 10px 14px;box-sizing:border-box;position:relative;';
    var x = document.createElement('button');
    x.type = 'button'; x.setAttribute('aria-label', 'סגירה'); x.textContent = '×';
    x.style.cssText = 'position:absolute;left:10px;top:6px;width:36px;height:36px;border:none;background:#fff0f4;color:#d62d5b;border-radius:50%;font-size:24px;line-height:34px;cursor:pointer;z-index:2;';
    var fr = document.createElement('iframe');
    fr.src = BASE + '?embed=1';
    fr.title = 'הוספת קיצור דרך למסך הבית';
    fr.style.cssText = 'width:100%;height:370px;border:0;display:block;background:#fff;';
    var ok = document.createElement('button');
    ok.type = 'button'; ok.textContent = 'סגירה';
    ok.style.cssText = 'display:block;margin:6px auto 0;border:none;border-radius:99px;background:#f23e6d;color:#fff;font-weight:700;font-size:17px;padding:12px 44px;cursor:pointer;font-family:inherit;';
    function close() { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); }
    x.onclick = close; ok.onclick = close;
    wrap.onclick = function (e) { if (e.target === wrap) close(); };
    card.appendChild(x); card.appendChild(fr); card.appendChild(ok); wrap.appendChild(card);
    function mount() { document.body.appendChild(wrap); }
    if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  } catch (e) { /* לא שוברים את האתר */ }
})();
