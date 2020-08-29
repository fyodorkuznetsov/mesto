import Popup from './Popup.js';

export default class PopupWithForm extends Popup{

  constructor({popupSelector, handleFormSubmit}){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._form = this._popup.querySelector('.input');
    this._formElements = Array.from(this._form.elements);
    this._button = this._popup.querySelector('.input__btn');
  }

  setEventListeners(){
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues(){
    this._formValues = {};
    this._formElements.forEach( (elem) => {
      this._formValues[elem.name] = elem.value;
    });
    return this._formValues;
  }

  close(){
    super.close();
    this._form.reset();
  }

  open(){
    super.open();
  }

  getFormElement(){
    return this._form;
  }

  getButtonElement(){
    return this._button;
  }

}
