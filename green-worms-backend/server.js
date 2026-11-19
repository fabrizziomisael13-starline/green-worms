import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(cors());
app.use(express.json());

// CONEXIÓN A MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado exitosamente a MongoDB Atlas 🍃"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// --- ESQUEMAS Y MODELOS ---
const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

const Contacto = mongoose.model('Contacto', contactoSchema);

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: String
});

const Producto = mongoose.model('Producto', productoSchema);

// --- RUTAS DE CONTACTO ---
// Obtener todos los mensajes de contacto (para el panel de administración)
app.get('/api/contacto', async (req, res) => {
  try {
    const mensajes = await Contacto.find().sort({ fecha: -1 });
    res.json(mensajes);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ error: 'Error al consultar los mensajes en la base de datos' });
  }
});

// Guardar mensajes del formulario de contacto en MongoDB
app.post('/api/contacto', async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevoMensaje = new Contacto({ nombre, email, mensaje });
    await nuevoMensaje.save();

    res.status(201).json({ success: true, message: '¡Mensaje enviado y guardado con éxito!' });
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar el mensaje.' });
  }
});

// --- RUTAS DEL CRUD DE PRODUCTOS ---
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});

app.post('/api/productos', async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json({ mensaje: 'Producto creado con éxito', producto: nuevoProducto });
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el producto.' });
  }
});

app.put('/api/productos/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado para actualizar.' });
    }

    res.json({ mensaje: 'Producto actualizado con éxito', producto: productoActualizado });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el producto.' });
  }
});

app.delete('/api/productos/:id', async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
});

// --- RUTA GEMINI ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_INSTRUCTION = `
Eres el asistente virtual oficial de "Green Worms" .
Tienes la capacidad de responder cualquier duda sobre cualquier tema (matemáticas, historia, tecnología, conversación general, etc.) como una IA inteligente, amable y fluida.
Sin embargo, tu especialidad principal es la botánica, jardinería, sustratos y plantas. Siempre que la conversación lo permita de forma natural, invita amablemente al usuario a consultar nuestro catálogo de productos en Green Worms. Mantén un tono respetuoso, servicial y amigable.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido.' });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.8-flash',
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const result = await model.generateContent(message);
    const response = await result.response;

    res.json({ reply: response.text() });
  } catch (error) {
    console.error('Error al comunicarse con Gemini:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar tu solicitud.' });
  }
});

// --- ARRANQUE DEL SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de Green Worms corriendo en el puerto ${PORT}`);
});