import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { Photo } from '@src/api/images/types';

interface CardPropsType {
  data: Photo;
  onClick?: () => void;
}

const Card = (props: CardPropsType) => {
  const {
    data: { title, url_q, ownername },
  } = props;

  const cropedTitle = title.length > 64 ? title.slice(0, 64) + '...' : title;
  return (
    <div className="card" onClick={props.onClick}>
      <div className="card__top">
        <div className="card__left">
          <div className="card__img">
            {url_q ? <img src={url_q} alt={title} /> : <FontAwesomeIcon icon={faBook} />}
          </div>
        </div>
        <div className="card__info">
          <div className="card__title">{cropedTitle}</div>
          <div className="card__author">by {ownername}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
