import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { useContext, useEffect, useState } from 'react';
import Loader from '@components/Loader';
import Card from '@components/Card';
import { BooksItemExtra, BooksServiceContext } from '@src/api/books';
import { ModalProps } from '../context';
import useDataLoader from '@src/hooks/use-data-loader';

const InfoModal = (props: ModalProps) => {
  const { booksService } = useContext(BooksServiceContext);
  const { isLoading, loadingError, loadData } = useDataLoader();
  const [data, setData] = useState<BooksItemExtra | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    if (props.id !== undefined && booksService !== undefined)
      loadData(booksService.getBookById(props.id, controller.signal), setData);

    return () => {
      controller.abort();
    };
  }, [props.id]);

  const renderError = (error: Error) => {
    return <div>{error.message}</div>;
  };

  return (
    <div className="info-modal">
      <button className="button info-modal__close-btn" onClick={props.onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="info-modal__content">
        {isLoading || data === null ? (
          <Loader />
        ) : loadingError ? (
          renderError(loadingError)
        ) : (
          <Card data={data} displayMode="full" />
        )}
      </div>
    </div>
  );
};

export default InfoModal;
