import React, { useState } from 'react';
import './Form.css';


function Form({initFormState, onSubmit, onDelete}) {

  const [contact, setContact] = useState(initFormState);
 
  function onInputChange(event) {
    setContact({
      ...contact, 
      [event.target.name]: event.target.value,
    });
  };

  function onSubmitForm(event) {
    event.preventDefault();
    onSubmit({
      ...contact,
    });
    setContact({
      ...initFormState,
    });
  };

  function toClearField(event) {
    const sibling = event.target.parentNode.firstChild;
    setContact({
      ...contact,
      [sibling.name] : '',
    });
  };

  function toDeleteContact() {
    onDelete(contact.id);
    setContact({
      ...initFormState,
    });
  };

  return (
    <form className='main-inner-form'
          onSubmit={onSubmitForm}
           >
        <div className='form-item'>
          <input type='text'
                 name='fName'
                 placeholder='First Name'
                 value={contact.fName}
                 onChange={onInputChange}
                  />
          <span className='input-group'
                onClick={toClearField}
                 >X</span>
        </div>
        <div className='form-item'>
          <input type='text'
                 name='lName'
                 placeholder='Last Name' 
                 value={contact.lName}
                 onChange={onInputChange}
                  />
          <span className='input-group'
                onClick={toClearField}
                 >X</span>
        </div>
        <div className='form-item'>
          <input type='text'
                 name='email'
                 placeholder='Email'
                 value={contact.email}
                 onChange={onInputChange}
                  />
          <span className='input-group'
                onClick={toClearField}
                 >X</span>
        </div>
        <div className='form-item'>
          <input type='text'
                 name='phone'
                 placeholder='Phone'
                 value={contact.phone}
                 onChange={onInputChange}
                  />
          <span className='input-group'
                onClick={toClearField}
                 >X</span>
        </div>

        <button>Save</button>
        {contact.id ? (<button onClick={toDeleteContact} >Delete</button>) : (<span></span>)}
                                  
      </form>
  )
}

export default Form;


  