import filmApiService from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';
import emptyPoster from '../images/plug.png'
import { normalData } from './api-service';
import { backToTop, fetchRenderWithPagination } from './pagination';

export const refs = document.querySelector('.hero-list');

const refList = document.querySelector('.hero-list');
const refGoUp = document.querySelector('.back_to_top');
const refsPagination = document.querySelector('#pagination');


window.addEventListener('scroll', trackScroll);
refGoUp.addEventListener('click', backToTop2);

export function apiRenderFirstPage() {
  refsPagination.classList.remove('is-hidden');
  
  filmApiService
    .fetchAPIGenres()
    .then(data => (filmApiService.genres = data.genres))
    .then(() => filmApiService.fetchPopularFilms())
    .then(({ results }) => normalData(results, refList, renderPopularFilms, emptyPoster));
  fetchRenderWithPagination();
};

apiRenderFirstPage();



function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refGoUp.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    refGoUp.classList.remove('back_to_top-show');
  }
}

function backToTop2() {
  if (window.pageYOffset > 0) {
    backToTop();
  }
}