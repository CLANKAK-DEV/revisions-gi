// ===== Vues ajoutées : flashcards, examens écrits, révision, plan 7 jours =====

/* ---------- FLASHCARDS ---------- */
let cardIndex=0,cardFilter="Tous",cardRevealed=false;
function cardState(i){return state.cards?.[i]||{level:0,ok:0,ko:0}}
function renderCards(){
 const topics=["Tous",...TOPICS,"À revoir","Difficiles"];
 el("cardFilters").innerHTML=topics.map(x=>`<button class="${cardFilter===x?"active":""}" onclick="cardFilter='${x}';cardIndex=0;renderCards()">${x}</button>`).join("");
 let ids=FLASHCARDS.map((c,i)=>({c,i}));
 if(cardFilter==="À revoir")ids=ids.filter(o=>cardState(o.i).ko>0&&cardState(o.i).level<2);
 else if(cardFilter==="Difficiles")ids=ids.filter(o=>o.c[3]===3);
 else if(cardFilter!=="Tous")ids=ids.filter(o=>o.c[0]===cardFilter);
 const total=FLASHCARDS.length,known=FLASHCARDS.filter((_,i)=>cardState(i).level>=2).length;
 el("cardProgress").textContent=known+" / "+total+" sues";
 if(!ids.length){el("cardArea").innerHTML='<div class="quizbox"><h2>Rien ici pour ce filtre.</h2><p>Changez de filtre ou révisez d\'abord.</p></div>';return}
 if(cardIndex>=ids.length)cardIndex=0;
 const {c,i}=ids[cardIndex];const s=cardState(i);cardRevealed=false;
 const dots=["○","◔","◑","●"][Math.min(3,s.level)];
 el("cardArea").innerHTML=`<div class="quizbox cardbox">
  <div class="quizmeta"><span>Carte ${cardIndex+1}/${ids.length} · ${c[0]} · ${["","facile","moyen","difficile"][c[3]]}</span><span>${dots} niveau ${s.level}/3</span></div>
  <div class="progressline"><span style="width:${(cardIndex+1)/ids.length*100}%"></span></div>
  <h2>${esc(c[1])}</h2>
  <div id="cardAnswerWrap"><button class="btn" onclick="revealCard()">Révéler la réponse</button></div>
  <div id="cardFeedback"></div></div>`;
 el("cardArea").dataset.ids=JSON.stringify(ids.map(o=>o.i));
}
function revealCard(){
 if(cardRevealed)return;cardRevealed=true;
 const ids=JSON.parse(el("cardArea").dataset.ids);const i=ids[cardIndex];const c=FLASHCARDS[i];
 el("cardAnswerWrap").innerHTML=`<div class="answer show"><pre>${esc(c[2])}</pre><small>Source : ${esc(c[4])}</small></div>
  <div class="actions" style="margin-top:12px">
   <button class="btn" onclick="gradeCard(${i},true)">Je savais ✓</button>
   <button class="btn orange" onclick="gradeCard(${i},false)">À revoir ✗</button></div>`;
 highlightCode(el("cardAnswerWrap"));
}
function gradeCard(i,ok){
 const s=state.cards??= {};const cur=s[i]||(s[i]={level:0,ok:0,ko:0});
 if(ok){cur.ok++;cur.level=Math.min(3,cur.level+1)}else{cur.ko++;cur.level=0}
 save();
 const ids=JSON.parse(el("cardArea").dataset.ids);
 el("cardFeedback").innerHTML=ok?'<div class="feedback"><strong>Acquis.</strong> Cette carte remontera moins souvent.</div>':'<div class="feedback bad"><strong>Noté « à revoir ».</strong> La carte revient dès maintenant.</div>';
 setTimeout(()=>{cardIndex=(cardIndex+1)%ids.length;renderCards()},ok?600:1200);
}

