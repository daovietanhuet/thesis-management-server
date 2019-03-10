'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnnualReport = sequelize.define('AnnualReport', {
    thesisId: {type: DataTypes.INTEGER, field:'thesis_id'},
    completed: DataTypes.TEXT,
    incompleted: DataTypes.TEXT,
    difficulty: DataTypes.TEXT,
    creatorId: {type: DataTypes.INTEGER, field:'creator_id'}
  }, {
    tableName:'annual_reports',
    underscored: true,
  });
  AnnualReport.associate = function(models) {
    // associations can be defined here
  };
  return AnnualReport;
};