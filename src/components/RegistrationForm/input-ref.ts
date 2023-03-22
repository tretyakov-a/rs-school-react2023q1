import React from 'react';
import { FormFieldOption } from '@components/RegistrationForm/form-fields';

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

  public setValue = (field?: FormFieldOption) => {
    const getDefaultValue = (field?: FormFieldOption) =>
      field && field.defaultValue !== undefined ? field.defaultValue : null;
    const { el } = this;
    if (el === null) return;
    const defaultValue = getDefaultValue(field);
    if (el instanceof HTMLInputElement) {
      if (el.type === 'radio' || el.type === 'checkbox') {
        el.value = field ? field.name : '';
        el.checked = defaultValue !== null ? Boolean(defaultValue) : false;
      } else {
        el.value = defaultValue !== null ? String(defaultValue) : '';
      }
    } else if (el instanceof HTMLSelectElement) {
      el.value = defaultValue !== null ? String(defaultValue) : '';
    }
  };

  public clearValue = () => {
    this.setValue();
  };
}
