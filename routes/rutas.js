var ruta = require("express").Router();

ruta.get("/", (req,res)=>{
    res.render("index");
})

ruta.get("/inicio",(req,res) =>{
    res.render("inicio");
})

ruta.post("/iniciarSesion", (req,res)=>{
    // console.log("Datos a enviar: " + req.body.email + " " + req.body.password);
    fetch('http://localhost:9001/auth/autenticacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    })
    .then(response => response.json())
    .then(respuesta => {
        console.log('Inicio de sesion exitoso:', respuesta);
        res.redirect("/inicio");
    })
    .catch(error => {
        console.error('Error al iniciar sesion:', error);
    });
})

module.exports = ruta;