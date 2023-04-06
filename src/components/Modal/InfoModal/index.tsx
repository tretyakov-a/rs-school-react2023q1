import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { useContext, useEffect, useState } from 'react';
import Card from '@components/Card';
import { BooksItemExtra, BooksServiceContext } from '@src/api/books';
import { ModalProps } from '../context';
import { useDataLoader } from '@src/hooks/use-data-loader';
import LoadingResult from '@components/LoadingResult';

const InfoModal = (props: ModalProps) => {
  const { booksService } = useContext(BooksServiceContext);
  const { loadingState, loadData } = useDataLoader();
  const [data, setData] = useState<BooksItemExtra | null>(null);

  useEffect(() => {
    if (props.id !== undefined && booksService !== undefined) {
      loadData(booksService.getBookById.bind(null, props.id), setData);
    }
  }, [props.id, loadData, booksService]);

  return (
    <div className="info-modal">
      <button className="button info-modal__close-btn" onClick={props.onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="info-modal__content">
        <LoadingResult loadingState={loadingState}>
          {data !== null ? <Card data={data} displayMode="full" /> : <p>No data loaded</p>}
        </LoadingResult>
      </div>
    </div>
  );
};

export default InfoModal;
