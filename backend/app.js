import express from "express";
import MongoSingleton from "./config/singleton.js";
import dotenv from 'dotenv';
import productRouter from "./routers/productsRouter.js";

//Configuro variables de entorno
dotenv.config();

const app = express();

//Configuro servidor
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Conexion a la DB
MongoSingleton.getConnection();

const PORT = process.env.PORT || 8080;

//Levanto servidor
app.listen(PORT, () => console.log(`Server on port ${PORT}`))

app.get("/healthcheck", (req, res) => {
    res.json({
        State: "Running",
        Date: new Date().toDateString()
    })
});

//Rutas
app.use("/", productRouter);