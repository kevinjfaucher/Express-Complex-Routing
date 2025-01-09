"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const characters_1 = __importDefault(require("./routes/characters"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Refined CORS configuration
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies if needed
}));
app.use(express_1.default.json());
app.use('/api', characters_1.default);
// Test route to verify CORS
app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS is working properly' });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
