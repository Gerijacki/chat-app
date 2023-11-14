import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [group, setGroup] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
    // Al cargar la aplicación, obtén la lista de grupos en los que el usuario ha participado.
    socket.emit('getJoinedGroups', username);

    // Manejar la respuesta del servidor con la lista de grupos.
    socket.on('joinedGroups', (groups) => {
      setJoinedGroups(groups);
    });

    // Establecer una conexión de Socket.io
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('oldMessages', (oldMessages) => {
      setMessages(oldMessages);
    });
  }, [username]);

  const handleJoin = () => {
    socket.emit('join', group);
  };

  const handleSendMessage = ()

 => {
    socket.emit('message', { content: message, username, group });
    setMessage('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Group" value={group} onChange={(e) => setGroup(e.target.value)} />
      <button onClick={handleJoin}>Join Group</button>

      {/* Mostrar la lista de grupos */}
      <div>
        <h2>Joined Groups:</h2>
        {joinedGroups.map((group) => (
          <div key={group}>{group}</div>
        ))}
      </div>

      {/* Mostrar los mensajes del grupo seleccionado */}
      <div>
        <h2>Chat Messages:</h2>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.content}
          </div>
        ))}
      </div>

      {/* Enviar mensajes al grupo seleccionado */}
      <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}

export default App;