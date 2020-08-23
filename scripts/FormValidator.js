export default class FormValidator{

  constructor(settings, formElement){
    this._form = formElement;
    this._settings = settings;
  }

  _getDomEntities(){
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _hasInvalidInput(){
    return this._inputList.some( (inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError (inputElement, errorMessage){
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError (inputElement){
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(){
    if(this._hasInvalidInput()){
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    }else{
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _clearForm(){
    this._form.reset();
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  _setEventListeners(){
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (() => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      }).bind(this));
    });

    /*listen to close popup custom event for form clear */
    document.addEventListener('closePopup',this._clearForm.bind(this));
    document.addEventListener('revalidateForm', (() => {
      this._toggleButtonState();
    }).bind(this));
  }

  enableValidation(){
    this._getDomEntities();
    this._setEventListeners();
  }
}
