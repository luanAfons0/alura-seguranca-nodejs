const Router = require("express");
const SegurancaController = require("../controllers/segurancaController");

const router = Router();

router.post("/seguranca/acl", SegurancaController.cadastrarACL);

module.exports = router;
