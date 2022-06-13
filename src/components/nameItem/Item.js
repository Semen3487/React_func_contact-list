import React from 'react';
import './Item.css';


function Item({contact, onDelete, onEdit}) {

  function onContactDelete(event) {
    event.stopPropagation();
    onDelete(contact.id);
  };
  
  function onContactEdit(event) {
    event.stopPropagation();
    onEdit(contact);
  };

  return (
    <div className='list-item' 
           onDoubleClick={onContactEdit}
            >
        <span className='list-group-name'>
          {contact.fName} {contact.lName}
        </span>
        <span className='list-group-delete'
              onClick={onContactDelete}
               >X</span>
    </div>
  )
}

export default Item;
