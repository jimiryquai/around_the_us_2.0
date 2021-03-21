'use strict';
import './index.css'; // add import of the main stylesheets file
import {
  formConfig,
  cardConfig,
  profileConfig,
  formList,
  buttonEdit,
  formInputName,
  formInputJob,
  buttonAdd,
} from '../utils/constants.js';
import api from '../utils/api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Create instance of section class
const cardList = new Section(
  {
    items: [],
    renderer: () => {},
  },
  cardConfig.cardContainerElement
);

// Image Popup
const popupTypeImage = new PopupWithImage('.popup_type_image');

popupTypeImage.setEventListeners();

const popupTypeDelete = new PopupWithForm({
  popupSelector: '.popup_type_delete',
  handleFormSubmit: card => {
    api.removeCard(card._id).then(() => {
      debugger;
      cardList.removeItem(card);
      popupTypeDelete.close();
      location.reload();
    });
  },
});

popupTypeDelete.setEventListeners();

// Render a card
const addCard = (cardInstance, userId) => {
  const newCard = new Card(
    {
      data: cardInstance,
      handleCardClick: cardData => {
        popupTypeImage.open(cardData);
      },
      handleDeleteClick: card => {
        popupTypeDelete.open(card);
      },
      userId,
    },
    cardConfig.cardTemplateElement
  );
  return newCard.generateCard();
};

// Add a new card
const handleAddCardFormSubmit = ({
  'title-input': name,
  'url-input': link,
}) => {
  api
    .addCard({ name, link })
    .then(cardElement => {
      cardList.addItem(addCard(cardElement, cardElement.owner._id));
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
};

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: handleAddCardFormSubmit,
});

popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
});

// Get & Edit User Info
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.avatar__img',
});

const handleGetUserInfo = () => {
  const user = userInfo.getUserInfo();
  formInputName.value = user.name;
  formInputJob.value = user.about;
};

buttonEdit.addEventListener('click', handleGetUserInfo);

const handleEditUserInfo = ({ 'name-input': name, 'job-input': about }) => {
  api
    .setUserInfo({ name, about })
    .then(userProfile => {
      userInfo.setUserInfo({
        name: userProfile.name,
        about: userProfile.about,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const popupEditUserInfo = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: handleEditUserInfo,
});

popupEditUserInfo.setEventListeners();

document
  .querySelector(profileConfig.buttonEditElement)
  .addEventListener('click', () => {
    popupEditUserInfo.open();
  });

const handleEditAvatar = ({ 'avatar-input': avatar }) => {
  api
    .setUserAvatar({
      avatar,
    })
    .then(userAvatar => {
      userInfo.setUserAvatar({
        avatar: userAvatar.avatar,
      });
      popupEditAvatar.close();
    })
    .catch(err => {
      console.log(err);
    });
};

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleEditAvatar,
});

popupEditAvatar.setEventListeners();

document
  .querySelector(profileConfig.buttonAvatarElement)
  .addEventListener('click', () => {
    popupEditAvatar.open();
  });

// Validates all forms
formList.forEach(form => {
  form = new FormValidator(formConfig, formConfig.formElement);
  form.enableValidation();
});

// Returns a Promise.all and loads cards and userData
api
  .getAppInfo()
  .then(([cardsData, userData]) => {
    const userId = userData._id;
    // Get user info from server
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    // Get user avatar from server
    userInfo.setUserAvatar({ avatar: userData.avatar });
    cardsData.forEach(cardItem => cardList.addItem(addCard(cardItem, userId)));
  })
  .catch(err => {
    console.log(err);
  });

api.getCardList().then(res => console.log(res));
