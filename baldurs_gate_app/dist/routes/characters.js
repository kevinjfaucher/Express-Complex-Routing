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
router.get('/characters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const collection = client.db().collection('characters');
        const characters = yield collection.find({}).toArray();
        res.status(200).json(characters);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
    finally {
        yield client.close();
    }
}));
// localhost:300//api/endpoint/?name="Kevin"?class='rogue
router.get('/characters/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const collection = client.db().collection('characters');
        const query = {};
        if (req.query.name) {
            query.name = { $regex: new RegExp(req.query.name, 'i') };
        }
        if (req.query.class) {
            query.class = { $regex: new RegExp(req.query.class, 'i') };
        }
        const characters = yield collection.find(query).toArray();
        res.status(200).json(characters);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
    finally {
        yield client.close();
    }
}));
router.post('/characters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const collection = client.db().collection('characters');
        const newCharacter = req.body;
        const result = yield collection.insertOne(newCharacter);
        res.status(201).json(Object.assign({ _id: result.insertedId }, newCharacter));
    }
    catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
    finally {
        yield client.close();
    }
}));
router.put('/characters/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const collection = client.db().collection('characters');
        const id = req.params.id;
        const updates = req.body;
        const result = yield collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updates });
        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'Character not found...make em with post' });
        }
        else {
            res.status(200).json({ message: 'Character updated' });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
    finally {
        yield client.close();
    }
}));
router.delete('/characters/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const collection = client.db().collection('characters');
        const id = req.params.id;
        const result = yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Character not found' });
        }
        else {
            res.status(200).json({ message: 'Character Deleted' });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
    finally {
        yield client.close();
    }
}));
exports.default = router;
