var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})

router.post("/cadastrarColaborador", function (req, res) {
    usuarioController.cadastrarColaborador(req, res);
})

router.post("/cadastrarColaborador1", function (req, res) {
    usuarioController.cadastrarColaborador1(req, res);
})

router.post("/cadastrarMaquina", function (req, res) {
    usuarioController.cadastrarMaquina(req, res);
})

router.post("/cadastrarLinha", function (req, res) {
    usuarioController.cadastrarLinha(req, res);
})

router.post("/alterarLinha", function (req, res) {
    usuarioController.alterarLinha(req, res);
})

router.post("/alterarMaquina", function (req, res) {
    usuarioController.alterarMaquina(req, res);
});

router.post("/excluirMaquina", function (req, res) {
    usuarioController.excluirMaquina(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/alterarColaborador", function (req, res) {
    usuarioController.alterarColaborador(req, res);
});

router.post("/excluirColaborador", function (req, res) {
    usuarioController.excluirColaborador(req, res);
});

module.exports = router;