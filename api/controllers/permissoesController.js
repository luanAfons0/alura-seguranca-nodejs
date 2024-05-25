const PermissoesService = require("../services/permissoesService");

const permissoesService = new PermissoesService();

class PermissoesController {
  static async cadastraPermissao(req, res) {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
      res
        .status(400)
        .send({ message: "É necessario mais informações para o cadastro!" });
    }

    try {
      const permissao = await permissoesService.cadastrarPermissoes({
        nome,
        descricao,
      });

      res.status(201).json(permissao);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async retornaPermissao(req, res) {
    const { id } = req.params;

    if (!id) {
      res
        .status(400)
        .send({ message: "É necessario mais informações para a pesquisa!" });
    }

    try {
      const permissao = await permissoesService.retornaPermissao(id);
      res.status(200).send(permissao);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async retornaTodasPermissoes(req, res) {
    try {
      const permissoes = await permissoesService.retornaTodasPermissoes();
      res.status(200).send(permissoes);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async atualizaPermissao(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
      res.status(400).send({
        message: "É necessario mais informações para que a função funcione!",
      });
    }

    try {
      const permissaoAtualizada = await permissoesService.atualizaPermissao(
        id,
        {
          nome: nome,
          descricao: descricao,
        }
      );
      res.status(200).send(permissaoAtualizada);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deletaPermissao(req, res) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({
        message: "É necessario que o id seja informado!",
      });
    }

    try {
      const permissaoDeletada = await permissoesService.deletaPermissao(id);
      res.status(200).send(permissaoDeletada);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = PermissoesController;
