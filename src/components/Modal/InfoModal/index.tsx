import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { useContext, useEffect, useState } from 'react';
import CardFull from '@components/CardFull';
import { ModalProps } from '../context';
import { useDataLoader } from '@src/hooks/use-data-loader';
import LoadingResult from '@components/LoadingResult';
import { ImagesServiceContext, PhotoInfo } from '@src/api/images';

const InfoModal = (props: ModalProps) => {
  const { imagesService } = useContext(ImagesServiceContext);
  const { loadingState, loadData } = useDataLoader();
  const [data, setData] = useState<PhotoInfo | null>(null);

  useEffect(() => {
    if (props.id !== undefined && imagesService !== undefined) {
      loadData(imagesService.getImageInfo.bind(null, props.id), setData);
    }
  }, [props.id, loadData, imagesService]);

  return (
    <div className="info-modal">
      <button className="button info-modal__close-btn" onClick={props.onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="info-modal__content">
        <LoadingResult loadingState={loadingState}>
          {data !== null ? <CardFull data={data} /> : <p>No data loaded</p>}
        </LoadingResult>
      </div>
    </div>
  );
};

export default InfoModal;
