import Popup from './Popup.js';

export default class PopupWithImage extends Popup{

  constructor(popupSelector){
    super(popupSelector);

    this._popupPictureElem = this._popup.querySelector('.popup__picture');
    this._popupPictureTitle = this._popup.querySelector('.popup__picture-title');
  }

  open({link, name}){
    this._popupPictureElem.setAttribute('src', link);
    this._popupPictureElem.setAttribute('alt', name);
    this._popupPictureTitle.textContent = name;

    super.open();
  }
}
