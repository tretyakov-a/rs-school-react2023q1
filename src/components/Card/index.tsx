import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { BooksItem } from '@src/api/books/types';

interface CardPropsType {
  data: BooksItem;
}

const Card = (props: CardPropsType) => {
  const { title, authors, publisher, publishedDate, categories, imageLinks, language } =
    props.data.volumeInfo;

  const renderDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="card">
      <div className="card__img">
        {imageLinks ? (
          <img src={imageLinks.thumbnail} alt={title as string} />
        ) : (
          <FontAwesomeIcon icon={faBook} />
        )}
      </div>
      <div className="card__info">
        {title && <div className="card__title">{title}</div>}
        {authors && <div className="card__authors">{authors.join(', ')}</div>}
        {publisher && <div className="card__publisher">{publisher}</div>}
        {publishedDate && <div className="card__publisher-date">{renderDate(publishedDate)}</div>}
        {categories && <div className="card__categories">Categories: {categories.join(', ')}</div>}
        {language && <div className="card__language">Book language: {language}</div>}
      </div>
    </div>
  );
};

export default Card;
