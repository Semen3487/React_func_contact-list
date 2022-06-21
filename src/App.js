import React, { 
  useEffect,
   useState } from 'react';
import './App.css';
import Form from './components/contactForm/Form';
import ContainsName from './components/containsName/ContainsName';
import List from './components/nameList/List';
import initialState from './model/initial-contact';
import initFormState from './model/initial-form';
import contactListService from './contactList-service.js';


function App() {

  const [toListItem, setToListItem] = useState(initialState);

  const [formState, setFormState] = useState(initFormState);

  //* useEffect працює асинхронно
  useEffect(() => {
    contactListService.get('/')
      .then(({data}) => setToListItem(data))
  },[]);

  function saveContact(contact) {
    if (!contact.id) {
      addContactName(contact);
    } else {
      updateContactName(contact);
    }
  };

  function addContactName(contact) {
    contact.id = Date.now();
    contactListService.post('/', contact)
      .then(({data}) => {
        const newContactList = [...toListItem, data];
        setToListItem(newContactList); 
      });
    setFormState(initFormState);
  };

  function updateContactName(contact) {
    contactListService.put(`/${contact.id}`, contact)
    .then(({data}) => {
      const newContactList = toListItem.map((item) => item.id === contact.id ? data : item);
      setToListItem(newContactList);
    })
    .catch((error) => console.log(error));
    
    setFormState(initFormState);
  };
  
  function deleteContactName(id) {
    contactListService.delete(`/${id}`);
    const newContactList = [...toListItem.filter((contact) => contact.id !== id)];
    setToListItem(newContactList);
    setFormState(initFormState);
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
            <ContainsName contacts={toListItem.length} />
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



