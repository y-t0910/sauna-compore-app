import React, { useState } from 'react';
import { Box, Button, TextField, Rating, Typography } from '@mui/material';

interface ReviewFormProps {
    onSubmit: (review: ReviewData) => void;
}

interface ReviewData {
    rating: number;
    comment: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
    const [rating, setRating] = useState<number | null>(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === null) return;

        onSubmit({
            rating,
            comment
        });

        // Reset form
        setRating(0);
        setComment('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: '0 auto' }}>
            <Typography component="legend" sx={{ mt: 2 }}>評価</Typography>
            <Rating
                name="rating"
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                precision={0.5}
            />
            
            <TextField
                fullWidth
                multiline
                rows={4}
                margin="normal"
                label="レビューコメント"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <Button 
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={!rating}
            >
                レビューを投稿
            </Button>
        </Box>
    );
};

export default ReviewForm;