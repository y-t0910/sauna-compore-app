import '@testing-library/jest-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('node-fetch');

describe('App component', () => {
  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
  });

  test('renders sauna list heading', () => {
    render(<App />);
    expect(screen.getByText('Sauna List')).toBeInTheDocument();
  });

  test('renders logout button', () => {
    render(<App />);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('renders delete account button', () => {
    render(<App />);
    const deleteButton = screen.getByText('退会する');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveStyle({
      backgroundColor: 'red',
      color: 'white'
    });
  });

  test('shows confirmation dialog when deleting account', () => {
    const confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(() => true);

    render(<App />);
    fireEvent.click(screen.getByText('退会する'));

    expect(confirmSpy).toHaveBeenCalledWith('本当にアカウントを削除しますか？');
    confirmSpy.mockRestore();
  });

  test('fetches sauna data on component mount', async () => {
    const mockSaunas = [
      { id: 1, name: 'Test Sauna 1', location: 'Tokyo' },
      { id: 2, name: 'Test Sauna 2', location: 'Osaka' }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSaunas)
      })
    ) as jest.Mock;

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Sauna 1 - Tokyo')).toBeInTheDocument();
      expect(screen.getByText('Test Sauna 2 - Osaka')).toBeInTheDocument();
    });
  });
});
