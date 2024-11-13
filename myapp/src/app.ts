import express from 'express';
import itemsRouter from './routes/items';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', itemsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
