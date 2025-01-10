import { useState, FormEvent } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface UpdateAccountFormProps {
    initialData?: {
        username: string;
        email: string;
    };
    onSubmit: (data: { username: string; email: string }) => void;
}

const UpdateAccountForm = ({ initialData, onSubmit }: UpdateAccountFormProps) => {
    const [formData, setFormData] = useState({
        username: initialData?.username || '',
        email: initialData?.email || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
                アカウント情報の更新
            </Typography>
            
            <TextField
                fullWidth
                label="ユーザーネーム"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                required
            />

            <TextField
                fullWidth
                label="メールアドレス"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
            >
                更新する
            </Button>
        </Box>
    );
};

export default UpdateAccountForm;