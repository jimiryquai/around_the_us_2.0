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
    return Object.fromEntries(new FormData(this._form));
  }

  close() {
    //It modifies the close() parent method in order to reset the form once the popup is closed.
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    // It modifies the setEventListeners() parent method.
    super.setEventListeners();
    // It adds the submit event handler to the submit button.
    this._button.addEventListener('click', e => this.close(e));
    // It adds the submit event handler to the submit button.
    this._form.addEventListener('submit', e => {
      debugger;
      this._handleFormSubmit(this._getInputValues(e));
      this.close();
    });
  }
}
