const userSchemaValidation = require("../utils/schemaValidator");
const db = require("../models/index");

/**
 * Controller to add a new user
 * @param {*} req
 * @param {*} res
 * @returns {Object}
 */
exports.addUser = async (req, res) => {
    try {
      // validate schema
      const { error, value } = userSchemaValidation.validateUser(req.body);
      if (error) return res.status(400).send({ message: error });
      const response = await db.Users.create(value);
      res.status(201).send({
        success: true,
        user: response
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
}

/**
 * Controller to get all users
 * @param {*} req
 * @param {*} res
 * @returns {Object}
 */
exports.getAllUsers = async (req, res) => {
    try {
      const response = await db.Users.findAll();
      res.status(200).send({
        users: response
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
}

/**
 * Controller to update user
 * @param {*} req
 * @param {*} res
 * @returns {Object}
 */
exports.updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const foundUser = await db.Users.findByPk(id);
  
      if (foundUser) {
        const updatedUser = await db.Users.update(req.body, { where: { id }, returning: true });
        if (!updatedUser) {
          res.status(400).send({ message: "Error while updating user" });
        }
        res.status(200).send({
          success: true,
          user: updatedUser[1]
        });
      } else {
        res.status(400).send({ message: `No user found for this id ${id}` });
      }
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
};
  
/**
 * Controller to delete user
 * @param {*} req
 * @param {*} res
 * @returns {Object}
 */
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const foundUser = await db.Users.findByPk(id);

        if (foundUser) {
            // if deleted then response will be 1
            const response = await db.Users.destroy({ where: { id } });
            if (!response) {
                res.status(400).send({ message: "Error while deleting user" });
            }
            res.status(200).send({
                success: true,
                message: "user deleted successfully"
            });
        } else {
            res.status(400).send({ message: `No user found for this id ${id}` });
        }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}