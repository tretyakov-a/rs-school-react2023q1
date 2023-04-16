import '@src/__mocks__/images-service-context-mock';
import React from 'react';
import CardsList from '.';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import mockImagesSearch from '@src/api/images/data/dummy-image-search.json';
import { ModalContext } from '@components/Modal/context';
import { Loading } from '@common/types/loading';

jest.mock('./store', () => ({
  getImageInfo: jest.fn(() => 'test-image-action'),
}));

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => () => ({
    unwrap: () => Promise.resolve('test-data'),
  })),
  useSelector: jest.fn((fn) => {
    fn({ cardsList: null });
    return {
      loading: Loading.SUCCESS,
      error: null,
    };
  }),
}));

const cardsDataMock = mockImagesSearch.photos.photo;
const mockOpenModal = jest.fn();
const mockSetModalState = jest.fn();

jest.mock('@components/Card', () => ({ onClick }: { onClick: () => void }) => (
  <div data-testid="card-testid" onClick={onClick}></div>
));

jest.mock('@components/CardFull', () => (props: { imageRatio: number }) => (
  <div data-testid="card-full-testid">ratio={props.imageRatio}</div>
));

jest.mock('@components/Modal/context', () => ({
  ModalContext: React.createContext(null),
}));

const TestComponent = (modalState: { isOpen: boolean } = { isOpen: false }) => (
  <ModalContext.Provider
    value={{
      setModalState: mockSetModalState,
      openModal: mockOpenModal,
      modal: modalState,
    }}
  >
    <CardsList data={cardsDataMock} />
  </ModalContext.Provider>
);

describe('<CardsList /> test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should render correctly', () => {
    render(TestComponent());

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(cardsDataMock.length);

    const cards = screen.getAllByTestId('card-testid');
    expect(cards.length).toBe(cardsDataMock.length);
  });

  test('Should correctly handle card click', async () => {
    render(TestComponent());
    fireEvent.click(screen.getAllByTestId('card-testid')[0]);
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(mockSetModalState).toBeCalled();
    });
  });

  test('Should change opened modal state in useEffect', async () => {
    render(TestComponent({ isOpen: true }));
    expect(mockSetModalState).toBeCalledWith({
      loadingState: { loading: Loading.SUCCESS, error: null },
    });
  });
});
