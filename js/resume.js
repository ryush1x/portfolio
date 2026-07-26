window.addEventListener('load', ()=>{
  const overlay = document.getElementById('scanOverlay');
  const fill = document.getElementById('soFill');
  const sheet = document.getElementById('resumeSheet');
  const scanLine = document.getElementById('sheetScanLine');

  let p = 0;
  const iv = setInterval(()=>{
    p += Math.random()*16 + 7;
    if(p >= 100){
      p = 100;
      clearInterval(iv);
      setTimeout(()=>{
        overlay.classList.add('reveal');
        document.body.classList.add('loaded');

        setTimeout(()=>{
          scanLine.classList.add('active');
          sheet.classList.add('scanned');
        }, 400);
      }, 250);
    }
    fill.style.width = p + '%';
  }, 120);
});

document.querySelector('.back-link').addEventListener('click', function(e){
  e.preventDefault();
  const overlay = document.getElementById('scanOverlay');
  overlay.classList.remove('reveal');
  setTimeout(()=>{ window.location.href = this.href; }, 550);
});
