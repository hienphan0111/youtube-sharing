import { screen } from '@testing-library/react';
import { renderWithProviders }  from '../utils/test-ultils';
import { MemoryRouter } from 'react-router-dom';

import Register from './Register';


describe('Register', () => {

  it('should render', () => {
    renderWithProviders(
    <MemoryRouter>
      <Register />
    </MemoryRouter>);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});

