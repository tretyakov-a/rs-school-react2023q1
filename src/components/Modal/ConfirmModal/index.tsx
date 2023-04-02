import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { ModalProps } from '@components/Modal/context';
import './style.scss';

const ConfirmModal = (props: ModalProps) => {
  const { question, okCallback, onClose } = props;

  const handleOKClick = () => {
    if (okCallback !== undefined) {
      okCallback();
    }
    onClose();
  };

  return (
    <div className="confirm-modal">
      <div className="confirm-modal__content">
        <div className="confirm-modal__icon">
          <FontAwesomeIcon icon={faQuestion} />
        </div>
        <div className="confirm-modal__message">{question}</div>
      </div>
      <div className="confirm-modal__buttons">
        <button className="button" onClick={onClose}>
          Cancel
        </button>
        <button className="button" onClick={handleOKClick}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
