const bodyParser = require("body-parser");

const produto = require("./produtoRoutes");
const usuarios = require("./usuariosRoutes");
const auth = require("./authRoutes");
const roles = require("./roles");

module.exports = (app) => {
  app.use(bodyParser.json(), auth, produto, usuarios, roles);
};
