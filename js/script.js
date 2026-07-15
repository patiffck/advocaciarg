const menuToggle = document.getElementById('menuToggle');
const navLinksEl = document.getElementById('navLinks');
let menuCloseTimer;

function openMenuHover(){
  clearTimeout(menuCloseTimer);
  navLinksEl.classList.add('open');
}
function scheduleMenuClose(){
  menuCloseTimer = setTimeout(() => navLinksEl.classList.remove('open'), 250);
}

menuToggle.addEventListener('mouseenter', openMenuHover);
menuToggle.addEventListener('mouseleave', scheduleMenuClose);
navLinksEl.addEventListener('mouseenter', openMenuHover);
navLinksEl.addEventListener('mouseleave', scheduleMenuClose);

menuToggle.addEventListener('mouseenter', openMenuHover);
menuToggle.addEventListener('mouseleave', scheduleMenuClose);
navLinksEl.addEventListener('mouseenter', openMenuHover);
navLinksEl.addEventListener('mouseleave', scheduleMenuClose);

menuToggle.addEventListener('mouseenter', openMenuHover);
menuToggle.addEventListener('mouseleave', scheduleMenuClose);
navLinksEl.addEventListener('mouseenter', openMenuHover);
navLinksEl.addEventListener('mouseleave', scheduleMenuClose);

  const siteHeader = document.querySelector('header');
  function updateHeaderOnScroll(){
    if(window.scrollY > 40){
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeaderOnScroll);
  updateHeaderOnScroll(); // já aplica certo caso a página carregue rolada

  const heroSlides = document.querySelectorAll('#heroSlides .hero-slide');
  const heroDots = document.querySelectorAll('#heroDots .hero-dot');
  if(heroSlides.length){
    let heroIndex = 0;
    let heroTimer;

    function goToSlide(i){
      heroSlides[heroIndex].classList.remove('active');
      heroDots[heroIndex].classList.remove('active');
      heroIndex = i;
      heroSlides[heroIndex].classList.add('active');
      heroDots[heroIndex].classList.add('active');
    }
    function nextSlide(){
      goToSlide((heroIndex + 1) % heroSlides.length);
    }
    function startHeroTimer(){
      clearInterval(heroTimer);
      heroTimer = setInterval(nextSlide, 4200);
    }
    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); startHeroTimer(); });
    });
    startHeroTimer();
  }

  const clientsTrack = document.getElementById('clientsTrack');
  if(clientsTrack){
    let offsetX = 0;
    let halfWidth = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let autoPaused = false;
    const SPEED = 0.45; // px por frame — ajuste aqui para mudar a velocidade

    function measure(){
      halfWidth = clientsTrack.scrollWidth / 2;
    }
    window.addEventListener('load', measure);
    window.addEventListener('resize', measure);
    measure();

    function wrap(){
      if(halfWidth <= 0) return;
      if(offsetX <= -halfWidth) offsetX += halfWidth;
      if(offsetX > 0) offsetX -= halfWidth;
    }

    function tick(){
      if(!dragging && !autoPaused){
        offsetX -= SPEED;
        wrap();
        clientsTrack.style.transform = `translateX(${offsetX}px)`;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    function startDrag(clientX){
      dragging = true;
      dragStartX = clientX;
      dragStartOffset = offsetX;
      clientsTrack.closest('.clients-carousel').classList.add('dragging');
    }
    function moveDrag(clientX){
      if(!dragging) return;
      offsetX = dragStartOffset + (clientX - dragStartX);
      wrap();
      clientsTrack.style.transform = `translateX(${offsetX}px)`;
    }
    function endDrag(){
      dragging = false;
      clientsTrack.closest('.clients-carousel').classList.remove('dragging');
    }

    clientsTrack.addEventListener('mousedown', e => { startDrag(e.clientX); e.preventDefault(); });
    window.addEventListener('mousemove', e => moveDrag(e.clientX));
    window.addEventListener('mouseup', endDrag);

    clientsTrack.addEventListener('touchstart', e => startDrag(e.touches[0].clientX), { passive:true });
    clientsTrack.addEventListener('touchmove', e => moveDrag(e.touches[0].clientX), { passive:true });
    clientsTrack.addEventListener('touchend', endDrag);

    clientsTrack.closest('.clients-carousel').addEventListener('mouseenter', () => { autoPaused = true; });
    clientsTrack.closest('.clients-carousel').addEventListener('mouseleave', () => { autoPaused = false; });
  }

  const captureClose = document.getElementById('captureClose');
  const captureBar = document.getElementById('captureBar');
  if(captureClose && captureBar){
  captureClose.addEventListener('click', () => {
  captureBar.style.display = 'none';
  });
}
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
