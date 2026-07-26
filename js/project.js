const projects = {
  1:{
    tag:'Web App', title:'E-Signature', glyph:'01',
    overview:'An AI-powered web platform that verifies the authenticity of digital signatures, built to curb signature forgery and simplify signature-related processes across a campus administrative environment.',
    problem:'Manual signature checks were slow and easy to falsify, leaving approvals vulnerable to forgery and administrative workflows bogged down by paperwork that required manual sign-off.',
    solution:'An AI model trained to authenticate signatures in real time, paired with a simple interface where users create their own digital signature and instantly verify both their own and others submissions.',
    solutionList:['AI-based forgery detection engine','Personal signature creation & secure storage','Instant verification for any submitted signature'],
    results:'Replaced a manual, forgery-prone process with an automated one — giving staff a faster, more reliable way to confirm signature authenticity campus-wide.',
    stack:['React.js', 'Express.js', 'Flask', 'Tensorflow', 'Dart', 'JavaScript', 'Python', 'Dart', 'MySQL'],
    sourceUrl:'https://github.com/E-Signature-Capstone-Project'
  },
  2:{
    tag:'Web App', title:'E-Waste App', glyph:'02',
    overview:'An IoT-powered monitoring web app that uses weight sensors to track waste levels in collection bins in real time, giving waste managers a live view of bin status and location from a single dashboard.',
    problem:'Waste managers had no reliable way to monitor temporary collection bins remotely — bins were often discovered full only after physical checks, leading to overflow, delayed pickups, and inefficient routing.',
    solution:'Weight sensors installed on each bin stream real-time data to a central system, which automatically notifies managers when a bin nears capacity. A web dashboard visualizes live weight readings alongside bin locations for at-a-glance monitoring.',
    solutionList:['IoT weight sensors with real-time data transmission','Automatic full-bin alerts to managers','Map-based dashboard showing bin location and status'],
    results:'Gave managers a proactive, remote monitoring tool — replacing manual bin checks with real-time visibility into waste levels across all locations.',
    stack:['Arduino', , 'React.js', 'C++', 'Supabase', 'Blynk', 'MySQL'],
    sourceUrl:'https://github.com/ryush1x/backend-e-waste-app'
  },
  3:{
    tag:'Game App', title:'Atma', glyph:'03',
    overview:'ATMA is a 2D side-scrolling action-adventure platformer set in a post-apocalyptic world, built as a collaborative team project exploring mystery-driven storytelling through biome-based combat progression. Developed with two teammates as part of an academic game design course, from initial concept through a full production-ready design document.',
    problem:'The team wanted to design a platformer that stays approachable for players new to the genre, without sacrificing depth for experienced ones — and to avoid the common trap of separating "story" from "gameplay," where narrative and combat progression feel disconnected from each other.',
    solution:'Each biome ties its enemies to a specific weapon type — sword, ranged, or magic — that loses effectiveness as difficulty escalates, pushing players to keep exploring rather than grinding one loadout. The story itself is told entirely through environmental storytelling: scattered doctors notes and protagonist monologue, with no character-to-character dialogue, reinforcing the protagonists isolation in a dead world.',
    solutionList:[],
    results:'Delivered a complete design foundation — world, core gameplay loop, enemy roster (normal mobs + bosses), visual/audio direction, and a six-month production schedule — ready to guide the team from prototype through a playable vertical slice.',
    stack:['C#','Unity'],
    sourceUrl:'https://github.com/ryushix/Atma'
  },
  4:{
    tag:'Simulator', title:'Projectile Motion Simulator', glyph:'04',
    overview:'An interactive web-based simulator that models projectile motion using real physics formulas, letting users visualize the trajectory of a launched object based on the parameters they set.',
    problem:'Projectile motion is a core physics concept, but its abstract on paper — static diagrams and equations make it hard for learners to intuitively grasp how variables like angle, velocity, and gravity actually shape a trajectory.',
    solution:'A hands-on simulation where users input their own parameters (launch angle, initial velocity, and similar variables) and immediately see the resulting motion play out, turning a formula-heavy topic into something visual and experimental.',
    solutionList:['Physics-accurate motion calculations','User-adjustable launch parameters','Real-time visual simulation of trajectory'],
    results:'Turned an abstract physics concept into an interactive, visual learning tool — making it easier to build intuition for projectile motion through experimentation rather than memorization.',
    stack:['React.js','Vite.js','JavaScript','HTML5 Canvas'],
    sourceUrl:'https://github.com/rvyhvn/judi-parabola'
  }
};

