import '../../pages/index.css';

import {initialCards, validationClasses} from '../utils/constants.js';
import {createCardMarkup} from '../utils/functions.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button')

const nameElement = document.querySelector('.input__text_type_name');
const professionElement = document.querySelector('.input__text_type_profession');

const picturePopup = new PopupWithImage('.popup_type_picture');
picturePopup.setEventListeners();

const userInfoInstance = new UserInfo({nameSelector: '.profile__name', professionSelector: '.profile__profession'});

const cardList = new Section(
  {
    items : initialCards,
    renderer : (item) => {
      cardList.addItem(createCardMarkup({item, picturePopup}));
    }
  },
  '.places'
);
cardList.renderItems();

const addPlacePopup = new PopupWithForm(
  {
    popupSelector: '.popup_type_place',
    handleFormSubmit: (formValues) => {
      const item = {
        name: formValues['place-title'],
        link: formValues['place-img']
      };
      cardList.addItem(createCardMarkup({item, picturePopup}), true);
      addPlacePopup.close();
    }
  }
);
addPlacePopup.setEventListeners();
const addPlaceValidator = new FormValidator(validationClasses, addPlacePopup.getFormElement());
addPlaceValidator.enableValidation();

const editProfilePopup = new PopupWithForm(
  {
    popupSelector: '.popup_type_profile',
    handleFormSubmit: (formValues) => {
      const data = {
        name: formValues['name'],
        profession: formValues['profession']
      }
      userInfoInstance.setUserInfo(data);
      editProfilePopup.close();
    }
  }
);
editProfilePopup.setEventListeners();
const editProfileValidator = new FormValidator(validationClasses, editProfilePopup.getFormElement());
editProfileValidator.enableValidation();

/* init events */
profileAddButton.addEventListener('click', () => {
    addPlaceValidator.clearForm();
    addPlacePopup.open()
  }
);
profileEditButton.addEventListener('click', () => {
  editProfilePopup.open();
  editProfileValidator.clearForm();
  const userData = userInfoInstance.getUserInfo();
  nameElement.value = userData.name;
  professionElement.value = userData.profession;
  editProfileValidator.toggleButtonState();
});
