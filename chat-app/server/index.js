const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const indexRoutes = require('./routes/index');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/chatApp', { useNewUrlParser: true, useUnifiedTopology: true });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', async (group) => {
    socket.join(group);

    try {
      const oldMessages = await Message.find({ group }).exec();
      socket.emit('oldMessages', oldMessages);
    } catch (error) {
      console.error('Error retrieving old messages:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use('/', indexRoutes);
app.use('/chat', chatRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});