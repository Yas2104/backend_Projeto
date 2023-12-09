const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    categoria: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    tamanho: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);