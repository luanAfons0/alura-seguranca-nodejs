const bodyParser = require("body-parser");

const produto = require("./produtoRoutes");
const usuarios = require("./usuariosRoutes");
const auth = require("./authRoutes");

module.exports = (app) => {
  app.use(bodyParser.json(), auth, produto, usuarios);
};
