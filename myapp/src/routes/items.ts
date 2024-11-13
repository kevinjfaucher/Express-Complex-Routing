import { Router } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { Item } from '../models/item';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();
const client = new MongoClient(process.env.MONGODB_URI!);

// Retrieve all items
router.get('/items', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db().collection<Item>('items');
        const items = await collection.find({}).toArray();
        res.json(items);
    } finally {
        await client.close();
    }
});

// Search items by name
router.get('/items/search', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db().collection<Item>('items');
        const name = req.query.name as string;
        const items = await collection.find({ name: new RegExp(name, 'i') }).toArray();
        res.json(items);
    } finally {
        await client.close();
    }
});

// Add a new item
router.post('/items', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db().collection<Item>('items');
        const result = await collection.insertOne(req.body);
        res.json(result);
    } finally {
        await client.close();
    }
});

// Update an item by ID
router.put('/items/:id', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db().collection<Item>('items');
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.json(result);
    } finally {
        await client.close();
    }
});

// Delete an item by ID
router.delete('/items/:id', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db().collection<Item>('items');
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } finally {
        await client.close();
    }
});

export default router;
