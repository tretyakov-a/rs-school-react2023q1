import '@src/__mocks__/font-awesome-icon-mock';
import { render, screen } from '@testing-library/react';
import CardFull from '.';
import imageSearchDataMock from '@src/api/images/data/dummy-image-info.json';
import { PhotoInfo } from '@src/api/images/types';

const imageDataMock = imageSearchDataMock.photo as unknown;

jest.mock('@common/helpers', () => ({
  renderDate: () => 'January 1, 2006',
  addCommasToString: () => '49,999',
}));

describe('<Card /> test', () => {
  test('Should render short card correctly with granted data', () => {
    render(<CardFull data={imageDataMock as PhotoInfo} />);
    const { title, owner, tags, description, comments } = imageDataMock as PhotoInfo;

    expect(screen.getByAltText(title._content)).toBeInTheDocument();
    expect(screen.getByAltText(owner.username)).toBeInTheDocument();
    expect(screen.getByText(title._content)).toBeInTheDocument();
    expect(screen.getByText(owner.username)).toBeInTheDocument();
    expect(screen.getByText('Uploaded on January 1, 2006')).toBeInTheDocument();
    expect(screen.getByText(description._content)).toBeInTheDocument();
    expect(screen.getByText(comments._content)).toBeInTheDocument();
    expect(screen.getByText('49,999')).toBeInTheDocument();

    const tagItems = screen.getAllByRole('listitem');
    tags.tag.forEach(({ raw }, i) => {
      expect(tagItems[i].textContent).toBe(raw);
    });
  });
});