const params = new URLSearchParams(window.location.search);
const id = params.get('id') || '1';
const data = projects[id] || projects[1];

document.getElementById('crumbTitle').textContent = data.title;
document.getElementById('docTag').textContent = data.tag;
document.getElementById('docTitle').innerHTML = data.title + ' <span class="accent">.</span>';
document.getElementById('docSummary').textContent = data.summary;
document.getElementById('docGlyph').textContent = data.glyph;
document.getElementById('docOverview').textContent = data.overview;
document.getElementById('docProblem').textContent = data.problem;
document.getElementById('docSolution').textContent = data.solution;
document.getElementById('docResults').textContent = data.results;
document.title = data.title + ' — Project Details — Rafi Al Ayyubi';


const coverImg = document.getElementById('docCoverImg');
if(coverImg){
  coverImg.src = `assets/images/projects/project-${id}.jpg`;
  coverImg.alt = data.title + ' preview';
}

const listEl = document.getElementById('docSolutionList');
data.solutionList.forEach(item=>{
  const li = document.createElement('li');
  li.textContent = item;
  listEl.appendChild(li);
});
const stackEl = document.getElementById('docStack');
data.stack.forEach(item=>{
  const span = document.createElement('span');
  span.textContent = item;
  stackEl.appendChild(span);
});

const sourceLink = document.getElementById('sourceLink');
if(sourceLink) sourceLink.href = data.sourceUrl;

const ids = Object.keys(projects).map(Number);
const curIdx = ids.indexOf(Number(id));
const prevId = ids[(curIdx - 1 + ids.length) % ids.length];
const nextId = ids[(curIdx + 1) % ids.length];
document.getElementById('prevProject').href = `project.html?id=${prevId}`;
document.getElementById('prevProject').innerHTML = `← ${projects[prevId].title}`;
document.getElementById('nextProject').href = `project.html?id=${nextId}`;
document.getElementById('nextProject').innerHTML = `${projects[nextId].title} →`;


initGlitchCarousel({
  candidates: [1,2,3].map(n=>`assets/images/projects/project-${id}-${n}.jpg`),
  stage: document.getElementById('galleryStage'),
  dotsContainer: document.getElementById('galDots'),
  prevBtn: document.getElementById('galPrev'),
  nextBtn: document.getElementById('galNext'),
  altPrefix: `${data.title} screenshot`,
  onEmpty: ()=>{
    const section = document.getElementById('gallerySection');
    if(section) section.style.display = 'none';
  }
});


window.addEventListener('load', ()=>{
  const overlay = document.getElementById('decryptOverlay');
  const fill = document.getElementById('doFill');
  const text = document.getElementById('doText');
  text.textContent = `DECRYPTING_${data.title.toUpperCase().replace(/\s+/g,'_')}`;
  let p = 0;
  const iv = setInterval(()=>{
    p += Math.random()*20 + 8;
    if(p >= 100){
      p = 100;
      clearInterval(iv);
      setTimeout(()=>{
        overlay.classList.add('reveal');
        document.body.classList.add('loaded');
      }, 150);
    }
    fill.style.width = p + '%';
  }, 90);
});


document.querySelector('.back-link').addEventListener('click', function(e){
  e.preventDefault();
  const overlay = document.getElementById('decryptOverlay');
  overlay.classList.remove('reveal');
  setTimeout(()=>{ window.location.href = this.href; }, 550);
});
