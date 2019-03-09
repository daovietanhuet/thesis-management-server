'use strict';
module.exports = (sequelize, DataTypes) => {
  const theses = sequelize.define('theses', {
    thesis_code: DataTypes.STRING,
    thesis_subject: DataTypes.STRING,
    student_id: DataTypes.INTEGER,
    lecturer_id: DataTypes.INTEGER,
    state: DataTypes.STRING,
    describle: DataTypes.TEXT,
    planning: DataTypes.TEXT,
    thesis_mark: DataTypes.INTEGER,
    university: DataTypes.STRING,
    branch: DataTypes.STRING,
    is_completed: DataTypes.BOOLEAN,
    is_cancel: DataTypes.BOOLEAN
  }, {
    underscored: true,
  });
  theses.associate = function(models) {
    // associations can be defined here
  };
  return theses;
};