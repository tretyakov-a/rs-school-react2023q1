import React, { useState } from 'react';
import './style.scss';
import RegistrationForm from '@components/RegistrationForm';
import RegistrationList from '@components/RegistrationList';
import PageWrap from '@components/PageWrap';

const Registration = () => {
  const [listData, setListData] = useState<FormData[]>([]);

  const handleRegistrationFormSubmit = (formData: FormData) => {
    setListData((prevState) => [...prevState, formData]);
  };

  return (
    <PageWrap className="registration">
      <RegistrationForm onSubmit={handleRegistrationFormSubmit} />
      <RegistrationList data={listData} />
    </PageWrap>
  );
};

export default Registration;
