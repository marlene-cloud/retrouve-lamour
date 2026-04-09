import React, { useState, useEffect } from "react";

const BACKEND = "https://retrouve-lamour-production.up.railway.app";

const PHASES = [
  { id: "comprendre", emoji: "🌱", title: "Comprendre", color: "#C4574A", sub: "Voir ce qui s'est vraiment passé" },
  { id: "guerir",     emoji: "🌿", title: "Guérir",     color: "#E8705A", sub: "Reprendre ta force intérieure" },
  { id: "construire", emoji: "🌸", title: "Construire", color: "#D4574A", sub: "Accueillir une vraie relation" },
  { id: "saimer",     emoji: "✦",  title: "S'aimer",    color: "#1A1A1A", sub: "La fondation de tout le reste" },
];

const DIAG = [
  { id:0, sec:"A", type:"qcm", q:"Comment s'est terminée votre dernière relation ?",
    opts:["Elle m'a quitté(e)","Je l'ai quitté(e)","Rupture mutuelle","Trahison ou infidélité","Relation toxique"] },
  { id:1, sec:"A", type:"qcm", q:"Il y a combien de temps ?",
    opts:["Moins de 3 mois","3 à 6 mois","6 mois à 1 an","Plus d'un an"] },
  { id:2, sec:"A", type:"scale", q:"Sur 10, où se situe ta douleur aujourd'hui ?", minL:"Je vais bien", maxL:"Douleur intense" },
  { id:3, sec:"A", type:"qcm", q:"Tu penses encore à cette personne...",
    opts:["Constamment","Souvent","Parfois","Rarement"] },
  { id:4, sec:"A", type:"multi", max:3, q:"Cette relation t'a fait douter de...",
    opts:["Ta valeur en tant que partenaire","Ta capacité à bien aimer","Ton jugement","Ta confiance en toi","Ton avenir"] },
  { id:5, sec:"A", type:"qcm", q:"Revivons-nous quelque chose de déjà vécu ?",
    opts:["Oui c'est un schéma","Peut-être","Non c'est différent"] },
  { id:6, sec:"B", type:"qcm", q:"Quand quelqu'un ne répond pas pendant des heures, tu...",
    opts:["Paniques et envoies des messages","T'inquiètes en silence","Restes calme","Te sens soulagé(e)"] },
  { id:7, sec:"B", type:"qcm", q:"Dans une relation, le plus dur pour toi c'est...",
    opts:["Avoir peur d'être abandonné(e)","La trop grande proximité","Exprimer tes besoins","Faire confiance"] },
  { id:8, sec:"B", type:"qcm", q:"Après une soirée parfaite, tu ressens...",
    opts:["Une anxiété — et si ce n'était pas réciproque ?","Un léger recul — besoin d'espace","De la joie simple","De la méfiance"] },
  { id:9, sec:"B", type:"qcm", q:"Face à un conflit, ta première réaction c'est...",
    opts:["Tout faire pour réconcilier vite","Te fermer et t'isoler","En parler calmement","Fuir la situation"] },
  { id:10, sec:"B", type:"agree", q:"Je préfère souffrir seul(e) plutôt que de demander de l'aide." },
  { id:11, sec:"B", type:"qcm", q:"Dans l'amour, tu te sens le plus souvent...",
    opts:["Trop attaché(e) — peur de perdre","Distant(e) — besoin d'espace","Équilibré(e)","Perdu(e) — les deux à la fois"] },
];

