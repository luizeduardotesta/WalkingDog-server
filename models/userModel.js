const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'nome é necessário'],
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail é necessário'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    senha: {
        type: String,
        trim: true,
        required: [true, 'password é necessário'],
        minlength: [6, 'senha tem que ter pelo menos (6) caracters'],
    },
    telefone: {
        type: String,
        trim: true,
        required: [true, 'telefone é necessário'],
    },
    tipo: {
        type: String,
        default: 'user',
    },
    cep: {
        type: String,
        trim: true,
        required: [true, 'cep é necessário'],
    },
    cidade: {
        type: String,
        trim: true,
        required: [true, 'cidade é necessário'],
    },
    estado: {
        type: String,
        trim: true,
        required: [true, 'estado é necessário'],
        maxLength: [2, 'estado deve ter no maximo (2) caracters'],
    },
    rua: {
        type: String,
        trim: true,
        required: [true, 'rua é necessário'],
    },
    numero: {
        type: String,
        trim: true,
        required: [true, 'numero é necessário'],
    },
    complemento: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('user', userSchema);