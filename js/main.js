window.addEventListener('load', ()=>{
  const fill = document.getElementById('preFill');
  const pct = document.getElementById('prePct');
  let p = 0;
  const iv = setInterval(()=>{
    p += Math.random()*18 + 6;
    if(p >= 100){
      p = 100;
      clearInterval(iv);
      setTimeout(()=>{
        document.getElementById('preloader').classList.add('done');
        document.body.classList.add('loaded');
      }, 220);
    }
    fill.style.width = p + '%';
    pct.textContent = Math.round(p);
  }, 110);
});

const pt = document.getElementById('pageTransition');
const ptFill = document.getElementById('ptFill');
const ptText = document.getElementById('ptText');
function transitionTo(url, label){
  ptText.textContent = label || 'LOADING';
  ptFill.style.width = '0%';
  pt.classList.add('active');
  let p = 0;
  const iv = setInterval(()=>{
    p += 9;
    ptFill.style.width = Math.min(p,100) + '%';
    if(p >= 100) clearInterval(iv);
  }, 45);
  setTimeout(()=>{ window.location.href = url; }, 620);
}
document.querySelectorAll('#carouselTrack .slide').forEach((slide, i)=>{
  slide.addEventListener('click', (e)=>{
    if(e.target.closest('a')) return; 
    transitionTo(`project.html?id=${i+1}`, `OPENING_PROJECT_0${i+1}`);
  });
});

const progress = document.getElementById('scroll-progress');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = pct + '%';
});


const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', ()=> navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> navLinks.classList.remove('open')));

const sections = document.querySelectorAll('section[id]');
const navA = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', ()=>{
  let current = '';
  sections.forEach(sec=>{
    const top = sec.offsetTop - 140;
    if(window.scrollY >= top) current = sec.getAttribute('id');
  });
  navA.forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href') === '#'+current);
  });
});

const termText = "whoami";
const termEl = document.getElementById('term-type');
let ti = 0;
function typeTerm(){
  if(ti <= termText.length){
    termEl.textContent = termText.slice(0, ti);
    ti++;
    setTimeout(typeTerm, 110);
  }
}
typeTerm();

const roles = ["Backend Developer", "Cybersecurity Enthusiast", "Problem Solver"];
const roleEl = document.getElementById('role-type');
let rIdx = 0, cIdx = 0, deleting = false;
function typeRole(){
  const current = roles[rIdx];
  if(!deleting){
    cIdx++;
    roleEl.textContent = current.slice(0, cIdx);
    if(cIdx === current.length){ deleting = true; setTimeout(typeRole, 1400); return; }
  } else {
    cIdx--;
    roleEl.textContent = current.slice(0, cIdx);
    if(cIdx === 0){ deleting = false; rIdx = (rIdx+1) % roles.length; }
  }
  setTimeout(typeRole, deleting ? 45 : 90);
}
typeRole();

const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target); }
  });
}, {threshold:0.15});
revealEls.forEach(el=> revealObs.observe(el));

const bars = document.querySelectorAll('.bar-fill');
const barObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.width = e.target.dataset.width + '%';
      barObs.unobserve(e.target);
    }
  });
}, {threshold:0.4});
bars.forEach(b=> barObs.observe(b));


const counters = document.querySelectorAll('.num');
const countObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      let cur = 0;
      const step = Math.max(1, Math.round(target/40));
      const tick = ()=>{
        cur += step;
        if(cur >= target){ el.textContent = target; return; }
        el.textContent = cur;
        requestAnimationFrame(tick);
      };
      tick();
      countObs.unobserve(el);
    }
  });
}, {threshold:0.5});
counters.forEach(c=> countObs.observe(c));


const track = document.getElementById('carouselTrack');
const slides = track.querySelectorAll('.slide');
const dotsWrap = document.getElementById('carouselDots');
let index = 0;
slides.forEach((_, i)=>{
  const d = document.createElement('button');
  d.className = 'c-dot' + (i===0 ? ' active' : '');
  d.setAttribute('aria-label', 'Go to project ' + (i+1));
  d.addEventListener('click', ()=> goTo(i));
  dotsWrap.appendChild(d);
});
const dots = dotsWrap.querySelectorAll('.c-dot');

function goTo(i){
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, di)=> d.classList.toggle('active', di === index));
}
document.getElementById('nextSlide').addEventListener('click', ()=> goTo(index+1));
document.getElementById('prevSlide').addEventListener('click', ()=> goTo(index-1));

let autoplay = setInterval(()=> goTo(index+1), 5500);
const carouselEl = document.getElementById('carousel');
carouselEl.addEventListener('mouseenter', ()=> clearInterval(autoplay));
carouselEl.addEventListener('mouseleave', ()=> autoplay = setInterval(()=> goTo(index+1), 5500));


let touchStartX = 0;
track.addEventListener('touchstart', e=> touchStartX = e.touches[0].clientX, {passive:true});
track.addEventListener('touchend', e=>{
  const dx = e.changedTouches[0].clientX - touchStartX;
  if(dx > 50) goTo(index-1);
  if(dx < -50) goTo(index+1);
}, {passive:true});


document.querySelectorAll('.exp-card').forEach((card, i)=>{
  const n = i + 1;
  const stage = card.querySelector('.glitch-stage');
  if(!stage) return;
  initGlitchCarousel({
    candidates: [1,2,3].map(k=>`assets/images/experience/exp-${n}-${k}.jpg`),
    stage: stage,
    auto: true,
    intervalMs: 4800,
    hoverPauseEl: card,
    altPrefix: `Experience ${n} screenshot`,
    onEmpty: ()=>{
      const visual = card.querySelector('.exp-visual');
      if(visual) visual.remove();
    }
  });
});


document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Message Sent ✓';
  this.reset();
  setTimeout(()=> btn.textContent = original, 2400);
});
