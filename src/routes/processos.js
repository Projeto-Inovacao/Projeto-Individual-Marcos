var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processosController");

router.get("/listar/:idEmpresa/:idMaquina", function (req, res) {
  processosController.listarProcessos(req, res);
});

router.get("/listarJanelas/:idEmpresa/:idMaquina", function (req, res) {
  processosController.listarJanelas(req, res);
});

module.exports = router;