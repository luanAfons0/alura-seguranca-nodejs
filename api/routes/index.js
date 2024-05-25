const bodyParser = require("body-parser");

const produto = require("./produtoRoutes");
const usuarios = require("./usuariosRoutes");
const auth = require("./authRoutes");
const roles = require("./roles");
const permissoes = require("./permissoes");

module.exports = (app) => {
  app.use(bodyParser.json(), auth, produto, usuarios, roles, permissoes);
};
