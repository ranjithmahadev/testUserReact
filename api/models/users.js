"use strict";
const { v4: uuidv4 } = require("uuid");
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    userName: DataTypes.STRING,
    givenName: DataTypes.STRING,
    surName: DataTypes.STRING,
    dob: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Users",
  });
  Users.beforeCreate((user, _ ) => {
    return user.id = uuidv4();
  });
  return Users;
};