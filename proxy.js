import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ОБРАБОТЧИК ЗАПРОСА
app.post('/v1/chat/completions', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Ошибка:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Ошибка запроса к OpenAI',
      details: error.response?.data || error.message,
    });
  }
});

// ЗАПУСК СЕРВЕРА
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Прокси-сервер работает на порту ${PORT}`);
});
