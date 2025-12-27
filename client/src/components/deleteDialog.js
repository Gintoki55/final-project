import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function DeleteDialog({ open, onClose, onDeleteCard, post}) {
    const handleDeleteCard = ()=>{
        onDeleteCard();  
        onClose();
    }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete ''{post.title}''
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          "This action will delete the Note permanently. Do you want to continue?"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{
            color:'#5e5e5e',
          }}>Cancel</Button>
          <Button onClick={handleDeleteCard} sx={{
            color:"red"
          }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}