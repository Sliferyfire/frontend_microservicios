var ruta = require("express").Router();

ruta.get("/", (req,res)=>{
    res.render("iniciarSesion");
})

ruta.post("/iniciarSesion", (req,res)=>{
    // console.log("Datos a enviar: " + req.body.email + " " + req.body.password);
    fetch('http://localhost:9001/auth/authentication/signIn', {
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
        res.redirect("/");
    });
})

ruta.get("/registrarCuenta", (req,res)=>{
    res.render("registrarCuenta");
})

ruta.post("/registrarCuenta", (req,res)=>{
    console.log("Datos a enviar: " + req.body.email + " " + req.body.password);
    fetch('http://localhost:9001/auth/authentication/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    })
    .then(response => response.json())
    .then(respuesta => {
        console.log('Registro exitoso:', respuesta);
        res.redirect("/inicio");
    })
    .catch(error => {
        console.error('Error al registrar cuenta:', error);
        res.redirect("/registrarCuenta");
    });
}) 

ruta.get("/inicio", (req,res) =>{
    fetch('http://localhost:9001/agendar/mostrarCitas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(citas => {
        console.log('Citas: ', citas);
        res.render("inicio",{citas});
    })
    .catch(error => {
        console.error('Error al recuperar datos:', error);
        res.render("inicio", { citas: [] });
    });
})

ruta.get("/agendar", (req,res)=>{
    res.render("agendar");
})

ruta.post("/agendarCita", (req,res)=>{
    // console.log(req.body);
    fetch('http://localhost:9001/agendar/nuevacita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    })
    .then(response => response.json())
    .then(respuesta => {
        console.log('Agenda de cita exitoso: ', respuesta);
        res.redirect("/inicio");
    })
    .catch(error => {
        console.error('Error al agendar la cita:', error);
        res.redirect("/agendar");
    });
})

ruta.get("/editar/:id", (req,res)=>{
    fetch(`http://localhost:9001/agendar/buscarPorID/${req.params.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(cita => {
        console.log('Cita: ', cita);
        res.render("editar", {cita});
    })
    .catch(error => {
        console.error('Error al recuperar cita:', error);
        res.redirect("/inicio");
    });
})

ruta.post("/editar", (req,res)=>{
    fetch(`http://localhost:9001/agendar/editar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    })
    .then(response => response.json())
    .then(respuesta => {
        console.log('Cita modificada: ', respuesta);
        res.redirect("/inicio");
    })
    .catch(error => {
        console.error('Error al modificar la cita:', error);
        res.redirect("/inicio");
    });
})

ruta.get("/borrar/:id", (req,res)=>{
    fetch(`http://localhost:9001/agendar/borrar/${req.params.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(cita => {
        console.log('Cita borrada: ', cita);
        res.redirect("/inicio");
    })
    .catch(error => {
        console.error('Error al borrar cita:', error);
        res.redirect("/inicio");
    });
})

ruta.get("/cerrarSesion", (req,res)=>{
    res.redirect("/");
})

module.exports = ruta;