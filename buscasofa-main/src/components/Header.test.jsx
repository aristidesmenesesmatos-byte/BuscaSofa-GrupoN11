import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('muestra el botón Cerrar sesión cuando hay usuario', () => {
    render(
      <MemoryRouter>
        <Header user="TestUser" onLogout={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Cerrar sesión')).toBeTruthy();
  });

  it('llama a onLogout al hacer clic en Cerrar sesión', () => {
    const mockLogout = jest.fn();

    render(
      <MemoryRouter>
        <Header user="TestUser" onLogout={mockLogout} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Cerrar sesión'));
    expect(mockLogout).toHaveBeenCalled();
  });

  it('no muestra Cerrar sesión cuando no hay usuario', () => {
    render(
      <MemoryRouter>
        <Header user={null} onLogout={() => {}} />
      </MemoryRouter>
    );

    expect(screen.queryByText('Cerrar sesión')).toBeNull();
  });
});
