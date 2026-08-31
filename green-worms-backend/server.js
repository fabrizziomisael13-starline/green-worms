import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicialización con la API Key guardada en el .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Instrucción de personalidad de la IA
const SYSTEM_INSTRUCTION = `
Eres el asistente virtual oficial de "Green Worms" 🪱🌱.
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
      model: 'gemini-3.6-flash',
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de Green Worms corriendo en el puerto ${PORT}`);
});