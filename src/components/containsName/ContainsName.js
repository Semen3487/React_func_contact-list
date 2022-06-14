import React from 'react';
import './ContainsName.css';

function ContainsName({contacts}) {

  return (
    <div className='header'>
      <p>
        <span className='header-name'>
          Contact list
        </span>
          contains
        <span className='contains-list'>
          {contacts}
        </span>   
          names
      </p>
    </div>
  )
}

export default ContainsName;

