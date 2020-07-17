/**
 * init vars
 */
const openPopupBtn = document.querySelector('.profile__edit-button');
/*we got several popups with same event on close btn*/
const closePopupBtns = document.querySelectorAll('.popup__close-btn');
const openPlacePopupBtn = document.querySelector('.profile__add-button');

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
const placeAddForm = document.querySelector('.input_type_place');

const placesContainer = document.querySelector('.places');

const popupPictureElem = document.querySelector('.popup__picture');
const popupPictureDescr = document.querySelector('.popup__picture-title');

const placeTemplate = document.querySelector('#place-template').content;

/**
 * declare functions
 */
function fillFormFields(){
  const name = profileNameWrap.innerHTML;
  const profession = professionWrap.innerHTML;
  if(name.length > 0){
    profileNameInput.value = name;
  }
  if(profession.length > 0){
    professionInput.value = profession;
  }
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

/*render places by array of objects*/
function renderPlaces(cards){
  cards.forEach((item) => {
    const placeItem = preparePlace(item.name, item.link);
    placesContainer.append(placeItem);
  });
}

/*render places*/
renderPlaces(initialCards);

/**
 * init events
 */
/*open/close pop-ups*/
openPopupBtn.addEventListener('click', openProfilePopupEventHandler);
openPlacePopupBtn.addEventListener('click', openPlacePopupEventHandler);
closePopupBtns.forEach( btn => {
  btn.addEventListener('click', closePopupEventHandler);
});

/*form submit handlers*/
profileChangeForm.addEventListener('submit', profileFormSubmitHandler);
placeAddForm.addEventListener('submit', placeFormSubmitHandler);
