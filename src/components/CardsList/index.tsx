import cardsData from '@assets/cards.json';
import Card from '@components/Card';
import './style.scss';

const CardsList = () => {
  return (
    <ul className="cards-list">
      {cardsData.map((item) => (
        <li className="cards-list__item" key={item.id}>
          <Card data={item} />
        </li>
      ))}
    </ul>
  );
};

export default CardsList;
