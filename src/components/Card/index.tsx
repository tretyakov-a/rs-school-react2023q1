import React from 'react';
import './style.scss';
import {
  Product,
  propPickers,
  imagesUrl,
  ProductKeyType,
  ProductProps,
} from '../../common/product';
import { Rating } from './Rating';

export interface CardPropsType {
  data: Product;
}

export class Card extends React.Component<CardPropsType> {
  render() {
    const keys = Object.keys(propPickers) as ProductKeyType[];
    const productProps: ProductProps = keys.reduce((acc, key) => {
      return { ...acc, [key]: propPickers[key](this.props.data) };
    }, {} as ProductProps);

    const { brand, brandImage, imgs, price, rating, title } = productProps;

    return (
      <div className="card">
        <div className="card__img">
          <img
            src={`${imagesUrl}${imgs && Array.isArray(imgs) && imgs[0]}`}
            alt={title as string}
          />
        </div>
        <div className="card__brand-img">
          <img src={`${imagesUrl}${brandImage}`} alt={brand as string} />
        </div>
        <div className="card__info">
          <div className="card__title">{title}</div>
          <div className="card__info-row">
            <div className="card__rating">
              <Rating value={rating as number} />
            </div>
            <div className="card__price">{price}&nbsp;₽</div>
          </div>
        </div>
      </div>
    );
  }
}
