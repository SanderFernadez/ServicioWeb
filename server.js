const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware para manejar JSON y servir archivos estáticos
app.use(express.json());
app.use(express.static('public'));

// Ruta para listar contactos
app.get('/api/contactos', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    res.status(500).json({ error: 'Error al obtener los contactos' });
  }
});

// Ruta para agregar un contacto
app.post('/api/contactos', async (req, res) => {
  const { nombre, apellido, telefono } = req.body;
  
  if (!nombre || !apellido || !telefono) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    await axios.post('http://www.raydelto.org/agenda.php', {
      nombre,
      apellido,
      telefono
    });
    res.status(201).json({ message: 'Contacto agregado con éxito' });
  } catch (error) {
    console.error('Error al agregar el contacto:', error);
    res.status(500).json({ error: 'Error al agregar el contacto' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
