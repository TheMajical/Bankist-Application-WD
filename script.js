'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  // event delegation
  if (e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})


const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use coockies for improved functionality and analytics <button class="btn--close-cookie"> Got it! </button>';
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
})

message.style.background = '#37383d';
message.style.width = '120%';

document.documentElement.style.setProperty('--color-primary', 'khaki');



btnScrollTo.addEventListener('click', function(e){
  const btnScrollToCords = btnScrollTo.getBoundingClientRect();
  const s1cords = section1.getBoundingClientRect();

  section1.scrollIntoView({behavior: 'smooth'});  
})

//Tabbed Content
tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  //Guard clause
  if(!clicked) return;

  //Remove active classes
  tabs.forEach( (t) => t.classList.remove('operations__tab--active'));
  tabsContent.forEach( c => c.classList.remove('operations__content--active'))

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate container
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})


//Menu fade animation
function handleHover(e, opacity){
  if (e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
  
    siblings.forEach( el => {
      if (el !== link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5);
})

nav.addEventListener('mouseout', function(e){
  handleHover(e, 1);
})

//Sticky navigation
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`
});

function stickyNav(entries){
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

headerObserver.observe(header);


//Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

function loadImg(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  //Replace src with src-data to have better quality images
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    this.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  //Will use it just in case you want users don't notice lazy loading
  //rootMargin: '200px'
})

imgTargets.forEach(img => imageObserver.observe(img));