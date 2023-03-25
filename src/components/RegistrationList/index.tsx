import React from 'react';
import './style.scss';
import { FormFieldOptions } from '@components/RegistrationForm/form-field';

interface RegistrationListProps {
  data: FormData[];
  formFields: FormFieldOptions[];
}

export default class RegistrationList extends React.Component<RegistrationListProps> {
  renderFile = (file: File) => {
    const img = <img src={URL.createObjectURL(file)} alt={file.name} width={100} />;
    return (
      <>
        <span>{img}</span>
        <span>{`(${Math.trunc(file.size / 1000)} KB)`}</span>
      </>
    );
  };

  renderFieldValue = (value: FormDataEntryValue | string, type: string) => {
    if (value instanceof File) {
      return this.renderFile(value);
    }
    if (type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  renderListItemContent = (formData: FormData) => {
    const items: JSX.Element[] = [];
    this.props.formFields.forEach(({ name, label, type }) => {
      const values = formData.getAll(name);
      if (values.length === 0) return;
      const value = values.length > 1 ? values.join(', ') : values[0];
      if (value instanceof File && value.size === 0) return;
      items.push(
        <div className="registration-list__item-row" key={name}>
          <span className="registration-list__item-row-label">{label}:</span>
          <span className="registration-list__item-row-value">
            {this.renderFieldValue(value, type)}
          </span>
        </div>
      );
    });
    return items;
  };

  render() {
    return (
      <ul className="registration-list">
        {this.props.data.map((formData, index) => (
          <li className="registration-list__item" key={index}>
            <div className="registration-list__card">{this.renderListItemContent(formData)}</div>
          </li>
        ))}
      </ul>
    );
  }
}
