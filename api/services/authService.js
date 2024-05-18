const database = require("../models");
const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const jsonSecret = require("../config/jsonSecret");

class AuthService {
  static async login(email, senha) {
    try {
      const usuario = await database.usuarios.findOne({
        attributes: ["id", "email", "senha"],
        where: {
          email: email,
        },
      });

      if (!usuario) {
        throw new Error("Usuario não cadastrado");
      }

      const senhasIguais = await compare(senha, usuario.senha);

      if (!senhasIguais) {
        throw new Error("Senha incorreta!");
      }

      console.log(jsonSecret);

      const accessToken = sign(
        {
          id: usuario.id,
          email: email,
        },
        jsonSecret.secret,
        {
          expiresIn: 86400,
        }
      );
      return { accessToken };
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }
}

module.exports = AuthService;
