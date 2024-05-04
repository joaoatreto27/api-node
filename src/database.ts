import mongoose from 'mongoose';
import UserModel from './models/UserModel';

const MONGODB_URI = 'mongodb+srv://joaoatreto:aula12345@cluster0.xfg5pix.mongodb.net/?retryWrites=true&w=majority';

export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
