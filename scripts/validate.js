function showInputError (formElement, inputElement, errorMessage,  errorInputClass, errorElementClass){
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(errorInputClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorElementClass);
}

function hideInputError (formElement, inputElement,  errorInputClass, errorElementClass){
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(errorInputClass);
  errorElement.classList.remove(errorElementClass);
  errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement, errorInputClass, errorElementClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorInputClass, errorElementClass);
  } else {
    hideInputError(formElement, inputElement,  errorInputClass, errorElementClass);
  }
}

function hasInvalidInput (inputList) {
  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement, inactiveClass){
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(inactiveClass);
    buttonElement.setAttribute('disabled', true);
  }else{
    buttonElement.classList.remove(inactiveClass);
    buttonElement.removeAttribute('disabled');
  }
}

function setEventListeners(formElement, domParams){
  const inputList = Array.from(formElement.querySelectorAll(domParams.inputSelector));
  const buttonElement = formElement.querySelector(domParams.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, domParams.inputErrorClass, domParams.errorClass);
      toggleButtonState(inputList, buttonElement, domParams.inactiveButtonClass);
    });
  });
}

function enableValidation(domParams){
  const formList = Array.from(document.querySelectorAll(domParams.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, domParams);
  });
}

/* function clears inputs and hides errors on popup close*/
function clearForm(formElement, domParams){
  formElement.reset();
  const buttonElement = formElement.querySelector(domParams.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(domParams.inputSelector));
  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, domParams.inputErrorClass, domParams.errorClass);
  });
  toggleButtonState(inputList, buttonElement, domParams.inactiveButtonClass);
}
