import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Props = {
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
};

const CustomSnackbar: React.FC<Props> = ({
  open,
  autoHideDuration = 2000,
  onClose,
  severity,
  message,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
