'use strict';
import './index.css'; // add import of the main stylesheets file
import {
  formConfig,
  cardConfig,
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

api.getCardList().then(res => console.log(res));

// Returns a Promise.all and loads cards and userData
api
  .getAppInfo()
  .then(([cardsData, userData]) => {
    //const userId = userData._id;

    cardsData.forEach(cardItem => cardList.addItem(cardRenderer(cardItem)));
    // const cardList = new Section(
    //   {
    //     items: cardsData,
    //     renderer: cardItem => {
    //       const card = cardRenderer(cardItem);
    //       cardList.addItem(card);
    //     },
    //   },
    //   cardConfig.cardContainerElement
    // );
    // render card list
    //cardList.renderItems();

    // Get user info from server
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    // Get user avatar from server
    userInfo.setUserAvatar({ avatar: userData.avatar });
  })
  .catch(err => {
    console.log(err);
  });
//End of promise all

// Create instance of section class that
const cardList = new Section(
  {
    items: [],
    renderer: () => {},
  },
  cardConfig.cardContainerElement
);

// Adding cards
// Render a new card
const cardRenderer = cardInstance => {
  const card = new Card(
    cardInstance,
    cardConfig.cardTemplateElement,
    handleCardClick
  );
  return card.generateCard();
};

// Add a new card
const handleAddCardFormSubmit = ({
  'title-input': name,
  'url-input': link,
}) => {
  api
    .addCard({ name, link })
    .then(({ name, link }) => {
      cardList.addItem(cardRenderer({ name, link }));
    })
    .catch(err => {
      console.log(err);
    });
};

const popupAddCard = new PopupWithForm(
  '.popup_type_add',
  handleAddCardFormSubmit
);
popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
});

// Card clicks/Image Popup
const popupTypeImage = new PopupWithImage('.popup_type_image');

popupTypeImage.setEventListeners();

const handleCardClick = data => popupTypeImage.open(data);

// Edit User Info
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
    .editUserInfo({ name, about })
    .then(({ name, about }) => {
      userInfo.setUserInfo({ name, about });
    })
    .catch(err => {
      console.log(err);
    });
};

const popupEditUserInfo = new PopupWithForm(
  '.popup_type_edit',
  handleEditUserInfo
);
popupEditUserInfo.setEventListeners();

buttonEdit.addEventListener('click', () => {
  popupEditUserInfo.open();
});

// Validate all forms
formList.forEach(form => {
  form = new FormValidator(formConfig, formConfig.formElement);
  form.enableValidation();
});
