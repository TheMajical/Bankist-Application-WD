'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
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
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

// const h1 = document.querySelector('h1');
// function h1Alert(){
//   alert('Dustane Aziz Ham Aknun H1 :D');
// }

// h1.addEventListener('mouseenter', h1Alert);

// setTimeout(() => h1.removeEventListener('mouseenter' ,h1Alert) ,3000);

// const randomInt = (min, max) =>
//  Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => 
// `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// })

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// })

// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// })

