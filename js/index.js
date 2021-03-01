'use strict';
// Selector variables
const buttonEdit = document.querySelector('.button_edit');
const buttonAdd = document.querySelector('.button_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_image');
const popupFigImg = popupImg.querySelector('.popup__image');
const popupFigCaption = popupImg.querySelector('.popup__caption');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formInputName = document.querySelector('.form__input_name');
const formInputJob = document.querySelector('.form__input_job');
const formInputTitle = document.querySelector('.form__input_title');
const formInputUrl = document.querySelector('.form__input_url');
const formEdit = document.querySelector('.form_type_edit');
const formAdd = document.querySelector('.form_type_add');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;

// Cards array
const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg',
  },
];

// Reusable functions
const createCard = card => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const buttonTrash = cardElement.querySelector('.button_trash');
  const buttonHeart = cardElement.querySelector('.button_heart');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardImage.addEventListener('click', e => {
    popupImg.classList.toggle('popup_opened');
    renderPopupImg(e);
  });

  buttonTrash.addEventListener('click', e => {
    e.target.parentElement.remove();
  });

  buttonHeart.addEventListener('click', e => {
    e.target.classList.toggle('button_heart_liked');
  });

  return cardElement;
};

const renderCard = card => cardsContainer.prepend(createCard(card));

initialCards.forEach(element => renderCard(element));

const renderPopupImg = e => {
  popupFigImg.src = e.target.src;
  popupFigImg.alt = e.target.alt;
  popupFigCaption.textContent = e.target.alt;
};

const editFormLoadHandler = () => {
  formInputName.value = profileName.textContent;
  formInputJob.value = profileJob.textContent;
};

const editFormSubmitHandler = () => {
  profileName.textContent = formInputName.value;
  profileJob.textContent == formInputJob.value;
};

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

function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
  console.log(popup);

  // const popupList = document.querySelectorAll('.popup');
  // popupList.forEach(popupElement => {
  //   popupElement.addEventListener('click', e => {
  //     if (e.target.classList.contains('popup__close_type_edit')) {
  //       popupToggle(popup);
  //     } else if (e.target.classList.contains('popup__close_type_add')) {
  //       popupToggle(popup);
  //     } else if (e.target.classList.contains('popup__close_type_image')) {
  //       popupToggle(popup);
  //     }
  //   });
  // });

  popup.addEventListener('click', e => {
    if (e.target.classList.contains('popup')) {
      popupToggle(popup);
    }
  });

  // fires only once - when the user releases the key
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      popupToggle(popup);
    }
  });

  popupEdit.addEventListener('click', e => {
    if (e.target.classList.contains('popup__close_type_edit')) {
      popupToggle(popup);
    }
  });

  popupAdd.addEventListener('click', e => {
    if (e.target.classList.contains('popup__close_type_add')) {
      popupToggle(popup);
    }
  });

  popupImg.addEventListener('click', e => {
    if (e.target.classList.contains('popup__close_type_image')) {
      popupToggle(popup);
    }
  });
}

// Event listeners
// Popup toggling
buttonEdit.addEventListener('click', () => {
  popupToggle(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  popupToggle(popupAdd);
});

formEdit.addEventListener('submit', () => {
  popupToggle(popupEdit);
});

formAdd.addEventListener('submit', () => {
  popupToggle(popupAdd);
});

// Form handling
buttonEdit.addEventListener('click', editFormLoadHandler);
formEdit.addEventListener('submit', editFormSubmitHandler);
formAdd.addEventListener('submit', addFormSubmitHandler);
