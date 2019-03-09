'use strict';
module.exports = (sequelize, DataTypes) => {
  const students = sequelize.define('students', {
    id: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    semester_mark: DataTypes.JSON,
    access_token: DataTypes.STRING
  }, {
    underscored: true,
  });
  students.associate = function(models) {
    // associations can be defined here
  };
  return students;
};