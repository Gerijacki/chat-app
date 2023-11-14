const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const User = require('../models/user');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Realiza la lógica de autenticación aquí
    // Puedes usar la base de datos para verificar el usuario y la contraseña.
    // Si la autenticación es exitosa, puedes generar y devolver un token JWT.
    res.json({ success: true, token: 'tu_token_jwt' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error en la autenticación' });
  }
});

router.get('/getJoinedGroups/:username', async (req, res) => {
  try {
    const username = req.params.username;
    // Realiza la lógica para obtener los grupos a los que el usuario se ha unido
    // Puedes usar la base de datos para recuperar esta información.
    const joinedGroups = ['Grupo1', 'Grupo2']; // Reemplaza con tu lógica de base de datos.
    res.json(joinedGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los grupos del usuario' });
  }
});

router.get('/getMessages/:group', async (req, res) => {
  try {
    const group = req.params.group;
    // Realiza la lógica para obtener los mensajes del grupo.
    // Puedes usar la base de datos para recuperar esta información.
    const messages = await Message.find({ group }).exec();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los mensajes del grupo' });
  }
});

router.post('/sendMessage', async (req, res) => {
  try {
    const { content, username, group } = req.body;
    // Realiza la lógica para guardar el mensaje en la base de datos.
    const newMessage = new Message({ content, username, group });
    await newMessage.save();
    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

module.exports = router;