const UsuarioService = require("../services/usuarioService");

const usuarioService = new UsuarioService();

class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      const usuario = await usuarioService.cadastrar({ nome, email, senha });

      res.status(201).send(usuario);
    } catch (error) {
      console.log("Erro: " + error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async pegaTodosUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.pegaTodosUsuarios();
      res.status(200).send(usuarios);
    } catch (error) {
      console.log("Erro: " + error.message);
      res.status(500).send({ message: error.message });
    }
  }

  static async pegaUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.pegaUsuarioPorId(id);
      res.status(200).send(usuario);
    } catch (error) {
      console.log("Erro: " + error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async atualizaUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const { nome, senha, email } = req.body;

      const usuarioAtualizado = await usuarioService.atualizaUsuarioPorId(id, {
        nome,
        senha,
        email,
      });

      res.status(200).send(usuarioAtualizado);
    } catch (error) {
      console.log("Erro: " + error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deletaUsuarioPorId(req, res) {
    try {
      const { id } = req.params;

      const usuarioDeletado = await usuarioService.deletaUsuarioPorId(id);

      res.status(204).send(usuarioDeletado);
    } catch (error) {
      console.log("Erro: " + error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
