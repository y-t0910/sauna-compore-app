import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface BookmarkButtonProps {
    isBookmarked?: boolean;
    onClick?: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
    isBookmarked = false,
    onClick
}) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    const handleClick = () => {
        setBookmarked(!bookmarked);
        if (onClick) {
            onClick();
        }
    };

    return (
        <IconButton
            onClick={handleClick}
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
            {bookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
        </IconButton>
    );
};

export default BookmarkButton;