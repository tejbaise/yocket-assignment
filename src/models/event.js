module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      field: "name",
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      field: "start_time",
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      field: "duration",
      allowNull: false,
    },
  });
  Event.associate = function (models) {
    // associations can be defined here
  };
  return Event;
};
