var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");


router.get("/ultimasREDE/:idMaquina", function (req, res) {
    redeController.buscarUltimasMedidasRede(req, res);
});

router.get("/tempo-realRede/:idMaquina", function (req, res) {
    redeController.buscarMedidasEmTempoRealRede(req, res);
})


module.exports = router;