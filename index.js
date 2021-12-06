const express = require('express');
const mongoose = require('mongoose');
const EmpleadoSchema = require('./modelos/Empleado.js');

const app = express();
const router = express.Router();
//app.use(express.json);
app.use(express.urlencoded({extended:true}));


// conexion a la Base de datos
mongoose.connect('mongodb+srv://SantiagoChivata:94110102342@cluster0.s4g8c.mongodb.net/HogarColombiaDBs?retryWrites=true&w=majority');

// operaciones CRUD

router.get('/', (req, res) => {

    res.send("El inicio de mi API");
})

router.get('empleado', (req, res) =>{

    EmpleadoSchema.find(function(err, datos){
        if (err) {
            console.log("error leyendo los empleado en la BD");
        } else {
            res.send(datos);
        }
    })

});

router.post('/empleado', (req, res) =>{

    let nuevoEmpleado = new EmpleadoSchema({

        documento: req.body.documento,
        nombre: req.body.nombre,
        cargo: req.body.cargo,
        usuario: req.body.usuario,
        clave: req.body.clave,
        email: req.body.email

    });

    nuevoEmpleado.save(function(err,datos){

        if (err) {
            console.log(err);
        }
        res.send("Empleado guardado exitosamente.")
    })

});

app.use(router);
app.listen(3000, () =>{

    console.log("Servidor corriendo en el puerto 3000")
});