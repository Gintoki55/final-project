import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import './styles/cards.css';
import EditDialog from './editDiloag';
import DeleteDialog from './deleteDialog';

function Card({id, title, date, content, tags, onEdit, onDelete }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [post, setPost] = useState({ id, title, date, content, tags });

  // Handle opening the dialog
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle saving changes from the dialog
  const handleEditCard = (updatedPost) => {
    setPost(updatedPost); // Update local state
    onEdit(updatedPost); // Inform parent component of the changes
    handleCloseDialog(); // Close the dialog
  };

  const handleDeleteCard = () => {
    onDelete({id}); 
  }
  const handleDeleteDialog = () =>{
    setOpenDeleteDialog(true); 
  }

  return (
    <div className="card" key={post.id}>
      <div className="card_title">{post.title}</div>
      <div className="card_date">{post.date}</div>
      <div className="card_content">{post.content}</div>
      <div className="card_action">
        <div className="card_tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="card_tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="card_btns">
          <button className="icon_btn" onClick={handleClickOpen}>
            <EditIcon />
          </button>
          <button className="icon_btn" onClick={()=> handleDeleteDialog()}>
            <DeleteOutlineIcon />
          </button>
        </div>
      </div>
      <EditDialog
        open={openDialog}
        onClose={()=> setOpenDialog(false)}
        post={post}
        onEditCard={handleEditCard}
      />
      <DeleteDialog
       open={openDeleteDialog}
       onClose={() => setOpenDeleteDialog(false)}
       onDeleteCard={handleDeleteCard}
       post={post}
      />
    </div>
  );
}

export default Card;
