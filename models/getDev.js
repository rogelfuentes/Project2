module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define("Device", {
    inventoryId: DataTypes.STRING,
    type: DataTypes.STRING,
    displayName: DataTypes.STRING,
    deviceId: DataTypes.STRING,
    notes: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    facility: DataTypes.STRING,
    unit: DataTypes.STRING,
    sip: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: "Active" }
  });
  return Device;
};
