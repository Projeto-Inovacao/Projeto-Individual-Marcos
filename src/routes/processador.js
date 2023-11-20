var express = require("express");
var router = express.Router();

var processadorController = require("../controllers/processadorController");


router.get("/ultimasCPU/:idMaquina", function (req, res) {
    processadorController.buscarUltimasMedidasProcessadorTemp(req, res);
});

router.get("/ultimasRAM/:idMaquina", function (req, res) {
    processadorController.buscarUltimasMedidasFrequencia(req, res);
});


module.exports = router;