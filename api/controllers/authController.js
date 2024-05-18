const AuthService = require("../services/authService");

class AuthController {
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      const login = await AuthService.login(email, senha);

      res.status(200).send(login);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(401).send({ message: error.message });
    }
  }
}

module.exports = AuthController;
