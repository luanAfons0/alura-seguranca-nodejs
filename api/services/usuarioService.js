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
}

module.exports = UsuarioService;
