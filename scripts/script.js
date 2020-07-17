/**
 * init vars
 */
const openProfilePopupBtn = document.querySelector('.profile__edit-button');
/*we got several popups with same event on close btn*/
const closePopupBtns = document.querySelectorAll('.popup__close-btn');
const openPlacePopupBtn = document.querySelector('.profile__add-button');
const popupList = document.querySelectorAll('.popup');

const picturePopup = document.querySelector('.popup_type_picture');
const placePopup = document.querySelector('.popup_type_place');
const profilePopup = document.querySelector('.popup_type_profile');

const profileNameWrap = document.querySelector('.profile__name');
const professionWrap = document.querySelector('.profile__profession');

const profileNameInput = document.querySelector('.input__text_type_name');
const professionInput = document.querySelector('.input__text_type_profession');

const placeTitleInput = document.querySelector('.input__text_type_place-title');
const placeImgInput = document.querySelector('.input__text_type_place-img');

const profileChangeForm = document.querySelector('.input_type_profile');
const profileUpdateBtn = profileChangeForm.querySelector('.input__btn');
const placeAddForm = document.querySelector('.input_type_place');
const placeAddBtn = placeAddForm.querySelector('.input__btn');

const placesContainer = document.querySelector('.places');

const popupPictureElem = document.querySelector('.popup__picture');
const popupPictureDescr = document.querySelector('.popup__picture-title');

const placeTemplate = document.querySelector('#place-template').content;

const validationClasses = {
  'formSelector': '.input',
  'inputSelector': '.input__text',
  'submitButtonSelector': '.input__btn',
  'inactiveButtonClass': 'input__btn_state_disabled',
  'inputErrorClass': 'input__text_type_error',
  'errorClass': 'input__field-error_state_active'
};

/**
 * declare functions
 */
function fillFormFields(){
  const name = profileNameWrap.innerHTML;
  const profession = professionWrap.innerHTML;
  if(name.length > 0){
    profileNameInput.value = name;
    hideInputError(profileChangeForm, profileNameInput, validationClasses.inputErrorClass, validationClasses.errorClass);
  }
  if(profession.length > 0){
    professionInput.value = profession;
    hideInputError(profileChangeForm, professionInput, validationClasses.inputErrorClass, validationClasses.errorClass);
  }
  profileUpdateBtn.classList.remove(validationClasses.inactiveButtonClass);
  profileUpdateBtn.removeAttribute('disabled');
}

/*remove place callback*/
function removePlace(evt){
  evt.preventDefault();
  const removeIcon = evt.target;
  const place = removeIcon.closest('.places__place');
  place.remove();
}

/*like click callback*/
function toggleLike(evt){
  evt.preventDefault();
  const likeBtn = evt.target;
  likeBtn.classList.toggle('places__like_state_active');
}

/*open/close popup*/
function togglePopup(popup){
  popup.classList.toggle('popup_state_opened');
}

function openPicturePopup(evt){
  /*we don't need to prevent default event here*/
  const pictureItem = evt.target;
  const pictureSrc = pictureItem.getAttribute('src');
  const pictureTitle = pictureItem.getAttribute('alt');
  if(pictureSrc.length > 0 && pictureTitle.length > 0){
    popupPictureElem.setAttribute('src', pictureSrc);
    popupPictureElem.setAttribute('alt', pictureTitle);
    popupPictureDescr.textContent = pictureTitle;
    togglePopup(picturePopup);
  }
}

/**
 *  prepare place html function
 *  works on button click or on page init
 *  */
function preparePlace(titleValue, pictureSrc){
  const placeElement = placeTemplate.cloneNode(true);
  const placeCopyTitle = placeElement.querySelector('.places__title');
  const placeCopyPicture = placeElement.querySelector('.places__picture');
  const placeCopyRemoveIcon = placeElement.querySelector('.places__remove');
  const placeLikeIcon = placeElement.querySelector('.places__like');

  /*set place attributs & content */
  placeCopyTitle.textContent = titleValue;
  placeCopyPicture.setAttribute('src', pictureSrc);
  placeCopyPicture.setAttribute('alt', titleValue);

  /*init new place events*/
  placeCopyRemoveIcon.addEventListener('click', removePlace);
  placeLikeIcon.addEventListener('click', toggleLike);
  placeCopyPicture.addEventListener('click',openPicturePopup);

  return placeElement;
}

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
  const placeElement = preparePlace(placeTitleValue, placeImgValue);
  placesContainer.prepend(placeElement);
  togglePopup(placePopup);
  /* clear form inputs */
  placeTitleInput.value = '';
  placeImgInput.value = '';
  /* return btn to inactive state*/
  placeAddBtn.classList.add(validationClasses.inactiveButtonClass);
  placeAddBtn.setAttribute('disabled',true);
}

/*open popup btn click handler with open by popup class from dataset*/
function openProfilePopupEventHandler(evt){
  fillFormFields();
  togglePopup(profilePopup);
}

function openPlacePopupEventHandler(evt){
  togglePopup(placePopup);
}

/*close popup btn click handler */
function closePopupEventHandler(evt){
  const popup = evt.target.closest('.popup');
  togglePopup(popup);
}

function closePopupByOverlay(evt){
  const targetPopup = evt.target;
  if(evt.target.classList.contains('popup')){
    togglePopup(targetPopup);
  }
}

function closePopupByEsc(evt){
  if(evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_state_opened');
    if(openedPopup){
      togglePopup(openedPopup);
    }
  }
}

/*render places by array of objects*/
function renderPlaces(cards){
  cards.forEach((item) => {
    const placeItem = preparePlace(item.name, item.link);
    placesContainer.append(placeItem);
  });
}

/*render places*/
renderPlaces(initialCards);
enableValidation(validationClasses);

/**
 * init events
 */
/*open/close pop-ups*/
openProfilePopupBtn.addEventListener('click', openProfilePopupEventHandler);
openPlacePopupBtn.addEventListener('click', openPlacePopupEventHandler);
closePopupBtns.forEach( btn => {
  btn.addEventListener('click', closePopupEventHandler);
});
popupList.forEach( popup => {
  popup.addEventListener('click', closePopupByOverlay);
});
document.addEventListener('keydown',closePopupByEsc);


/*form submit handlers*/
profileChangeForm.addEventListener('submit', profileFormSubmitHandler);
placeAddForm.addEventListener('submit', placeFormSubmitHandler);

