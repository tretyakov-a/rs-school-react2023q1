import Card from '@components/Card';
import './style.scss';
import { ModalContext } from '@components/Modal/context';
import { useContext } from 'react';
import { Photo } from '@src/api/images/types';

interface CardsListProps {
  data: Photo[];
}

const CardsList = (props: CardsListProps) => {
  const { setModal } = useContext(ModalContext);

  const handleClick = (id: string) => () => {
    setModal({ isOpen: true, id, type: 'info' });
  };

  return (
    <ul className="cards-list">
      {props.data.map((item, index) => (
        <li className="cards-list__item" key={`${index}-${item.id}`}>
          <Card data={item} onClick={handleClick(item.id)} />
        </li>
      ))}
    </ul>
  );
};

export default CardsList;
