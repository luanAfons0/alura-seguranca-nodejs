const { Router } = require("express");
const PermissoesController = require("../controllers/permissoesController");

const router = Router();

router
  .post("/permissoes", PermissoesController.cadastraPermissao)
  .get("/permissoes", PermissoesController.retornaTodasPermissoes)
  .get("/permissoes/id/:id", PermissoesController.retornaPermissao)
  .put("/permissoes/id/:id", PermissoesController.atualizaPermissao)
  .delete("/permissoes/id/:id", PermissoesController.deletaPermissao);

module.exports = router;
