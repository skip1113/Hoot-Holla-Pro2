module.exports = function(sequelize, DataTypes) {
  var Hoot = sequelize.define("Hoot", {
    text: DataTypes.STRING,
    image: DataTypes.BLOB,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    }
  });
  return Hoot;
};