const EXOS = {
  comprendre: [
    {
      id: "c1",
      title: "La ligne du temps",
      intro: "Chaque relation laisse une empreinte. Cet exercice t'aide à voir les fils invisibles qui relient tes histoires d'amour.",
      steps: [
        { type: "coach", text: "Pense à tes 3 dernières relations importantes. Pas besoin d'aller loin dans les détails — juste les ressentir." },
        { type: "textarea", q: "Dans chaque relation, comment te sentais-tu au fond ? (en sécurité, anxieux·se, libre, étouffé·e...)" },
        { type: "textarea", q: "Y a-t-il un type de personne que tu choisis souvent ? Décris ce profil honnêtement." },
        { type: "choice", q: "Ce schéma relationnel vient selon toi...", opts: ["De ma relation avec mes parents","D'une blessure ancienne","D'une croyance sur ce que je mérite","Je ne sais pas encore"] },
        { type: "textarea", q: "Qu'est-ce que cette ligne du temps te révèle sur toi ?" },
      ]
    },
    {
      id: "c2",
      title: "Tes croyances sur l'amour",
      intro: "Nos croyances sur l'amour se forment tôt — souvent avant qu'on sache qu'elles existent. Inspiré du travail de Byron Katie.",
      steps: [
        { type: "coach", text: "Lis chaque affirmation. Réponds vite, sans réfléchir. C'est ta première réaction qui compte." },
        { type: "belief", q: "Je dois mériter d'être aimé(e).", opts: ["Vrai, je le ressens","Parfois vrai","Faux, j'ai de la valeur","Je ne sais pas"] },
        { type: "belief", q: "Si quelqu'un me quitte, c'est que je ne suis pas assez bien.", opts: ["Vrai, je le ressens","Parfois vrai","Faux, les ruptures sont complexes","Je ne sais pas"] },
        { type: "belief", q: "L'amour fait toujours souffrir.", opts: ["Vrai, c'est mon expérience","Parfois vrai","Faux, l'amour peut être léger","Je ne sais pas"] },
        { type: "textarea", q: "Quelle est LA croyance sur l'amour qui te pèse le plus ? Écris-la ici." },
        { type: "textarea", q: "Imagine un monde où cette croyance n'est pas vraie. Qu'est-ce qui changerait pour toi ?" },
      ]
    },
    {
      id: "c3",
      title: "La carte de tes valeurs",
      intro: "Quand une relation se termine, c'est souvent parce que des valeurs fondamentales ont été trahies.",
      steps: [
        { type: "coach", text: "Les valeurs ne sont pas des qualités qu'on admire chez les autres. Ce sont les choses sans lesquelles tu ne peux pas être toi-même." },
        { type: "multicheck", max: 5, q: "Choisis tes 5 valeurs les plus essentielles :", opts: ["Liberté","Sécurité","Authenticité","Loyauté","Croissance","Tendresse","Indépendance","Profondeur","Humour","Respect","Passion","Stabilité"] },
        { type: "textarea", q: "Dans ta dernière relation, laquelle de ces valeurs était régulièrement bafouée ?" },
        { type: "choice", q: "Tu as accepté cette trahison de tes valeurs parce que...", opts: ["Peur de perdre l'autre","L'amour demande des compromis","Je ne me sentais pas légitime d'exiger","Je n'en avais pas conscience"] },
        { type: "textarea", q: "Comment tes valeurs vont-elles guider tes choix dans ta prochaine relation ?" },
      ]
    },
  ],
  guerir: [
    {
      id: "g1",
      title: "Tes ressources cachées",
      intro: "On guérit par les forces, pas seulement par les blessures. Cet exercice révèle ce que les épreuves t'ont donné sans que tu t'en rendes compte.",
      steps: [
        { type: "coach", text: "Pense à un moment difficile dans ta vie que tu as traversé et surmonté. Pas forcément cette relation." },
        { type: "textarea", q: "Décris ce moment en quelques lignes. Qu'est-ce qui s'est passé ?" },
        { type: "textarea", q: "Qu'est-ce qui t'a aidé(e) à traverser ça ? (une qualité, une personne, une décision...)" },
        { type: "multicheck", max: 4, q: "Quelles forces as-tu utilisées sans t'en rendre compte ?", opts: ["Courage","Résilience","Humour","Créativité","Persévérance","Empathie","Intuition","Détermination","Adaptabilité","Foi en la vie"] },
        { type: "textarea", q: "Comment ces mêmes forces sont-elles disponibles pour toi aujourd'hui ?" },
        { type: "coach", text: "Ce que tu as surmonté avant, tu peux le surmonter encore. Tu l'as déjà prouvé." },
      ]
    },
    {
      id: "g2",
      title: "Ta voix intérieure",
      intro: "On se parle souvent avec une dureté qu'on n'oserait jamais infliger à quelqu'un qu'on aime. Inspiré de la self-compassion de Kristin Neff.",
      steps: [
        { type: "coach", text: "Pense à la voix dans ta tête quand tu te juges sur cette relation — sur tes choix, tes erreurs, ce que tu aurais dû faire." },
        { type: "textarea", q: "Qu'est-ce que cette voix dit de toi ? Écris ses mots les plus durs." },
        { type: "coach", text: "Maintenant imagine que ta meilleure amie te dit exactement la même chose — qu'elle a fait les mêmes choix que toi." },
        { type: "textarea", q: "Qu'est-ce que tu lui dirais, à elle ? Comment la traiterais-tu ?" },
        { type: "textarea", q: "Peux-tu t'adresser à toi-même avec ces mêmes mots doux ? Écris-le." },
        { type: "choice", q: "Après cet exercice, comment te sens-tu ?", opts: ["Plus doux·ce envers moi-même","Ca reste difficile","Surpris(e) de ce que j'ai écrit","Quelque chose s'est déplacé en moi"] },
      ]
    },
    {
      id: "g3",
      title: "La lettre de libération",
      intro: "Écrire ce qu'on n'a jamais dit libère quelque chose de profond. Cette lettre n'est pas pour être envoyée. Elle est pour toi.",
      steps: [
        { type: "coach", text: "Tu vas écrire une lettre. Pas pour l'autre. Pour toi. Dis tout ce que tu n'as jamais pu dire — ta colère, ta tristesse, ce que tu regrettes." },
        { type: "textarea", q: "Commence par : Il y a des choses que je n'ai jamais dites et que je dois poser ici..." },
        { type: "coach", text: "Maintenant, une deuxième lettre. Celle-ci, tu te l'écris à toi-même. À la personne qui a aimé et qui est en train de se retrouver." },
        { type: "textarea", q: "Commence par : Je veux que tu saches que..." },
        { type: "choice", q: "Comment tu te sens après avoir écrit ces deux lettres ?", opts: ["Plus léger(e), quelque chose s'est libéré","Ca a remué des choses importantes","Encore beaucoup d'émotions","Une certaine paix s'installe"] },
      ]
    },
  ],
  construire: [
    {
      id: "b1",
      title: "La visualisation du moi épanoui",
      intro: "Se projeter dans la version de soi qu'on veut devenir active quelque chose de profond. C'est une répétition mentale de ta propre transformation.",
      steps: [
        { type: "coach", text: "Trouve un endroit calme. Respire lentement 3 fois. Maintenant projette-toi 2 ans dans le futur — une version de toi épanoui(e) en amour et dans ta vie." },
        { type: "textarea", q: "Décris cette version de toi. Comment tu te sens ? Comment tu vis ? Comment tu aimes ?" },
        { type: "textarea", q: "Dans cette vie, qu'est-ce qui est radicalement différent d'aujourd'hui ?" },
        { type: "textarea", q: "Qu'est-ce que cette version future de toi voudrait dire à la version d'aujourd'hui ?" },
        { type: "choice", q: "Cette vision de toi épanoui(e), elle te semble...", opts: ["Accessible et réelle","Belle mais lointaine","Exactement ce que je veux","Plus proche que je ne le pensais"] },
      ]
    },
    {
      id: "b2",
      title: "Les piliers d'une vraie relation",
      intro: "L'amour sain ne s'improvise pas. Il repose sur des fondations que tu peux maintenant nommer clairement. Inspiré de John Gottman et Erich Fromm.",
      steps: [
        { type: "coach", text: "Une vraie relation ne se construit pas sur l'intensité des débuts, ni sur la peur de la perdre. Elle se construit sur des fondations solides." },
        { type: "multicheck", max: 4, q: "Tes 4 fondations non-négociables :", opts: ["Confiance totale","Communication vraie","Respect de l'espace","Projets communs","Désir et attraction","Amitié profonde","Valeurs communes","Soutien mutuel","Liberté préservée","Stabilité émotionnelle"] },
        { type: "textarea", q: "Dans ta prochaine relation, qu'est-ce que tu vas faire différemment dès le début ?" },
        { type: "textarea", q: "Quelle est la chose que tu ne feras plus jamais au nom de l'amour ?" },
        { type: "choice", q: "Face à quelqu'un qui t'attire mais ne respecte pas une de tes fondations, tu...", opts: ["Je partirai — j'ai appris","Je lui laisserai une chance d'évoluer","Je poserai mes limites clairement","Je ne sais pas encore"] },
      ]
    },
    {
      id: "b3",
      title: "Ta lettre d'engagement",
      intro: "Inspiré du livre L'homme qui voulait être heureux : le bonheur commence par un engagement profond envers soi-même.",
      steps: [
        { type: "coach", text: "Tu as traversé quelque chose de difficile. Tu as travaillé sur toi. Maintenant, il est temps de te faire une promesse — pas à l'autre, à toi." },
        { type: "textarea", q: "Écris ta promesse envers toi-même. Ce que tu t'engages à ne plus faire, et ce que tu t'engages à honorer." },
        { type: "multicheck", max: 3, q: "Les 3 choses concrètes que tu vas faire cette semaine pour toi :", opts: ["Reprendre une activité que j'aimais","Passer du temps avec des gens qui me font du bien","Écrire chaque jour 3 choses positives sur moi","Pratiquer la méditation","Faire de l'exercice","M'accorder du temps seul(e)","Lire un livre inspirant","Créer quelque chose"] },
        { type: "textarea", q: "Dans 6 mois, si tu lis cette lettre, qu'est-ce que tu veux pouvoir te dire ?" },
        { type: "coach", text: "Tu mérites l'amour que tu donnes aux autres. Commence par te l'offrir à toi-même." },
      ]
    },
  ],
  saimer: [
    {
      id: "s1",
      title: "Ta voix intérieure",
      intro: "Nous avons tous une voix qui commente et juge. Cet exercice inspiré de la thérapie ACT t'aide à identifier cette voix et à ne plus la laisser diriger ta vie.",
      steps: [
        { type: "coach", text: "Ferme les yeux un instant. Écoute ce que ta voix intérieure te dit en ce moment sur toi-même. Sans la juger — juste l'observer." },
        { type: "textarea", q: "Quels sont les 3 messages récurrents que cette voix te répète sur toi ? (exemple : tu n'es pas assez bien, tu aurais dû faire mieux...)" },
        { type: "choice", q: "Cette voix intérieure ressemble le plus à...", opts: ["Un critique sévère qui ne te fait jamais confiance","Un juge qui comptabilise toutes tes erreurs","Un protecteur anxieux qui anticipe le pire","Un perfectionniste qui ne te laisse jamais tranquille"] },
        { type: "textarea", q: "Si cette voix était une personne, que lui dirais-tu ? Parle-lui directement." },
        { type: "textarea", q: "Maintenant, imagine une voix qui t'aimerait inconditionnellement. Qu'est-ce qu'elle te dirait sur toi ?" },
        { type: "coach", text: "Tu n'es pas cette voix. Tu es celui ou celle qui l'entend. Et tu peux choisir à laquelle tu obéis." },
      ]
    },
    {
      id: "s2",
      title: "L'amour de soi au quotidien",
      intro: "L'amour de soi n'est pas un sentiment — c'est une pratique. Inspiré de Brené Brown : on construit l'amour de soi chaque jour par des actes concrets.",
      steps: [
        { type: "coach", text: "L'amour de soi se voit dans les petites décisions quotidiennes. Pas dans les grandes déclarations." },
        { type: "choice", q: "Quand tu as un besoin (repos, aide, espace), tu...", opts: ["L'ignores et continues comme si de rien n'était","L'exprimes difficilement, avec culpabilité","Attends que l'autre devine sans demander","Le reconnais et le poses clairement"] },
        { type: "textarea", q: "Qu'est-ce que tu t'interdis de faire pour toi par peur du regard des autres ou par culpabilité ?" },
        { type: "multicheck", max: 4, q: "Les actes d'amour envers toi que tu vas pratiquer :", opts: ["Dire non sans m'excuser","Me reposer sans culpabilité","Demander de l'aide sans honte","Bien me nourrir et bien dormir","M'offrir du temps seul(e)","Célébrer mes petites réussites","Poser des limites claires","Prendre du plaisir sans le mériter"] },
        { type: "textarea", q: "Quel est l'acte d'amour envers toi-même que tu repousses depuis trop longtemps ? Qu'est-ce qui t'en empêche ?" },
      ]
    },
    {
      id: "s3",
      title: "La joie sans condition",
      intro: "La joie n'attend pas les circonstances idéales. Elle se choisit et se cultive. Inspiré de L'homme qui voulait être heureux de Laurent Gounelle.",
      steps: [
        { type: "coach", text: "La joie de vivre ne vient pas de l'extérieur. Elle ne viendra pas d'une relation, d'un succès ou d'une validation. Elle est déjà en toi." },
        { type: "textarea", q: "Qu'est-ce qui te faisait ressentir de la joie pure avant — avant cette relation, avant ces épreuves ?" },
        { type: "textarea", q: "En ce moment, qu'est-ce qui, même légèrement, te fait te sentir vivant(e) ?" },
        { type: "choice", q: "Ta relation à la solitude aujourd'hui, c'est...", opts: ["Un vide qui me pèse — j'ai du mal à être seul(e)","Un repos bienvenu — j'apprends à l'apprécier","Un espace de liberté que je commence à aimer","Ma fondation — je me retrouve quand je suis seul(e)"] },
        { type: "textarea", q: "Si tu savais que personne ne te juge et que tu ne risques rien — qu'est-ce que tu ferais pour toi dès demain ?" },
        { type: "coach", text: "Tu n'as pas besoin de quelqu'un pour commencer à vivre pleinement. Tu as juste besoin de toi." },
        { type: "textarea", q: "Écris ta propre définition de la joie. Pas celle des livres ou des réseaux sociaux. La tienne." },
      ]
    },
  ],
};

