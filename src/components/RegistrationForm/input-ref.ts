import React from 'react';

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

  public clearValue = () => {
    const { el } = this;
    if (el !== null) {
      if (el instanceof HTMLInputElement) {
        el.value = '';
        el.checked = false;
      } else if (el instanceof HTMLSelectElement) {
        el.value = '';
      }
    }
  };
}
