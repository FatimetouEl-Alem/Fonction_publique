/* Ministère de la Fonction Publique et du Travail — interactions */
(function () {
  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var items = document.querySelector('.nav-items');
  if (toggle && items) toggle.addEventListener('click', function () { items.classList.toggle('open'); });

  // Carrousel d'accueil
  document.querySelectorAll('[data-slider]').forEach(function (sl) {
    var slides = sl.querySelectorAll('.slide');
    var bars = sl.querySelectorAll('.sl-progress i');
    var counter = sl.querySelector('.sl-progress span');
    var i = 0, timer;
    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      bars.forEach(function (b, k) { b.classList.toggle('on', k === i); });
      if (counter) counter.textContent = '0' + (i + 1) + ' / 0' + slides.length;
    }
    function auto() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 6000); }
    var dir = document.documentElement.dir === 'rtl' ? -1 : 1;
    var p = sl.querySelector('.prev'), n = sl.querySelector('.next');
    if (p) p.addEventListener('click', function () { go(i - dir); auto(); });
    if (n) n.addEventListener('click', function () { go(i + dir); auto(); });
    go(0); auto();
  });

  // Onglets de filtrage : data-filter sur .tab, data-cat sur les éléments
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var target = document.querySelector(group.getAttribute('data-tabs'));
    group.querySelectorAll('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        group.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        if (!target) return;
        var f = tab.getAttribute('data-filter');
        target.querySelectorAll('[data-cat]').forEach(function (el) {
          var cats = el.getAttribute('data-cat').split(' ');
          el.style.display = (f === 'all' || cats.indexOf(f) > -1) ? '' : 'none';
        });
        target.querySelectorAll('[data-group]').forEach(function (g) {
          var visible = g.querySelectorAll('[data-cat]:not([style*="none"])').length;
          g.style.display = visible ? '' : 'none';
        });
      });
    });
  });

  // Accordéons (FAQ, directions)
  document.querySelectorAll('[data-acc]').forEach(function (acc) {
    var btn = acc.querySelector('[data-acc-btn]');
    if (btn) btn.addEventListener('click', function () {
      acc.classList.toggle('open');
      btn.setAttribute('aria-expanded', acc.classList.contains('open'));
    });
  });

  // Organigramme -> ouvre la direction
  document.querySelectorAll('[data-open]').forEach(function (n) {
    n.addEventListener('click', function () {
      var el = document.getElementById(n.getAttribute('data-open'));
      if (el) { el.classList.add('open'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  });

  // Recherche locale (champs data-search)
  document.querySelectorAll('[data-search]').forEach(function (input) {
    var target = document.querySelector(input.getAttribute('data-search'));
    if (!target) return;
    input.addEventListener('input', function () {
      var q = input.value.toLowerCase().trim();
      target.querySelectorAll('[data-cat]').forEach(function (el) {
        el.style.display = !q || el.textContent.toLowerCase().indexOf(q) > -1 ? '' : 'none';
      });
    });
  });
})();
