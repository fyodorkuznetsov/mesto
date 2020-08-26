import Popup from './Popup.js';

export default class PopupWithImage extends Popup{

  open(link, name){
    const popupPictureElem = this._popup.querySelector('.popup__picture');
    const popupPictureDescr = this._popup.querySelector('.popup__picture-title');
    popupPictureElem.setAttribute('src', link);
    popupPictureElem.setAttribute('alt', name);
    popupPictureDescr.textContent = name;

    super.open();
  }

}
