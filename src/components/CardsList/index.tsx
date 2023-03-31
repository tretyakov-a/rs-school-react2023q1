import Card from '@components/Card';
import './style.scss';
import { BooksItem } from '@src/api/books/types';
import { ModalContext } from '@components/Modal/context';
import { useContext } from 'react';

interface CardsListProps {
  data: BooksItem[];
}

const CardsList = (props: CardsListProps) => {
  const { setModal } = useContext(ModalContext);

  const handleClick = (id: string) => () => {
    setModal!({ isOpen: true, id, type: 'info' });
  };

  return (
    <ul className="cards-list">
      {props.data.map((item) => (
        <li className="cards-list__item" key={item.id} onClick={handleClick(item.id)}>
          <Card data={item} />
        </li>
      ))}
    </ul>
  );
};

export default CardsList;
