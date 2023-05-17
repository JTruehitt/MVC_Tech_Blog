const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static passwordAuth(input) {
    return bcrypt.compareSync(input, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 50],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(user) {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      },
      async beforeUpdate(user) {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
    timestamps: true,
  }
);

module.exports = User;
