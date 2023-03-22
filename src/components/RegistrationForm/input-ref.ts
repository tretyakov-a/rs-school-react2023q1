import React from 'react';
import { FormFieldOptions } from '@components/RegistrationForm/form-field';

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

  public setValue = (field?: FormFieldOptions) => {
    const getDefaultValue = (field?: FormFieldOptions) =>
      field && field.defaultValue !== undefined ? field.defaultValue : null;
    const { el } = this;
    if (el === null) return;
    const defaultValue = getDefaultValue(field);
    if (el instanceof HTMLInputElement) {
      if (el.type === 'radio' || el.type === 'checkbox') {
        if (field && field.formFieldType === 'list') el.value = field ? field.name : '';
        el.checked = defaultValue !== null ? Boolean(defaultValue) : false;
        el.defaultChecked = defaultValue !== null ? Boolean(defaultValue) : false;
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
