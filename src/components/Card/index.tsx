import './style.scss';
import { Product, imagesUrl } from '@common/product';
import { Rating } from './Rating';

interface CardPropsType {
  data: Product;
}

const Card = (props: CardPropsType) => {
  const { brand, brandImage, imgs, price, rating, title } = props.data;

  return (
    <div className="card">
      <div className="card__img">
        <img src={`${imagesUrl}${imgs && Array.isArray(imgs) && imgs[0]}`} alt={title as string} />
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
};

export default Card;
