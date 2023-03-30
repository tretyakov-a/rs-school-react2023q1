import './style.scss';
import { formFieldsOptions } from '@components/RegistrationForm/config';
import { StoredFormInputs } from '@pages/Registration';

interface RegistrationListProps {
  data: StoredFormInputs[];
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

  const renderFieldValue = (value: File | string | string[], type: string) => {
    if (value instanceof File) {
      return renderFile(value);
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  const renderListItemContent = (formData: StoredFormInputs) => {
    const items: JSX.Element[] = [];
    const keys = Object.keys(formData) as (keyof StoredFormInputs)[];
    keys.forEach((name) => {
      const { type, label } = formFieldsOptions[name];
      const value = formData[name];
      if (!Boolean(value)) return;
      items.push(
        <div className="registration-list__item-row" key={name}>
          <span className="registration-list__item-row-label">{label}:</span>
          <span className="registration-list__item-row-value">
            {renderFieldValue(formData[name], type)}
          </span>
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
