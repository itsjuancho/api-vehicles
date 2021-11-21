// Importamos los modulos necesarios
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// Establecemos el puerto del servidor
const port = process.env.PORT || 4000;

// Establecemos middlwares necesarios para la ejecución de la API
app.use(cors());
app.use(morgan('combined'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Importamos el routing de coches
const cochesRouter = require('./routes/coches.route');

// Route base
app.get('/', (req, res) => {
    res.status(403).json({
        status: false,
        message: "Usa el recurso /api para acceder"
    });
});

// Usando modulo exportado para Routing
app.use('/api', cochesRouter);

// Middleware para cuando no se encuentra un recurso
app.use((req, res) => {
    res.status(404).json({
        status: false,
        message: "No hemos encontrado el recurso que solicitaste"
    });
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
})