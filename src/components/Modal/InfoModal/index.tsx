import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { useContext, useEffect, useState } from 'react';
import Loader from '@components/Loader';
import Card from '@components/Card';
import { BooksItemExtra, BooksServiceContext } from '@src/api/books';
import { ModalProps } from '../context';
import { useDataLoader } from '@src/hooks/use-data-loader';
import { Loading } from '@src/hooks/use-data-loader/types';

const InfoModal = (props: ModalProps) => {
  const { booksService } = useContext(BooksServiceContext);
  const {
    loadingState: { loading, error },
    loadData,
  } = useDataLoader();
  const [data, setData] = useState<BooksItemExtra | null>(null);

  useEffect(() => {
    if (props.id !== undefined && booksService !== undefined) {
      loadData(booksService.getBookById.bind(null, props.id), setData);
    }
  }, [props.id, loadData, booksService]);

  const renderError = (error: Error) => {
    return <div>{error.message}</div>;
  };

  return (
    <div className="info-modal">
      <button className="button info-modal__close-btn" onClick={props.onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="info-modal__content">
        {loading === Loading.PENDING ? (
          <Loader />
        ) : error ? (
          renderError(error)
        ) : data !== null ? (
          <Card data={data} displayMode="full" />
        ) : (
          'No data loaded'
        )}
      </div>
    </div>
  );
};

export default InfoModal;
