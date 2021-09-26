import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home.component';

describe('Home scene', () => {
  test('must show error message', () => {
    render(<Home currencies={[]} hasError />);
    expect(screen.getByText('There was an error')).toBeInTheDocument();
  });
});
