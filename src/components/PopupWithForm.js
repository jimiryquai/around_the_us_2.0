import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector('.form');
    this._button = this._element.querySelector('.popup__close');
  }
  // It stores a private method named _getInputValues(), which collects data from all the input fields.
  _getInputValues() {
    console.log(Object.fromEntries(new FormData(this._form)));
    return Object.fromEntries(new FormData(this._form));
  }

  close(e) {
    //It modifies the close() parent method in order to reset the form once the popup is closed.
    super.close(e);
    this._form.reset();
  }

  setEventListeners() {
    // It modifies the setEventListeners() parent method.
    super.setEventListeners();
    // It adds the click event listener to the close icon
    this._button.addEventListener('click', e => this.close(e));
    // It adds the submit event handler to the submit button.
    this._form.addEventListener('submit', e => {
      this._handleFormSubmit(this._getInputValues(e));
      this.close(e);
    });
  }
}
