const { Router } = require("express");
const RolesController = require("../controllers/rolesController");

const router = Router();

router
  .post("/roles", RolesController.cadastrar)
  .get("/roles", RolesController.retornaRoles)
  .get("/roles/id/:id", RolesController.retornaRolePorId)
  .put("/roles/id/:id", RolesController.atualizaRole)
  .delete("/roles/id/:id", RolesController.deletaRole);

module.exports = router;
