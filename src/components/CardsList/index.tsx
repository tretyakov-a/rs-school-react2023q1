import React from 'react';
import cardsData from '@assets/cards.json';
import Card from '@components/Card';
import './style.scss';

export default class CardsList extends React.Component {

  render() {
    return (
      <ul className="cards-list">
        {cardsData.map(item => (
          <li className="cards-list__item" key={item.id}>
            <Card data={item}/>
          </li>
        ))}
      </ul>
    );
  }
}
