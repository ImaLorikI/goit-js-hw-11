import { fetchinfo } from './js/pixabay';
import { Notify } from 'notiflix';
import Notiflix from 'notiflix';
import { createMarkup } from './js/Markup';
const loadMore = document.querySelector('.load-more');
loadMore.classList.add('is-hidden');
export const refs = {
  search: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};
let page = 1; 
let searchValue = '';
refs.search.addEventListener('submit', onFetch);
async function onFetch(e) {
  Notiflix.Loading.dots('Loading...');
  e.preventDefault();
  refs.gallery.innerHTML = '';
  searchValue = e.target.searchQuery.value;
  searchValue = searchValue.toLowerCase().trim();
  if (searchValue === '') {
    Notify.info('Please enter something...'); //
    return;
  }
  page = 1;
  try {
    const { hits, totalHits } = await fetchinfo(searchValue, page);
    if (totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images.Please try again.'
      );
      Notiflix.Loading.remove();
      evt.target.reset();
      return;
    } else {
      Notify.success(`We found ${totalHits} totalHits images.`);
      Notiflix.Loading.remove();
      createMarkup(hits);
      }
      if (totalHits <= 40) {
      loadMore.classList.add('is-hidden');
      }
    else {
      loadMore.classList.remove('is-hidden');
      loadMore.addEventListener('click', LoadingMore);
    }  
  } catch (error) {
    throw new Error(error);
  }
  evt.target.reset();
}
async function LoadingMore() {
  page += 1;
  Notiflix.Loading.dots('Loading...');
    const { hits, totalHits } = await fetchinfo(searchValue, page);
    const lastPage = Math.ceil(totalHits /40);
  Notiflix.Loading.remove();
    createMarkup(hits);
    if (page === lastPage) {
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}