import Popup from './Popup.js';
import {validationClasses} from '../utils/constants.js';

export default class PopupWithForm extends Popup{

  constructor(params){
    super(params.popupSelector);
    this._handleFormSubmit = params.handleFormSubmit.bind(this);
    this._form = this._popup.querySelector('.input');

    this._formValidator = params.formValidatorInitializator(validationClasses, this._form);
    this._formValidator.enableValidation();

    this._beforeOpenAction = params.beforeOpenAction;
  }

  setEventListeners(){
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues(){
    const formElements = Array.from(this._form.elements);
    const formValues = {};
    formElements.forEach( (elem) => {
      formValues[elem.name] = elem.value;
    });
    return formValues;
  }

  close(){
    super.close();

    this._formValidator.clearForm();
  }

  open(){
    if(typeof this._beforeOpenAction === 'function'){
      this._beforeOpenAction();
    }
    super.open();
    this._formValidator.toggleButtonState();
  }

}
