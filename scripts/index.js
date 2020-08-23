import {popupPictureDescr, popupPictureElem, picturePopup} from './utils/constants.js';
import {togglePopup, triggerCloseEvent, closePopupByEsc}  from './utils/functions.js';
import {initialCards} from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const openProfilePopupBtn = document.querySelector('.profile__edit-button');
const closePopupBtns = document.querySelectorAll('.popup__close-btn');
const openPlacePopupBtn = document.querySelector('.profile__add-button');
const popupList = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup_type_profile');

const profileNameWrap = document.querySelector('.profile__name');
const professionWrap = document.querySelector('.profile__profession');

const profileNameInput = document.querySelector('.input__text_type_name');
const professionInput = document.querySelector('.input__text_type_profession');

const placeTitleInput = document.querySelector('.input__text_type_place-title');
const placeImgInput = document.querySelector('.input__text_type_place-img');

const profileChangeForm = document.querySelector('.input_type_profile');
const placeAddForm = document.querySelector('.input_type_place');
const placeAddBtn = placeAddForm.querySelector('.input__btn');

const placePopup = document.querySelector('.popup_type_place');

const placesContainer = document.querySelector('.places');

const validationClasses = {
  inputSelector: '.input__text',
  submitButtonSelector: '.input__btn',
  inactiveButtonClass: 'input__btn_state_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClass: 'input__field-error_state_active'
};

/**
 * declare functions
 */
/*event for trigger revalidate form btn after fill profile form */
function triggerReValidateEvent(){
  const e = new Event('revalidateForm');
  document.dispatchEvent(e);
}

function fillFormFields(){
  const name = profileNameWrap.textContent;
  const profession = professionWrap.textContent;
  profileNameInput.value = name;
  professionInput.value = profession;
  triggerReValidateEvent();
}

/* trigger close popup custom event form clear form in FormValidator */


/*profile form submit callback*/
function profileFormSubmitHandler(e){
  e.preventDefault();
  const professionValue = professionInput.value;
  const nameValue = profileNameInput.value;
  profileNameWrap.textContent = nameValue
  professionWrap.textContent = professionValue;
  togglePopup(profilePopup);
}

/*add place form submit callback*/
function placeFormSubmitHandler(e){
  e.preventDefault();
  const placeTitleValue = placeTitleInput.value;
  const placeImgValue = placeImgInput.value;
  const placeCard = new Card({name: placeTitleValue, link: placeImgValue}, '#place-template');
  placesContainer.prepend(placeCard.generateCard());
  togglePopup(placePopup);
  /* clear form inputs */
  placeTitleInput.value = '';
  placeImgInput.value = '';
  /* return btn to inactive state*/
  placeAddBtn.classList.add(validationClasses.inactiveButtonClass);
  placeAddBtn.setAttribute('disabled',true);
}

function openProfilePopupEventHandler(){
  fillFormFields();
  togglePopup(profilePopup);
}

function openPlacePopupEventHandler(){
  togglePopup(placePopup);
}

/*close popup btn click handler */
function closePopupEventHandler(evt){
  const popup = evt.target.closest('.popup');
  togglePopup(popup);
  triggerCloseEvent();
}

function closePopupByOverlay(evt){
  const targetPopup = evt.target;
  if(evt.target.classList.contains('popup')){
    togglePopup(targetPopup);
    triggerCloseEvent();
  }
}

/*render places by array of objects*/
function renderPlaces(cards){
  cards.forEach((item) => {
    const placeCard = new Card(item, '#place-template');
    placesContainer.append(placeCard.generateCard());
  });
}

function initValidation(formSelector){
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    let validator = new FormValidator(validationClasses, formElement);;
    validator.enableValidation();
  });
}

/*render places*/
renderPlaces(initialCards);
/* init form validation with FormValidator class */
initValidation('.input');

/**
 * init events
 */
/*open/close pop-ups*/
openProfilePopupBtn.addEventListener('click', openProfilePopupEventHandler);
openPlacePopupBtn.addEventListener('click', openPlacePopupEventHandler);
closePopupBtns.forEach( (btn) => {
  btn.addEventListener('click', closePopupEventHandler);
});
popupList.forEach( (popup) => {
  popup.addEventListener('click', closePopupByOverlay);
});

/*form submit handlers*/
profileChangeForm.addEventListener('submit', profileFormSubmitHandler);
placeAddForm.addEventListener('submit', placeFormSubmitHandler);

export {
  popupPictureDescr,
  popupPictureElem,
  picturePopup,
  closePopupByEsc,
  togglePopup
};
