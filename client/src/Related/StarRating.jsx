import React, {Component, useState} from 'react';
function StarRating({id, rating}) {
  let percent = Math.floor(((rating/5) * 100)/5) * 5 + '%';
    return (
      <div className='star-rating'>
        <div value={id} className="stars related-description"><div className="filled-stars" style={{width: percent}}></div></div>
      </div>
    );
}

<<<<<<< HEAD
export default StarRating;
=======
export default StarRating;
>>>>>>> main
