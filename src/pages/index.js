'use strict';
import './index.css'; // add import of the main stylesheets file
import {
  formConfig,
  cardConfig,
  initialCards,
  formList,
  buttonEdit,
  formInputName,
  formInputJob,
  buttonAdd,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Do not delete - refer back to Working with Event Listeners — Part 1 I need to understand how to get this working
// const cardList = new Section(
//   {
//     items: [],
//     renderer: () => {},
//   },
//   cardConfig.cardContainerElement
// );

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

// Create a card list section and add cards to list
const cardList = new Section(
  {
    items: initialCards,
    renderer: cardItem => {
      const card = cardRenderer(cardItem);
      cardList.addItem(card);
    },
  },
  cardConfig.cardContainerElement
);

// Add a new card
const handleAddCardFormSubmit = ({ 'title-input': name, 'url-input': link }) =>
  cardList.addItem(cardRenderer({ name, link }));

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

// render card list
cardList.renderItems();

// Edit User Info
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});

const handleEditUserInfoFormLoad = () => {
  const user = userInfo.getUserInfo();
  formInputName.value = user.name;
  formInputJob.value = user.job;
};

buttonEdit.addEventListener('click', handleEditUserInfoFormLoad);

const handleEditUserInfoFormSubmit = ({
  'name-input': name,
  'job-input': job,
}) => userInfo.setUserInfo({ name, job });

const popupEditUserInfo = new PopupWithForm(
  '.popup_type_edit',
  handleEditUserInfoFormSubmit
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
