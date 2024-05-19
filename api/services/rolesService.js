const database = require("../models/index");
const uuid = require("uuid");

class RolesService {
  async cadastrarRole(dto) {
    const role = await database.roles.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (role) {
      throw new Error("Role já cadastrada!");
    }

    try {
      const novaRole = await database.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return novaRole;
    } catch (error) {
      console.log("Message error: ", error.message);
      throw new Error(error);
    }
  }

  async retornaRoles() {
    try {
      const roles = await database.roles.findAll();
      return roles;
    } catch (error) {
      console.log("Message error: ", error.message);
      throw new Error(error);
    }
  }

  async retornaRolePorId(id) {
    try {
      const role = await database.roles.findOne({
        where: {
          id: id,
        },
      });
      return role;
    } catch (error) {
      console.log("Message error: ", error.message);
      throw new Error(error);
    }
  }

  async atualizaRolePorId(id, dto) {
    try {
      const roleAtualizada = await database.roles.findOne({
        where: {
          id: id,
        },
      });

      if (!roleAtualizada) {
        throw new Error("Usuario não encontrado, verifique as informações");
      }

      roleAtualizada.nome = dto.nome;
      roleAtualizada.descricao = dto.descricao;

      await roleAtualizada.save();

      return roleAtualizada;
    } catch (error) {
      console.log("Message error: ", error.message);
      throw new Error(error);
    }
  }

  async deletaRolePorId(id) {
    try {
      const roleASerDeletada = await database.roles.findOne({
        where: {
          id: id,
        },
      });

      if (!roleASerDeletada) {
        throw new Error("Role não encontrado, verifique as informações");
      }

      await roleASerDeletada.destroy();

      return roleASerDeletada;
    } catch (error) {
      console.log("Message error: ", error.message);
      throw new Error(error);
    }
  }
}

module.exports = RolesService;
