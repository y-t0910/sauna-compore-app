import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewForm from './ReviewForm';

describe('ReviewForm', () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    it('renders form elements correctly', () => {
        render(<ReviewForm onSubmit={mockOnSubmit} />);
        
        expect(screen.getByLabelText(/評価/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/レビューコメント/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /レビューを投稿/i })).toBeInTheDocument();
    });

    it('submit button should be disabled when rating is 0', () => {
        render(<ReviewForm onSubmit={mockOnSubmit} />);
        const submitButton = screen.getByRole('button', { name: /レビューを投稿/i });
        expect(submitButton).toBeDisabled();
    });

    it('should call onSubmit with correct data when form is submitted', () => {
        render(<ReviewForm onSubmit={mockOnSubmit} />);
        
        // Set rating
        const ratingElement = screen.getByRole('slider');
        fireEvent.change(ratingElement, { target: { value: 4 } });
        
        // Set comment
        const commentInput = screen.getByLabelText(/レビューコメント/i);
        fireEvent.change(commentInput, { target: { value: 'テストコメント' } });
        
        // Submit form
        const submitButton = screen.getByRole('button', { name: /レビューを投稿/i });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledWith({
            rating: 4,
            comment: 'テストコメント'
        });
    });

    it('should reset form after submission', () => {
        render(<ReviewForm onSubmit={mockOnSubmit} />);
        
        // Set values
        const ratingElement = screen.getByRole('slider');
        const commentInput = screen.getByLabelText(/レビューコメント/i);
        
        fireEvent.change(ratingElement, { target: { value: 4 } });
        fireEvent.change(commentInput, { target: { value: 'テストコメント' } });
        
        // Submit form
        const submitButton = screen.getByRole('button', { name: /レビューを投稿/i });
        fireEvent.click(submitButton);

        // Check reset
        expect(commentInput).toHaveValue('');
        expect(ratingElement).toHaveValue('0');
    });
});