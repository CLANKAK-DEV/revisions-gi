const KEY="inf4021-revision-v1";
let state;
try { state=JSON.parse(localStorage.getItem(KEY))||{} } catch { state={} }
state.q??={}; state.tasks??={}; state.drafts??={}; state.total??=0; state.correct??=0;
let lessonIndex=0,mode="adaptive",currentQ=null,lastQ=null,queue=[],done=0,practiceFilter="Tous",practiceQuery="",practiceVisible=12;
const TOPICS=["Fondements","MongoDB","Lecture","Modélisation","CRUD"];
const el=id=>document.getElementById(id);
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}
function qs(i){return state.q[i]||(state.q[i]={seen:0,correct:0,streak:0,wrong:0})}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function highlightCode(root=document){
 const token=/\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\$[A-Za-z]+|\b(?:db|find|findOne|countDocuments|estimatedDocumentCount|aggregate|insertOne|insertMany|updateOne|updateMany|replaceOne|deleteOne|deleteMany|createCollection|sort|skip|limit|use|show|mongod|mongosh|ObjectId|true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b/gm;
 root?.querySelectorAll?.("pre").forEach(pre=>{
  if(pre.dataset.highlighted)return;
  const source=pre.textContent;let html="",last=0;
  source.replace(token,(match,offset)=>{
   html+=esc(source.slice(last,offset));last=offset+match.length;
   const type=match.startsWith("//")?"comment":match[0]==='"'||match[0]==="'"?"string":match[0]==="$"?"operator":/^(true|false|null|undefined)$/.test(match)?"literal":/^\d/.test(match)?"number":"function";
   html+='<span class="tok-'+type+'">'+esc(match)+"</span>";
   return match;
  });
  pre.innerHTML=html+esc(source.slice(last));pre.dataset.highlighted="true";
 });
}
function activate(v){document.querySelectorAll(".view").forEach(x=>x.classList.toggle("active",x.id===v));document.querySelectorAll("#nav button").forEach(x=>x.classList.toggle("active",x.dataset.view===v));window.scrollTo({top:0,behavior:"smooth"})}
function showView(v){activate(v);if(v==="home")renderHome();if(v==="learn")renderLesson();if(v==="practice")renderPractice();if(v==="cards")renderCards();if(v==="exam")renderExams();if(v==="plan")renderPlan();if(v==="revision")renderRevision();if(v==="quiz"&&currentQ===null)startQuiz("adaptive")}
document.querySelectorAll("#nav button").forEach(b=>b.onclick=()=>showView(b.dataset.view));
function renderHome(){
 const mastered=QUESTIONS.filter((_,i)=>qs(i).streak>=2).length;
 const taskDone=Object.values(state.tasks).filter(v=>v==="done").length;
 const cardsKnown=typeof FLASHCARDS!=="undefined"?FLASHCARDS.filter((_,i)=>state.cards?.[i]?.level>=2).length:0;
 const checks=(state.checklist||[]).length;
 const readiness=Math.round((mastered/QUESTIONS.length*.42+taskDone/TASKS.length*.28+cardsKnown/(typeof FLASHCARDS!=="undefined"?FLASHCARDS.length:1)*.15+checks/(typeof REVISION!=="undefined"?REVISION.checklist.length:1)*.15)*100);
 el("topBadge").textContent=mastered+" question"+(mastered>1?"s":"")+" maîtrisée"+(mastered>1?"s":"");
 el("statAnswered").textContent=state.total;el("statMastered").textContent=mastered+"/"+QUESTIONS.length;
 el("statAccuracy").textContent=state.total?Math.round(state.correct/state.total*100)+" %":"—";
 el("statTasks").textContent=taskDone+"/"+TASKS.length;
 const weak=QUESTIONS.map((_,i)=>i).filter(i=>qs(i).wrong>0&&qs(i).streak<2);
 let focus;
 if(!state.total)focus={tag:"DÉMARRER EN DOUCEUR",title:"Découvre simplement ton point de départ",text:"Cinq petites questions, une par thème. C’est juste un repère pour choisir quoi ouvrir ensuite.",action:"startQuiz('diagnostic')",label:"Faire le diagnostic →"};
 else if(weak.length)focus={tag:"UN PETIT RETOUR",title:weak.length+" notion"+(weak.length>1?"s":"")+" à revoir tranquillement",text:"Ces questions reviendront quand tu le voudras. Deux bonnes réponses de suite suffisent pour les valider.",action:"startQuiz('weak')",label:"Revoir ces notions →"};
 else if(taskDone<TASKS.length)focus={tag:"PRENDRE CONFIANCE",title:"Transforme une idée en requête",text:"Écris une première solution, puis compare-la à la correction. Le brouillon est fait pour apprendre.",action:"practiceFilter='Tous';showView('practice')",label:"Essayer un exercice →"};
 else focus={tag:"QUAND TU VEUX",title:"Teste-toi en conditions réelles",text:"Une simulation te montre ce qui est déjà solide et ce qui mérite seulement un dernier passage.",action:"showView('exam')",label:"Voir les simulations →"};
 el("focusHome").innerHTML='<span class="pill">'+focus.tag+'</span><h3>'+focus.title+'</h3><p>'+focus.text+'</p><button class="btn" onclick="'+focus.action+'">'+focus.label+'</button>';
 const readinessLabel=readiness>=80?"Tes repères sont bien en place. Une simulation peut maintenant t’aider à les stabiliser.":readiness>=50?"Tu avances bien. Choisis simplement une petite zone à retravailler aujourd’hui.":"Commence par une question ou une carte : la progression se construit très vite par petites étapes.";
 el("readinessHome").innerHTML='<span class="pill">REPÈRE DE PROGRESSION</span><div class="readiness-score"><strong>'+readiness+'%</strong><span>parcours exploré</span></div><div class="progressline"><span style="width:'+readiness+'%"></span></div><p>'+readinessLabel+'</p><small class="notice">Quiz 42% · exercices 28% · cartes 15% · checklist 15%</small>';
 el("weekGrid").innerHTML=WEEKS.map((w,i)=>'<button class="week" onclick="lessonIndex='+i+';showView(&quot;learn&quot;)"><b>0'+w.n+'</b><strong>'+w.title+'</strong><small>'+w.tag+'</small></button>').join("");
 let html="";
 for(const topic of TOPICS){
  const ids=QUESTIONS.map((q,i)=>q[0]===topic?i:-1).filter(i=>i>=0);
  const weak=ids.filter(i=>qs(i).wrong>0&&qs(i).streak<2).length;
  const m=ids.filter(i=>qs(i).streak>=2).length;
  html+='<div class="master-row"><strong>'+topic+'</strong><div class="bar"><span style="width:'+(m/ids.length*100)+'%"></span></div><span>'+(weak?'<span style="color:#bc5837">'+weak+' à revoir</span>':m+"/"+ids.length)+'</span></div>';
 }
 el("weakHome").innerHTML='<div class="master-list">'+html+'</div><p class="notice">Maîtrise = deux réponses justes consécutives par question. Une erreur remet la série à zéro.</p>';
}
function renderLesson(){
 el("lessonTabs").innerHTML=WEEKS.map((w,i)=>'<button class="'+(i===lessonIndex?"active":"")+'" onclick="lessonIndex='+i+';renderLesson()">0'+w.n+" · "+w.title+"</button>").join("");
 el("lessonBody").innerHTML=LESSONS[lessonIndex];
 const w=WEEKS[lessonIndex];
 let extra=w.n===3?"<p>Données du TP : movies.json.</p>":w.n===4?"<p>Données du TP : produits.json.</p>":"";
 el("lessonSources").innerHTML="<h3>Supports de la semaine "+w.n+'</h3><p>Supports : '+w.pdf.split("/").pop()+' (cours) et '+w.tp.split("/").pop()+' (TP), à ouvrir depuis votre dossier nosql.</p>'+extra+'<hr><p>Lisez cette leçon, expliquez les concepts à voix haute, puis faites les questions de la semaine sans regarder.</p><button class="btn" onclick="startQuiz(&quot;topic&quot;,'+lessonIndex+')">Tester cette semaine →</button>';
 highlightCode(el("lessonBody"));
}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function startQuiz(m="adaptive",topicIndex){
 mode=m;activate("quiz");document.querySelectorAll("#quizModes button").forEach(b=>b.classList.toggle("active",b.dataset.mode===m));done=0;currentQ=null;lastQ=null;
 if(m==="diagnostic")queue=shuffle(TOPICS.map(topic=>shuffle(QUESTIONS.map((q,i)=>q[0]===topic?i:-1).filter(i=>i>=0))[0]));
 else if(m==="exam")queue=shuffle(QUESTIONS.map((_,i)=>i)).slice(0,15);
 else if(m==="topic")queue=shuffle(QUESTIONS.map((q,i)=>q[0]===TOPICS[topicIndex]?i:-1).filter(i=>i>=0));
 else queue=[];
 nextQuestion();
}
document.querySelectorAll("#quizModes button").forEach(b=>b.onclick=()=>startQuiz(b.dataset.mode));
function nextQuestion(){
 let pool=QUESTIONS.map((_,i)=>i).filter(i=>qs(i).streak<2);
 if(mode==="weak"){
  pool=pool.filter(i=>qs(i).wrong>0);
  if(!pool.length){el("quizArea").innerHTML='<div class="quizbox"><h2>Aucun point faible enregistré.</h2><p>Faites le diagnostic ou un entraînement pour repérer vos lacunes.</p><button class="btn" onclick="startQuiz(&quot;diagnostic&quot;)">Lancer le diagnostic</button></div>';currentQ=null;return}
 }
 if(mode==="adaptive"||mode==="weak"){
  if(!pool.length){quizEnd(true);return}
  if(pool.length>1)pool=pool.filter(i=>i!==lastQ);
  const weights=pool.map(i=>{const s=qs(i);return Math.max(1,4+s.wrong*3-s.streak*2+(s.seen?0:2))});
  let r=Math.random()*weights.reduce((a,b)=>a+b,0),idx=0;
  for(;idx<pool.length-1;idx++){r-=weights[idx];if(r<0)break}
  currentQ=pool[idx];
 } else {
  if(!queue.length){quizEnd(false);return}
  currentQ=queue.shift();
 }
 lastQ=currentQ;done++;
 const q=QUESTIONS[currentQ],s=qs(currentQ);
 const label=mode==="exam"?"Question "+done+"/15":mode==="diagnostic"?"Question "+done+"/5":"Question "+done;
 const progress=mode==="exam"?done/15*100:mode==="diagnostic"?done/5*100:s.streak/2*100;
 const opts=q[2].map((o,j)=>'<button class="option" onclick="answer('+j+')"><span class="letter">'+"ABCD"[j]+"</span><span>"+esc(o)+"</span></button>").join("");
 el("quizArea").innerHTML='<div class="quizbox"><div class="quizmeta"><span>'+label+" · "+q[0]+"</span><span>"+s.streak+'/2 réussites de suite</span></div><div class="progressline"><span style="width:'+progress+'%"></span></div><h2>'+esc(q[1])+'</h2><div class="options">'+opts+'</div><div id="feedbackSlot"></div></div>';
}
function answer(choice){
 const q=QUESTIONS[currentQ],s=qs(currentQ),ok=choice===q[3];
 s.seen++;state.total++;
 if(ok){s.correct++;s.streak=Math.min(2,s.streak+1);state.correct++}else{s.wrong++;s.streak=0}
 save();
 document.querySelectorAll(".option").forEach((b,j)=>{b.disabled=true;b.classList.toggle("correct",j===q[3]);b.classList.toggle("wrong",j===choice&&!ok)});
 const comparison=ok?"":'<p><strong>Votre réponse :</strong> '+esc(q[2][choice])+'</p><p><strong>Réponse attendue :</strong> '+esc(q[2][q[3]])+"</p>";
 const lessonButton=ok?"":'<button class="btn ghost" onclick="lessonIndex='+TOPICS.indexOf(q[0])+';showView(&quot;learn&quot;)">Revoir la leçon</button>';
 el("feedbackSlot").innerHTML='<div class="feedback '+(ok?"":"bad")+'"><strong>'+(ok?"Bien vu.":"Pas encore — voici le bon repère.")+"</strong>"+comparison+"<p>"+esc(q[4])+"</p><small>Source : "+esc(q[5])+'</small><div class="actions" style="margin-top:13px"><button class="btn" onclick="nextQuestion()">Continuer →</button>'+lessonButton+"</div></div>";
 renderHome();
}
function quizEnd(all){
 const title=all?"Toutes les questions sont maîtrisées !":mode==="exam"?"Examen blanc terminé":mode==="diagnostic"?"Diagnostic terminé":"Série terminée";
 el("quizArea").innerHTML='<div class="quizbox"><span class="pill">BILAN</span><h2>'+title+"</h2><p>Vous avez répondu à "+done+" question"+(done>1?"s":"")+' dans cette série. Consultez le tableau de bord pour voir vos points faibles et revenez les entraîner.</p><div class="actions"><button class="btn" onclick="startQuiz(&quot;adaptive&quot;)">Continuer à m’entraîner</button><button class="btn ghost" onclick="showView(&quot;home&quot;)">Voir ma progression</button></div></div>';
 currentQ=null;
}
function renderPractice(){
 el("practiceFilters").innerHTML=["Tous",...TOPICS,"À refaire"].map(x=>'<button class="'+(practiceFilter===x?"active":"")+'" onclick="practiceFilter=&quot;'+x+'&quot;;practiceVisible=12;renderPractice()">'+x+"</button>").join("");
 const norm=s=>String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const query=norm(practiceQuery.trim());
 const matches=TASKS.map((t,i)=>({t,i})).filter(o=>(practiceFilter==="Tous"||o.t[0]===practiceFilter||practiceFilter==="À refaire"&&state.tasks[o.i]==="retry")&&(!query||norm(o.t.slice(0,3).join(" ")).includes(query)));
 el("practiceCount").textContent=matches.length+" exercice"+(matches.length>1?"s":"")+" trouvé"+(matches.length>1?"s":"");
 el("practiceGrid").innerHTML=matches.slice(0,practiceVisible).map(({t,i})=>'<div class="card practice-card"><span class="pill '+(state.tasks[i]==="retry"?"orange":"")+'">'+t[0]+(state.tasks[i]==="done"?" · acquis":state.tasks[i]==="retry"?" · à refaire":"")+"</span><h3>"+esc(t[1])+"</h3><p>"+esc(t[2])+'</p><textarea id="taskInput'+i+'" oninput="saveDraft('+i+',this.value)" placeholder="Écrivez votre réponse ici…">'+esc(state.drafts[i]||"")+'</textarea><div style="margin-top:9px"><button class="btn ghost" onclick="revealTask('+i+')">Voir la correction</button></div><div class="answer" id="taskAnswer'+i+'"><pre>'+esc(t[3])+"</pre><p>"+esc(t[4])+'</p></div><div class="checkrow" id="taskCheck'+i+'"><button class="btn" onclick="markTask('+i+',&quot;done&quot;)">J’ai réussi sans aide</button><button class="btn orange" onclick="markTask('+i+',&quot;retry&quot;)">À refaire</button></div></div>').join("");
 el("practiceMore").style.display=matches.length>practiceVisible?"inline-block":"none";
 highlightCode(el("practiceGrid"));
}
function revealTask(i){el("taskAnswer"+i).classList.add("show");el("taskCheck"+i).classList.add("show");highlightCode(document)}
function markTask(i,v){state.tasks[i]=v;save();renderPractice();renderHome()}
function saveDraft(i,v){state.drafts[i]=v;save()}
function showMorePractice(){practiceVisible+=12;renderPractice()}
el("practiceSearch").addEventListener("input",e=>{practiceQuery=e.target.value;practiceVisible=12;renderPractice()});
document.addEventListener?.("keydown",e=>{
 if(!el("quiz").classList.contains("active")||currentQ===null||e.ctrlKey||e.metaKey||e.altKey)return;
 const active=document.activeElement?.tagName;
 if(active==="INPUT"||active==="TEXTAREA")return;
 const n=Number(e.key);
 if(n>=1&&n<=4){const option=document.querySelectorAll(".option")[n-1];if(option&&!option.disabled){e.preventDefault();answer(n-1)}}
 if(e.key==="Enter"&&el("feedbackSlot").innerHTML){e.preventDefault();nextQuestion()}
});
function renderSources(){
 el("sourcesGrid").innerHTML=WEEKS.map(w=>'<div class="card"><span class="pill">SEMAINE 0'+w.n+"</span><h3>"+w.title+'</h3><p>'+w.pdf.split("/").pop()+'<br>'+w.tp.split("/").pop()+'</p><p>À ouvrir depuis votre dossier nosql.</p>'+"</div>").join("");
}
renderHome();renderLesson();renderPractice();renderSources();
if(state.theme==="dark")document.body.classList.add("dark");
