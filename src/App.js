import React, { useEffect, useState } from 'react';

import { instanceLocator, secretKey } from './Config';
import ModalForm from './components/ModalForm';
import Chat from './Chat';

function App() {
  const Chatkit = require('@pusher/chatkit-server');
  const chatkit = new Chatkit.default({
    instanceLocator: instanceLocator,
    key: secretKey
  })
  
  const [allUser, setAllUser] = useState([]);
  const [selectId, setSelectId] = useState('ShiangHu');

  useEffect(() => {
    chatkit.getUsers()
      .then((res) => {
        // console.log(res);
        setAllUser(res.map(user => { return user.id }))
      }).catch((err) => {
        console.log(err);
      });
  }, [])

  const handleLogin = (id) => {
    setSelectId(id);
  }

  const createNewUser = (id, name) => {
    chatkit.createUser({
      id: id,
      name: name
    }).then(() => {
      console.log('User created successfully');
    }).catch((err) => {
      console.log(err);
    });
    handleLogin(id);
  }

  return (
    <div>
      <ModalForm allUser={allUser} handleLogin={handleLogin} createNewUser={createNewUser} />
      <Chat selectId={selectId} />
    </div>
  );
}

export default App;