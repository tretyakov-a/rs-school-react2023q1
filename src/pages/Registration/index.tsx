import './style.scss';
import RegistrationForm from './RegistrationForm';
import RegistrationList from './RegistrationList';
import PageWrap from '@components/PageWrap';
import { FormInputs } from './RegistrationForm/types';
import { cloneFile } from '@common/helpers';
import { addListItem } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';

const Registration = () => {
  const listData = useSelector((state: RootState) => state.registrationList.data);
  const dispatch = useDispatch();

  const handleRegistrationFormSubmit = (formData: FormInputs) => {
    const avatar =
      formData.avatar instanceof FileList && formData.avatar.length > 0
        ? cloneFile(formData.avatar[0])
        : '';
    dispatch(addListItem({ ...formData, avatar }));
  };

  return (
    <PageWrap className="registration">
      <RegistrationForm onSubmit={handleRegistrationFormSubmit} />
      <RegistrationList data={listData} />
    </PageWrap>
  );
};

export default Registration;
