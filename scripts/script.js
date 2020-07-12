/**
 * init vars
 */
const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-button');
const closePopupBtn = document.querySelector('.popup__close-btn');

const profileNameWrap = document.querySelector('.profile__name');
const professionWrap = document.querySelector('.profile__profession');

const profileNameInput = document.querySelector('.input__text_type_name');
const professionInput = document.querySelector('.input__text_type_profession');

const profileChangeForm = document.querySelector('.input');

/**
 * init events
 */
openPopupBtn.addEventListener('click',togglePopup);
closePopupBtn.addEventListener('click',togglePopup);

profileChangeForm.addEventListener('submit',formSubmitHandler);

/**
 * declare functions
 */
function fillFormFields(){
  let name = profileNameWrap.innerHTML;
  let profession = professionWrap.innerHTML;
  if(name.length > 0){
    profileNameInput.value = name;
  }
  if(profession.length > 0){
    professionInput.value = profession;
  }
}

function togglePopup(){
  fillFormFields();
  if(typeof popup !== 'undefined'){
    popup.classList.toggle('popup_state_opened')
  }
}

function formSubmitHandler(e){
  e.preventDefault();
  let professionValue = professionInput.value;
  let nameValue = profileNameInput.value;
  profileNameWrap.textContent = nameValue
  professionWrap.textContent = professionValue;
  togglePopup();
}

