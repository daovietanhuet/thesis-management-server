'use strict';
module.exports = (sequelize, DataTypes) => {
  const students = sequelize.define('students', {
    user_id: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    semester_mark: DataTypes.JSON,
    class: DataTypes.STRING,
    number_completed_thesis: DataTypes.INTEGER,
    describe: DataTypes.TEXT,
    number_new_activity: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  students.associate = function(models) {
    // associations can be defined here
  };
  return students;
};