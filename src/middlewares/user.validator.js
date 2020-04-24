const GeneralValidator = require("./general.validator");

class UserValidator {
  static registrationInputs(req, res, next) {
    const { body } = req;
    const emptyInputs = GeneralValidator.checkEmptyInputs(
      body,
      "firstname",
      "lastname",
      "email",
      "password"
    );

    if (emptyInputs.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'No field should be empty.',
        errors: emptyInputs
      });
    }

    const trimmed = GeneralValidator.trimAllInputs(
      body,
      "firstname",
      "lastname",
      "email",
      "password"
    );
    const validation = UserValidator.validateUserInputs(req, res);
    if (validation === null && trimmed) {
      return next();
    }
    return null;
  }

  static validateUserInputs(req, res) {
    const {
      body: { firstname, lastname, email, password }
    } = req;
    const name = GeneralValidator.validateName(firstname, lastname);
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Only letters are allowed"
      });
    }

    const emailValidity = GeneralValidator.validateEmailAddress(email);
    if (!emailValidity) {
      return res.status(400).json({
        success: false,
        message: "Use a valid email address"
      });
    }

    const passwordValidity = GeneralValidator.validatePassword(password);
    if (!passwordValidity) {
      return res.status(400).json({
        success: false,
        message:
          "Password to be atleast 8 char, 1 lower & uppercase, 1 integer and special char (!@#$%^&*)"
      });
    }

    return null;
  }

  static validateLoginCreds(req, res, next) {
    const {
      body,
      body: { email }
    } = req;
    const emptyInputs = GeneralValidator.checkEmptyInputs(
      body,
      "email",
      "password"
    );

    if (emptyInputs.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'No field should be empty.',
        errors: emptyInputs
      });
    }

    const emailValidity = GeneralValidator.validateEmailAddress(email);
    if (!emailValidity) {
      return res.status(400).json({
        success: false,
        message: "Use a valid email address"
      });
    }

    GeneralValidator.trimAllInputs(body, "email", "password");
    return next();
  }
}

module.exports = UserValidator;
