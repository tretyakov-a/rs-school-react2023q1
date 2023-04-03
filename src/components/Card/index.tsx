import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { BooksItem, BooksItemExtra } from '@src/api/books/types';
import { Rating } from './Rating';
import { renderDate } from '@common/helpers';

interface CardPropsType {
  data: BooksItemExtra | BooksItem;
  displayMode?: 'short' | 'full';
  onClick?: () => void;
}

const Card = (props: CardPropsType) => {
  const {
    title,
    authors,
    publisher,
    publishedDate,
    categories,
    imageLinks,
    language,
    description,
    averageRating,
    ratingsCount,
  } = props.data.volumeInfo;
  const { displayMode = 'short' } = props;

  const renderInfoRow = (label: string, data: string | JSX.Element, className?: string) => (
    <div className={`card__row ${className ? `card__row_${className}` : ''}`}>
      <span className="card__row-title">{label}</span>
      <span className="card__row-content">{data}</span>
    </div>
  );

  const cardClasses = ['card', `card_${displayMode}`].join(' ');
  const cardInfo: JSX.Element[] = [];

  title && cardInfo.push(<div className="card__title">{title}</div>);
  authors && cardInfo.push(renderInfoRow('Authors:', authors.join(', '), 'authors'));

  if (displayMode === 'full') {
    publisher &&
      cardInfo.push(
        renderInfoRow(
          'Publisher:',
          <>
            {publisher}
            {publishedDate && <i>&nbsp;-&nbsp;{renderDate(publishedDate)}</i>}
          </>
        )
      );
    categories && cardInfo.push(renderInfoRow('Categories:', categories.join(', ')));
    language && cardInfo.push(renderInfoRow('Book language:', language));
    averageRating &&
      cardInfo.push(
        renderInfoRow('Rating:', <Rating value={averageRating} count={ratingsCount} />, 'rating')
      );
  }

  return (
    <div className={cardClasses} onClick={props.onClick}>
      <div className="card__top">
        <div className="card__left">
          <div className="card__img">
            {imageLinks ? (
              <img src={imageLinks.thumbnail} alt={title} />
            ) : (
              <FontAwesomeIcon icon={faBook} />
            )}
          </div>
        </div>
        <div className="card__info">{...cardInfo}</div>
      </div>
      {description && displayMode === 'full' && (
        <div className="card__description">
          <span className="card__row-title">Book description:</span>
          <span
            className="card__row-content"
            dangerouslySetInnerHTML={{ __html: description }}
          ></span>
        </div>
      )}
    </div>
  );
};

export default Card;
