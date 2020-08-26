import '../../pages/index.css';

import {initialCards} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const picturePopup = new PopupWithImage('.popup_type_picture');
picturePopup.setEventListeners();

const userInfoInstance = new UserInfo({nameSelector: '.profile__name', descrSelector: '.profile__profession'});

const cardList = new Section(
  {
    items : initialCards,
    renderer : (item) => {
      const cardElement = new Card(
        {
          data: item,
          cardSelector: '#place-template',
          cardClickHandler : (link, title) => {
            picturePopup.open(link, title);
          }
        }
      );
      cardList.addItem(cardElement.generateCard());
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
      const cardElement = new Card(
        {
          data: item,
          cardSelector: '#place-template',
          cardClickHandler : (link, title) => {
            picturePopup.open(link, title);
          }
        }
      );
      cardList.addItem(cardElement.generateCard(), true);
      addPlacePopup.close();
    },
    formValidatorInitializator: (form, classes) => {
      return new FormValidator(form, classes);
    }
  }
);
addPlacePopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  {
    popupSelector: '.popup_type_profile',
    handleFormSubmit: (formValues) => {
      const data = {
        name: formValues['name'],
        descr: formValues['profession']
      }
      userInfoInstance.setUserInfo(data);
      editProfilePopup.close();
    },
    formValidatorInitializator: (form, classes) => {
      return new FormValidator(form, classes);
    },
    beforeOpenAction: () => {
      const userData = userInfoInstance.getUserInfo();
      document.querySelector('.input__text_type_name').value = userData.name;
      document.querySelector('.input__text_type_profession').value = userData.descr;
    }
  }
);
editProfilePopup.setEventListeners();

/* init events */
document.querySelector('.profile__add-button').addEventListener('click', () => {addPlacePopup.open()});
document.querySelector('.profile__edit-button').addEventListener('click', () => {editProfilePopup.open()});
