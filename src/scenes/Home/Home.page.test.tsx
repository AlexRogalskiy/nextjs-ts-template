import { render, screen } from '@testing-library/react';
import Home, { ERROR_MESSAGE } from './Home.page';

describe('Home scene', () => {
  test('must show error message', () => {
    render(<Home currencies={[]} hasError />);
    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
  test('must show items', () => {
    render(
      <Home
        currencies={[
          {
            key: 'eur',
            name: 'Euro',
          },
        ]}
      />,
    );
    expect(screen.getByText('Euro')).toBeInTheDocument();
  });
});
