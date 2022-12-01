
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchImages } from './fetchImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    input: document.querySelector('[name="searchQuery"]'),
    list: document.querySelector('.gallery'),
    searchBtn: document.querySelector("button"),
    form: document.querySelector("form"),
 
    guard: document.querySelector(".js-guard")
};

let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0
};

let page = 1;
let gallery =  new SimpleLightbox('.gallery a',);
let observer = new IntersectionObserver(onScroll, options);



refs.form.addEventListener('submit', onSearch);

function onScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("tada")
      onLoad()
  }}
  )};

function onSearch(e) {
  refs.list.innerHTML = ""
  page = 1
    e.preventDefault();
    const query = refs.input.value.trim();
   
  fetchImages(query, page)
    .then(data => {
      refs.list.insertAdjacentHTML("beforeend", createMarkup(data.hits));
      gallery.refresh();
      observer.observe(refs.guard)
      
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }).catch(error => { Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.') });
};


function createMarkup(arr) {
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<a class="gallery__item" href="${largeImageURL}"><div class="photo-card"> 
  <div class="thumb"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/></div>
  <div class="info">
    <p class="info-item">
      <b>Likes <br>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views <br>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments <br>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads <br>${downloads}</b>
    </p>
  </div>
</div></a>`).join("");
};


function onLoad() {
  page += 1;
  const query = refs.input.value.trim()
  fetchImages(query,page)
    .then(data => {
      refs.list.insertAdjacentHTML("beforeend", createMarkup(data.hits));
      gallery.refresh();
    }).catch(console.error())
  }
  




// import './css/styles.css';
// import Notiflix from 'notiflix';
// import { fetchImages } from './fetchImages'

// // Описаний в документації
// import SimpleLightbox from "simplelightbox";
// // Додатковий імпорт стилів
// import "simplelightbox/dist/simple-lightbox.min.css";


// let gallery =  new SimpleLightbox('.gallery a',);
// const refs = {
//     input: document.querySelector('[name="searchQuery"]'),
//     list: document.querySelector('.gallery'),
//     searchBtn: document.querySelector("button"),
//     form: document.querySelector("form"),
//   load: document.querySelector('.load-more'),
//     guard: document.querySelector(".js-guard")
// };


// let options = {
//   root: null,
//   rootMargin: '200px',
//   threshold: 1.0
// }

// let observer = new IntersectionObserver(onScroll, options);
// function onScroll(entries, observer) {
//   console.log(entries);
  
// }
// let page = 1
// refs.load.disabled = true;
// refs.form.addEventListener('submit', onSearch);
// refs.load.addEventListener('click', ()=>{refs.load.disabled = true; onLoad()});

// function onSearch(e) {
//   refs.list.innerHTML = ""
//   page = 1
//     e.preventDefault();
//     const query = refs.input.value.trim();
   
//   fetchImages(query, page)
//     .then(data => {
//       refs.list.insertAdjacentHTML("beforeend", createMarkup(data.hits));
//       gallery.refresh();
      
//       Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
//     }).catch(error => { Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.') });
  
  
// }

// function createMarkup(arr) {
//   refs.load.disabled = false;
//   return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<a class="gallery__item" href="${largeImageURL}"><div class="photo-card">
     
//   <div class="thumb"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/></div>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes <br>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views <br>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments <br>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads <br>${downloads}</b>
//     </p>
//   </div>
// </div></a>`).join("");
  
    
// }
// function onLoad() {
//   page += 1;
  
//   const query = refs.input.value.trim()
//   console.log("hujhuh")
//   fetchImages(query,page)
//     .then(data => {
//       refs.list.insertAdjacentHTML("beforeend", createMarkup(data.hits));
//       gallery.refresh();
//       if (data.totalHits < 40 * page) {
//         refs.load.disabled = true;
//       Notiflix.Notify.info('We are sorry, but you have reached the end of search results.')}
//     }).catch(console.error())
  
//   }
  

