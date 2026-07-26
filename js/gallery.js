function preloadImage(src){
  return new Promise((resolve)=>{
    const img = new Image();
    img.onload = ()=> resolve(src);
    img.onerror = ()=> resolve(null);
    img.src = src;
  });
}

/**
 * @param {Object} opts
 * @param {string[]} opts.candidates  
 * @param {HTMLElement} opts.stage
 * @param {HTMLElement} [opts.dotsContainer]
 * @param {HTMLElement} [opts.prevBtn]
 * @param {HTMLElement} [opts.nextBtn]
 * @param {boolean} [opts.auto]
 * @param {number} [opts.intervalMs] 
 * @param {HTMLElement} [opts.hoverPauseEl]
 * @param {string} [opts.altPrefix] 
 * @param {Function} [opts.onEmpty]
 */
async function initGlitchCarousel(opts){
  const {
    candidates, stage, dotsContainer = null, prevBtn = null, nextBtn = null,
    auto = false, intervalMs = 5000, hoverPauseEl = null,
    altPrefix = 'Image', onEmpty = null
  } = opts;

  const results = await Promise.all(candidates.map(preloadImage));
  const sources = results.filter(Boolean);

  if(sources.length === 0){
    if(onEmpty) onEmpty();
    return;
  }

  sources.forEach((src, i)=>{
    const img = document.createElement('img');
    img.className = 'glitch-img';
    img.src = src;
    img.alt = `${altPrefix} ${i+1}`;
    stage.appendChild(img);
    if(i === 0){
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=> img.classList.add('active'));
      });
    }
  });

  const imgs = stage.querySelectorAll('.glitch-img');
  let dots = [];

  if(dotsContainer){
    if(sources.length > 1){
      sources.forEach((_, i)=>{
        const d = document.createElement('button');
        d.className = 'c-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Show ${altPrefix.toLowerCase()} ${i+1}`);
        d.addEventListener('click', ()=> show(i));
        dotsContainer.appendChild(d);
      });
      dots = dotsContainer.querySelectorAll('.c-dot');
    } else {
      dotsContainer.style.display = 'none';
    }
  }

  let idx = 0;
  function show(i){
    idx = (i + imgs.length) % imgs.length;
    stage.classList.add('glitching');
    setTimeout(()=> stage.classList.remove('glitching'), 380);
    imgs.forEach((img, di)=> img.classList.toggle('active', di === idx));
    dots.forEach((d, di)=> d.classList.toggle('active', di === idx));
  }

  if(prevBtn) prevBtn.addEventListener('click', ()=> show(idx - 1));
  if(nextBtn) nextBtn.addEventListener('click', ()=> show(idx + 1));
  if(prevBtn && sources.length <= 1) prevBtn.style.display = 'none';
  if(nextBtn && sources.length <= 1) nextBtn.style.display = 'none';

  if(auto && sources.length > 1){
    let timer = setInterval(()=> show(idx + 1), intervalMs);
    if(hoverPauseEl){
      hoverPauseEl.addEventListener('mouseenter', ()=> clearInterval(timer));
      hoverPauseEl.addEventListener('mouseleave', ()=>{
        timer = setInterval(()=> show(idx + 1), intervalMs);
      });
    }
  }
}
