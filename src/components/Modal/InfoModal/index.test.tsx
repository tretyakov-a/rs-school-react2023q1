import '@src/__mocks__/images-service-context-mock';
import { screen, render, fireEvent } from '@testing-library/react';
import InfoModal from '.';
import { Loading } from '@common/types/loading';
import { ModalProps } from '../context';

jest.mock('@components/LoadingResult', () => ({ children }: React.PropsWithChildren) => (
  <div data-testid="loading-result-testid">{children}</div>
));

const onCloseMock = jest.fn();
const InfoModalWithProps = (props?: Partial<ModalProps>) => {
  return <InfoModal onClose={onCloseMock} isOpen={true} {...props} />;
};

describe('InfoModal test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should render correctly', () => {
    render(
      InfoModalWithProps({
        content: 'test-content',
        loadingState: { loading: Loading.SUCCESS, error: null },
      })
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('test-content')).toBeInTheDocument();
  });

  test('Close button should work correctly', () => {
    render(InfoModalWithProps());

    const closeButton = screen.getByRole('button') as HTMLButtonElement;
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('Should calculate minWidthClass correctly', () => {
    const { rerender, container } = render(InfoModalWithProps({ imageRatio: 0.5 }));
    expect(container.firstChild).toHaveClass('landscape');

    rerender(InfoModalWithProps({ imageRatio: 1.5 }));
    expect(container.firstChild).toHaveClass('portrait');

    rerender(InfoModalWithProps());
    expect(container.firstChild).not.toHaveClass('portrait');
    expect(container.firstChild).not.toHaveClass('landscape');
  });
});
