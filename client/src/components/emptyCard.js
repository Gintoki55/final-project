import React from 'react';
import './styles/emptycard.css';
import { usePostContext } from '../context/postContext';
import SkeletonProggres from './skeleton';

function EmptyCard() {
  const { loading } = usePostContext();
  return (
    <div>
      {loading? (<SkeletonProggres/>): (
        <div className="container_emptyCard">
         <div className='image-icon'>
          <img src='images/notes-icon.png' alt='note-icon'/>
          <div className='img-note-icon'>
            +
          </div>
         </div>
          <p>Start creating your first note! Click the 'Add' Button in the right bottom of the page.</p>
        </div>
        )}
      </div>
    
  );
}

export default EmptyCard;
