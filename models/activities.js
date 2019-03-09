'use strict';
module.exports = (sequelize, DataTypes) => {
  const activities = sequelize.define('activities', {
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    state: DataTypes.STRING,
    creator_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  activities.associate = function(models) {
    // associations can be defined here
  };
  return activities;
};