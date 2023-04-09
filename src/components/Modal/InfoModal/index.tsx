import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { ModalProps } from '../context';
import LoadingResult from '@components/LoadingResult';

const InfoModal = (props: ModalProps) => {
  const { imageRatio, content, loadingState } = props;
  const minWidthClass = imageRatio === undefined ? '' : imageRatio >= 1 ? 'portrait' : 'landscape';

  return (
    <div className={`info-modal ${minWidthClass}`}>
      <button className="button info-modal__close-btn" onClick={props.onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="info-modal__content">
        {loadingState && <LoadingResult loadingState={loadingState}>{content}</LoadingResult>}
      </div>
    </div>
  );
};

export default InfoModal;
