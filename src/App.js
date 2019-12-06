import React, { useEffect, useState } from 'react';

import { instanceLocator, secretKey } from './Config';
import ModalForm from './components/ModalForm';
import Chat from './Chat';

function App() {
  const Chatkit = require('@pusher/chatkit-server');

  const [allUser, setAllUser] = useState([]);
  const [selectId, setSelectId] = useState('ShiangHu');

  useEffect(() => {
    const chatkit = new Chatkit.default({
      instanceLocator: instanceLocator,
      key: secretKey
    })

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

  return (
    <div>
      <ModalForm allUser={allUser} handleLogin={handleLogin} />
      <Chat selectId={selectId} />
    </div>
  );
}

export default App;