const RolesService = require("../services/rolesService");
const roleService = new RolesService();

class RolesController {
  static async cadastrar(req, res) {
    const { descricao, nome } = req.body;

    if (!descricao || !nome) {
      res.status(400).send({ message: "Atributos faltando!" });
    }

    try {
      const role = await roleService.cadastrarRole({ descricao, nome });

      res.status(201).send({ role });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async retornaRoles(req, res) {
    try {
      const roles = await roleService.retornaRoles();
      res.status(200).send(roles);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async retornaRolePorId(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new Error("É necessario o id da role!");
    }

    try {
      const role = await roleService.retornaRolePorId(id);
      res.status(200).send(role);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async atualizaRole(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    if (!id) {
      throw new Error("É necessario o id da role!");
    }

    try {
      const role = await roleService.atualizaRolePorId(id, { nome, descricao });
      res.status(200).send(role);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deletaRole(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new Error("É necessario o id da role!");
    }

    try {
      const role = await roleService.deletaRolePorId(id);
      res.status(204).send(role);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = RolesController;
