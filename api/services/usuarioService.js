const database = require("../models/index");
const { hash } = require("bcryptjs");
const uuid = require("uuid");

class UsuarioService {
  async cadastrar(dto) {
    try {
      const usuario = await database.usuarios.findOne({
        where: {
          email: dto.email,
        },
      });

      if (usuario) {
        throw new Error("Usuario ja cadastrado");
      }

      const senhaHash = await hash(dto.senha, 8);

      const novoUsuario = await database.usuarios.create({
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });

      return novoUsuario;
    } catch (error) {
      throw new Error("Erro ao cadastrar usuario");
    }
  }

  async pegaTodosUsuarios() {
    try {
      const usuarios = await database.usuarios.findAll({});
      return usuarios;
    } catch (error) {
      throw new Error("Erro ao consusltar usuarios");
    }
  }

  async pegaUsuarioPorId(id) {
    try {
      const usuario = await database.usuarios.findOne({
        where: {
          id: id,
        },
      });

      if (!usuario) {
        throw new Error("Usuario não encontrado, verifique as informações");
      }

      return usuario;
    } catch (error) {
      throw new Error("Erro ao consusltar usuario");
    }
  }

  async atualizaUsuarioPorId(id, dto) {
    try {
      const usuarioAtualizado = await database.usuarios.findOne({
        where: {
          id: id,
        },
      });

      if (!usuarioAtualizado) {
        throw new Error("Usuario não encontrado, verifique as informações");
      }

      const novaSenhaHasheada = await hash(dto.senha, 8);

      usuarioAtualizado.nome = dto.nome;
      usuarioAtualizado.email = dto.email;
      usuarioAtualizado.senha = novaSenhaHasheada;

      await usuarioAtualizado.save();

      return usuarioAtualizado;
    } catch (error) {
      throw new Error("Erro ao atualizar usuario");
    }
  }

  async deletaUsuarioPorId(id) {
    try {
      const usuarioDeletado = await database.usuarios.findOne({
        where: {
          id: id,
        },
      });

      if (!usuarioDeletado) {
        throw new Error("Usuario não encontrado, verifique as informações");
      }

      await usuarioDeletado.destroy();

      return usuarioDeletado;
    } catch (error) {
      throw new Error("Erro ao deletar usuario");
    }
  }
}

module.exports = UsuarioService;
