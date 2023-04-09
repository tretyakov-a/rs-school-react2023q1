import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { useCallback, useContext, useEffect, useState } from 'react';
import CardFull from '@components/CardFull';
import { ModalProps } from '../context';
import { useDataLoader } from '@src/hooks/use-data-loader';
import LoadingResult from '@components/LoadingResult';
import { ImagesServiceContext, PhotoInfo } from '@src/api/images';
import { loadImage } from '@common/helpers';

type ImgRatio = {
  imageRatio: number;
};

const InfoModal = (props: ModalProps) => {
  const { imagesService } = useContext(ImagesServiceContext);
  const { loadingState, loadData } = useDataLoader();
  const [data, setData] = useState<(PhotoInfo & ImgRatio) | null>(null);
  const { photo } = props;

  const setPhoto = useCallback(async (data: PhotoInfo) => {
    if (data === null) return setData(data);
    const { width, height } = await loadImage(data.imageUrl);
    setData({ ...data, imageRatio: height / width });
  }, []);

  useEffect(() => {
    if (photo !== undefined && imagesService !== undefined) {
      loadData(imagesService.getImageInfo.bind(null, photo.id), setPhoto);
    }
  }, [photo, loadData, imagesService, setPhoto]);

  const minWidthClass = data === null ? '' : data.imageRatio > 1 ? 'portrait' : 'landscape';

  return (
    <div className={`info-modal ${minWidthClass}`}>
      <button className="button info-modal__close-btn" onClick={props.onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="info-modal__content">
        <LoadingResult loadingState={loadingState}>
          {data !== null ? (
            <CardFull data={data} imageRatio={data.imageRatio} />
          ) : (
            <p>No data loaded</p>
          )}
        </LoadingResult>
      </div>
    </div>
  );
};

export default InfoModal;
