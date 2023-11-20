var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.get("/listarFuncionario/:idEmpresa", function (req, res) {
  empresaController.listarFuncionario(req, res);
});

router.get("/listarFuncionarioPorId/:idEmpresa/:idColaborador", function (req, res) {
  empresaController.listarFuncionarioPorId(req, res);
});

router.get("/listarMaquinas/:idEmpresa", function (req, res) {
  empresaController.listarMaquinas(req, res);
});

router.get("/listarMaquinasPorId/:idEmpresa/:idMaquina", function (req, res) {
  empresaController.listarMaquinasPorId(req, res);
});


router.get("/listarLinhasPorId/:idEmpresa/:idLinha", function (req, res) {
  empresaController.listarLinhasPorId(req, res);
});


router.get("/listarMaqTemp/:idEmpresa/:idMaquina", function (req, res) {
  empresaController.listarMaqTemp(req, res);
});

router.get("/listarMaqCPU/:idEmpresa/:idMaquina", function (req, res) {
  empresaController.listarMaqCPU(req, res);
});



router.get("/listarFuncionario/:idEmpresa", function (req, res) {
  empresaController.listarFuncionario(req, res);
});

module.exports = router;