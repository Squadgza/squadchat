import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { fetchPrismaData } from './prismaQueries.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/',(req,res)=>{
  res.sendFile(path.join(process.cwd(), '/src/index.html'));
})

app.get('/data', async (req, res) => {
  try {
    const dataFromPrisma = await fetchPrismaData(); // Call the function from prismaQueries.js
    res.json(dataFromPrisma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

