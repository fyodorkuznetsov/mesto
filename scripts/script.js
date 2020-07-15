/**
 * init vars
 */
const openPopupBtn = document.querySelector('.profile__edit-button');
/*we got several popups with same event on close btn*/
const closePopupBtn = document.querySelectorAll('.popup__close-btn');
const openPlacePopupBtn = document.querySelector('.profile__add-button');

const picturePopup = document.querySelector('.popup_type_picture');

const profileNameWrap = document.querySelector('.profile__name');
const professionWrap = document.querySelector('.profile__profession');

const profileNameInput = document.querySelector('.input__text_type_name');
const professionInput = document.querySelector('.input__text_type_profession');

const placeTitleInput = document.querySelector('.input__text_type_place-title');
const placeImgInput = document.querySelector('.input__text_type_place-img');

const profileChangeForm = document.querySelector('.input_type_profile');
const placeAddForm = document.querySelector('.input_type_place');

const placesContainer = document.querySelector('.places');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

/*open/close popup callback*/
function togglePopup(evt){
  if(typeof evt === 'undefined'){
    /* direct call of a function */
    const openedPopup = document.querySelector('.popup_state_opened');
    openedPopup.classList.remove('popup_state_opened');
  }else{
    /* choose html items in case of elem clicked */
    const domElem = evt.target;
    if(domElem.classList.contains('popup__close-btn')){
      /*close btn click => close popup*/
      const popup = domElem.closest('.popup');
      if(typeof popup !== 'undefined'){
        popup.classList.toggle('popup_state_opened')
      }
    }else{
      /**open popup action from all open popup btns
       * get popup class from btn data-attribute
      */
      const popupClass = domElem.dataset.popup;
      if(popupClass.length > 0){
        const popup = document.querySelector('.' + popupClass);
        if(popupClass == 'popup_type_profile'){
          /*if it's a profile change popup we'll need to fill form with profile data*/
          fillFormFields();
        }
        if(typeof popup !== 'undefined'){
          popup.classList.toggle('popup_state_opened')
        }
      }
    }
  }
}

/*profile form submit callback*/
function profileFormSubmitHandler(e){
  e.preventDefault();
  const professionValue = professionInput.value;
  const nameValue = profileNameInput.value;
  profileNameWrap.textContent = nameValue
  professionWrap.textContent = professionValue;
  togglePopup();
}

/*add place form submit callback*/
function placeFormSubmitHandler(e){
  e.preventDefault();
  const placeTitleValue = placeTitleInput.value;
  const placeImgValue = placeImgInput.value;
  addPlace(placeTitleValue, placeImgValue);
  togglePopup();
  /* clear form inputs */
  placeTitleInput.value = '';
  placeImgInput.value = '';
}

/*remove place callback*/
function removePlace(evt){
  evt.preventDefault;
  const removeIcon = evt.target;
  const place = removeIcon.closest('.places__place');
  place.remove();
}

/*like click callback*/
function toggleLike(evt){
  evt.preventDefault();
  const likeBtn = evt.target;
  if(likeBtn.classList.contains('places__like')){
    likeBtn.classList.toggle('places__like_state_active');
  }
}

function openPicturePopup(evt){
  /*we don't need to prevent default event here*/
  /* this pop-up doesn't have same logic as other, that's why we make another funciton on open */
  const pictureItem = evt.target;
  const pictureSrc = pictureItem.getAttribute('src');
  const pictureTitle = pictureItem.getAttribute('alt');
  if(pictureSrc.length > 0 && pictureTitle.length > 0){
    const popupPictureElem = picturePopup.querySelector('.popup__picture');
    const popupPictureDescr = picturePopup.querySelector('.popup__picture-title');
    popupPictureElem.setAttribute('src', pictureSrc);
    popupPictureElem.setAttribute('alt', pictureTitle);
    popupPictureDescr.textContent = pictureTitle;

    picturePopup.classList.add('popup_state_opened');
  }
}

/**
 *  add place function
 *  works on button click or on page init
 *  */
function addPlace(titleValue, pictureSrc){
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.cloneNode(true);

  const placeCopyTitle = placeElement.querySelector('.places__title');
  const placeCopyPicture = placeElement.querySelector('.places__picture');
  const placeCopyRemoveIcon = placeElement.querySelector('.places__remove');
  const placeLikeIcon = placeElement.querySelector('.places__like');

  placeCopyTitle.textContent = titleValue;
  placeCopyPicture.setAttribute('src', pictureSrc);
  placeCopyPicture.setAttribute('alt', titleValue);

  /*init new place events*/
  placeCopyRemoveIcon.addEventListener('click', removePlace);
  placeLikeIcon.addEventListener('click', toggleLike);
  placeCopyPicture.addEventListener('click',openPicturePopup);

  placesContainer.append(placeElement);
}

/*render places*/
initialCards.forEach((item) => {
  addPlace(item.name, item.link);
});


/**
 * init events
 */

/*open/close pop-ups*/
openPopupBtn.addEventListener('click', togglePopup);
openPlacePopupBtn.addEventListener('click', togglePopup);
closePopupBtn.forEach( btn => {
  btn.addEventListener('click', togglePopup);
});

/*form submit handlers*/
profileChangeForm.addEventListener('submit', profileFormSubmitHandler);
placeAddForm.addEventListener('submit', placeFormSubmitHandler);

