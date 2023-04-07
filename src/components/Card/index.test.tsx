import { fireEvent, render, screen } from '@testing-library/react';
import Card from '.';
import imageSearchDataMock from '@src/api/images/data/dummy-image-search.json';

const imageDataMock = imageSearchDataMock.photos.photo[0];

jest.mock('@common/helpers', () => ({
  renderDate: () => 'January 1, 2006',
}));

describe('<Card /> test', () => {
  test('Should render short card correctly with granted data', () => {
    render(<Card data={imageDataMock} />);
    const { title, url_q, ownername } = imageDataMock;

    expect((screen.getByRole('img') as HTMLImageElement).src).toBe(url_q);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(ownername))).toBeInTheDocument();
  });

  test('Should render placehodler icon if imageLinks is undefined', () => {
    render(<Card data={{ ...imageDataMock, url_q: undefined }} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('Should crop log titles', () => {
    render(
      <Card
        data={{
          ...imageDataMock,
          title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        }}
      />
    );
    expect(
      screen.getByText('Lorem Ipsum is simply dummy text of the printing and typesetting...')
    ).toBeInTheDocument();
  });

  test('Should call onClick on card click', () => {
    const onClickMock = jest.fn();

    const { container } = render(<Card data={imageDataMock} onClick={onClickMock} />);

    fireEvent.click(container.firstChild!);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
