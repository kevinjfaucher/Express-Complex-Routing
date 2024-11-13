"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const client = new mongodb_1.MongoClient(process.env.MONGODB_URI);
// Retrieve all items
router.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const collection = client.db().collection('items');
        const items = yield collection.find({}).toArray();
        res.json(items);
    }
    finally {
        yield client.close();
    }
}));
// Search items by name
router.get('/items/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const collection = client.db().collection('items');
        const name = req.query.name;
        const items = yield collection.find({ name: new RegExp(name, 'i') }).toArray();
        res.json(items);
    }
    finally {
        yield client.close();
    }
}));
// Add a new item
router.post('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const collection = client.db().collection('items');
        const result = yield collection.insertOne(req.body);
        res.json(result);
    }
    finally {
        yield client.close();
    }
}));
// Update an item by ID
router.put('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const collection = client.db().collection('items');
        const result = yield collection.updateOne({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: req.body });
        res.json(result);
    }
    finally {
        yield client.close();
    }
}));
// Delete an item by ID
router.delete('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const collection = client.db().collection('items');
        const result = yield collection.deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        res.json(result);
    }
    finally {
        yield client.close();
    }
}));
exports.default = router;
