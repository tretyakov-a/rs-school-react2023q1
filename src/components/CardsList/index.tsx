import Card from '@components/Card';
import './style.scss';
import { BooksItem } from '@src/api/books/types';

interface CardsListProps {
  data: BooksItem[];
}

const CardsList = (props: CardsListProps) => {
  return (
    <ul className="cards-list">
      {props.data.map((item) => (
        <li className="cards-list__item" key={item.id}>
          <Card data={item} />
        </li>
      ))}
    </ul>
  );
};

export default CardsList;
