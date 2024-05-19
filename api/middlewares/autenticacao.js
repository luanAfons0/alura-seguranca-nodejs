const { verify, decode } = require("jsonwebtoken");
const { secret } = require("../config/jsonSecret");

async function autenticacao(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Token de acesso não informado" });
  }

  console.log(token);

  const [, accessToken] = token.split(" ");

  try {
    verify(accessToken, secret);

    const { id, email } = decode(accessToken);

    req.usuarioId = id;
    req.usuarioEmail = email;

    return next();
  } catch (error) {
    console.log("Message error: ", error.message);
    res.status(401).send({ message: error.message });
  }
}

module.exports = autenticacao;
