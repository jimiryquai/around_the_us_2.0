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
  formInputTitle,
  formInputUrl,
  formAdd,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Do not delete - refer back to Working with Event Listeners — Part 1 I need to understand how to get tgis working
// const cardList = new Section(
//   {
//     items: [],
//     renderer: () => {},
//   },
//   cardConfig.cardContainerElement
// );

const popupTypeImage = new PopupWithImage('.popup_type_image');
popupTypeImage.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add');
popupAddCard.setEventListeners();

const handleCardClick = data => popupTypeImage.open(data);
//Reusable functions
const cardRenderer = cardInstance => {
  const card = new Card(
    cardInstance,
    cardConfig.cardTemplateElement,
    handleCardClick
  );
  return card.generateCard();
};

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

cardList.renderItems();
// validate all forms
formList.forEach(form => {
  form = new FormValidator(formConfig, formConfig.formElement);
  form.enableValidation();
});

// Edit User Info
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});

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

const handleEditUserInfoFormLoad = () => {
  const user = userInfo.getUserInfo();
  formInputName.value = user.name;
  formInputJob.value = user.job;
};

buttonEdit.addEventListener('click', handleEditUserInfoFormLoad);

// Adding cards
(function () {
  const addFormSubmitHandler = () => {
    // Get values from form inputs
    const title = formInputTitle.value;
    const url = formInputUrl.value;
    // create an object that mimics initialCards structure
    // assign form values to relevant keys
    // pass object into renderCard function
    const cardElement = cardRenderer({ name: title, link: url });
    cardList.addItem(cardElement);
    formAdd.reset();
  };

  buttonAdd.addEventListener('click', () => {
    popupAddCard.open();
  });

  formAdd.addEventListener('submit', () => {
    popupAddCard.open();
  });
  formAdd.addEventListener('submit', addFormSubmitHandler);
})();
