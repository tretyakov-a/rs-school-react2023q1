import React, { useState } from 'react';
import './style.scss';
import RegistrationForm from './RegistrationForm';
import RegistrationList from './RegistrationList';
import PageWrap from '@components/PageWrap';
import { FormInputs } from './RegistrationForm/types';
import { cloneFile } from '@common/helpers';

export type StoredFormInputs = Omit<FormInputs, 'avatar'> & {
  avatar: File | string;
};

const Registration = () => {
  const [listData, setListData] = useState<StoredFormInputs[]>([]);

  const handleRegistrationFormSubmit = (formData: FormInputs) => {
    const avatar =
      formData.avatar instanceof FileList && formData.avatar.length > 0
        ? cloneFile(formData.avatar[0])
        : '';
    setListData((prevState) => [...prevState, { ...formData, avatar }]);
  };

  return (
    <PageWrap className="registration">
      <RegistrationForm onSubmit={handleRegistrationFormSubmit} />
      <RegistrationList data={listData} />
    </PageWrap>
  );
};

export default Registration;
