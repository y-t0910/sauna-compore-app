import React, { useState, FormEvent } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { UpdateUserRequest } from '../types';

interface Props {
  currentUser: {
    id: number;
    username: string;
    email: string;
  };
  onUpdate: (data: UpdateUserRequest) => Promise<void>;
}

const UpdateAccountForm: React.FC<Props> = ({ currentUser, onUpdate }) => {
  const [formData, setFormData] = useState<UpdateUserRequest>({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      alert('アカウント情報を更新しました');
    } catch (error) {
      alert('更新に失敗しました');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        アカウント情報の修正
      </Typography>
      
      <TextField
        fullWidth
        label="ユーザーネーム"
        name="username"
        value={formData.username}
        onChange={(e) => setFormData({...formData, username: e.target.value})}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="メールアドレス"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="新しいパスワード（変更する場合のみ）"
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        margin="normal"
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