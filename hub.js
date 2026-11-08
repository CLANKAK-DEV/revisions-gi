(function () {
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  var box = document.getElementById('modules');
  if (!box || !window.MODULES) return;
  box.innerHTML = window.MODULES.map(function (m) {
    var chips = (m.stats || []).map(function (s) {
      return '<span class="chip">' + esc(s) + '</span>';
    }).join('');
    return '<a class="card mod" href="' + esc(encodeURI(m.href)) + '">' +
      '<span><span class="tag ' + esc(m.color || 'b') + '">' + esc(m.tag) + '</span></span>' +
      '<h3>' + esc(m.title) + '</h3>' +
      '<p class="meta">' + esc(m.meta) + '</p>' +
      '<p>' + esc(m.desc) + '</p>' +
      '<div class="chips">' + chips + '</div>' +
      '<span class="go">Ouvrir le module</span>' +
      '</a>';
  }).join('');
  var n = document.getElementById('count');
  if (n) n.textContent = window.MODULES.length + (window.MODULES.length > 1 ? ' modules' : ' module');
})();
