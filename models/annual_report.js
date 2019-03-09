'use strict';
module.exports = (sequelize, DataTypes) => {
  const annual_report = sequelize.define('annual_report', {
    thesis_id: DataTypes.INTEGER,
    completed: DataTypes.TEXT,
    incompleted: DataTypes.TEXT,
    difficulty: DataTypes.TEXT,
    creator_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  annual_report.associate = function(models) {
    // associations can be defined here
  };
  return annual_report;
};