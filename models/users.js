'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userId: {type: DataTypes.INTEGER, field:'user_id'},
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isLogin: {type: DataTypes.BOOLEAN, field:'is_login'},
    changePassAt: {type: DataTypes.DATE, field:'change_pass_at'},
    role: DataTypes.STRING
  }, {
    tableName: 'users',
    underscored: true,
  });
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};