function calcAttachment(ans) {
  const scores = { anxieux: 0, evitant: 0, secure: 0, desorganise: 0 };
  const map = {
    6:  ["anxieux","evitant","secure","secure"],
    7:  ["anxieux","evitant","secure","desorganise"],
    8:  ["anxieux","evitant","secure","desorganise"],
    9:  ["anxieux","evitant","secure","evitant"],
    11: ["anxieux","evitant","secure","desorganise"],
  };
  for (const [k, arr] of Object.entries(map)) {
    const v = ans[+k];
    if (typeof v === "number" && v >= 0 && v < arr.length) scores[arr[v]]++;
  }
  return Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
}

function calcPhase(ans) {
  const pain = ans[2] ?? 5;
  const time = ans[1] ?? 2;
  if (pain >= 7 || time === 0) return "comprendre";
  if (pain >= 4 || time === 1) return "guerir";
  if (pain >= 2) return "construire";
  return "saimer";
}

const ATTACHMENTS = {
  anxieux:     { label: "Style anxieux",      desc: "Tu aimes profondément mais tu as peur d'être abandonné(e). Tu cherches la validation et tu peux t'accrocher fort. La bonne nouvelle : tu sais aimer avec intensité.", color: "#E8705A" },
  evitant:     { label: "Style évitant",      desc: "Tu préfères l'indépendance et tu te méfies de la proximité. Tu t'es protégé(e) en gardant de la distance. La bonne nouvelle : tu es capable d'une grande loyauté.", color: "#7A9E8B" },
  secure:      { label: "Style sécure",       desc: "Tu as une base solide pour aimer. Tu peux être blessé(e) sans remettre en question ta valeur. Continue à faire confiance à ton intuition.", color: "#4A90D9" },
  desorganise: { label: "Style désorganisé",  desc: "L'amour t'attire et te fait peur à la fois. Tu as vécu des expériences complexes qui t'ont appris à ne plus faire confiance. Le travail sur toi est la clé.", color: "#9B59B6" },
};

