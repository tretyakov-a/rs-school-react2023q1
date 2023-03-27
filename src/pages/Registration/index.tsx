import React, { useState } from 'react';
import './style.scss';
import RegistrationForm from '@components/RegistrationForm';
import { getFormFields } from '@components/RegistrationForm/form-field';
import RegistrationList from '@components/RegistrationList';
import PageWrap from '@components/PageWrap';

const Registration = () => {
  const [listData, setListData] = useState<FormData[]>([]);

  const handleRegistrationFormSubmit = (formData: FormData) => {
    setListData((prevState) => [...prevState, formData]);
  };

  const formFields = getFormFields();

  return (
    <PageWrap className="registration">
      <RegistrationForm formFields={formFields} onSubmit={handleRegistrationFormSubmit} />
      <RegistrationList formFields={formFields} data={listData} />
    </PageWrap>
  );
};

export default Registration;
