import './sass/main.scss';
import card from './partials/card.hbs';
import ImegeApiService from './js/apiService.js';
import LoadBtn from './js/loadBtn';

const forma = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')

const loadBtn = new LoadBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imegeApiService = new ImegeApiService();

forma.addEventListener('submit', onSearch);
loadBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imegeApiService.query = e.currentTarget.elements.query.value;

  if (imegeApiService.query === '') {
    return alert('Введи название');
  }

  loadBtn.show();
  imegeApiService.resetPage();
  clearContainer();
 fetchImages();
}

function fetchImages() {
  loadBtn.disable();
  imegeApiService.fetchImages().then(imeges => {
    appImege(imeges);
    loadBtn.enable();
  });
}

function appImege(imeges) {
  gallery.insertAdjacentHTML('beforeend', card(imeges.hits));
}

function clearContainer() {
  gallery.innerHTML = '';
}