var express = require("express");
var app = express();
var rutas = require("./routes/rutas");

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", rutas);


var port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});