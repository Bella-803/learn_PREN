export default(sequelize, DataTypes) => {
  const Businesses = sequelize.define('Businesses', {
    userId:
     {
        type: DataTypes.INTEGER, 
     },
    name: {
         type: DataTypes.STRING 
          }
  }, {});
  Businesses.associate = function(models) {
    // associations can be defined here
Businesses.hasMany(models.Products, {
  foreignKey: "businessId",
  onDelete: "CASCADE"
});
  Businesses.belongsTo(models.Users, {
      as: "User",
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  };
  return Businesses;
};