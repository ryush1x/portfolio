(function(){
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if(!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if(isTouch) return;

  window.addEventListener('mousemove', e=>{
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  function loop(){
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();


  const hoverTargets = 'a, button, .exp-card, .tool-chip, .c-dot, .slide, .stack-row span';
  document.querySelectorAll(hoverTargets).forEach(el=>{
    el.addEventListener('mouseenter', ()=> ring.classList.add('active'));
    el.addEventListener('mouseleave', ()=> ring.classList.remove('active'));
  });
})();
