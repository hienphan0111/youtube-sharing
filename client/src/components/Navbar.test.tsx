import { renderWithProviders } from '../utils/utils-for-tests';
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import { vi } from 'vitest';

it('Click the about router link', async () => {
  renderWithProviders(<Navbar />, {wrapper: BrowserRouter})

  expect(screen.getByText('Register')).toBeInTheDocument()
  
  const user = userEvent.setup()
  const register = vi.spyOn(user, 'click')
  const registerLink = screen.getByText(/Register/i)

  await user.click(registerLink)
  expect(register).toHaveBeenCalledTimes(1)
})
