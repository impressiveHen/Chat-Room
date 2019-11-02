import React, { useEffect, useState, useCallback } from 'react';
import {
  ChatManager, TokenProvider
} from '@pusher/chatkit-client';

import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import { instanceLocator, tokenUrl } from './Config';

function App() {
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [joinableRooms, setJoinableRooms] = useState([]);
  const [joinedRooms, setJoinedRooms] = useState([]);

  const sendSimpleMessage = (text) => {
    // send simple text
    currentUser.sendSimpleMessage({
      text: text,
      roomId: currentRoomId
    });
  }

  let subscribeToRoom = (roomId) => {
    setMessages([]);
    currentUser.subscribeToRoomMultipart({
      // roomId: '7b7a1d23-e869-4c19-8eab-e88d5144dd72',
      roomId: roomId,
      hooks: {
        onMessage: message => {
          // console.log('message object: ', message.parts[0].payload.content);
          setMessages(prevMessages => [...prevMessages, message]);
        }
      }
    }).then((room) => {
      // reset state joinableRooms, joinedRooms
      getJoinRoom()
      setCurrentRoomId(room.id);
    }).catch((err) => {
      console.log('Error on subscribing to room', err);
    })
  };

  let getJoinRoom = useCallback(() => {
    if (!currentUser) {
      return;
    }
    currentUser.getJoinableRooms()
      .then(joinableRooms => {
        setJoinableRooms(joinableRooms);
        setJoinedRooms(currentUser.rooms);
      }).catch(err => {
        console.log('Error on getting joinable rooms', err);
      });
  }, [currentUser])

  let createNewRoom = (newRoomName) => {
    currentUser.createRoom({
      name: newRoomName
    }).then(room => {
      subscribeToRoom(room.id)
    }).catch(err => {
      console.log('Error on create new room', err);
    });
  }

  // To get started with Chatkit you will need to instantiate both a ChatManager 
  // instance as well as a TokenProvider instance to authenticate users. 
  // https://pusher.com/docs/chatkit/reference/javascript#chat-managerm
  useEffect(() => {
    const chatManager = new ChatManager({
      instanceLocator: instanceLocator,
      userId: 'Candy',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });

    // Once you’ve initialized your Chat Manager you are ready to connect to the Chatkit servers. 
    // The connect method returns a promise that resolves with a Current User object.
    // ChatManager.connect: https://pusher.com/docs/chatkit/reference/javascript#connect
    // CurrentUser: https://pusher.com/docs/chatkit/reference/javascript#current-user
    chatManager.connect()
      .then(currUser => {
        setCurrentUser(currUser);
        getJoinRoom();
      }).catch(err => {
        console.log('Error on connection', err)
      })

  }, [getJoinRoom]);

  return (
    <div className="app">
      <RoomList
        currentRoomId={currentRoomId}
        rooms={[...joinableRooms, ...joinedRooms]}
        subscribeToRoom={subscribeToRoom}
      />
      <MessageList
        currentRoomId={currentRoomId}
        messages={messages}
      />
      <SendMessageForm
        disabled={currentRoomId===null}
        sendSimpleMessage={sendSimpleMessage}
      />
      <NewRoomForm createNewRoom={createNewRoom} />
    </div>
  );
}

export default App;