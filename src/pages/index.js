'use strict';
import './index.css'; // add import of the main stylesheets file
import {
  formConfig,
  cardConfig,
  popupConfig,
  initialCards,
  formList,
  buttonEdit,
  popupEdit,
  profileName,
  profileJob,
  formEdit,
  formInputName,
  formInputJob,
  buttonAdd,
  popupAdd,
  formInputTitle,
  formInputUrl,
  formAdd,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

// Do not delete - refer back to Working with Event Listeners — Part 1 I need to understand how to get tgis working
// const cardList = new Section(
//   {
//     items: [],
//     renderer: () => {},
//   },
//   cardConfig.cardContainerElement
// );

//Reusable functions
const cardRenderer = element => {
  const card = new Card(element, cardConfig.cardTemplateElement);
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

// initialCards.forEach(item => renderCard(item));

function popupToggle(popup) {
  popup.classList.toggle(popupConfig.popupOpenedClass);
  // closes popup with click on overlay
  popup.addEventListener('click', e => {
    if (e.target.classList.contains(popupConfig.popupOpenedClass)) {
      popupToggle(popup);
    }
  });
  // closes popup with click on overlay
  window.addEventListener('keydown', e => {
    if (
      e.key === 'Escape' &&
      popup.classList.contains(popupConfig.popupOpenedClass)
    ) {
      popupToggle(popup);
    }
  });
  // closes popup with click on close button
  const popupList = document.querySelectorAll(popupConfig.popupElement);
  popupList.forEach(popupElement => {
    popupElement.addEventListener('click', e => {
      if (e.target.classList.contains(popupConfig.popupEditCloseClass)) {
        popupToggle(popupElement);
      } else if (e.target.classList.contains(popupConfig.popupAddCloseClass)) {
        popupToggle(popupElement);
      }
    });
  });
}

// Profile editing
(function () {
  const editFormLoadHandler = () => {
    formInputName.value = profileName.textContent;
    formInputJob.value = profileJob.textContent;
  };

  const editFormSubmitHandler = () => {
    profileName.textContent = formInputName.value;
    profileJob.textContent = formInputJob.value;
  };

  buttonEdit.addEventListener('click', () => {
    popupToggle(popupEdit);
  });

  formEdit.addEventListener('submit', () => {
    popupToggle(popupEdit);
  });

  buttonEdit.addEventListener('click', editFormLoadHandler);
  formEdit.addEventListener('submit', editFormSubmitHandler);
})();

// Adding cards
(function () {
  const addFormSubmitHandler = () => {
    // Get values from form inputs
    const title = formInputTitle.value;
    const url = formInputUrl.value;
    // create an object that mimics initialCards structure
    // assign form values to relevant keys
    // pass object into renderCard function
    renderCard({ name: title, link: url });
    formAdd.reset();
  };

  buttonAdd.addEventListener('click', () => {
    popupToggle(popupAdd);
  });

  formAdd.addEventListener('submit', () => {
    popupToggle(popupAdd);
  });
  formAdd.addEventListener('submit', addFormSubmitHandler);
})();
