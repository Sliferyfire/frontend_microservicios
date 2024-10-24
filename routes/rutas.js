var ruta = require("express").Router();

ruta.get("/", (req,res)=>{
    res.render("index");
})

ruta.get("/inicio",(req,res) =>{
    res.render("inicio");
})

module.exports = ruta;