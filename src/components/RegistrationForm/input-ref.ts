import React from 'react';
import { FormFieldOptions, getDefaultValue } from '@components/RegistrationForm/form-field';

export default class InputRef {
  private _ref: React.RefObject<HTMLElement>;

  constructor() {
    this._ref = React.createRef<HTMLElement>();
  }

  get el() {
    return this._ref.current;
  }

  get ref() {
    return this._ref;
  }

  setInputValue = (el: HTMLInputElement, field?: FormFieldOptions) => {
    const defaultValue = getDefaultValue(field);
    if (el.type === 'radio' || el.type === 'checkbox') {
      if (field && field.formFieldType === 'list') el.value = field && field.name;
      el.checked = defaultValue !== null ? Boolean(defaultValue) : false;
      el.defaultChecked = defaultValue !== null ? Boolean(defaultValue) : false;
    } else {
      if (el.type === 'file') {
        el.dispatchEvent(new InputEvent('input', { bubbles: true }));
      } else {
        el.value = defaultValue !== null ? String(defaultValue) : '';
      }
    }
  };

  setSelectValue = (el: HTMLSelectElement, field?: FormFieldOptions) => {
    const defaultValue = getDefaultValue(field);
    el.value = defaultValue !== null ? String(defaultValue) : '';
  };

  public setValue = (field?: FormFieldOptions) => {
    const { el } = this;
    if (el === null) return;
    if (el instanceof HTMLInputElement) {
      this.setInputValue(el, field);
    } else if (el instanceof HTMLSelectElement) {
      this.setSelectValue(el, field);
    }
  };

  public clearValue = () => {
    this.setValue();
  };
}
