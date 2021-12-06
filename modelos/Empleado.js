const mongoose = require('mongoose');

let EmpleadoSchema = new mongoose.Schema({
    
    documento: Number,
    nombre: String,
    cargo: String,
    usuario: String,
    clave: String,
    email: String

});

module.exports = mongoose.model('empleado', EmpleadoSchema, 'Empleado');