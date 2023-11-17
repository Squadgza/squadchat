import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.sendFile(path.join(process.cwd(), '/src/index.html'));
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
