const database = require("../models/index");
const uuid = require("uuid");

class PermissoesService {
  async cadastrarPermissoes(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (permissao) {
      throw new Error("Permissão já cadastrada!");
    }

    try {
      const novapermissao = await database.permissoes.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return novapermissao;
    } catch (error) {
      console.log("Message error: ", error.message);
      throw new Error(error);
    }
  }

  async retornaPermissao(id) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: id,
      },
    });

    if (!permissao) {
      throw new Error("Permissão não encontrada! Verifique as informações");
    }

    return permissao;
  }

  async retornaTodasPermissoes() {
    const permissoes = await database.permissoes.findAll();
    return permissoes;
  }

  async atualizaPermissao(id, dto) {
    const permissaoAtualizada = await database.permissoes.findOne({
      where: {
        id: id,
      },
    });

    if (!permissaoAtualizada) {
      throw new Error("Permissão não encontrada! Verifique as informações");
    }

    permissaoAtualizada.nome = dto.nome;
    permissaoAtualizada.descricao = dto.descricao;

    await permissaoAtualizada.save();

    return permissaoAtualizada;
  }

  async deletaPermissao(id) {
    const permissaoDeletada = await database.permissoes.findOne({
      where: {
        id: id,
      },
    });

    if (!permissaoDeletada) {
      throw new Error("Permissão não encontrada! Verifique as informações");
    }

    await permissaoDeletada.destroy();

    return permissaoDeletada;
  }
}

module.exports = PermissoesService;
