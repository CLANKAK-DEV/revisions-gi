(function () {
  var SITE = window.SITE || {};
  var PAGES = [
    ['index.html', 'Accueil'],
    ['essentiel.html', 'Essentiel à retenir'],
    ['cours.html', 'Résumé du cours'],
    ['exercices.html', 'Exercices du cours'],
    ['tp.html', 'TP corrigés'],
    ['qcm.html', 'QCM'],
    ['questions.html', 'Questions de cours'],
    ['pratique.html', 'Examen blanc pratique'],
    ['pieges.html', 'Pièges et aide-mémoire'],
    ['wooclap.html', 'Quiz Wooclap']
  ];
  var here = location.pathname.split('/').pop() || 'index.html';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  // texte avec `code` en ligne
  function fmt(s) {
    return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
  }
  function store(key, val) {
    try {
      key = 'rev:' + location.pathname.replace(/[^\/]*$/, '') + ':' + key;
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  // navigation commune
  var side = document.getElementById('side');
  if (side) {
    var links = PAGES.map(function (p) {
      return '<a href="' + p[0] + '"' + (p[0] === here ? ' class="on"' : '') + '>' + p[1] + '</a>';
    }).join('');
    side.innerHTML =
      '<a class="back" href="../index.html">Tous les modules</a>' +
      '<p class="brand">' + SITE.brand + '</p>' +
      '<p class="brand-sub">' + SITE.sub + '</p>' +
      '<nav>' + links + '</nav>' +
      '<p class="mini">' + SITE.mini + '</p>';
  }

  // boutons tout ouvrir / tout fermer
  document.querySelectorAll('[data-toggle-all]').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('data-toggle-all') === 'open';
      document.querySelectorAll('main details').forEach(function (d) { d.open = open; });
    });
  });

  // questions de cours
  var qa = document.getElementById('qa-list');
  if (qa && window.QA) {
    var cur = 0;
    function renderQA() {
      qa.innerHTML = window.QA.filter(function (x) { return !cur || x.ch === cur; }).map(function (x) {
        return '<details><summary>' + fmt(x.q) + '</summary><div class="in">' + x.a +
          (x.tip ? '<div class="box retenir"><p class="t">À retenir</p>' + x.tip + '</div>' : '') + '</div></details>';
      }).join('');
    }
    document.querySelectorAll('[data-qa-ch]').forEach(function (b) {
      b.addEventListener('click', function () {
        cur = +b.getAttribute('data-qa-ch');
        document.querySelectorAll('[data-qa-ch]').forEach(function (x) { x.classList.toggle('on', x === b); });
        renderQA();
      });
    });
    renderQA();
  }

  // QCM
  var box = document.getElementById('qcm');
  if (box && window.QCM) {
    // mélange les options de chaque question (la bonne réponse change de place à chaque chargement)
    window.QCM.forEach(function (q) {
      var right = q.o[q.a], o = q.o.slice();
      for (var i = o.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)), t = o[i]; o[i] = o[j]; o[j] = t;
      }
      q.o = o; q.a = o.indexOf(right);
    });
    var order = window.QCM.map(function (_, i) { return i; });
    var filter = 0, answered = {}, good = 0;
    

    function visible() {
      return order.filter(function (i) { return !filter || window.QCM[i].ch === filter; });
    }
    function updateScore() {
      var n = Object.keys(answered).length;
      var best = store('rt-qcm-best');
      document.getElementById('score').textContent = good + ' / ' + n + ' répondues' + (best ? ' (meilleur : ' + best + ')' : '');
    }
    function render() {
      var chNames = SITE.chapters;
      box.innerHTML = visible().map(function (i, k) {
        var q = window.QCM[i];
        return '<div class="qq" id="q' + i + '"><div class="meta">' + (k + 1) + ' · ' + chNames[q.ch] + '</div>' +
          '<div class="qt">' + fmt(q.q) + '</div>' +
          q.o.map(function (o, j) { return '<button class="opt" data-q="' + i + '" data-o="' + j + '">' + fmt(o) + '</button>'; }).join('') +
          '<div class="exp"></div></div>';
      }).join('');
      Object.keys(answered).forEach(function (i) { mark(+i, answered[i]); });
      updateScore();
    }
    function mark(i, pick) {
      var q = window.QCM[i], el = document.getElementById('q' + i);
      if (!el) return;
      el.classList.add('done');
      el.querySelectorAll('.opt').forEach(function (b, j) {
        b.disabled = true;
        if (j === q.a) b.classList.add('ok');
        else if (j === pick) b.classList.add('ko');
      });
      el.querySelector('.exp').innerHTML = (pick === q.a ? 'Correct. ' : 'Faux. La bonne réponse est : ' + fmt(q.o[q.a]) + '. ') + fmt(q.e);
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.opt');
      if (!b || b.disabled) return;
      var i = +b.getAttribute('data-q'), j = +b.getAttribute('data-o');
      answered[i] = j;
      if (j === window.QCM[i].a) good++;
      mark(i, j);
      updateScore();
      var total = visible().length;
      if (Object.keys(answered).length >= total && !filter) {
        var s = good + '/' + total;
        var prev = parseInt(store('rt-qcm-best') || '-1', 10);
        if (good > prev) store('rt-qcm-best', s);
        updateScore();
      }
    });
    document.querySelectorAll('[data-qcm-ch]').forEach(function (b) {
      b.addEventListener('click', function () {
        filter = +b.getAttribute('data-qcm-ch');
        document.querySelectorAll('[data-qcm-ch]').forEach(function (x) { x.classList.toggle('on', x === b); });
        render();
      });
    });
    document.getElementById('qcm-shuffle').addEventListener('click', function () {
      for (var i = order.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)), t = order[i]; order[i] = order[j]; order[j] = t;
      }
      answered = {}; good = 0; render();
    });
    document.getElementById('qcm-reset').addEventListener('click', function () {
      answered = {}; good = 0; render();
    });
    render();
  }

  // minuteur de l'examen blanc
  var tm = document.getElementById('timer');
  if (tm) {
    var total = 60 * 60, left = total, id = null;
    var show = function () {
      var m = Math.floor(left / 60), s = left % 60;
      tm.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    };
    show();
    document.getElementById('t-start').addEventListener('click', function () {
      if (id) return;
      id = setInterval(function () {
        left--; show();
        if (left <= 0) { clearInterval(id); id = null; tm.textContent = 'Temps écoulé'; }
      }, 1000);
    });
    document.getElementById('t-stop').addEventListener('click', function () { clearInterval(id); id = null; });
    document.getElementById('t-reset').addEventListener('click', function () { clearInterval(id); id = null; left = total; show(); });
  }
})();
