import {popupPictureElem, popupPictureDescr, picturePopup} from './constants.js';

/*open/close popup*/
export function togglePopup(popup){
  popup.classList.toggle('popup_state_opened');
  popup.classList.contains('popup_state_opened') ? document.addEventListener('keydown',closePopupByEsc) : document.removeEventListener('keydown',closePopupByEsc);
}

export function triggerCloseEvent(){
  const e = new Event('closePopup');
  document.dispatchEvent(e);
}

export function closePopupByEsc(evt){
  if(evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_state_opened');
    if(openedPopup){
      togglePopup(openedPopup);
      triggerCloseEvent();
    }
  }
}

export function fillAndOpenPicturePopup(link, name){
  popupPictureElem.setAttribute('src', link);
  popupPictureElem.setAttribute('alt', name);
  popupPictureDescr.textContent = name;

  togglePopup(picturePopup);
}
