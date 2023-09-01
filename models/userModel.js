const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    nome: {
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
        minlength: [8, 'senha tem que ter pelo menos (8) caracters'],
    },
    telefone: {
        type: String,
        trim: true,
        required: [true, 'telefone é necessário'],
    },
    tipo: {
        type: String,
        enum: ['user', 'admin'],
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
}, { timestamps: true });

//encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) {
        next();
    }
    this.senha = await bcrypt.hash(this.senha, 10)
})


// compare user password
userSchema.methods.comparaSenha = async function (senhaInserida) {
    return await bcrypt.compare(senhaInserida, this.senha)
}

// return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

module.exports = mongoose.model('User', userSchema);