import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';

// すべての依存コンポーネントをモック化
jest.mock('./components/RegisterForm', () => {
  return function MockRegisterForm({ onSubmit }: any) {
    return <div data-testid="register-form">Register Form</div>;
  };
});

jest.mock('./components/UpdateAccountForm', () => {
  return function MockUpdateAccountForm({ currentUser, onUpdate }: any) {
    return <div data-testid="update-account-form">Update Account Form</div>;
  };
});

jest.mock('./components/SaunaSearchForm', () => {
  return function MockSaunaSearchForm({ onSearch }: any) {
    return <div data-testid="search-form">Search Form</div>;
  };
});

jest.mock('./components/ReviewForm', () => {
  return function MockReviewForm({ saunaId, onSubmit }: any) {
    return <div data-testid="review-form">Review Form</div>;
  };
});

jest.mock('./components/FacilityDisplay', () => {
  // FacilityDisplayPropsと一致するように引数を明示的に指定
  return function MockFacilityDisplay({ facility }: { facility: any }) {
    return <div data-testid="facility-display">Facility Display</div>;
  };
});

jest.mock('./components/BookmarkButton', () => {
  return function MockBookmarkButton({ saunaId, isBookmarked, onBookmark, onShare }: {
    saunaId: number;
    isBookmarked: boolean;
    onBookmark: (saunaId: number) => Promise<void>;
    onShare: (saunaId: number, targetUserId: number, message: string) => Promise<void>;
  }) {
    return <div data-testid="bookmark-button">Bookmark Button</div>;
  };
});

describe('App Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, name: 'Sauna A', location: 'Tokyo' },
        { id: 2, name: 'Sauna B', location: 'Osaka' },
      ])
    })
    ) as unknown as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders Sauna List heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Sauna List/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('fetches and displays saunas', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/saunas');
    });

    await waitFor(() => {
      const saunaElements = screen.getAllByText(/Sauna/);
      expect(saunaElements.length).toBeGreaterThan(0);
    });
  });
});

