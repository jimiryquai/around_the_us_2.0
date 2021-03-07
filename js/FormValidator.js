import { formConfig } from './index.js';

export default class FormValidator {
  constructor(config, formElement) {
    // the name and the link are private fields,
    // they're only needed inside the class
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(formConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formConfig.errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formConfig.inputErrorClass);
    errorElement.classList.remove(formConfig.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement) {
    !inputElement.validity.valid
      ? this._showInputError(
          formElement,
          inputElement,
          inputElement.validationMessage
        )
      : this._hideInputError(formElement, inputElement);
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(formConfig.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(formConfig.inactiveButtonClass);
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(formConfig.inputElement)
    );
    const buttonElement = formElement.querySelector(formConfig.buttonElement);

    // call here to check button state on page load
    this._toggleButtonState(inputList, buttonElement);
    // Iterate over the resulting array
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        // call here, to check button state on when input event is fired
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(formConfig.formElement)
    );
    formList.forEach(formElement => {
      formElement.addEventListener('submit', e => {
        e.preventDefault();
      });
      const fieldsetList = Array.from(
        formElement.querySelectorAll(formConfig.formSetElement)
      );
      fieldsetList.forEach(fieldSet => {
        this._setEventListeners(fieldSet);
      });
    });
  }
}
