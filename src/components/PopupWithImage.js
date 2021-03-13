import Popup from './Popup';

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    this._element.querySelector('.popup__caption').textContent = name;
    const popupImg = this._element.querySelector('.popup__image');
    popupImg.alt = name;
    popupImg.src = link;
    super.open();
  }
}
