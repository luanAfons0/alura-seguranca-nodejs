const bodyParser = require("body-parser");

const produto = require("./produtoRoute");
const usuarios = require("./usuariosRoutes");

module.exports = (app) => {
  app.use(bodyParser.json(), produto, usuarios);
};
