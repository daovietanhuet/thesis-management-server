'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    user_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    is_login: DataTypes.BOOLEAN,
    change_pass_at: DataTypes.DATE,
    role: DataTypes.STRING
  }, {
    underscored: true,
  });
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};