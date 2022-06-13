import React from 'react';
import Item from '../nameItem/Item';
import './List.css';


function List({contacts, onDelete, onSelect, onCreate}) {
  
  return (
    <div className='main-inner-list'>
        <div className='list-name-scroll'>
        {contacts.map((contact) => {
          return (
            <Item 
                  key={contact.id}
                  contact={contact}
                  onDelete={onDelete}
                  onEdit={onSelect} 
            />
          )
        })}
        </div>
        <button
         onClick={onCreate}
          >New</button>
      </div>
  )
}

export default List;
