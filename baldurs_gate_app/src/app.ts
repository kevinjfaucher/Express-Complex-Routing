import express from 'express';
import characterRouter from './routes/characters';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Refined CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use('/api', characterRouter);

// // Test route to verify CORS
// app.get('/test-cors', (req, res) => {
//     res.json({ message: 'CORS is working properly' });
// });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
