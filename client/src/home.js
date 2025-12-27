// ------------------ Imports ------------------
// React hooks & context
import React, { useState , useEffect} from 'react';
import { usePostContext } from './context/postContext'; // Custom context for posts
import { useMessageContext } from './context/messagesContext'; // Custom context for messages

// CSS
import './styles/home.css';

// Libraries
import { useNavigate } from 'react-router-dom'; // Navigate programmatically
import { useCookies } from 'react-cookie';      // Handle cookies
import { Toaster, toast } from 'react-hot-toast'; // Notifications
import axios from 'axios';                        // HTTP requests

// Components & MUI tools
import EmptyCard from './components/emptyCard';  // Placeholder when no cards
import Navbar from './components/navbar';         // Navbar component
import DraggableDialog from './components/addDiloag'; // Dialog to add notes
import Card from './components/cards';           // Individual note card
import AddIcon from '@mui/icons-material/Add';   // Add icon
import AutorenewIcon from '@mui/icons-material/Autorenew'; // Offline icon

// ------------------ Home Component ------------------
function Home() {
  // Context hooks for posts and messages
  const { posts,setPosts, addPost, editPost, deletePost, filteredPosts, setLoading } = usePostContext();
  const {status, loginMessages, signupMessages} = useMessageContext();

  // Local state
  const [openDialog, setOpenDialog] = useState(false); // Dialog open/close
  const [cookies, setCookies] = useCookies(['access_token']); // Access token cookie
  const navigate = useNavigate(); // Navigation
  const [isOffline, setIsOffline] = useState(!navigator.onLine); // Offline status
  const apiBaseUrl = "https://note-app-backend-wzcl.onrender.com"; // Backend URL

  // ------------------ Online/Offline detection ------------------
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast('You are back online!', {
        icon: '🌐',
        style: { borderRadius: '10px', background: 'green', color: '#fff' },
      });
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast('You are offline!', {
        icon: '🌐',
        style: { borderRadius: '10px', background: 'red', color: '#fff' },
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [navigate]);

  // ------------------ Welcome messages ------------------
  useEffect(() => {
    if (cookies.access_token) {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const IsSign = localStorage.getItem('IsSign');
      const user = JSON.parse(localStorage.getItem('user'));
      const userName = user.user.name || 'User';

      // Show login message
      if (isLoggedIn) {
        const { message, icon } = loginMessages[Math.floor(Math.random() * loginMessages.length)];
        toast(message.replace('[User]', userName), {
          icon,
          style: { borderRadius: '10px', background: '#333', color: '#fff' },
        });
        localStorage.removeItem('isLoggedIn'); 
      }

      // Show signup message
      if(IsSign){
        const {message, icon} = signupMessages[Math.floor(Math.random() * signupMessages.length)];
        toast(message.replace('[User]', userName), {
          icon,
          style: { borderRadius: '10px', background: '#333', color: '#fff' },
        });
        localStorage.removeItem('IsSign');
      }
    }
  }, [cookies.access_token, navigate, loginMessages, signupMessages]);

  // ------------------ Dialog handlers ------------------
  const handleClickOpen = () => setOpenDialog(true); // Open add dialog
  const handleCloseDialog = () => setOpenDialog(false); // Close add dialog

  // ------------------ Fetch posts ------------------
  const fetchPosts = async () => {
    try{
      setLoading(true);
      const response = await axios.get(`${apiBaseUrl}/my-note`, {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      });
      const notes = await response.data;
      setPosts(notes);
    } catch(error){
      console.error('Error fetching notes:', error);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => { fetchPosts() }, [cookies.access_token]);

  // ------------------ Add new card ------------------
  const handleAddCard = (newCard) => {
    if (!isOffline){
      const addNotePromise = axios.post(`${apiBaseUrl}/add-note`, newCard, {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      });

      toast.promise(addNotePromise, status[0]);

      addNotePromise
        .then(() => {
          addPost(newCard); // Add to context
          fetchPosts();     // Refresh posts
        })
        .catch((error) => console.error('Error adding note:', error))
        .finally(() => handleCloseDialog());
    }
  };

  // ------------------ Edit card ------------------
  const handleEditCard = (updatedCard) => {
    if (!isOffline){
      const updateNotePromise = axios.put(`${apiBaseUrl}/update-note/${updatedCard.id}`, updatedCard, {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      });

      toast.promise(updateNotePromise, status[1]);

      updateNotePromise
        .then(() => {
          editPost(updatedCard); // Update context
          fetchPosts();
        })
        .catch((error) => console.log(error));
    }
  };

  // ------------------ Delete card ------------------
  const handleDeleteCard = (cardToDelete) => {
    if(!isOffline){
      const deleteNotePromise = axios.delete(`${apiBaseUrl}/delete-note/${cardToDelete.id}`, {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      });

      toast.promise(deleteNotePromise, status[2]);

      deleteNotePromise
        .then(() => {
          deletePost(cardToDelete.id); // Remove from context
          fetchPosts();
        })
        .catch((error) => console.log(error));
    }
  };

  // ------------------ Render ------------------
  return (
    <div className="home">
      <Navbar />

      {/* Offline message */}
      {isOffline ? (
        <div className='isOffline' style={{
          display: 'flex',
          marginTop:"200px",
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection:"column",
          color: '#333',
        }}>
          <h2 className='text_offline'>You are offline! Please check your internet connection.</h2>
          <div className='AutorenewIcon'><AutorenewIcon sx={{width:"100%", height:"auto"}}/></div>
        </div>
      ) : (
        <div className="cards_container">
          {/* Show posts or empty card */}
          {posts.length > 0 ? filteredPosts.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              title={card.title}
              date={card.createdAt}
              content={card.content}
              tags={card.tags || []}
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
              className="card"
            />
          )) : <EmptyCard />}
        </div>
      )}

      {/* Add Icon to open dialog */}
      <div className="add_icon" onClick={handleClickOpen}>
        <AddIcon fontSize="large" />
      </div>

      {/* Add Dialog */}
      <DraggableDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onAddCard={handleAddCard}
      />

      {/* Toast notifications */}
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Home;
