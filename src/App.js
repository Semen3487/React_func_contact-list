import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/contactForm/Form';
import List from './components/nameList/List';
import initialState from './model/initial-contact';
import initFormState from './model/initial-form';


function App() {

  const [toListItem, setToListItem] = useState(initialState);

  const [formState, setFormState] = useState(initFormState);

  function saveToStorage(contacts) {
    localStorage.setItem('Contact List', JSON.stringify(contacts));
  };

  //* useEffect працює асинхронно
  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('Contact List'));
    if (!contacts){
      setToListItem(initialState);
    } else {
      setToListItem(contacts);
    };
  }, []);

  function saveContact(contact) {
    if (!contact.id) {
      addContactName(contact);
    } else {
      updateContactName(contact);
    }
  };

  function addContactName(contact) {
    contact.id = Date.now();
    const newContactList = [...toListItem, contact];
    setToListItem(newContactList);
    setFormState(initFormState);
    saveToStorage(newContactList);
  };

  function updateContactName(contact) {
    const newContactList = toListItem.map((item) => item.id === contact.id ? contact : item);
    setToListItem(newContactList);
    setFormState(initFormState);
    saveToStorage(newContactList);
  };
  
  function deleteContactName(id) {
    const newContactList = [...toListItem.filter((contact) => contact.id !== id)];
    setToListItem(newContactList);
    saveToStorage(newContactList);
  };

  function selectContact(contact) {
    setFormState(contact);
  };

  function toCreateContact() {
    setFormState(initFormState);
  };
  
  return (
    <div className='container'>
      <div className='content'>
          <header>
            <h1>
              Contact list
            </h1>
          </header>
          <main>
            <List
                  contacts={toListItem}
                  onDelete={deleteContactName}
                  onSelect={selectContact}
                  onCreate={toCreateContact}
            />
            <Form
                  key={formState.id}
                  initFormState={formState}
                  onSubmit={saveContact}
                  onDelete={deleteContactName}
            />
          </main>
      </div>
    </div>
  )
}

export default App;



