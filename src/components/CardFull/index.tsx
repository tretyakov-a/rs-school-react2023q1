import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import { PhotoInfo, Tag } from '@src/api/images/types';
import { addCommasToString, renderDate } from '@common/helpers';
import { faComment, faEye } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface CardPropsType {
  data: PhotoInfo;
  onClick?: () => void;
}

const CardFull = (props: CardPropsType) => {
  const { title, owner, dates, views, tags, description, comments, imageUrl, ownerIconUrl } =
    props.data;

  const viewsWithCommas = views.length > 3 ? addCommasToString(views) : views;

  const renderTags = (tags: Tag[]) => (
    <ul className="card__tags">
      {tags.map(({ raw }) => (
        <li key={raw} className="card__tags-item">
          {raw}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="card card_full" onClick={props.onClick}>
      <div className="card__top">
        <div className="card__img">
          <img src={imageUrl} alt={title._content} />
        </div>
      </div>
      <div className="card__info">
        <div className="card__info-left">
          <div className="card__info-author">
            <div className="card__info-icon">
              <img src={ownerIconUrl} alt={owner.username} />
            </div>
            <div className="card__info-header">
              <div className="card__info-username">{owner.username}</div>
              <div className="card__info-title">{title._content}</div>
            </div>
          </div>
          {description._content !== '' && (
            <div
              className="card__description"
              dangerouslySetInnerHTML={{ __html: description._content }}
            ></div>
          )}
        </div>
        <div className="card__info-right">
          <div className="card__stats">
            <div className="card__views">
              <span className="card__views-icon">
                <FontAwesomeIcon icon={faEye as IconDefinition} />
              </span>
              <span>{viewsWithCommas}</span>
            </div>
            <div className="card__comments">
              <span className="card__views-icon">
                <FontAwesomeIcon icon={faComment as IconDefinition} />
              </span>
              <span>{comments._content}</span>
            </div>
          </div>
          <div className="card__uploaded">Uploaded on {renderDate(dates.taken)}</div>
          {renderTags(tags.tag)}
        </div>
      </div>
    </div>
  );
};

export default CardFull;
