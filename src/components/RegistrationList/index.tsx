import './style.scss';
import { FormFieldOptions } from '@components/RegistrationForm/form-field';
import { formFieldsOptions } from '../RegistrationForm/form-field/config';

interface RegistrationListProps {
  data: FormData[];
}

const RegistrationList = (props: RegistrationListProps) => {
  const renderFile = (file: File) => {
    const img = <img src={URL.createObjectURL(file)} alt={file.name} width={100} />;
    return (
      <>
        <span>{img}</span>
        <span>{`(${Math.trunc(file.size / 1000)} KB)`}</span>
      </>
    );
  };

  const renderFieldValue = (value: FormDataEntryValue | string, type: string) => {
    if (value instanceof File) {
      return renderFile(value);
    }
    if (type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  const renderListItemContent = (formData: FormData) => {
    const items: JSX.Element[] = [];
    const keys = Object.keys(formFieldsOptions);
    keys.forEach((name) => {
      const { label, type } = formFieldsOptions[name];
      const values = formData.getAll(name);
      if (values.length === 0) return;
      const value = values.length > 1 ? values.join(', ') : values[0];
      if (value instanceof File && value.size === 0) return;
      items.push(
        <div className="registration-list__item-row" key={name}>
          <span className="registration-list__item-row-label">{label}:</span>
          <span className="registration-list__item-row-value">{renderFieldValue(value, type)}</span>
        </div>
      );
    });
    return items;
  };

  return (
    <ul className="registration-list">
      {props.data.map((formData, index) => (
        <li className="registration-list__item" key={index}>
          <div className="registration-list__card">{renderListItemContent(formData)}</div>
        </li>
      ))}
    </ul>
  );
};

export default RegistrationList;
