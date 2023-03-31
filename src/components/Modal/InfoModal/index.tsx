import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { getBookById } from '@src/api/books';
import { useEffect, useState } from 'react';
import Loader from '@components/Loader';
import Card from '@components/Card';
import { BooksItem, BooksItemExtra } from '@src/api/books/types';
import { ModalProps } from '../context';

const InfoModal = (props: ModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<Error | null>(null);
  const [data, setData] = useState<BooksItemExtra | null>(null);

  const loadData = async (id: string, abortSignal: AbortSignal) => {
    setIsLoading(true);
    setLoadingError(null);
    try {
      const data = await getBookById(id, abortSignal);
      if (data !== null) {
        setData(data);
        setIsLoading(false);
      }
    } catch (error) {
      if (!/abort/.test((error as Error).message)) setLoadingError(error as Error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    if (props.id !== undefined) loadData(props.id, controller.signal);

    return () => {
      controller.abort();
      setIsLoading(true);
      setLoadingError(null);
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
          <Card data={data as BooksItem} />
        )}
      </div>
    </div>
  );
};

export default InfoModal;
