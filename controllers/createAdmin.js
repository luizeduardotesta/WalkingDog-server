const User = require('../models/userModel');

async function createAdminIfNotExists() {
    const adminEmail = 'luizsonecazzz@gmail.com';
    const admin = await User.findOne({ email: adminEmail });

    if (!admin) {
        const newAdmin = new User({
            email: adminEmail,
            senha: 'taubate151',
            tipo: 'admin',
            numero: '123',
            rua: 'Example Street',
            estado: 'SP',
            cidade: 'Taubaté',
            cep: '12345-678',
            telefone: '11972427577',
            nome: 'Luiz Eduardo'
        });

        await newAdmin.save();
        console.log('Admin user created.');
    }
}

module.exports = createAdminIfNotExists;
