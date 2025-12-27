import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import './styles/skeleton.css';

function SkeletonProggres({ skeletonCount = 5}) {
  return (
    <div className="skeleton-page">
      <div className="skeleton_cards">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Skeleton
            key={index}
            className="skeleton"
            variant="rounded"
            animation="pulse"
            sx={{
              borderRadius: '10px',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SkeletonProggres;
