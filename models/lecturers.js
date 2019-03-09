'use strict';
module.exports = (sequelize, DataTypes) => {
  const lecturers = sequelize.define('lecturers', {
    user_id: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    branch: DataTypes.STRING,
    number_completed_thesis: DataTypes.INTEGER,
    describle: DataTypes.TEXT,
    number_new_activity: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  lecturers.associate = function(models) {
    // associations can be defined here
  };
  return lecturers;
};