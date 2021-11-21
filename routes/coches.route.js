// Importamos el Router de Express y la información del archivo de data
const router = require('express').Router();
const coches = require('../db/data');

// Router base
router.get('/', (req, res) => {
    const results = coches;
    res.status(200).json({
        status: true,
        message: `Obteniendo ${results.length} vehículos`,
        results
    })
});

// Router para obtener un coche por su patente
router.get('/getByPatente/:patente', (req, res) => {
    const {patente} = req.params;
    const results = coches.find(coche => coche.patente == patente);

    if (result == undefined) {
        res.status(404).json({
            status: false,
            message: "Not found",
            results: []
        });
    } else {
        res.status(200).json({
            status: true,
            message: "Vehiculo encontrado!",
            results
        });
    }
});

// Router para obtener un coche por su patente
router.get('/getAvailables', (req, res) => {
    const results = coches.filter(coche => coche.vendido == false).map(coche => {
        delete coche['vendido']
        return coche;
    });

    if (results == undefined) {
        res.status(404).json({
            status: false,
            message: "No hay coches disponibles",
            results: []
        });
    } else {
        res.status(200).json({
            status: true,
            message: `Hay un total de ${results.length} autos disponibles`,
            results
        });
    }
});

module.exports = router;