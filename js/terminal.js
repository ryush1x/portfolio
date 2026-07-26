(function(){
  const output = document.getElementById('mtOutput');
  const input = document.getElementById('mtInput');
  if(!output || !input) return;

  function printLine(text, cls){
    const div = document.createElement('div');
    div.className = 'mt-line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  const commands = {
    help(){
      printLine('Available commands:');
      printLine('  about        - who I am');
      printLine('  skills       - technical skills');
      printLine('  projects     - selected work');
      printLine('  experience   - work history');
      printLine('  contact      - how to reach me');
      printLine('  resume       - open my resume');
      printLine('  whoami');
      printLine('  clear');
    },
    whoami(){
      printLine("ryush1x - you're browsing this portfolio via terminal.");
    },
    about(){
      const paras = document.querySelectorAll('.about-copy p');
      if(!paras.length){ printLine('About section not found.', 'mt-error'); return; }
      printLine(paras[0].textContent.trim());
      document.querySelectorAll('.meta-item').forEach(item=>{
        const k = item.querySelector('.k');
        const v = item.querySelector('.v');
        if(k && v) printLine(`  ${k.textContent.trim()}: ${v.textContent.trim()}`);
      });
    },
    skills(){
      const rows = document.querySelectorAll('.skill-row');
      if(!rows.length){ printLine('No skills found.', 'mt-error'); return; }
      rows.forEach(row=>{
        const name = row.querySelector('.name');
        const pct = row.querySelector('.pct');
        if(name) printLine(`  ${name.textContent.trim().padEnd(24,'.')} ${pct ? pct.textContent.trim() : ''}`);
      });
      const chips = document.querySelectorAll('.tool-chip');
      if(chips.length){
        printLine('Also familiar with:');
        printLine('  ' + Array.from(chips).map(c=>c.textContent.trim()).join(', '));
      }
    },
    projects(){
      const slides = document.querySelectorAll('.slide');
      if(!slides.length){ printLine('No projects found.', 'mt-error'); return; }
      slides.forEach((s, i)=>{
        const title = s.querySelector('h3');
        const tag = s.querySelector('.tag');
        if(title) printLine(`  ${i+1}. ${title.textContent.trim()}  [${tag ? tag.textContent.trim() : ''}]`);
      });
      printLine("Scroll to Projects (or click a card) for full case studies.");
    },
    experience(){
      const cards = document.querySelectorAll('.exp-card');
      if(!cards.length){ printLine('No experience found.', 'mt-error'); return; }
      cards.forEach(card=>{
        const role = card.querySelector('.exp-role');
        const org = card.querySelector('.exp-org');
        const date = card.querySelector('.exp-date');
        if(role) printLine(`  ${role.textContent.trim()} - ${org ? org.textContent.trim() : ''} (${date ? date.textContent.trim() : ''})`);
      });
    },
    contact(){
      const links = document.querySelectorAll('.contact-links a');
      if(!links.length){ printLine('No contact info found.', 'mt-error'); return; }
      links.forEach(a=>{
        printLine(`  ${a.textContent.trim()} -> ${a.getAttribute('href')}`);
      });
    },
    resume(){
      printLine('Opening resume...');
      setTimeout(()=>{ window.location.href = 'resume.html'; }, 400);
    },
    ls(){
      printLine('about.md   skills.json   projects/   experience/   contact.sh   resume.pdf');
    },
    date(){
      printLine(new Date().toString());
    },
    sudo(){
      printLine('Nice try. Permission denied.', 'mt-error');
    },
    clear(){
      output.innerHTML = '';
    }
  };

  function runCommand(raw){
    const trimmed = raw.trim();
    printLine(trimmed, 'mt-echo');
    if(!trimmed) return;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const key = cmd.toLowerCase();

    if(key === 'echo'){
      printLine(args.join(' '));
      return;
    }
    if(commands[key]){
      commands[key](args);
    } else {
      printLine(`command not found: ${cmd}. Type 'help' for available commands.`, 'mt-error');
    }
  }

  input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      const val = input.value;
      input.value = '';
      runCommand(val);
    }
  });

  output.addEventListener('click', ()=> input.focus());

  printLine("Welcome. Type 'help' to explore this portfolio via terminal.", 'mt-system');
})();