const C = {
  coral:   "#E8705A",
  dark:    "#C4574A",
  cream:   "#F5EDE6",
  creamD:  "#EDD5CC",
  black:   "#1A1A1A",
  mid:     "#8B7060",
  white:   "#FFFFFF",
  light:   "#FFF0EB",
};

const BTN = {
  width:"100%", padding:"16px 24px", borderRadius:14, fontSize:14,
  fontFamily:"Georgia,serif", cursor:"pointer", border:"none",
  background:C.black, color:C.white, fontWeight:600,
};

const BTN_CORAL = {
  ...BTN, background:C.coral, boxShadow:"0 6px 20px rgba(232,112,90,0.3)",
};

const CARD = {
  background:C.white, borderRadius:16, padding:"18px 20px",
  marginBottom:12, border:"1px solid "+C.creamD, cursor:"pointer",
};

export default function App() {
  const [screen, setScreen]     = useState("onboarding");
  const [dStep, setDStep]       = useState(0);
  const [dAns, setDAns]         = useState({});
  const [results, setResults]   = useState(() => {
    try { const s = localStorage.getItem("rl_results"); return s ? JSON.parse(s) : null; } catch { return null; }
  });
  const [completed, setCompleted] = useState(() => {
    try { const s = localStorage.getItem("rl_completed"); return s ? new Set(JSON.parse(s)) : new Set(); } catch { return new Set(); }
  });
  const [curPhase, setCurPhase] = useState(null);
  const [curExo, setCurExo]     = useState(null);
  const [eStep, setEStep]       = useState(0);
  const [eAns, setEAns]         = useState({});
  const [exoResult, setExoResult] = useState(null);
  const [exoLoading, setExoLoading] = useState(false);
  const [bilan, setBilan]       = useState(null);
  const [bilanLoading, setBilanLoading] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatIn, setChatIn]     = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const totalExos = Object.values(EXOS).flat().length;
  const progress  = results ? Math.round(completed.size / totalExos * 100) : 0;

  function markCompleted(id) {
    setCompleted(p => {
      const next = new Set([...p, id]);
      try { localStorage.setItem("rl_completed", JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  function saveResults(r) {
    setResults(r);
    try { localStorage.setItem("rl_results", JSON.stringify(r)); } catch {}
  }

  function reset() {
    if (window.confirm("Recommencer depuis le début ?")) {
      try { localStorage.clear(); } catch {}
      setResults(null); setCompleted(new Set()); setScreen("onboarding");
    }
  }

  // ── DIAGNOSTIC ──────────────────────────────────────────────────────────
  const currQ = DIAG[dStep];

  function dCanNext() {
    const a = dAns[dStep];
    if (!currQ) return false;
    if (currQ.type === "scale") return a !== undefined;
    if (currQ.type === "multi") return a && a.length > 0;
    if (currQ.type === "agree") return a !== undefined;
    return a !== undefined;
  }

  function dNext() {
    if (dStep < DIAG.length - 1) { setDStep(s => s+1); return; }
    const r = { attachment: calcAttachment(dAns), phase: calcPhase(dAns) };
    saveResults(r);
    setScreen("results");
  }

  // ── EXERCICE ─────────────────────────────────────────────────────────────
  function startExo(exo) {
    setCurExo(exo); setEStep(0); setEAns({}); setExoResult(null); setScreen("exo");
  }

  const curStep = curExo ? curExo.steps[eStep] : null;

  function canNext() {
    if (!curStep) return false;
    if (curStep.type === "coach") return true;
    const a = eAns[eStep];
    if (curStep.type === "textarea") return a && a.trim().length > 3;
    if (curStep.type === "multicheck") return a && a.length > 0;
    return a !== undefined;
  }

  async function eNext() {
    if (eStep < curExo.steps.length - 1) { setEStep(s => s+1); return; }
    setExoLoading(true);
    const answers = curExo.steps.map((s,i) => {
      const a = eAns[i];
      if (s.type === "coach") return null;
      if (!a && a !== 0) return null;
      let ansText = "";
      if (s.type === "textarea") ansText = a;
      else if (s.type === "choice" || s.type === "belief") ansText = s.opts[a];
      else if (s.type === "multicheck") ansText = a.map(x => s.opts[x]).join(", ");
      else if (s.type === "scale") ansText = a + "/10";
      return { q: s.q, a: ansText };
    }).filter(Boolean);
    try {
      const res = await fetch(BACKEND+"/api/analyse", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ exercice: curExo.title, answers })
      });
      const d = await res.json();
      setExoResult(d);
    } catch {
      setExoResult({ titre:"Exercice terminé", analyse:"Bravo pour ce travail en profondeur.", force:"Ta persévérance", conseil:"Continue à avancer à ton rythme.", affirmation:"Je suis en chemin vers moi-même." });
    }
    markCompleted(curExo.id);
    setExoLoading(false);
    setScreen("exo-result");
  }

  // ── BILAN ────────────────────────────────────────────────────────────────
  async function loadBilan() {
    setBilanLoading(true);
    try {
      const res = await fetch(BACKEND+"/api/bilan", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ attachment: results?.attachment, phase: results?.phase })
      });
      const d = await res.json();
      setBilan(d);
    } catch {
      setBilan({ lettre:"Félicitations pour avoir complété ce parcours. Tu as fait un travail remarquable.", profil_ideal:"Quelqu'un qui te respecte et te laisse être toi-même.", compatibilites:["Communication ouverte","Respect mutuel"], incompatibilites:["Manipulation","Manque de respect"], reglages:["Continue à travailler sur tes croyances"] });
    }
    setBilanLoading(false);
    setScreen("bilan");
  }

  // ── COACH ────────────────────────────────────────────────────────────────
  async function sendChat() {
    if (!chatIn.trim() || chatLoading) return;
    const msg = chatIn.trim();
    setChatIn("");
    setChatMsgs(p => [...p, { role:"user", content:msg }]);
    setChatLoading(true);
    try {
      const res = await fetch(BACKEND+"/api/coach", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ message:msg, history:chatMsgs, context: results })
      });
      const d = await res.json();
      setChatMsgs(p => [...p, { role:"assistant", content:d.message||d.response||"..." }]);
    } catch {
      setChatMsgs(p => [...p, { role:"assistant", content:"Je suis là. Continue à me parler." }]);
    }
    setChatLoading(false);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SCREENS
  // ═══════════════════════════════════════════════════════════════════════

  if (screen === "onboarding") return (
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.cream, display:"flex", flexDirection:"column" }}>
      <div style={{ background:C.black, padding:"64px 32px 48px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(232,112,90,0.12)" }} />
        <div style={{ fontSize:10, letterSpacing:4, color:C.coral, textTransform:"uppercase", marginBottom:20, fontWeight:700 }}>Marlène Gasmi · Coach certifiée</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:46, fontWeight:300, color:"#fff", lineHeight:1.15, margin:"0 0 8px" }}>
          Comprendre.<br />
          <span style={{ fontStyle:"italic", color:C.coral }}>Guérir.</span><br />
          Construire.
        </h1>
        <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", lineHeight:1.8, marginTop:20 }}>
          Un chemin de transformation pour réparer ce qui a été abîmé — et accueillir l'amour que tu mérites.
        </p>
      </div>
      <div style={{ flex:1, padding:"32px 24px" }}>
        {[
          { icon:"◇", title:"Diagnostic précis", desc:"Relation vécue + style d'attachement identifié" },
          { icon:"◈", title:"Vrais exercices de coaching", desc:"Croyances, valeurs, forces, lettres thérapeutiques" },
          { icon:"◉", title:"Coach IA personnel", desc:"Disponible à tout moment, bienveillant et direct" },
        ].map((f,i) => (
          <div key={i} style={{ display:"flex", gap:16, marginBottom:24, alignItems:"flex-start" }}>
            <div style={{ width:40, height:40, borderRadius:12, background:C.light, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:C.coral, fontSize:16 }}>{f.icon}</div>
            <div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:18, fontWeight:500, color:C.black, marginBottom:4 }}>{f.title}</div>
              <div style={{ fontSize:13, color:C.mid, lineHeight:1.6 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:"0 24px 52px" }}>
        <button onClick={() => setScreen("diagnostic")} style={BTN_CORAL}>Commencer mon diagnostic</button>
        <p style={{ textAlign:"center", fontSize:12, color:C.mid, marginTop:12 }}>Confidentiel · Bienveillant · Transformateur</p>
      </div>
    </div>
  );

  if (screen === "diagnostic") return (
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.cream }}>
      <div style={{ background:C.black, padding:"52px 24px 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <button onClick={() => { setDStep(0); setDAns({}); setScreen("onboarding"); }} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:13 }}>← Retour</button>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:2 }}>{dStep+1}/{DIAG.length}</span>
        </div>
        <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:99, height:3 }}>
          <div style={{ width:`${(dStep+1)/DIAG.length*100}%`, height:"100%", background:C.coral, borderRadius:99, transition:"width 0.4s" }} />
        </div>
        <div style={{ fontSize:10, color:C.coral, letterSpacing:2, textTransform:"uppercase", marginTop:16, fontWeight:700 }}>
          {currQ?.sec === "A" ? "Ta relation passée" : "Ton style d'attachement"}
        </div>
      </div>
      <div style={{ padding:"28px 24px" }}>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:400, color:C.black, lineHeight:1.6, marginBottom:28 }}>{currQ?.q}</h2>
        {currQ?.type === "qcm" || currQ?.type === "choice" ? (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {currQ.opts.map((opt,i) => (
              <button key={i} onClick={() => setDAns(p=>({...p,[dStep]:i}))}
                style={{ padding:"16px 20px", borderRadius:12, fontSize:14, fontFamily:"Georgia,serif", cursor:"pointer", textAlign:"left", lineHeight:1.5, background:dAns[dStep]===i?C.black:C.white, color:dAns[dStep]===i?"#fff":C.black, border:dAns[dStep]===i?"2px solid "+C.black:"1px solid "+C.creamD, display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ width:20, height:20, borderRadius:"50%", flexShrink:0, background:dAns[dStep]===i?C.coral:"transparent", border:dAns[dStep]===i?"none":"1.5px solid "+C.creamD, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {dAns[dStep]===i && <span style={{ color:"#fff", fontSize:10 }}>✓</span>}
                </span>
                {opt}
              </button>
            ))}
          </div>
        ) : currQ?.type === "scale" ? (
          <div>
            <input type="range" min={0} max={10} value={dAns[dStep]??5} onChange={e=>setDAns(p=>({...p,[dStep]:+e.target.value}))} style={{ width:"100%", accentColor:C.coral }} />
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.mid, marginTop:8 }}>
              <span>{currQ.minL}</span><span style={{ fontSize:22, fontFamily:"Georgia,serif", color:C.coral, fontWeight:400 }}>{dAns[dStep]??5}</span><span>{currQ.maxL}</span>
            </div>
          </div>
        ) : currQ?.type === "multi" ? (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {currQ.opts.map((opt,i) => {
              const sel = (dAns[dStep]||[]).includes(i);
              return (
                <button key={i} onClick={() => {
                  const cur = dAns[dStep]||[];
                  const next = sel ? cur.filter(x=>x!==i) : cur.length < currQ.max ? [...cur,i] : cur;
                  setDAns(p=>({...p,[dStep]:next}));
                }} style={{ padding:"14px 18px", borderRadius:12, fontSize:14, fontFamily:"Georgia,serif", cursor:"pointer", textAlign:"left", background:sel?C.black:C.white, color:sel?"#fff":C.black, border:sel?"2px solid "+C.black:"1px solid "+C.creamD }}>
                  {opt}
                </button>
              );
            })}
            <div style={{ fontSize:12, color:C.mid, marginTop:4 }}>Jusqu'à {currQ.max} réponses</div>
          </div>
        ) : currQ?.type === "agree" ? (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {["Pas du tout d'accord","Plutôt pas d'accord","Neutre","Plutôt d'accord","Tout à fait d'accord"].map((opt,i) => (
              <button key={i} onClick={() => setDAns(p=>({...p,[dStep]:i}))}
                style={{ padding:"14px 18px", borderRadius:12, fontSize:14, fontFamily:"Georgia,serif", cursor:"pointer", background:dAns[dStep]===i?C.black:C.white, color:dAns[dStep]===i?"#fff":C.black, border:dAns[dStep]===i?"2px solid "+C.black:"1px solid "+C.creamD }}>{opt}</button>
            ))}
          </div>
        ) : null}
        <div style={{ marginTop:32 }}>
          <button onClick={dNext} disabled={!dCanNext()} style={{ ...BTN, background:dCanNext()?C.black:C.creamD, color:dCanNext()?"#fff":"#A09090", cursor:dCanNext()?"pointer":"default" }}>
            {dStep < DIAG.length-1 ? "Question suivante →" : "Voir mon profil →"}
          </button>
        </div>
      </div>
    </div>
  );

  if (screen === "results") {
    const att = ATTACHMENTS[results?.attachment] || ATTACHMENTS.secure;
    const ph  = PHASES.find(p => p.id === results?.phase) || PHASES[0];
    return (
      <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.cream }}>
        <div style={{ background:C.black, padding:"52px 24px 32px" }}>
          <div style={{ fontSize:10, letterSpacing:3, color:C.coral, textTransform:"uppercase", marginBottom:16, fontWeight:700 }}>Ton profil</div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:28, fontWeight:300, color:"#fff", marginBottom:8, fontStyle:"italic" }}>{att.label}</h2>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.7)", lineHeight:1.8 }}>{att.desc}</p>
        </div>
        <div style={{ padding:"24px" }}>
          <div style={{ background:C.white, borderRadius:16, padding:"20px 24px", border:"2px solid "+C.coral, marginBottom:16 }}>
            <div style={{ fontSize:10, color:C.coral, letterSpacing:2, fontWeight:700, marginBottom:8 }}>★ RECOMMANDÉ POUR TOI</div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:28 }}>{ph.emoji}</span>
              <div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:20, color:C.black, fontWeight:500 }}>{ph.title}</div>
                <div style={{ fontSize:13, color:C.mid }}>{ph.sub}</div>
              </div>
            </div>
          </div>
          <button onClick={() => setScreen("home")} style={BTN_CORAL}>Commencer mon parcours →</button>
        </div>
      </div>
    );
  }

  if (screen === "home") return (
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.cream, paddingBottom:80 }}>
      <div style={{ background:C.black, padding:"52px 24px 28px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, right:-40, width:120, height:120, borderRadius:"50%", background:"rgba(232,112,90,0.1)" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:3, color:C.coral, textTransform:"uppercase", fontWeight:700, marginBottom:8 }}>Ton parcours</div>
            <h1 style={{ fontFamily:"Georgia,serif", fontSize:32, fontWeight:300, color:"#fff", lineHeight:1.2 }}>
              Bienvenue<span style={{ color:C.coral, fontStyle:"italic" }}>.</span>
            </h1>
          </div>
          <button onClick={reset} style={{ background:"rgba(255,255,255,0.1)", border:"none", fontSize:10, color:"rgba(255,255,255,0.5)", cursor:"pointer", borderRadius:8, padding:"6px 10px", fontFamily:"Georgia,serif", letterSpacing:1 }}>RESET</button>
        </div>
        <div style={{ marginTop:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>{completed.size} / {totalExos} exercices</span>
            <span style={{ fontSize:22, fontFamily:"Georgia,serif", color:C.coral }}>{progress}%</span>
          </div>
          <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:99, height:4 }}>
            <div style={{ width:`${progress}%`, height:"100%", background:C.coral, borderRadius:99, transition:"width 0.8s" }} />
          </div>
        </div>
      </div>
      <div style={{ padding:"28px 24px 0" }}>
        <div style={{ fontSize:10, letterSpacing:3, color:C.mid, textTransform:"uppercase", fontWeight:700, marginBottom:16 }}>Les 4 étapes</div>
        {PHASES.map((ph,i) => {
          const done   = EXOS[ph.id].filter(e => completed.has(e.id)).length;
          const isReco = results?.phase === ph.id;
          const isDone = done === EXOS[ph.id].length;
          return (
            <div key={ph.id} onClick={() => { setCurPhase(ph.id); setScreen("phase-"+ph.id); }}
              style={{ background:isDone?C.black:C.white, borderRadius:16, padding:"20px", marginBottom:12, border:isReco?"2px solid "+C.coral:isDone?"none":"1px solid "+C.creamD, cursor:"pointer", display:"flex", alignItems:"center", gap:16, boxShadow:isReco?"0 4px 16px rgba(232,112,90,0.15)":"none" }}>
              <div style={{ width:52, height:52, borderRadius:14, background:isDone?"rgba(255,255,255,0.1)":C.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>
                {isDone ? "✓" : ph.emoji}
              </div>
              <div style={{ flex:1 }}>
                {isReco && <div style={{ fontSize:10, color:C.coral, letterSpacing:1.5, marginBottom:4, fontWeight:700 }}>★ RECOMMANDÉ</div>}
                <div style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:500, color:isDone?"#fff":C.black, marginBottom:4 }}>{ph.title}</div>
                <div style={{ fontSize:12, color:isDone?"rgba(255,255,255,0.5)":C.mid }}>{done}/{EXOS[ph.id].length} exercices · {ph.sub}</div>
              </div>
              <div style={{ color:isDone?"rgba(255,255,255,0.3)":C.creamD, fontSize:18 }}>›</div>
            </div>
          );
        })}
      </div>
      <div style={{ padding:"20px 24px 0" }}>
        <button onClick={() => setScreen("coach")} style={{ ...BTN_CORAL, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
          <span style={{ fontSize:16 }}>◎</span> Parler à ton coach IA
        </button>
      </div>
      {completed.size === totalExos && (
        <div style={{ margin:"20px 24px 0", background:C.black, borderRadius:16, padding:"20px 24px" }}>
          <div style={{ fontSize:10, color:C.coral, letterSpacing:2, fontWeight:700, marginBottom:8 }}>PARCOURS TERMINÉ</div>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.7)", marginBottom:16, lineHeight:1.7 }}>Tu as complété les {totalExos} exercices. Découvre ton bilan personnalisé.</p>
          <button onClick={loadBilan} style={BTN_CORAL}>Voir mon bilan final →</button>
        </div>
      )}
    </div>
  );

  if (screen.startsWith("phase-")) {
    const phId = screen.replace("phase-","");
    const ph   = PHASES.find(p => p.id === phId);
    const exos = EXOS[phId] || [];
    return (
      <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.cream }}>
        <div style={{ background:C.black, padding:"52px 24px 32px" }}>
          <button onClick={() => setScreen("home")} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:13, marginBottom:20 }}>← Retour</button>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <span style={{ fontSize:36 }}>{ph?.emoji}</span>
            <div>
              <h2 style={{ fontFamily:"Georgia,serif", fontSize:28, fontWeight:300, color:"#fff" }}>{ph?.title}</h2>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>{ph?.sub}</div>
            </div>
          </div>
        </div>
        <div style={{ padding:"24px" }}>
          {exos.map((exo,i) => {
            const done = completed.has(exo.id);
            return (
              <div key={exo.id} onClick={() => startExo(exo)} style={{ ...CARD, opacity:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:done?C.black:C.light, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:done?"#fff":C.coral, fontFamily:"Georgia,serif", fontSize:18, fontWeight:400 }}>
                    {done ? "✓" : i+1}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"Georgia,serif", fontSize:17, color:C.black, marginBottom:4 }}>{exo.title}</div>
                    <div style={{ fontSize:12, color:C.mid }}>{exo.steps.length} étapes · {done ? "Terminé" : "À faire"}</div>
                  </div>
                  <div style={{ color:C.creamD, fontSize:18 }}>›</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (screen === "exo" && curExo) {
    const step = curExo.steps[eStep];
    return (
      <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.cream }}>
        <div style={{ background:C.black, padding:"52px 24px 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <button onClick={() => setScreen("phase-"+curPhase)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:13 }}>← Retour</button>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:2 }}>{eStep+1}/{curExo.steps.length}</span>
          </div>
          <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:99, height:3 }}>
            <div style={{ width:`${(eStep+1)/curExo.steps.length*100}%`, height:"100%", background:C.coral, borderRadius:99, transition:"width 0.4s" }} />
          </div>
          <h3 style={{ fontFamily:"Georgia,serif", fontSize:16, fontWeight:300, color:"rgba(255,255,255,0.7)", marginTop:16 }}>{curExo.title}</h3>
        </div>
        <div style={{ padding:"24px" }}>
          {eStep === 0 && (
            <div style={{ background:C.white, borderRadius:12, padding:"16px 20px", marginBottom:20, border:"1px solid "+C.creamD }}>
              <p style={{ fontSize:13, color:C.mid, lineHeight:1.8, fontStyle:"italic" }}>{curExo.intro}</p>
            </div>
          )}
          {step.type === "coach" ? (
            <div style={{ background:C.light, borderRadius:16, padding:"20px 24px", borderLeft:"3px solid "+C.coral }}>
              <div style={{ fontSize:11, color:C.coral, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Ton coach</div>
              <p style={{ fontSize:15, color:C.black, lineHeight:1.9, margin:0, fontStyle:"italic" }}>{step.text}</p>
            </div>
          ) : step.type === "textarea" ? (
            <div>
              <h3 style={{ fontFamily:"Georgia,serif", fontSize:18, fontWeight:400, color:C.black, lineHeight:1.6, marginBottom:20 }}>{step.q}</h3>
              <textarea value={eAns[eStep]||""} onChange={e=>setEAns(p=>({...p,[eStep]:e.target.value}))}
                placeholder="Écris ici, librement et honnêtement..." rows={6}
                style={{ width:"100%", background:C.white, border:"1px solid "+C.creamD, borderRadius:12, padding:"16px", fontSize:14, fontFamily:"Georgia,serif", color:C.black, resize:"none", lineHeight:1.8, boxSizing:"border-box", outline:"none" }} />
            </div>
          ) : step.type === "choice" || step.type === "belief" ? (
            <div>
              <h3 style={{ fontFamily:"Georgia,serif", fontSize:18, fontWeight:400, color:C.black, lineHeight:1.6, marginBottom:20 }}>{step.q}</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {step.opts.map((opt,i) => (
                  <button key={i} onClick={() => setEAns(p=>({...p,[eStep]:i}))}
                    style={{ padding:"16px 20px", borderRadius:12, fontSize:14, fontFamily:"Georgia,serif", cursor:"pointer", textAlign:"left", lineHeight:1.5, background:eAns[eStep]===i?C.black:C.white, color:eAns[eStep]===i?"#fff":C.black, border:eAns[eStep]===i?"2px solid "+C.black:"1px solid "+C.creamD, display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ width:20, height:20, borderRadius:"50%", flexShrink:0, background:eAns[eStep]===i?C.coral:"transparent", border:eAns[eStep]===i?"none":"1.5px solid "+C.creamD, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {eAns[eStep]===i && <span style={{ color:"#fff", fontSize:10 }}>✓</span>}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : step.type === "multicheck" ? (
            <div>
              <h3 style={{ fontFamily:"Georgia,serif", fontSize:18, fontWeight:400, color:C.black, lineHeight:1.6, marginBottom:20 }}>{step.q}</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {step.opts.map((opt,i) => {
                  const sel = (eAns[eStep]||[]).includes(i);
                  return (
                    <button key={i} onClick={() => {
                      const cur = eAns[eStep]||[];
                      const next = sel ? cur.filter(x=>x!==i) : cur.length < step.max ? [...cur,i] : cur;
                      setEAns(p=>({...p,[eStep]:next}));
                    }} style={{ padding:"14px 18px", borderRadius:12, fontSize:14, fontFamily:"Georgia,serif", cursor:"pointer", textAlign:"left", background:sel?C.black:C.white, color:sel?"#fff":C.black, border:sel?"2px solid "+C.black:"1px solid "+C.creamD }}>
                      {opt}
                    </button>
                  );
                })}
                <div style={{ fontSize:12, color:C.mid, marginTop:4 }}>Jusqu'à {step.max} réponses</div>
              </div>
            </div>
          ) : null}
          <div style={{ marginTop:32 }}>
            <button onClick={eNext} disabled={!canNext()||exoLoading}
              style={{ ...BTN, background:canNext()&&!exoLoading?C.black:C.creamD, color:canNext()&&!exoLoading?"#fff":"#A09090", cursor:canNext()&&!exoLoading?"pointer":"default" }}>
              {exoLoading ? "Analyse en cours..." : eStep < curExo.steps.length-1 ? (step.type==="coach"?"J'ai lu →":"Étape suivante →") : "Terminer l'exercice ✓"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "exo-result" && exoResult) return (
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.cream }}>
      <div style={{ background:C.black, padding:"52px 24px 32px" }}>
        <div style={{ fontSize:10, color:C.coral, letterSpacing:3, fontWeight:700, marginBottom:12 }}>ANALYSE PERSONNALISÉE</div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:300, color:"#fff", fontStyle:"italic" }}>{exoResult.titre}</h2>
      </div>
      <div style={{ padding:"24px" }}>
        {[
          { label:"Analyse", content:exoResult.analyse },
          { label:"Ta force", content:exoResult.force },
          { label:"Un conseil", content:exoResult.conseil },
        ].map((item,i) => (
          <div key={i} style={{ background:C.white, borderRadius:16, padding:"20px 24px", marginBottom:12, border:"1px solid "+C.creamD }}>
            <div style={{ fontSize:10, color:C.coral, letterSpacing:2, fontWeight:700, marginBottom:8 }}>{item.label.toUpperCase()}</div>
            <p style={{ fontSize:14, color:C.black, lineHeight:1.8, margin:0 }}>{item.content}</p>
          </div>
        ))}
        {exoResult.affirmation && (
          <div style={{ background:C.black, borderRadius:16, padding:"20px 24px", marginBottom:20 }}>
            <div style={{ fontSize:10, color:C.coral, letterSpacing:2, fontWeight:700, marginBottom:8 }}>TON AFFIRMATION</div>
            <p style={{ fontFamily:"Georgia,serif", fontSize:16, color:"#fff", lineHeight:1.8, margin:0, fontStyle:"italic" }}>{exoResult.affirmation}</p>
          </div>
        )}
        <button onClick={() => setScreen("phase-"+curPhase)} style={BTN_CORAL}>Retour au parcours →</button>
      </div>
    </div>
  );

  if (screen === "bilan") return (
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:C.cream }}>
      <div style={{ background:C.black, padding:"52px 24px 32px" }}>
        <div style={{ fontSize:10, color:C.coral, letterSpacing:3, fontWeight:700, marginBottom:12 }}>TON BILAN FINAL</div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:300, color:"#fff" }}>
          {bilanLoading ? "Génération en cours..." : "Ton parcours complet"}
        </h2>
      </div>
      {bilanLoading ? (
        <div style={{ padding:"48px 24px", textAlign:"center", color:C.mid }}>Analyse de ton parcours...</div>
      ) : bilan && (
        <div style={{ padding:"24px" }}>
          <div style={{ background:C.black, borderRadius:16, padding:"24px", marginBottom:16 }}>
            <div style={{ fontSize:10, color:C.coral, letterSpacing:2, fontWeight:700, marginBottom:12 }}>MESSAGE DE TON COACH</div>
            <p style={{ fontFamily:"Georgia,serif", fontSize:15, color:"rgba(255,255,255,0.85)", lineHeight:1.9, fontStyle:"italic" }}>{bilan.lettre}</p>
          </div>
          {bilan.profil_ideal && (
            <div style={{ background:C.white, borderRadius:16, padding:"20px 24px", marginBottom:12, border:"1px solid "+C.creamD }}>
              <div style={{ fontSize:10, color:C.coral, letterSpacing:2, fontWeight:700, marginBottom:8 }}>TON PROFIL IDÉAL</div>
              <p style={{ fontSize:14, color:C.black, lineHeight:1.8 }}>{bilan.profil_ideal}</p>
            </div>
          )}
          <button onClick={() => setScreen("home")} style={{ ...BTN, marginTop:8 }}>Retour à mon parcours</button>
        </div>
      )}
    </div>
  );

  if (screen === "coach") return (
    <div style={{ maxWidth:430, margin:"0 auto", height:"100vh", background:C.cream, display:"flex", flexDirection:"column" }}>
      <div style={{ background:C.black, padding:"52px 24px 24px", flexShrink:0 }}>
        <button onClick={() => setScreen("home")} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:13, marginBottom:12 }}>← Retour</button>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:24, fontWeight:300, color:"#fff" }}>Ton coach IA</h2>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:4 }}>Disponible à tout moment pour toi</p>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"20px 16px", display:"flex", flexDirection:"column", gap:12 }}>
        {chatMsgs.length === 0 && (
          <div style={{ background:C.white, border:"1px solid "+C.creamD, borderRadius:"16px 16px 16px 4px", padding:"16px 20px", maxWidth:"84%" }}>
            <p style={{ fontSize:14, color:C.black, lineHeight:1.85, margin:0 }}>Bonjour. Je suis ton coach IA. Je suis là pour t'accompagner dans ce chemin de transformation. Qu'est-ce que tu as envie de partager ou d'explorer aujourd'hui ?</p>
          </div>
        )}
        {chatMsgs.map((m,i) => (
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
            <div style={{ maxWidth:"84%", fontSize:14, lineHeight:1.85, padding:"16px 20px", background:m.role==="user"?C.coral:C.white, color:m.role==="user"?"#fff":C.black, border:m.role==="assistant"?"1px solid "+C.creamD:"none", borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px", boxShadow:m.role==="user"?"0 4px 12px rgba(232,112,90,0.25)":"none" }}>
              {m.content}
            </div>
          </div>
        ))}
        {chatLoading && (
          <div style={{ background:C.white, border:"1px solid "+C.creamD, borderRadius:"16px 16px 16px 4px", padding:"16px 20px", color:C.coral, letterSpacing:4, fontSize:20 }}>···</div>
        )}
      </div>
      <div style={{ padding:"12px 16px 32px", borderTop:"1px solid "+C.creamD, background:C.white, display:"flex", gap:10, flexShrink:0 }}>
        <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()}
          placeholder="Écris ton message..." style={{ flex:1, background:C.cream, border:"1px solid "+C.creamD, borderRadius:24, padding:"12px 18px", fontSize:14, fontFamily:"Georgia,serif", outline:"none", color:C.black }} />
        <button onClick={sendChat} disabled={!chatIn.trim()||chatLoading}
          style={{ width:44, height:44, borderRadius:"50%", border:"none", background:(!chatIn.trim()||chatLoading)?C.creamD:C.coral, color:"#fff", fontSize:18, cursor:(!chatIn.trim()||chatLoading)?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center", opacity:(!chatIn.trim()||chatLoading)?0.4:1 }}>
          ↑
        </button>
      </div>
    </div>
  );

  return null;
}
