import PageWrap from '.';
import { screen, render } from '@testing-library/react';

const TestComponent = () => <div data-testid="test-component-testid"></div>;

describe('<PageWrap /> test', () => {
  test('Should render correctly', () => {
    const testClassName = 'test';
    render(
      <PageWrap className={testClassName}>
        <TestComponent />
      </PageWrap>
    );

    expect(screen.getByTestId('test-component-testid')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass(testClassName);
    expect(screen.getByRole('main').firstElementChild).toHaveClass(`${testClassName}__container`);
  });
});
