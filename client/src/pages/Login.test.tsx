import { fireEvent, screen, act } from '@testing-library/react';
import { renderWithProviders }  from '../utils/test-ultils';
import { MemoryRouter } from 'react-router-dom';

import Login from './Login';

describe('Login', () => {

  it('should render correctly', () => {
    renderWithProviders(
    <MemoryRouter>
      <Login />
    </MemoryRouter>);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test("email input should accept text", () => {
    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  
    const emailInputNode = screen.getByLabelText("email") as HTMLInputElement;
  
    expect(emailInputNode.value).toBe("");
  
    act(() => {
      fireEvent.change(emailInputNode, { target: { value: "" } });
    });
  
    expect(emailInputNode.value).toBe("");
  
    const errorMessageNode = screen.queryByText("Email is required!");
    // expect(errorMessageNode).toBeInTheDocument();
  
    act(() => {
      fireEvent.change(emailInputNode, { target: { value: "testing@email.com" } });
    });
  
    expect(errorMessageNode).not.toBeInTheDocument();
  });

});
