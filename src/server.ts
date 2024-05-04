import './database';
import express from 'express';
import { connectDB } from './database';
import UserModel from './models/UserModel';

const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

connectDB().then(() => {
    app.listen(PORT, () => {});
});
