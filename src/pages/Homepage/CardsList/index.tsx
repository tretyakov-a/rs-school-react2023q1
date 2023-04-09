import Card from '@components/Card';
import './style.scss';
import { ModalContext } from '@components/Modal/context';
import { useCallback, useContext, useEffect } from 'react';
import { Photo, PhotoInfo } from '@src/api/images/types';
import { ImagesServiceContext } from '@src/api/images';
import { useDataLoader } from '@src/hooks/use-data-loader';
import { loadImage } from '@common/helpers';
import CardFull from '@components/CardFull';

interface CardsListProps {
  data: Photo[];
}

const CardsList = (props: CardsListProps) => {
  const { imagesService } = useContext(ImagesServiceContext);
  const { loadingState, loadData } = useDataLoader();
  const { modal, openModal, setModalState } = useContext(ModalContext);

  const setPhoto = useCallback(
    async (data: PhotoInfo) => {
      if (data === null) return setModalState({ content: 'No data loaded' });
      const { width, height } = await loadImage(data.imageUrl);
      const imageRatio = height / width;
      setModalState({
        imageRatio,
        content: <CardFull data={data} imageRatio={imageRatio} />,
      });
    },
    [setModalState]
  );

  const handleClick = (photo: Photo) => () => {
    if (photo !== undefined && imagesService !== undefined) {
      loadData(imagesService.getImageInfo.bind(null, photo.id), setPhoto);
      openModal({ type: 'info' });
    }
  };

  useEffect(() => {
    if (modal.isOpen === true) {
      setModalState({ loadingState });
    }
  }, [modal.isOpen, loadingState, setModalState]);

  return (
    <ul className="cards-list">
      {props.data.map((item, index) => (
        <li className="cards-list__item" key={`${index}-${item.id}`}>
          <Card data={item} onClick={handleClick(item)} />
        </li>
      ))}
    </ul>
  );
};

export default CardsList;
