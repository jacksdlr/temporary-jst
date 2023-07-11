import { useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';

const WorkoutModal = ({ modal, handleClose }) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Modal
      open={modal.open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modalStyle}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Text in a modal
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <button
          className='btn confirm-btn'
          onClick={() => {
            modal.action();
            handleClose();
          }}
          style={{ 'max-width': '40%', 'align-self': 'flex-end' }}
        >
          Confirm
        </button>
      </Box>
    </Modal>
  );
};
export default WorkoutModal;
