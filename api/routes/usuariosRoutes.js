const { Router } = require("express");
const UsuarioController = require("../controllers/usuarioController");

const router = Router();

router
  .post("/usuarios", UsuarioController.cadastrar)
  .get("/usuarios", UsuarioController.pegaTodosUsuarios)
  .get("/usuarios/id/:id", UsuarioController.pegaUsuarioPorId)
  .patch("/usuarios/id/:id", UsuarioController.atualizaUsuarioPorId)
  .delete("/usuarios/id/:id", UsuarioController.deletaUsuarioPorId);

module.exports = router;
