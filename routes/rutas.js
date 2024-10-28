var ruta = require("express").Router();

ruta.get("/", (req,res)=>{
    res.render("iniciarSesion");
})

ruta.post("/iniciarSesion", (req,res)=>{
    console.log("Datos a enviar: " + req.body.email + " " + req.body.password);
    fetch('https://api-gateway-indol.vercel.app/auth/authentication/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            res.cookie('authToken', data.token, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            console.log('Inicio exitoso:', data);
            res.redirect("/inicio");
        } else {
            throw new Error('No se recibió un token');
        }
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
    fetch('https://api-gateway-indol.vercel.app/auth/authentication/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            res.cookie('authToken', data.token, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            console.log('Registro exitoso:', data);
            res.redirect("/inicio");
        } else {
            throw new Error('No se recibió un token');
        }
    })
    .catch(error => {
        console.error('Error al registrar cuenta:', error);
        res.redirect("/registrarCuenta");
    });
}) 

ruta.get("/inicio", (req,res) =>{
    const token = req.cookies.authToken;
    if (token) {
        fetch('https://api-gateway-indol.vercel.app/agendar/mostrarCitas', {
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
    } else {
        res.redirect("/");
    }
})

ruta.get("/agendar", (req,res)=>{
    const token = req.cookies.authToken;
    if (token) {
        res.render("agendar");
    } else {
        res.redirect("/");
    }
})

ruta.post("/agendarCita", (req,res)=>{
    const token = req.cookies.authToken;
    if (token) {
        console.log(req.body);
        fetch('https://api-gateway-indol.vercel.app/agendar/nuevacita', {
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
    } else {
        res.redirect("/");
    }
})

ruta.get("/editar/:id", (req,res)=>{
    const token = req.cookies.authToken;
    if (token) {
        fetch(`https://api-gateway-indol.vercel.app/agendar/buscarPorID/${req.params.id}`, {
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
    } else {
        res.redirect("/");
    }
})

ruta.post("/editar", (req,res)=>{
    const token = req.cookies.authToken;
    if (token) {
        fetch(`https://api-gateway-indol.vercel.app/agendar/editar`, {
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
    } else {
        res.redirect("/");
    }   
})

ruta.get("/borrar/:id", (req,res)=>{
    const token = req.cookies.authToken;
    if (token) {
        fetch(`https://api-gateway-indol.vercel.app/agendar/borrar/${req.params.id}`, {
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
    } else {
        res.redirect("/");
    }  
})

ruta.get("/cerrarSesion", (req, res) => {
    res.clearCookie('authToken');
    res.redirect("/"); 
});

module.exports = ruta;