import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    nome: string;
    email: string;
    idade: number;
    genero: string;
    telefone: string;
    cpf: string;
    rg: string;
}

const userSchema: Schema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    idade: { type: Number, required: true },
    genero: { type: String, required: true },
    telefone: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true }
});

export default mongoose.model<User>('User', userSchema);
