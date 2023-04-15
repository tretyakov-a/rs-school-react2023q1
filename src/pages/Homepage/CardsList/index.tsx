import Card from '@components/Card';
import './style.scss';
import { ModalContext } from '@components/Modal/context';
import { useContext, useEffect } from 'react';
import { Photo } from '@src/api/images/types';
import CardFull from '@components/CardFull';
import { AppDispatch, RootState } from '@src/store';
import { useDispatch, useSelector } from 'react-redux';
import { getImageInfo } from './store';

interface CardsListProps {
  data: Photo[];
}

const CardsList = (props: CardsListProps) => {
  const { loading, error } = useSelector((state: RootState) => state.cardsList);
  const dispatch: AppDispatch = useDispatch();

  const { modal, openModal, setModalState } = useContext(ModalContext);

  const handleClick = (photo: Photo) => async () => {
    if (photo !== undefined) {
      openModal({ type: 'info' });
      const data = await dispatch(getImageInfo(photo.id)).unwrap();
      setModalState({
        imageRatio: data.imageRatio,
        content: <CardFull data={data} />,
      });
    }
  };

  useEffect(() => {
    console.log(loading);
    if (modal.isOpen === true) {
      setModalState({ loadingState: { loading, error } });
    }
  }, [modal.isOpen, loading, error, setModalState]);

  return (
    <ul className="cards-list">
      {props.data.map((item, index) => (
        <li className="cards-list__item" key={`${index}-${item.id}`}>
          <Card data={item} onClick={handleClick(item)} />
        </li>
      ))}
    </ul>
  );
};

export default CardsList;