/* ---------- EXAMEN ÉCRIT ---------- */
let examIdx=null,examMode="all",examQ=0,examStarted=null,examTimer=null,examLeft=0;
function renderExams(){
 el("examList").innerHTML=EXAMS.map((e,i)=>{
  const r=state.examResults?.[i];
  return `<div class="card practice-card"><span class="pill">${e.duration} min · /20</span><h3>${esc(e.title)}</h3>
   <p>${e.parts.reduce((a,p)=>a+p.questions.length,0)} questions · ${e.parts.length} parties</p>
   ${r?`<p><strong>Dernier résultat : ${r.score}/20</strong> (${r.date})</p>`:""}
   <div class="actions"><button class="btn" onclick="startExam(${i},'all')">Papier complet</button>
   <button class="btn ghost" onclick="startExam(${i},'one')">Question par question</button></div></div>`}).join("");
}
function startExam(i,mode){
 examIdx=i;examMode=mode;examQ=0;examStarted=Date.now();
 examLeft=EXAMS[i].duration*60;
 state.exams??={};state.exams[i]??={};
 save();activate("examRun");
 if(examTimer)clearInterval(examTimer);
 examTimer=setInterval(tickExam,1000);tickExam();
 showExamQuestion();
}
function tickExam(){
 const m=Math.floor(examLeft/60),s=examLeft%60;
 const t=el("examTimer");if(t)t.textContent=m+":"+String(s).padStart(2,"0");
 if(examLeft<=0){clearInterval(examTimer);submitExam(true)}
 examLeft--;
}
function examQuestions(){const e=EXAMS[examIdx];return e.parts.flatMap(p=>p.questions.map(q=>({...q,part:p.label})))}
function showExamQuestion(){
 const qs=examQuestions();
 if(examQ>=qs.length){submitExam(false);return}
 const q=qs[examQ];
 el("examRunArea").innerHTML=`<div class="quizbox">
  <div class="quizmeta"><span>${esc(EXAMS[examIdx].title)} · Question ${examQ+1}/${qs.length} · ${q.pts} pt${q.pts>1?"s":""}</span><span id="examTimer"></span></div>
  <div class="progressline"><span style="width:${examQ/qs.length*100}%"></span></div>
  <p class="pill">${esc(q.part)}</p>
  <h2>${esc(q.q)}</h2>
  <textarea id="examAnswer" placeholder="Rédigez votre réponse comme sur votre copie : définitions, commandes, justifications…">${esc(state.exams[examIdx]?.answers?.[examQ]||"")}</textarea>
  <div class="actions" style="margin-top:12px">
   ${examQ>0?'<button class="btn ghost" onclick="examNav(-1)">← Précédente</button>':""}
   <button class="btn" onclick="examNav(1)">${examQ<qs.length-1?"Suivante →":"Terminer et corriger"}</button>
   ${examMode==="all"?'<button class="btn ghost" onclick="submitExam(false)">Rendre la copie</button>':""}
  </div></div>`;
 el("examAnswer").addEventListener("input",e=>{state.exams[examIdx].answers??={};state.exams[examIdx].answers[examQ]=e.target.value;save()});
}
function examNav(d){
 const ta=el("examAnswer");if(ta){state.exams[examIdx].answers??={};state.exams[examIdx].answers[examQ]=ta.value;save()}
 examQ+=d;showExamQuestion();
}
function submitExam(timeUp){
 if(examTimer)clearInterval(examTimer);
 const ta=el("examAnswer");
 if(ta){state.exams[examIdx].answers??={};state.exams[examIdx].answers[examQ]=ta.value;save()}
 const qs=examQuestions();
 const total=qs.reduce((a,q)=>a+q.pts,0);
 // Auto-évaluation : l'étudiant se note par question avec le corrigé.
 let html=`<div class="quizbox"><span class="pill">CORRECTION</span><h2>${timeUp?"Temps écoulé — correction":"Correction de votre copie"}</h2>
 <p>Comparez votre réponse au corrigé et attribuez-vous une note honnête par question. Le total se calcule sur 20.</p>`;
 html+=`<div class="exam-corr">`;
 qs.forEach((q,i)=>{
  const ans=(state.exams[examIdx].answers||{})[i]||"";
  html+=`<div class="card practice-card"><span class="pill">${q.pts} pt${q.pts>1?"s":""} · ${q.topic}</span><h3>Q${i+1}. ${esc(q.q)}</h3>
   ${ans?`<details><summary>Votre réponse</summary><pre>${esc(ans)}</pre></details>`:'<p class="notice">Pas de réponse.</p>'}
   <details class="answer show"><summary>Corrigé et barème</summary><div class="model">${mdLite(q.a)}</div>
   <div class="selfgrade"><span>Ma note :</span><input type="number" min="0" max="${q.pts}" step="0.5" value="${state.exams[examIdx].grades?.[i]??""}" onchange="gradeQ(${i},this.value,${q.pts})"> / ${q.pts}</div>
   </details></div>`;
 });
 html+=`</div><div class="actions"><button class="btn" onclick="finishExam(${total})">Calculer ma note sur 20</button>
 <button class="btn ghost" onclick="activate('exam');renderExams()">Retour aux sujets</button></div></div>`;
 el("examRunArea").innerHTML=html;
 highlightCode(el("examRunArea"));
 window.scrollTo({top:0,behavior:"smooth"});
}
function gradeQ(i,v,max){state.exams[examIdx].grades??={};state.exams[examIdx].grades[i]=Math.min(max,Math.max(0,parseFloat(v)||0));save()}
function finishExam(total){
 const g=state.exams[examIdx].grades||{};
 const sum=Object.values(g).reduce((a,b)=>a+(+b||0),0);
 const score=Math.round(sum/total*20*2)/2;
 state.examResults??={};state.examResults[examIdx]={score,date:new Date().toLocaleDateString("fr-FR"),total};
 // faiblesses : questions notées < 60 %
 const qs=examQuestions();state.exams[examIdx].weakTopics=qs.filter((q,i)=>((+g[i]||0)/q.pts)<0.6).map(q=>q.topic);
 save();renderExams();
 el("examRunArea").innerHTML=`<div class="quizbox"><span class="pill">RÉSULTAT</span><h2>${score}/20</h2>
 <p>${score>=14?"Solide. Continuez à écrire les commandes de tête.":score>=10?"Passable — ciblez les topics notés sous 60 %.":"Fragile — reprenez les leçons des topics faibles avant le prochain examen blanc."}</p>
 ${state.exams[examIdx].weakTopics?.length?`<p><strong>Topics à retravailler :</strong> ${[...new Set(state.exams[examIdx].weakTopics)].join(", ")}</p>`:""}
 <div class="actions"><button class="btn" onclick="startQuiz('weak')">Entraîner mes points faibles</button>
 <button class="btn ghost" onclick="activate('exam');renderExams()">Autre sujet</button></div></div>`;
 renderHome();
}
function mdLite(s){
 return esc(s).replace(/```([\s\S]*?)```/g,(_,c)=>"<pre>"+c.replace(/^\w+\n/,"")+"</pre>")
 .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>")
 .replace(/`(.+?)`/g,"<code>$1</code>")
 .replace(/^## (.+)$/gm,"<h3>$1</h3>")
 .replace(/\n\n/g,"<br><br>").replace(/\n/g,"<br>");
}

/* ---------- RÉVISION ---------- */
let revTab=0;
function renderRevision(){
 el("revTabs").innerHTML=REVISION.sheets.map((s,i)=>`<button class="${revTab===i?"active":""}" onclick="revTab=${i};renderRevision()">${esc(s.title.split("·")[0].trim())}</button>`).join("")
 +`<button class="${revTab===5?"active":""}" onclick="revTab=5;renderRevision()">Pièges</button><button class="${revTab===6?"active":""}" onclick="revTab=6;renderRevision()">Checklist</button>`;
 if(revTab<5){el("revBody").innerHTML=`<article class="card lesson">${REVISION.sheets[revTab].html}</article>`;highlightCode(el("revBody"))}
 else if(revTab===5){el("revBody").innerHTML=`<article class="card lesson"><h2>Pièges classiques à l'examen</h2><ul>${REVISION.traps.map(t=>`<li>${t}</li>`).join("")}</ul></article>`}
 else{
  const done=(state.checklist||[]).length;
  el("revBody").innerHTML=`<article class="card lesson"><h2>Checklist finale — ${done}/${REVISION.checklist.length}</h2>
  <div class="progressline"><span style="width:${done/REVISION.checklist.length*100}%"></span></div>
  <ul class="checklist">${REVISION.checklist.map((c,i)=>`<li><label><input type="checkbox" ${state.checklist?.includes(i)?"checked":""} onchange="toggleCheck(${i},this.checked)"> <span>${esc(c)}</span></label></li>`).join("")}</ul></article>`;
 }
}
function toggleCheck(i,on){state.checklist??=[];if(on&&!state.checklist.includes(i))state.checklist.push(i);if(!on)state.checklist=state.checklist.filter(x=>x!==i);save();renderRevision()}

/* ---------- PLAN 7 JOURS ---------- */
function renderPlan(){
 const days=STUDY_PLAN.map((d,di)=>{
  const items=d.items.map((it,ii)=>{
   const key=di+"-"+ii;const done=(state.plan||[]).includes(key);
   let onclick="";
   if(it[2]){
    const [kind,arg]=it[2].split(":");
    if(kind==="learn")onclick=`lessonIndex=${arg};showView('learn')`;
    if(kind==="cards")onclick=arg==="weak"?`cardFilter='À revoir';cardIndex=0;showView('cards')`:`cardFilter='${arg}';cardIndex=0;showView('cards')`;
    if(kind==="tp")onclick=`practiceFilter='${arg}';showView('practice')`;
    if(kind==="quiz")onclick=arg==="weak"?`showView('quiz');startQuiz('weak')`:`showView('quiz');startQuiz('topic',${arg})`;
    if(kind==="exam")onclick=`showView('exam');startExam(${arg},'all')`;
    if(kind==="rev")onclick=`revTab=${arg};showView('revision')`;
   }
   return `<li class="${done?"done":""}"><label><input type="checkbox" ${done?"checked":""} onchange="togglePlan('${key}',this.checked)"> <span>${esc(it[1])}</span>${onclick?` <a href="#" onclick="${onclick};return false">→</a>`:""}</label></li>`;
  }).join("");
  const total=d.items.length,doneN=d.items.filter((_,ii)=>(state.plan||[]).includes(di+"-"+ii)).length;
  return `<div class="card plan-day"><div class="plan-head"><span class="pill">JOUR ${d.day}</span><h3>${esc(d.title)}</h3><span>${doneN}/${total}</span></div>
  <div class="progressline"><span style="width:${doneN/total*100}%"></span></div><ul>${items}</ul></div>`;
 }).join("");
 el("planBody").innerHTML=`<p class="sub">Ce plan est un guide, pas une obligation. Choisis ce qui t’aide aujourd’hui; les notions à revoir resteront prêtes pour la prochaine session.</p><div class="plan-grid">${days}</div>`;
}
function togglePlan(k,on){state.plan??=[];if(on&&!state.plan.includes(k))state.plan.push(k);if(!on)state.plan=state.plan.filter(x=>x!==k);save();renderPlan();renderHome()}

/* ---------- THÈME ---------- */
function toggleTheme(){document.body.classList.toggle("dark");state.theme=document.body.classList.contains("dark")?"dark":"light";save()}
