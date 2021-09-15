import filmApiService from './api-service';
import renderModalWindow from '../Templates/modalTemplate.hbs';
import {refs} from '../js/cartset';

const modalList = document.querySelector('.modal');
const modalHBS = document.querySelector('.modal__hbs-wrapper');

function onFilmClick(e){
  const targetId = e.target.id;

  document.addEventListener('keydown', (e) => {
    const keyEsc = e.key === 'Escape';
    if (keyEsc) {
      modalList.classList.add('show');
    }
  });
  
  if (e.target !== e.currentTarget){
    filmApiService.fetchFilmsById(targetId)
    .then(data => {
      
      const renderModal = renderModalWindow(data);
      modalHBS.innerHTML = renderModal;
  
      const modalRefs = {
        modalBtnClose: document.querySelector('.js-modal__btn-close'),
        modalCloseBlur: document.querySelector('.modal__wrapper'),
      };

      modalList.classList.remove('show');
  
      function onModalClose(e) {
        if(e.target === e.currentTarget){
          modalList.classList.add('show');
        };
      }
      
      modalRefs.modalBtnClose.addEventListener('click', onModalClose);
      modalRefs.modalCloseBlur.addEventListener('click', onModalClose);
    });
  }
  
};

refs.addEventListener('click', onFilmClick);
