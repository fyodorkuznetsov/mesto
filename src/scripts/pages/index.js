import '../../pages/index.css';

import {validationClasses} from '../utils/constants.js';
import {createCardMarkup} from '../utils/functions.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

/*work with api*/
/*load inital cards*/
const apiInstance = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
      authorization: '01de46de-ea96-4368-9287-db88b2ef4480',
      'Content-Type': 'application/json'
    }
  }
);
apiInstance.getUserInfo()
          .then((res) => {
              userInfoInstance.setUserInfo(
                {
                  name: res.name,
                  profession: res.about,
                  avatar: res.avatar
                }
              );
              apiInstance.setUserId(res._id);

              apiInstance.getInitialCards()
              .then((res) => {
                /*результат полученных с сервера карточек */
                const initialCards = [];
                res.forEach((resItem) => {
                  initialCards.push(
                    {
                      name: resItem.name,
                      link: resItem.link,
                      likes: resItem.likes.length,
                      id: resItem._id,
                      isOwner: resItem.owner._id === apiInstance.getUserId(),
                      isLiked: Array.from(resItem.likes).some((like) => like._id === apiInstance.getUserId())
                    }
                  );
                });
                const cardList = new Section(
                  {
                    items : initialCards,
                    renderer : (item) => {
                      cardList.addItem(
                        createCardMarkup(
                          {
                            item,
                            picturePopup,
                            apiInstance
                          }
                        )
                      );
                    }
                  },
                  '.places'
                );
                cardList.renderItems();

                /*Размещаем инициализацию попапа для карточек после загрузки карточек с сервера */
                const addPlacePopup = new PopupWithForm(
                  {
                    popupSelector: '.popup_type_place',
                    handleFormSubmit: (formValues) => {
                      addPlacePopup.getButtonElement().textContent = 'Сохранение...';
                      const item = {
                        name: formValues['place-title'],
                        link: formValues['place-img']
                      };
                      apiInstance.addNewCard(item)
                      .then((res) => {
                        cardList.addItem(
                          createCardMarkup(
                            {
                              item: {
                                name: res.name,
                                link: res.link,
                                id: res._id,
                                likes: res.likes.length,
                                isOwner: res.owner._id === apiInstance.getUserId(),
                                isLiked: Array.from(res.likes).some((like) => like._id === apiInstance.getUserId())
                              },
                              picturePopup,
                              apiInstance
                            }
                          ),
                          true
                        );
                      })
                      .catch((err) => {
                        console.log(err);
                      })
                      .finally(
                        () => {
                          addPlacePopup.getButtonElement().textContent = 'Сохранить';
                          addPlacePopup.close();
                        }
                      );
                    }
                  }
                );
                addPlacePopup.setEventListeners();
                const addPlaceValidator = new FormValidator(validationClasses, addPlacePopup.getFormElement());
                addPlaceValidator.enableValidation();

                /* init card add events */
                profileAddButton.addEventListener('click', () => {
                    addPlaceValidator.clearForm();
                    addPlacePopup.open()
                  }
                );
              }).catch((err) => {
                console.log(err);
              })
            }
          ).catch((err) => {
            console.log(err);
          });

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const avatarEditButton = document.querySelector('.profile__avatar-btn');

const nameElement = document.querySelector('.input__text_type_name');
const professionElement = document.querySelector('.input__text_type_profession');
const avatarElement = document.querySelector('.profile__avatar');

const picturePopup = new PopupWithImage('.popup_type_picture');
picturePopup.setEventListeners();

const userInfoInstance = new UserInfo({nameSelector: '.profile__name', professionSelector: '.profile__profession', avatarSelector: '.profile__avatar'});

const editProfilePopup = new PopupWithForm(
  {
    popupSelector: '.popup_type_profile',
    handleFormSubmit: (formValues) => {
      editProfilePopup.getButtonElement().textContent = 'Сохранение...';
      const data = {
        name: formValues['name'],
        profession: formValues['profession']
      }
      apiInstance.updateUserProfile(
        {
          name: data.name,
          about: data.profession
        }
      )
      .then((res) => {
        userInfoInstance.setUserInfo({
          name: res.name,
          profession: res.about
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(
        () => {
          editProfilePopup.getButtonElement().textContent = 'Сохранить';
          editProfilePopup.close();
        }
      );
    }
  }
);
editProfilePopup.setEventListeners();
const editProfileValidator = new FormValidator(validationClasses, editProfilePopup.getFormElement());
editProfileValidator.enableValidation();

const editAvatarPopup = new PopupWithForm(
  {
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (formValues) => {
      editAvatarPopup.getButtonElement().textContent = 'Сохранение...';
      apiInstance.updateUserAvatar(formValues.avatar)
      .then((res) => {
        userInfoInstance.setUserInfo({
          avatar: res.avatar
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(
        () => {
          editAvatarPopup.close();
          editAvatarPopup.getButtonElement().textContent = 'Сохранить';
        }
      );
    }
  }
);
editAvatarPopup.setEventListeners();
const editAvatarValidator = new FormValidator(validationClasses, editAvatarPopup.getFormElement());
editAvatarValidator.enableValidation();

avatarEditButton.addEventListener('click', () => {
  editAvatarPopup.open();
  editAvatarValidator.clearForm();
});

profileEditButton.addEventListener('click', () => {
  editProfilePopup.open();
  editProfileValidator.clearForm();
  const userData = userInfoInstance.getUserInfo();
  nameElement.value = userData.name;
  professionElement.value = userData.profession;
  editProfileValidator.toggleButtonState();
});
